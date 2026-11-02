# Joy's legit voice note — Kokoro-82M, local CPU (GENERATE-VOICE.md §2).
# Joy is fictional; nothing here clones a real person.
from kokoro import KPipeline
import soundfile as sf
import numpy as np

pipeline = KPipeline(lang_code='a')  # 'a' = American English; voices: af_heart, af_bella…
text = ("Sigurado yan Tita, hindi naman magsisinungaling si pinsan ko. "
        "Nars siya, alam niya ang sinasabi niya. Sabi niya hindi siya makakapunta "
        "ngayong Sabado kasi may duty siya sa ospital, pero tinext niya ako agad kahapon. "
        "Kaya huwag po kayong mag-alala — ang ganda ng kangkong, sariwang sariwa pa.")
chunks = [audio for _, _, audio in pipeline(text, voice='af_heart')]
out = 'play/blackglass-phones/voice/joy-note.mp3'
sf.write(out, np.concatenate(chunks), 24000)
info = sf.info(out)
print(f'{out}: {info.duration:.1f}s @ {info.samplerate}Hz (target ~22s)')
