# dsh-worth-check · Worth Check

A DeepSeek plugin that judges task size at the **start of a new conversation** and asks "is this worth doing?" only for large projects — preventing impulsive kick-offs you can't cleanly abandon.

[中文](README.md)

## What it does

At the start of every new conversation, before the first task, the model quickly sizes it up:

- **Starts by reading a handoff doc / continuing a previous project** → proceed, don't ask (already confirmed).
- **Small tasks** (chit-chat, lookups, explanations, typos) → just do it, no interruption.
- **Large projects** → ask "is this worth doing now?" first, then proceed after your answer.

Judged once on the first task only; never re-asked later in the same conversation.

Large-project signals (any one suffices, configurable):

1. Needs a handoff document
2. Needs many context compactions
3. Spans many files or steps
4. Implies "project / system / build from scratch"

Reminder-only, never blocking.

## Config

The plugin ships as two components you can toggle independently on the plugin's detail page under "Included components":

| Component | Default | Purpose |
|---|---|---|
| Worth check | on | Sizes the task, asks only for large projects, skips handoff reads |
| Fake-need check | off | Extra "fake need / wasted effort" check, off by default to save tokens |

The main component also has two optional parameters (set in `cordis.yml`, not the GUI):

| Key | Default | Meaning |
|---|---|---|
| `askOnLargeOnly` | true | Ask only for large projects |
| `largeSignals` | 4 defaults | Large-project signals, editable |

## Install

> Not yet published to npm — use the options below for now.

**Option 1: local `.tgz` (works today)**

1. Download `dsh-worth-check-*.tgz` from [GitHub Releases](https://github.com/planetpai/dsh-worth-check/releases), or build it locally:
   ```bash
   node scripts/pack.mjs   # produces dsh-worth-check-<version>.tgz
   ```
2. GUI: **Plugins → Add plugin** → choose the `.tgz` file.

**Option 2: npm (once published)**

```bash
dsh plugin --profile <your-profile> add dsh-worth-check
```

## License

MIT
