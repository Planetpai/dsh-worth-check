import test from 'node:test'
import assert from 'node:assert'
import { buildInstruction, DEFAULT_SIGNALS } from '../index.js'
import { buildPseudoNeedInstruction } from '../components/pseudo-need/index.js'

const base = { askOnLargeOnly: true, largeSignals: [...DEFAULT_SIGNALS] }

test('默认：只在第一条判断、大项目才问、读交接不问、用 ask_user_question、禁澄清', () => {
  const text = buildInstruction(base)
  assert.match(text, /新对话的第一条任务/)
  assert.match(text, /读取交接文件/)
  assert.match(text, /大项目/)
  assert.match(text, /ask_user_question/)
  assert.match(text, /不要问需求澄清类的问题/)
  assert.match(text, /只提醒、不拦截/)
  // 主组件不含伪需求（伪需求是独立组件）
  assert.doesNotMatch(text, /伪需求/)
})

test('askOnLargeOnly=false 时无论大小都问', () => {
  const text = buildInstruction({ ...base, askOnLargeOnly: false })
  assert.match(text, /无论大小/)
})

test('自定义 largeSignals 覆盖默认信号', () => {
  const text = buildInstruction({ ...base, largeSignals: ['迁移到新框架', '重构整个模块'] })
  assert.match(text, /迁移到新框架/)
  assert.doesNotMatch(text, /需要写交接文档/)
})

test('largeSignals 为空回退默认信号', () => {
  const text = buildInstruction({ ...base, largeSignals: [] })
  assert.match(text, /需要写交接文档/)
})

test('伪需求组件指令独立存在，含伪需求提示', () => {
  const text = buildPseudoNeedInstruction()
  assert.match(text, /伪需求/)
  assert.match(text, /无用功/)
})
