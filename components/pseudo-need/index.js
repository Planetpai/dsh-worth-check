// 伪需求 / 无用功判断：可选组件。默认在 cordis.patch.yml 里 disabled，
// 用户在「包含的组件」里打开开关即启用，无需额外配置。

export const name = 'dsh-worth-check/pseudo-need'

// 硬依赖 systemPrompt 服务。
export const inject = ['systemPrompt']

// 额外的指令片段：只在组件启用时注入。
export function buildPseudoNeedInstruction() {
  return [
    '额外要求（伪需求 / 无用功判断）：在询问用户「值不值得做」之前，先用一两句话指出这个需求是否存在「伪需求 / 无用功」的嫌疑，帮用户判断值不值得投入。',
  ].join('\n')
}

// 放在主组件的「开工前价值判断」section 之后。
function resolveOrder(ctx) {
  try {
    const base = ctx.systemPrompt.getSectionOrder('DEPLOYMENT_PERSONA_SUFFIX')
    return typeof base === 'number' ? base + 2 : 501
  } catch {
    return 501
  }
}

export function apply(ctx) {
  ctx.systemPrompt.section({
    name: 'dsh-worth-check/pseudo-need-check',
    order: resolveOrder(ctx),
    interpolate: false,
    text: () => buildPseudoNeedInstruction(),
  })
}
