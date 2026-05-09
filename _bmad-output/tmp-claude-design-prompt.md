# Save One Drop One — Remaining Design Brief

`docs/design` has already been updated for:

1. Matchup Streamer Live Mode extensions
5. Create Bracket Flow exploration

Now update `docs/design` only for the remaining items:

2. First-Visit Onboarding Modal
3. Full Community Ranking View
4. Full Bracket Modal

Use the existing Streamer Native / dark design language and extend current UI kit surfaces instead of redesigning them. Do not decide the final design direction from this prompt; explore what each surface needs, then choose the simplest production-ready treatment.

## Goals

- Add a first-visit onboarding modal that helps anonymous visitors personalize the home feed through quick interest selection, without feeling like a gate.
- Add a full community ranking view opened from the result page Community Verdict "View all N" action, showing every participant's community rank and the viewer's own picks.
- Add a fullscreen full bracket modal opened from the result page Final Eight "View all N" action, with complete bracket browsing, round range focus, zoom/drag interaction, and save-image states.

## Required States

- Onboarding: category selection, immediate feed personalization, skip/dismiss.
- Community ranking: loading, full ranked list, insufficient community data.
- Full bracket modal: loading, zoom/drag use, round range filtering, save image pending/success/failure, connection lost with last known snapshot.

Keep the output focused and implementation-oriented. Avoid broad product strategy, new brand directions, or unrelated redesigns.
