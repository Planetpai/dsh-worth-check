# Changelog

## 0.2.0 — 2026-10-31

- 拆分为两个组件（bundle row）：主组件「开工前价值判断」+ 可选组件「伪需求 / 无用功判断」（默认关闭）。
- 移除 `enabled` / `assessPseudoNeed` 配置项，改由组件开关控制。
- 保留 `askOnLargeOnly` / `largeSignals` 作为 cordis.yml 配置。

## 0.1.0 — 2026-10-30

- 初版：在新对话开头判断任务体量，只在「大项目」时问一句「值不值得做」。
