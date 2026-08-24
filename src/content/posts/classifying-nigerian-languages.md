---
title: classifying nigerian languages
date: 2026-06-28
description: "Character n-grams, five languages, and an honest error table — notes on a classifier most NLP pipelines skip."
---

Most NLP tools do not know that Yoruba, Igbo, Hausa, and Nigerian Pidgin exist. Drop a sentence of any of them into a language detector and watch it guess wrong, confidently. I wanted a small fix rather than a grand one: a classifier that detects English, Yoruba, Igbo, Hausa, and Pidgin from text. It ended up at 99.4% accuracy on a held-out test set across 64k+ sentences — but the interesting part of the project is everything that number hides.

The core design decision was character-level over word-level. Languages like Yoruba and Igbo are morphologically rich, where word boundaries carry less signal and morphology carries more. Character n-grams (two through five characters, TF-IDF weighted, feeding logistic regression) capture the texture of a language — its digraphs, its diacritics, its borrowings — without needing tokenizers that assume spaces mean what they mean in English. Word-level features would have required vocabulary decisions per language; character n-grams treat them uniformly.

Data was its own education. Real tweets (NaijaSenti), clean parallel text (JW300), Wikipedia articles, Gutenberg books — each source brings dialect and register biases that matter when you claim a headline number. English drawn from books behaves differently than English drawn from social media, which is exactly why Pidgin — trained mostly on tweets — reads differently than the rest.

The honest part came after training, in the error table. Yoruba with diacritics classifies at ~97% confidence; strip the diacritics, as real users typing quickly do, and it drops toward 89%. Pidgin sits near 82% because it has the least training data. Inputs under five words are unreliable regardless of language. Code-switched sentences — utterly normal in Lagos conversation — are not handled at all.

I kept that table next to the headline number deliberately. A classifier that reports 99.4% while hiding its weak spots will eventually embarrass someone; one that admits short inputs fail earns trust for everything else it claims.

Next steps are unglamorous by design: more Pidgin data, diacritic-robust training pairs, a FastAPI wrapper, maybe a Hugging Face Space demo. Small fixes compound too.
