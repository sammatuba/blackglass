# Voice-note provenance

Every depicted person is fictional. No real person's voice was recorded or cloned.

| file | who (fictional) | engine | chain |
|---|---|---|---|
| `joy-note.mp3` | Joy, the cousin-nurse (legit voice) | Kokoro 82M v0.9.4, voice `af_heart`, 24 kHz, Apache-2.0 | direct TTS of the thread caption line |
| `renz-clone.mp3` | "Renz" (cloned distress voice) | Chatterbox 0.5B (`ResembleAI/chatterbox`), 24 kHz, MIT | zero-shot clone of a **synthetic** reference |
| `_reference/_renz-base.wav` | the synthetic "Renz" base | Kokoro 82M v0.9.4, voice `am_michael` | the reference Chatterbox cloned — imitation of an imitation |

- Chatterbox params: `exaggeration=0.4, cfg_weight=0.3` (flat, strained, bad-line register).
- **Chatterbox's inaudible watermark is embedded in `renz-clone.mp3` and must stay.**
  That watermark is a real detection fact used in the debrief.
- Regenerate with `scripts/tts/gen-joy.py` / `scripts/tts/gen-renz.py`
  (env: `.venv-tts/` — see `GENERATE-VOICE.md`; pin notes in the commit message).
- Generated 2026-11-03.
