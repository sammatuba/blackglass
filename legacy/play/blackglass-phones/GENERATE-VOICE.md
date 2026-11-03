# Generating the voice notes (Kokoro + Chatterbox) — unblocked, runs on this machine

The engine plays real audio behind the voice-message chrome the moment files exist
(`OSMessage.audio` → `voicenoteUrl`). Two notes are wired and waiting:

| id | file | who | register | engine |
|---|---|---|---|---|
| `joy-note` | `play/blackglass-phones/voice/joy-note.mp3` (22 s) | Joy, the cousin-nurse — a **legit** voice | warm, certain, everyday Taglish | Kokoro-82M (Apache-2.0, local CPU) |
| `renz-clone` | `play/blackglass-phones/voice/renz-clone.mp3` (7 s) | "Renz" — the cloned distress voice | slightly flat, bad-line quality | Chatterbox 0.5B (MIT, local CPU/RAM) |

After files land:

```bash
node scripts/sync-artifacts.mjs    # copies to public/voicenotes/ + emits voice-list.ts
```

The kangkong thread (Joy, 5:51 AM) and the Scam Radar Case 01 opening (Renz, 9:46 PM)
start playing them automatically — no code change needed.

## Guardrail: no real voice is cloned

Every depicted person is fictional. **Do not record or clone a real person's voice.**
The chain is fully synthetic: generate Renz's *base* voice with Kokoro first, then let
Chatterbox zero-shot-clone *that synthetic reference* — the imitation of an imitation.
Chatterbox also embeds an inaudible watermark by default; keep it on. That is a real,
teachable detection fact for the debrief.

## 1. Setup (once)

```bash
python3 -m venv .venv-tts
source .venv-tts/bin/activate        # WSL2 / Git Bash: . .venv-tts/Scripts/activate
pip install --upgrade pip
pip install kokoro soundfile
pip install chatterbox-tts           # pulls torch CPU — big, one time
mkdir -p play/blackglass-phones/voice
```

## 2. Joy's legit note — Kokoro (22 s)

Joy's line (from the thread caption, spoken warm and certain):

> "Sigurado yan Tita, hindi naman magsisinungaling si pinsan ko. Nars siya, alam niya
> ang sinasabi niya. Sabi niya hindi siya makakapunta ngayong Sabado kasi may duty
> siya sa ospital, pero tinext niya ako agad kahapon. Kaya huwag po kayong
> mag-alala — ang ganda ng kangkong, sariwang sariwa pa."

Kokoro's Philippine-English/Tagalog coverage is imperfect — read the result critically;
if Tagalog phonemes warp, keep the English-dominant lines and let the caption carry the
Tagalog (the bubble shows the caption text under the waveform anyway).

```python
# gen-joy.py
from kokoro import KPipeline
import soundfile as sf
import numpy as np

pipeline = KPipeline(lang_code='en')  # try 'en' first; voices: af_heart, af_bella…
text = ("Sigurado yan Tita, hindi naman magsisinungaling si pinsan ko. "
        "Nars siya, alam niya ang sinasabi niya. Sabi niya hindi siya makakapunta "
        "ngayong Sabado kasi may duty siya sa ospital, pero tinext niya ako agad kahapon. "
        "Kaya huwag po kayong mag-alala — ang ganda ng kangkong, sariwang sariwa pa.")
chunks = []
for _, _, audio in pipeline(text, voice='af_heart'):
    chunks.append(audio)
sf.write('play/blackglass-phones/voice/joy-note.mp3',
         np.concatenate(chunks), 24000)
```

(Target ≈22 s; trim/extend the script text, not the sample rate.)

## 3. Renz's cloned distress voice — Chatterbox (7 s)

```python
# gen-renz.py
import torchaudio
from chatterbox.tts import ChatterboxTTS

# Step 1: a synthetic BASE voice (Kokoro) — this is the "Renz" reference
from kokoro import KPipeline
import soundfile as sf
import numpy as np
pl = KPipeline(lang_code='en')
base = [a for _, _, a in pl("Tita, si Renz po 'to. Kilala n'yo po yung boses ko diba?",
                            voice='am_michael')][0][2] if False else None
# simpler: generate the base clip to wav first, then clone it
chunks = [a for _, _, a in pl("Tita, huwag po kayong mag-alala. Basta ako 'to.",
                              voice='am_michael')]
sf.write('voice/_renz-base.wav', np.concatenate(chunks), 24000)

model = ChatterboxTTS.from_pretrained(device='cpu')
wav = model.generate(
    "Tita, si Renz po 'to. Nanakaw phone ko kanina. Naaksidente po ako. "
    "Kailangan ng tulong, please.",
    audio_prompt_path='voice/_renz-base.wav',   # synthetic reference ONLY
    exaggeration=0.4, cfg_weight=0.3,            # flat, strained, bad-line
)
torchaudio.save('play/blackglass-phones/voice/renz-clone.mp3', wav, model.sr)
```

Keep it ≈7 s, slightly flat, with the compressed quality of a bad phone line — the
caption already tells the player what they're hearing.

## 4. Verify

```bash
node scripts/sync-artifacts.mjs     # voice notes: joy-note.mp3, renz-clone.mp3
npm run build && npm run preview    # then in another shell:
node scripts/os-smoke.mjs           # Case 01 flow incl. the Renz voice bubble
```

Play both in the threads: Joy's note plays warm and whole; the clone plays slightly
wrong. That wrongness, named in the debrief, is the lesson — "verification is a
practice, not a feeling."

*Provenance: record `model` + version in the commit message and in
`play/blackglass-phones/voice/PROVENANCE.md` when the files land. Chatterbox's
watermark stays embedded — do not strip it.*
