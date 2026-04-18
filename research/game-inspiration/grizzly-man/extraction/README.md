# Grizzly Man — extraction

Pulls Naninovel scripts and managed-text payloads out of the Unity Mono build.

## Prereqs

Same venv as the other Unity games.

```bash
python3 -m venv ~/.venvs/blackglass-extract
~/.venvs/blackglass-extract/bin/pip install UnityPy TypeTreeGeneratorAPI
```

## Run

```bash
# 1. Dump TextAssets + narrative MonoBehaviours (incl. Naninovel.*)
~/.venvs/blackglass-extract/bin/python extract.py \
  --game-dir "/mnt/e/Program Files (x86)/Steam/steamapps/common/Grizzly Man" \
  --out ./output

# 2. Turn each Naninovel.Script JSON into a readable .nani file
~/.venvs/blackglass-extract/bin/python resolve.py --output-dir ./output
```

## What extract.py does

Same shape as the Sir Brante extractor, with `"naninovel"`, `"script"`, and `"managedtext"` added to the class-name hints so Naninovel objects come through:

1. Reconstructs Unity TypeTrees from `Managed/*.dll`.
2. Walks every `*.assets` under `GrizzlyMan_Data/`.
3. Dumps all TextAssets (~32, mostly per-language ManagedText `.Key: Value` payloads like `Credits`, `Locales`, `Achievements`, `DefaultUI`).
4. Dumps narrative MonoBehaviours — crucially `Naninovel.Script` (~305), `Naninovel.ManagedTextProvider` (~413), `Naninovel.PlayScript` (~33), plus any `*Choice*` / `*Scene*` / `*Text*` hits.
5. Writes `output/summary.txt`.

## What resolve.py does

For every `Naninovel.Script` JSON in `output/monobehaviours/Naninovel.Script/`, reads the `ScriptText` field and writes it as `output/scripts/<name>.nani`. These are the **writer-friendly script sources** — NaniScript is a Markdown-like DSL with `@cmd arg`, speaker lines, and choices. One file per scene, named after the Naninovel script.

## Output is gitignored

Same convention as the other games.
