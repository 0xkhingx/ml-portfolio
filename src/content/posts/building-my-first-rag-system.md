---
title: "Building My First RAG System: My Thought Process"
date: 2026-10-05
description: "A design-thinking walkthrough of a from-scratch Retrieval-Augmented Generation pipeline in Python."
---

*A design-thinking walkthrough of a from-scratch Retrieval-Augmented Generation pipeline in Python*

## Why I'm building this

Large language models have a well-known weakness: ask them about data they've never seen, such as a company handbook, a private PDF or this morning's news, and they will often produce a confident, plausible and wrong answer. This is hallucination, and it is the main thing standing between a impressive demo and a tool I would trust.

Retrieval-Augmented Generation (RAG) attacks the problem from a different angle. Instead of making the model bigger or retraining it, I change the *task*: rather than asking the model to answer from memory, I hand it the relevant pages and ask it to answer from those. It turns a closed-book exam into an open-book one.

I'm building a minimal RAG system from scratch, based on a public tutorial, but I want this write-up to capture something the tutorial can't: the reasoning behind each decision, the trade-offs I'm weighing, and the places where I expect things to break.

## The shape of the pipeline

Before writing any code, I want the whole system in my head as five stages:

1. **Knowledge source:** the text the model knows nothing about.
2. **Chunking:** split that text into pieces small enough to retrieve individually.
3. **Embedding:** convert each chunk into a vector that captures its meaning.
4. **Indexing:** store those vectors so I can search them by similarity.
5. **Retrieve, augment, generate:** embed the question, fetch the closest chunks, put them in a prompt, and let a language model write the answer.

Thinking of it this way keeps me honest about where a failure originates. If the final answer is bad, the cause is one of three things: retrieval fetched the wrong chunks, the prompt framed them badly, or the generator mishandled good context. Debugging a RAG system is mostly the work of figuring out *which stage* broke.

## Stage 1: Choosing the knowledge source

I'm starting with a tiny, fake company policy document covering remote-work days, paid time off and the tech stack. That might look too small to be meaningful, but it's deliberate.

With a document this short, I can read the whole thing and know the ground truth for every question. That means I can tell instantly whether the system is right, wrong or inventing things. When I move to real documents later, I'll lose that luxury, so I want to learn how the pipeline behaves while I still have a perfect answer key.

It also gives me a clean test for the most important behaviour: asking something the document *doesn't* cover, like a dental plan, and checking that the system admits it doesn't know.

## Stage 2: Chunking, where I expect the first real decision

The model can't read a whole library at once, and retrieval works best on focused pieces, so I need to cut the text into chunks. My first instinct would be to split on newlines, but that cuts sentences in half and strips away context. Instead I'll use a recursive splitter that tries the most meaningful boundaries first (paragraphs, then lines, then words) and only falls back to harsher cuts when it has to.

Two parameters matter here:

- **Chunk size.** Too small and each piece lacks enough context to be useful on its own. Too large and each piece contains several unrelated ideas, which blurs its embedding and wastes space in the prompt.
- **Overlap.** A little repetition between neighbouring chunks protects facts that land on a boundary.

The tutorial uses a chunk size of 150 characters with an overlap of 20. For teaching purposes that's convenient, because it produces a handful of chunks I can inspect by eye. But I'm already suspicious of it. 150 characters is roughly one sentence, and a policy rule is often longer than that. I expect to see rules sliced mid-thought, and I expect the overlap to create awkward duplicated words at the seams.

So my plan is to print every chunk and read them as if I were the model. If a chunk doesn't make sense on its own, retrieval can't save me. After that, I'll experiment with larger sizes and compare.

## Stage 3: Embeddings, and why I'm keeping them local

An embedding model maps text to a list of numbers so that sentences with similar meaning end up close together. This is what lets a search for "working from home" match a chunk that says "remote days" even though the words differ. That's the core advantage over plain keyword search.

I'm choosing a small, popular sentence-transformer model for three reasons:

- It's fast enough to run on a free notebook without a GPU.
- It's free, so there's no API key or usage bill to manage.
- Running it locally means my documents don't have to be sent to a third party just to be indexed.

The trade-off is quality. A small model is a good default, not the best available, and I'll keep in mind that a weak embedding can quietly cap the performance of everything downstream.

One sanity check I'll do straight away is to confirm the shape of the output: one vector per chunk, each with a fixed number of dimensions. It's a trivial check, but it catches silly mistakes early.

## Stage 4: The vector index

Once I have vectors, I need a way to find the nearest ones to a query. For this scale, I'll use a flat index, which compares the query against every stored vector and returns exact results.

That sounds wasteful, and at millions of documents it would be. But with a few chunks it's instant, and exact search removes one variable: if retrieval goes wrong, I'll know it's not because of an approximate-search shortcut. It's the right choice for learning, and the point at which I'd swap to an approximate index is a good thing to understand but not to optimise prematurely.

Two details I want to think carefully about:

- **Distance metric.** The index measures straight-line (L2) distance. Many practitioners prefer cosine similarity for text embeddings, because it compares direction rather than magnitude. For normalised vectors the two give the same ranking, but I want to verify that rather than assume it.
- **Data types.** The library expects 32-bit floats, so I need to convert. It's a small thing, but exactly the kind of detail that produces confusing errors if missed.

## Stage 5: Retrieve, augment, generate

This is where the idea comes together. When a question arrives, I:

1. **Retrieve:** embed the question with the same model and pull back the top *k* nearest chunks.
2. **Augment:** build a prompt that contains those chunks as context, plus the question.
3. **Generate:** pass the prompt to a language model and return its answer.

The most important line in the whole system, in my view, is the instruction in the prompt telling the model to answer *only* from the provided context and to say it doesn't have the information otherwise. That single sentence is what converts a hallucination-prone model into a grounded one. Everything else is plumbing; this is the behaviour.

### Choosing *k*

The tutorial retrieves the top two chunks. With only four chunks in total, that's half the entire document, which is a generous ratio I wouldn't get in a real system. More important, I can see a risk: a question about the tech stack needs the *last* chunks, and if the similarity ranking prefers other ones, the right context never reaches the model. I plan to test every fact in the document, not just the first one, to see whether retrieval holds up.

### Choosing the generator

The tutorial uses a very small instruction-tuned text-to-text model because it's free and runs locally. I like that for learning, but I'm going in with low expectations. Small models tend to copy text from the context rather than genuinely synthesise it, they can repeat themselves, and they follow instructions less reliably. I'd rather find that out by testing than be surprised later.

## How I'll know it works

A demo that answers one question correctly proves very little. I'll evaluate the system with a small, deliberate test set:

| Test type | Example | What I'm checking |
| --- | --- | --- |
| Direct lookup | "How many PTO days do employees get?" | Basic retrieval and extraction |
| Late-document fact | "What mobile framework do we use?" | Retrieval isn't biased toward early chunks |
| Paraphrased question | "Can I work from home on Mondays?" | Embeddings match meaning, not keywords |
| Out-of-scope question | "What is the dental plan?" | The model refuses instead of inventing |
| Multi-fact question | "What are the WFH and PTO policies?" | Whether *k* is large enough |

For each question I'll inspect the retrieved context *before* reading the answer. That habit is the most valuable one I'm taking from this exercise, because it separates retrieval problems from generation problems.

## What I expect to go wrong

I'd rather write my predictions down now than rationalise them afterwards:

- **Awkward chunk boundaries** will cut rules mid-sentence and leave duplicated fragments at the seams.
- **The generator will echo context** more than it will reason about it.
- **Some questions will retrieve the wrong chunks**, especially those whose answer sits in a later part of the document.
- **The refusal behaviour will be fragile.** It may work for an obvious out-of-scope question and fail for a subtle one.

## A note on the claims I'm cautious about

It's tempting to say a pipeline like this "solves" hallucination, stale knowledge and privacy. I think that overstates it. Grounding *reduces* hallucination; it doesn't eliminate it, particularly with a small generator. Updating knowledge means re-indexing, which is easy at this scale and a real engineering task at a larger one. And the privacy benefit is real only as long as every component, including the models and any hosted notebook environment, is actually running where I think it is. I want to be precise about these claims in anything I publish.

## What I'd do next

Once the basic version behaves the way I understand it, the natural improvements are:

1. **Better chunking:** larger chunks, or splitting by document structure such as headings and bullet points.
2. **A stronger generator:** to see how much of the weakness is the model rather than the retrieval.
3. **Retrieval quality:** adding similarity thresholds so the system can refuse when nothing relevant is found, rather than relying only on the prompt.
4. **Real documents:** PDFs and longer text, where I can no longer verify everything by eye.
5. **Systematic evaluation:** a larger question set with measurable scores rather than eyeballing.

## Closing thoughts

What appeals to me about RAG is how much of its value comes from structure rather than scale. No part of it is individually complicated: split, embed, store, search, prompt. The skill is in understanding how the pieces interact and where each can fail. If I can look at a wrong answer and say *which stage caused it*, I'll have learned the real lesson, and that's what I want this project to demonstrate.

*Based on a public tutorial on building a RAG system from scratch with Python. The structure, analysis and commentary here are my own.*
