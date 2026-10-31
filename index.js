import Schema from '@deepseek-ai/schemastery'

export const name = 'dsh-worth-check'

// 硬依赖 systemPrompt 服务：没有它这个插件就没有意义，宿主会自动在服务消失时卸载。
export const inject = ['systemPrompt']

// 「大项目」的判断信号，默认值；可在 cordis.yml 里覆盖。
export const DEFAULT_SIGNALS = [
  '需要写交接文档（换人 / 换会话还能继续）',
  '需要压缩很多次上下文才能完成',
  '涉及多个文件或很多步骤',
  '请求中带有「项目 / 系统 / 完整做一套 / 从头做」等意图',
]

// 可调参数用 Schemastery Schema（普通字段，走 cordis.yml 配置，不设 GUI 表单）。
export const Config = Schema.object({
  askOnLargeOnly: Schema.boolean()
    .default(true)
    .description('只在「大项目」时询问；关掉则新对话第一条任务无论大小都问一句。'),
  largeSignals: Schema.array(Schema.string())
    .default([...DEFAULT_SIGNALS])
    .description('「大项目」的判断信号（满足任一即可），可自行增删。'),
})

// 指令文本独立成纯函数，方便测试。
export function buildInstruction(config) {
  const signals =
    config.largeSignals && config.largeSignals.length > 0
      ? config.largeSignals
      : DEFAULT_SIGNALS

  const lines = [
    '## 开工前价值判断',
    '',
    '只在「新对话的第一条任务」时判断一次；同一对话后续的推进、追问、修改，一律不再问。',
    '',
    '如果用户一开头就是「读取交接文件 / 继续之前做过的项目」，说明项目此前已被确认，直接开始，不要问。',
    '',
    '否则，判断这条任务的体量：',
    '- 小事（闲聊、查资料、解释概念、单次问答、小改动）→ 直接处理，不打扰。',
    '- 大项目 → 停下来，问用户一个「值不值得做」的问题。',
    '',
    '判断「大项目」的信号（满足任一即可）：',
    ...signals.map((s, i) => `${i + 1}. ${s}`),
    '',
  ]

  if (config.askOnLargeOnly) {
    lines.push('只在「大项目」时才问；小事一律直接做，不要打扰用户。')
  } else {
    lines.push('新对话的第一条任务，无论大小，都先问一句「值不值得做」再开始。')
  }

  lines.push(
    '',
    '问的时候，用 ask_user_question 工具，只问「值不值得做」这一个价值问题，',
    '选项例如：值得做 / 不值得、先别做 / 我再想想。',
    '不要问需求澄清类的问题（不要问目标、范围、产出形态、技术选型、平台、验收标准等）。',
    '你的职责只是帮用户确认「这件事值不值得投入」，不是替他拆解需求。',
    '',
    '只提醒、不拦截：用户怎么回答就怎么继续，不要反复追问。',
  )

  return lines.join('\n')
}

// 把这段指令放在 persona 之后、工具清单之前，让模型尽早看到这条行为规则。
function resolveOrder(ctx) {
  try {
    const base = ctx.systemPrompt.getSectionOrder('DEPLOYMENT_PERSONA_SUFFIX')
    return typeof base === 'number' ? base + 1 : 500
  } catch {
    return 500
  }
}

export function apply(ctx, config) {
  // 注册即 effect：section() 返回 disposer，插件卸载时自动移除。
  ctx.systemPrompt.section({
    name: 'dsh-worth-check/opening-value-gate',
    order: resolveOrder(ctx),
    interpolate: false,
    text: () => buildInstruction(config),
  })
}
