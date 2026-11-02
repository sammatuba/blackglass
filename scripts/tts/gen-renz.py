# "Renz" cloned distress voice — Chatterbox 0.5B zero-shot-cloning a SYNTHETIC
# Kokoro base (GENERATE-VOICE.md §3). Imitation of an imitation: no real person's
# voice is recorded or cloned. Chatterbox's inaudible watermark stays embedded.
import numpy as np
import soundfile as sf
from kokoro import KPipeline
from chatterbox.tts import ChatterboxTTS

# Step 1: the synthetic BASE voice (Kokoro, am_michael) — this is the reference
pl = KPipeline(lang_code='a')
chunks = [a for _, _, a in pl("Tita, huwag po kayong mag-alala. Basta ako 'to.",
                              voice='am_michael')]
base = 'play/blackglass-phones/voice/_renz-base.wav'
sf.write(base, np.concatenate(chunks), 24000)

# Step 2: clone the synthetic reference; flat, strained, bad-line quality
model = ChatterboxTTS.from_pretrained(device='cpu')
wav = model.generate(
    "Tita, si Renz po 'to. Nanakaw phone ko kanina. Naaksidente po ako. "
    "Kailangan ng tulong, please.",
    audio_prompt_path=base,
    exaggeration=0.4, cfg_weight=0.3,
)
out = 'play/blackglass-phones/voice/renz-clone.mp3'
sf.write(out, wav.squeeze(0).numpy(), model.sr)
info = sf.info(out)
print(f'{out}: {info.duration:.1f}s @ {info.samplerate}Hz (target ~7s)')
