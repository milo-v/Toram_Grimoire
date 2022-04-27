import { isNumberString, trimFloatStringZero } from '@/shared/utils/string'
import Grimoire from '@/shared/Grimoire'

import { SkillBranchItemSuffix, SkillEffectItemHistory } from '@/lib/Skill/SkillComputingContainer'
import type { SkillBranchItemBaseChilds, SkillBranchItemOverwriteRecords } from '@/lib/Skill/SkillComputingContainer'
import {
  computeBranchValue,
  computedBranchHelper,
  ComputedBranchHelperResult,
  handleBranchStats,
  handleBranchTextProps,
  handleBranchValueProps,
} from '@/lib/Skill/SkillComputingContainer/compute'
import type { HandleBranchValuePropsMap, HandleBranchTextPropsMap } from '@/lib/Skill/SkillComputingContainer/compute'
import { ResultContainer, ResultContainerBase } from '@/lib/Skill/SkillComputingContainer/ResultContainer'
import { FormulaDisplayModes } from '@/lib/Skill/SkillComputingContainer/enums'
import { StatComputed } from '@/lib/Character/Stat'

import { createTagButtons } from '@/views/SkillQuery/utils'

import DisplayDataContainer from './DisplayDataContainer'
import { handleFunctionHighlight, numberStringToPercentage } from './utils'

function cloneBranchProps(
  branchItem: SkillBranchItemBaseChilds,
  initValueMap?: Record<string, string | ((value: string) => string)>,
): Record<string, string> {
  const props = {} as Record<string, string>
  Object.entries(branchItem.allProps).forEach(([key, value]) => {
    props[key] = value
  })
  if (typeof initValueMap === 'object') {
    Object.entries(initValueMap).forEach(([key, value]) => {
      if (typeof value === 'function') {
        props[key] = value(props[key])
      } else if (props[key] === undefined) {
        props[key] = value
      }
    })
  }
  return props
}

type SkillDisplayData = Record<string, string>

interface HandleBranchLangPropsOptions {
  prefix?: string; // unused now
  type?: 'auto' | 'normal' | 'value' | 'boolean';
  afterHandle?: ((value: string) => string) | null;
}
interface HandleBranchLangPropsMap {
  [key: string]: HandleBranchLangPropsOptions | null;
}
function handleBranchLangProps<PropMap extends HandleBranchLangPropsMap>(
  branchItem: SkillBranchItemBaseChilds,
  helper: ComputedBranchHelperResult,
  props: Record<string, string>,
  propMap: PropMap,
): Record<keyof PropMap, ResultContainer> {
  const { t } = Grimoire.i18n

  const attrValues = {} as Record<keyof PropMap, ResultContainer>
  const attrKeys = Object.keys(propMap) as (keyof PropMap)[]
  attrKeys.forEach((attrKey) => {
    const { type = 'auto', prefix = '', afterHandle = null } = (propMap[attrKey] || {}) as HandleBranchLangPropsOptions
    const value = props[attrKey as string]
    if (!value) {
      return
    }
    let resultStr: string
    if (type === 'value') {
      const resultValue = computeBranchValue(value, helper)
      const sign = isNumberString(resultValue) && parseFloat(resultValue) < 0 ? 'negative' : 'positive'
      const displayValue = sign === 'negative' ? -1 * parseFloat(resultValue) : resultValue
      resultStr = t(`skill-query.branch.${branchItem.name + prefix}.${attrKey}.${sign}`, { value: displayValue.toString() })
    } else {
      let displayValue = value
      if ((type === 'auto' || type === 'boolean') && (displayValue === '1' || displayValue === '0')) {
        displayValue = displayValue === '1' ? 'true' : 'false'
      }
      let preName = branchItem.name + prefix
      preName = branchItem instanceof SkillBranchItemSuffix ? branchItem.mainBranch.name + ': ' + preName : preName
      const result = t(`skill-query.branch.${preName}.${attrKey}.${displayValue}`)
      resultStr = afterHandle ? afterHandle(result) : result
    }
    attrValues[attrKey] = new ResultContainer(attrKey as string, value, resultStr)
  })
  return attrValues
}

type HandleDisplayDataOptionFilterValidation = (value: string) => boolean
interface HandleDisplayDataOptionFilterItem {
  validation: HandleDisplayDataOptionFilterValidation;
  calc?: boolean;
}
interface HandleDisplayDataOptionFilters {
  [key: string]: HandleDisplayDataOptionFilterValidation | HandleDisplayDataOptionFilterItem;
}
interface HandleDisplayDataOptions {
  values?: HandleBranchValuePropsMap;
  texts?: HandleBranchTextPropsMap;
  langs?: HandleBranchLangPropsMap;
  filters?: HandleDisplayDataOptionFilters;
  pureValues?: string[];
  pureDatas?: string[];
  titles?: string[];
  formulaDisplayMode?: FormulaDisplayModes;
}

const FORMULA_VALUE_TO_PERCENTAGE_PATTERN = /([$_a-zA-Z][$_a-zA-Z0-9]*)(\*)(\d\.\d+)/g
const MUL_PATTERN = /\*/g
const FORMULA_FLOAT_TO_FIXED = /(\d+\.)(\d{4,})/g

function handleDisplayData<Branch extends SkillBranchItemBaseChilds>(
  branchItem: Branch,
  attrs: Record<string, string>, {
    values = {},
    texts = {},
    langs = {},
    filters = {},
    pureValues = [],
    pureDatas = [],
    titles = [],
    formulaDisplayMode,
  }: HandleDisplayDataOptions,
): DisplayDataContainer<Branch> {
  const { t } = Grimoire.i18n

  const helper = computedBranchHelper(branchItem, [
    ...Object.keys(values).map(key => branchItem.prop(key)),
    ...Object.keys(texts).map(key => branchItem.prop(key)),
    ...pureValues.map(key => branchItem.prop(key)),
    ...branchItem.stats.map(stat => stat.value),
  ], formulaDisplayMode)

  formulaDisplayMode = helper.formulaDisplayMode

  Object.entries(filters).forEach(([key, value]) => {
    const attrValue = attrs[key]
    if (typeof value === 'function') {
      value = { validation: value }
    }
    const { validation, calc = false } = value
    const validatedValue = calc ? computeBranchValue(attrValue, helper) : attrValue
    if (!validation(validatedValue)) {
      delete attrs[key]
      delete values[key]
      delete langs[key]
      delete texts[key]
      const idxTitle = titles.indexOf(key)
      idxTitle > -1 && titles.splice(idxTitle, 1)
      const idxPureValues = pureValues.indexOf(key)
      idxPureValues > -1 && pureValues.splice(idxPureValues, 1)
    }
  })

  const valueDatas = handleBranchValueProps(helper, attrs, values)
  const textDatas = handleBranchTextProps(helper, attrs, texts)
  const langDatas = handleBranchLangProps(branchItem, helper, attrs, langs)
  const statDatas = handleBranchStats(helper, branchItem.stats)

  const result = {} as SkillDisplayData

  const handleContainerFormulaValue = (container: ResultContainerBase) => {
    container.handle(value => {
      return value
        .replace(FORMULA_VALUE_TO_PERCENTAGE_PATTERN, (match, p1, p2, p3) => p1 + p2 + numberStringToPercentage(p3))
        .replace(MUL_PATTERN, '×')
    })
    container.handle(value => value.replace(FORMULA_FLOAT_TO_FIXED, (match, m1, m2) => m1 + m2.slice(0, 4)))
    container.handle(trimFloatStringZero)
  }

  const handlePropHistoryHighlight = branchItem.parent instanceof SkillEffectItemHistory ?
    (key: string, value: string) => {
      const searchKeys = ['overwrite', 'append', 'remove'] as const
      if (searchKeys.some(searchKey => branchItem.record.props[searchKey].includes(key) || branchItem.historyRecord?.props[searchKey].includes(key))) {
        return `<span class="history-compare--mark">${value}</span>`
      }
      return value
    } :
    (key: string, value: string) => value

  const handleStatHistoryHighlight = branchItem.parent instanceof SkillEffectItemHistory ?
    (stat: StatComputed, value: string) => {
      const searchKeys = ['overwrite', 'append', 'remove'] as const
      const _find = (target: SkillBranchItemOverwriteRecords | null) => searchKeys
        .some(searchKey => target?.stats[searchKey].some(([baseId, type]) => stat.baseId === baseId && stat.type === type))
      if (_find(branchItem.record) || _find(branchItem.historyRecord)) {
        return `<span class="history-compare--mark">${value}</span>`
      }
      return value
    } :
    (stat: StatComputed, value: string) => value

  Object.entries(valueDatas).forEach(([key, container]) => {
    handleContainerFormulaValue(container)

    let str = container.result
    str = handleFunctionHighlight(str)
    str = handlePropHistoryHighlight(key, str)

    result[key] = str
  })

  const handleTextResult = (str: string) => {
    str = str.replace(/\(\(((?:(?!\(\().)+)\)\)/g, (match, m1) => `<span class="cy--text-separate border-light-3">${m1}</span>`)
    str = createTagButtons(str)
    return str
  }

  Object.entries(textDatas).forEach(([key, container]) => {
    handleContainerFormulaValue(container)

    let str = handleTextResult(container.result)

    const handleReplaceLabel = (attrKey: string) => {
      const labels = branchItem.prop(attrKey).split(/\s*,\s*/).filter(item => item)
      labels.forEach((label, idx) => {
        str = str.replace(new RegExp(label, 'g'), () => `__HANDLE_REPLACE_LABEL_${idx}__`)
      })
      labels.forEach((label, idx) => {
        let firstFlag = true
        str = str.replace(new RegExp(`__HANDLE_REPLACE_LABEL_${idx}__`, 'g'), () => {
          const className = firstFlag ? `click-button--${attrKey}` : 'text-light-3'
          firstFlag = false
          return `<span class="${className}">${label}</span>`
        })
      })
    }
    handleReplaceLabel('mark')
    handleReplaceLabel('branch')
    handleReplaceLabel('skill')

    str = handleFunctionHighlight(str)

    str = handlePropHistoryHighlight(key, str)

    result[key] = str
  })

  Object.entries(langDatas).forEach(([key, container]) => {
    let str = container.result
    str = handlePropHistoryHighlight(key, str)
    result[key] = str
  })

  statDatas.forEach(container => {
    handleContainerFormulaValue(container)
    container.handle(value => handleStatHistoryHighlight(container.stat, value))
    container.handle(value => handleFunctionHighlight(value))

    const sign = isNumberString(container.value) && parseFloat(container.value) < 0 ? '' : '+'
    const showData = container.stat.getShowData()
    const title = container.displayTitle ? handleTextResult(container.displayTitle) : showData.title
    container.handle(value => title + sign + value)
  })

  titles.forEach(key => {
    result[key + ': title'] = t(`skill-query.branch.${branchItem.name}.${key}: title`)
  })

  const containers = {
    ...valueDatas,
    ...textDatas,
    ...langDatas,
  }

  pureValues.forEach(key => {
    const value = computeBranchValue(attrs[key], helper)
    const container = new ResultContainer(key, attrs[key], value)

    if (formulaDisplayMode === FormulaDisplayModes.OriginalFormula) {
      handleContainerFormulaValue(container)
    }

    let str = container.result
    str = handleFunctionHighlight(str)

    containers[key] = container
    result[key] = str
  })

  pureDatas.forEach(key => {
    const value = attrs[key]
    if (value === undefined) {
      return
    }
    result[key] = value
    containers[key] = new ResultContainer(key, value, value)
  })

  return new DisplayDataContainer({
    branchItem,
    containers,
    value: result,
    statContainers: statDatas,
  })
}

export {
  cloneBranchProps,
  handleDisplayData,
}
export type {
  HandleDisplayDataOptionFilters,
  HandleBranchLangPropsMap,
  SkillDisplayData,
}

