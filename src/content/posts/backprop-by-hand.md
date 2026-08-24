---
title: backprop by hand
date: 2026-08-20
description: "What building a two-layer network in NumPy teaches that frameworks quietly hide."
---

Every machine learning engineer should build a neural network from scratch once. Not because production code will ever be written that way, but because the framework version of backpropagation is a single function call, and the from-scratch version is an education.

My version is deliberately small: a two-layer network in NumPy — forward pass, backpropagation, SGD — trained on MNIST and benchmarked against PyTorch on the same data. No autograd, no optimizers, no abstractions. Just matrices, derivatives, and the occasional shape error at 1am.

The first thing you learn is that backpropagation is bookkeeping, not magic. Each layer needs to answer two questions: given the loss gradient flowing in from above, what gradient do I owe my weights, and what gradient do I owe the layer below? Answer it with the chain rule, multiply, pass it down. The math fits on one page; getting every transpose right is where the hours go.

The second lesson is that shapes are the real debugger. When training diverges or accuracy flatlines, the bug is almost never calculus — it's a (batch, features) matrix quietly multiplied against its own transpose, or a row-wise mean taken where a column-wise one belonged. NumPy's broadcasting makes wrong shapes *run* instead of crash, which means silent corruption rather than a helpful traceback. After this project I read tensor dimension comments in framework code with genuine gratitude.

Sanity checks earn their keep. Gradient checking against numerically approximated derivatives catches sign errors before they cost an evening. Watching the loss curve respond to learning rate changes — oscillating when too high, crawling when too low — builds intuition no tutorial provides.

The payoff moment was comparing against PyTorch: same architecture, same seed discipline, same data, and watching both networks land within noise of each other. That agreement is the point. It means the from-scratch implementation isn't a toy that happens to move — it's the same algorithm, understood well enough to reproduce.

Frameworks are excellent and I use them happily. But now, when `loss.backward()` runs, I know exactly which page of bookkeeping is being written — and that knowledge has already paid for itself in debugging sessions the framework could not explain.
