---
title: from notebook to product
date: 2026-07-05
description: "The gap between a model that works and a product people touch."
---

A machine learning model that works in a notebook is maybe forty percent of the way to a product. The other sixty percent has nothing to do with accuracy — it's plumbing, failure modes, and the stubborn gap between what a model outputs and what a person experiences.

Moodmix taught me this firsthand. The core idea is simple: classify music by your mood and push a matching playlist to your Spotify. The model part is the part everyone imagines — features in, mood label out. The product part is everything the demo videos skip.

First, the label problem. "Mood" is not ground truth; it's a subjective, context-dependent judgment two listeners can disagree on while hearing the same song. A classifier trained on tidy labels inherits their tidiness and nothing more. Designing around that meant treating predictions as suggestions rather than verdicts — the playlist is *inspired by* your mood, never graded against it.

Second, integration is its own subsystem. Pushing a playlist to Spotify means OAuth, token refresh, scope negotiation, rate limits, and error states for every one of them. The ML portion of the codebase is smaller than the portion whose only job is surviving contact with someone else's API. This ratio surprises people who haven't shipped; it should not.

Third, failure has to be designed, not handled. When classification fails or returns low confidence, the user still wants a playlist. Graceful degradation — fall back to a sensible default rather than an empty screen — converts model uncertainty from a bug into a personality trait.

None of this appears in evaluation metrics, which is why it's chronically under-taught. Log loss does not measure whether your auth flow recovers from an expired refresh token. But from the user's side, the auth flow *is* the product; the model is a rumor inside it.

The notebook-to-product gap is also where machine learning work becomes engineering work, and I've stopped resenting the crossing. The model earns the demo. Everything else earns the user.
