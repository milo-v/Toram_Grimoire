import { handleFormula } from '@/shared/utils/data'

import { EquipmentTypes } from '@/lib/Character/CharacterEquipment/enums'

import { SkillBranch, SkillEffect, SkillEffectAttrs } from '../Skill'
import { SkillBranchItem, SkillEffectItem, SkillEffectItemHistory } from './index'
import type { SkillEffectItemBase, EquipmentRestriction, BranchGroupState, BranchStackState } from './index'
import { BRANCH_ATTRS_DEFAULT_VALUE, EQUIPMENT_TYPE_MAIN_ORDER, EQUIPMENT_TYPE_SUB_ORDER, EQUIPMENT_TYPE_BODY_ORDER } from './consts'
import { SkillBranchNames } from '../Skill/enums'

function effectOverwrite(to: SkillEffectItem, from: SkillEffect) {
  const fromBranches = from.branches.slice()
  if (!fromBranches.some(bch => bch.name === SkillBranchNames.Basic)) {
    fromBranches.unshift(effectAttrsToBranch(from))
  }
  branchesOverwrite(to.branchItems, fromBranches, fromBranch => fromBranch.name === '' && fromBranch.isEmpty)
}

function effectAttrsToBranch(origin: SkillEffect) {
  const CONVERT_LIST: Record<string, (value: string) => string> = {
    'mp_cost': value => value,
    'range': value => value === '-' ? 'no_limit' : value,
    'skill_type': value => ['instant', 'casting', 'charging', 'passive', 'extra'][parseInt(value, 10)],
    'in_combo': value => ['1', '0', 'not_lead'][parseInt(value, 10)],
    'action_time': value => ['very_slow', 'slow', 'little_slow', 'normal', 'little_fast', 'fast', 'very_fast'][parseInt(value, 10)],
    'casting_time': value => value,
  }
  const branch = new SkillBranch(origin, 139, SkillBranchNames.Basic);
  (Object.entries(origin.attributes) as ([keyof SkillEffectAttrs, string | number])[]).forEach(([key, value]) => {
    if (value !== null) {
      const attrKey = key.replace(/[A-Z]/g, char => '_' + char.toLowerCase())
      const handle = CONVERT_LIST[attrKey]
      const res = handle ? handle(value.toString()) : value.toString()
      branch.appendBranchAttribute(attrKey, res)
    }
  })
  return branch
}

function branchesOverwrite<Branch extends SkillBranch | SkillBranchItem>(to: SkillBranchItem[], from: Branch[], isEmpty: (branch: Branch) => boolean) {
  /**
   * If some fromBranch.name === '' && fromBranch.isEmpty`.
   * Remove branch which id` is same as fromBranch in toBranches.`
   */
  from.forEach(fromBranch => {
    if (fromBranch.id === -1) {
      return
    }
    const idx = to.findIndex(bch => bch.id === fromBranch.id)
    if (idx === -1) {
      return
    }
    if (isEmpty(fromBranch)) {
      to.splice(idx, 1)
      return
    }

    const toBranch = to[idx]
    branchOverwrite(toBranch, fromBranch)
  })
}

function branchOverwrite(to: SkillBranchItem, from: SkillBranch | SkillBranchItem) {
  // 如果 branch.id 一樣但 branch.name 不一樣，先清空所有屬性。
  // branch.name 為空值時，默認兩者同名。
  if (from.name !== SkillBranchNames.None && to.name !== from.name) {
    to.name = from.name
    to.clearAttr()
  }

  Object.entries(from instanceof SkillBranch ? from.branchAttributes : from.allAttrs).forEach(([key, value]) => {
    if (value === '' && to.attr(key)) {
      to.removeAttr(key)
      to.record.attrs.remove.push(key)
    } else {
      if (to.hasAttr(key)) {
        to.record.attrs.overwrite.push(key)
      } else {
        to.record.attrs.append.push(key)
      }
      to.setAttr(key, value)
    }
  })

  from.stats.forEach(stat => {
    const idx = to.stats.findIndex(_stat => stat.equals(_stat))
    const findedStat = to.stats[idx]
    if (idx === -1) {
      to.stats.push(stat.clone())
      to.record.stats.append.push([stat.baseName, stat.type])
    } else {
      if (stat.value === '') {
        to.stats.splice(idx, 1)
        to.record.stats.remove.push([stat.baseName, stat.type])
      } else {
        findedStat.value = stat.value
        to.record.stats.overwrite.push([stat.baseName, stat.type])
      }
    }
  })
}

/**
 * Convert equipment data of skill to array of EquipmentRestriction
 * @param main - id of skill data of main weapon
 * @param sub - id of skill data of sub weapon
 * @param body - id of skill data of body armor
 * @param operator - 1: and, 0: or\
 * @param dualSwordRegress - if true, it will create EquipmentRestriction for dual-sword when main is one-hand-sword
 */
function convertEffectEquipment(main: number, sub: number, body: number, operator: 0 | 1, dualSwordRegress: boolean = false): EquipmentRestriction[] {
  if (main === -1 && sub === -1 && body === -1) {
    return [{
      main: null,
      sub: null,
      body: null,
    }]
  }
  const results: Map<string, EquipmentRestriction> = new Map()
  const appendResult = (data: EquipmentRestriction) => {
    const list = [data.main, data.sub, data.body]
    if (list.every(value => value === null)) {
      return
    }
    const key = list.map(value => value === null ? '-' : value).join('|')
    results.set(key, data)
  }

  const mainData = {
    main: main === -1 ? null : EQUIPMENT_TYPE_MAIN_ORDER[main],
    sub: null,
    body: null,
  }
  if (dualSwordRegress && EQUIPMENT_TYPE_MAIN_ORDER[main] === EquipmentTypes.OneHandSword) {
    appendResult({
      main: EquipmentTypes.DualSword,
      sub: null,
      body: null,
    })
  }
  const firstResult: EquipmentRestriction = mainData
  appendResult(mainData)

  const subItem = sub === -1 ? null : EQUIPMENT_TYPE_SUB_ORDER[sub]
  if (operator === 1) {
    firstResult.sub = subItem
  } else {
    appendResult({
      main: null,
      sub: subItem,
      body: null,
    })
  }

  const bodyItem = body === -1 ? null : EQUIPMENT_TYPE_BODY_ORDER[body]
  if (operator === 1) {
    firstResult.body = bodyItem
  } else {
    appendResult({
      main: null,
      sub: null,
      body: bodyItem,
    })
  }

  return Array.from(results.values())
}

function separateSuffixBranches(effectItem: SkillEffectItemBase) {
  type SuffixBranchListKey = SkillBranchNames | '@global'
  const suffixBranchList = {
    [SkillBranchNames.Damage]: [SkillBranchNames.Extra, SkillBranchNames.Proration, SkillBranchNames.Base],
    [SkillBranchNames.Effect]: [SkillBranchNames.Extra],
    [SkillBranchNames.Passive]: [SkillBranchNames.Extra],
    [SkillBranchNames.Heal]: [SkillBranchNames.Extra],
    [SkillBranchNames.List]: [SkillBranchNames.List],
    '@global': [SkillBranchNames.FormulaExtra, SkillBranchNames.Group],
  } as Record<SuffixBranchListKey, SkillBranchNames[]>

  const searchSuffixList = (current: SkillBranchItem, bch: SkillBranchItem) => {
    return ([current.name, '@global'] as SuffixBranchListKey[]).find(name => {
      const suffixList = suffixBranchList[name]
      return suffixList && suffixList.find(item => item === bch.name)
    })
  }

  const mainBranchNameList = [
    SkillBranchNames.Damage,
    SkillBranchNames.Effect,
    SkillBranchNames.Proration,
    SkillBranchNames.List,
    SkillBranchNames.Passive,
    SkillBranchNames.Heal,
    SkillBranchNames.Text,
    SkillBranchNames.Tips,
    SkillBranchNames.Stack,
    SkillBranchNames.Reference,
    SkillBranchNames.Import,
    SkillBranchNames.Basic,
  ]
  const isMainBranch = (_bch: SkillBranchItem) => mainBranchNameList.includes(_bch.name)
  const resBranches: SkillBranchItem[] = []
  let spaceFlag = false

  effectItem.branchItems.forEach(branchItem => {
    if (branchItem.name === SkillBranchNames.Space) {
      spaceFlag = true
      return
    }

    const mainBranch = resBranches.length !== 0 ? resBranches[resBranches.length - 1] : null

    if (!mainBranch && isMainBranch(branchItem)) {
      resBranches.push(branchItem)
      return
    }
    if (mainBranch && !spaceFlag && searchSuffixList(mainBranch, branchItem)) {
      mainBranch.suffixBranches.push(branchItem.toSuffix(mainBranch))
      // if (effectItem instanceof SkillEffectItemHistory) {
      //   if (effectItem.nexts.has(branchItem)) {
      //     const next = effectItem.parentEffect.branchItems.find(bch => bch.suffixBranches.some(suf => suf.id === branchItem.id));
      //     if (next) {
      //       const newNext = next.clone(effectItem);
      //       effectItem.nexts.set(mainBranch, newNext);
      //     }
      //     effectItem.nexts.delete(branchItem);
      //   }
      // }
    } else if (isMainBranch(branchItem)) {
      resBranches.push(branchItem)
      spaceFlag = false
    }
  })

  effectItem.branchItems.splice(0, effectItem.branchItems.length, ...resBranches)
}

function handleVirtualBranches(effectItem: SkillEffectItemBase) {
  const newBranchItems = effectItem.branchItems.filter(branchItem => {
    const filtered = branchItem.suffixBranches.filter(suffix => {
      if (suffix.name === SkillBranchNames.Group) {
        const groupState: BranchGroupState = {
          size: parseInt(suffix.attr('size'), 10),
          expandable: suffix.attr('expandable') === '1',
          expanded: suffix.attr('expansion_default') === '1',
          parentExpanded: true,
          isGroupEnd: false,
        }
        branchItem.groupState = groupState
        return false
      }
      return true
    })

    branchItem.suffixBranches.splice(0, branchItem.suffixBranches.length, ...filtered)

    return true
  })
  effectItem.branchItems.splice(0, effectItem.branchItems.length, ...newBranchItems)
}

function initStackStates(effectItem: SkillEffectItemBase) {
  const vars = {
    slv: effectItem.parent.parent.vars.skillLevel,
    clv: effectItem.parent.parent.vars.characterLevel,
  }
  const stackStates: BranchStackState[] = effectItem.branchItems
    .filter(branchItem => branchItem.name === SkillBranchNames.Stack)
    .map(branchItem => {
      return {
        stackId: branchItem.stackId as number,
        branch: branchItem,
        value: handleFormula(branchItem.attr('default') === 'auto' ? branchItem.attr('min') : branchItem.attr('default'), {
          vars: {
            'SLv': vars.slv,
            'CLv': vars.clv,
          },
          toNumber: true,
        }) as number,
      }
    })
  effectItem.stackStates.splice(0, effectItem.stackStates.length, ...stackStates)
}

function regressHistoryBranches(effectItem: SkillEffectItem) {
  // 日期新的擺前面
  effectItem.historys.sort((item1, item2) => new Date(item1.date) <= new Date(item2.date) ? 1 : -1)
  effectItem.historys.forEach((history, idx, ary) => {
    const nextEffect = idx === 0 ? effectItem : ary[idx - 1]
    const toBranches = nextEffect.branchItems.map(bch => bch.clone(history))
    const fromBranches = history.branchItems
    let meetFirstBranchHasId = false
    fromBranches.forEach((historyBch) => {
      if (historyBch.id === -1) {
        if (meetFirstBranchHasId) {
          history.removedBranches.push(historyBch)
          toBranches.push(historyBch)
        } else {
          history.introductionBranches.push(historyBch)
          toBranches.unshift(historyBch)
        }
        return
      }
      meetFirstBranchHasId = true
      history.nextEffect = nextEffect
      // const next = (nextEffect.branchItems as SkillBranchItem[]).find(bch => bch.id === historyBch.id);
      // const current = toBranches.find(bch => bch.id === historyBch.id);
      // if (current && next) {
      //   history.nexts.set(current, next.clone(history));
      // }
    })
    branchesOverwrite(toBranches, fromBranches, fromBranch => fromBranch.name === '' && fromBranch.isEmpty)
    history.branchItems.splice(0, history.branchItems.length, ...toBranches)
  })
}

function initHistoryNexts(history: SkillEffectItemHistory) {
  history.modifiedBranchItems.forEach(branchItem => {
    const next = branchItem.id !== -1 ?
      history.nextEffect.branchItems.find(bch => branchItem.id === bch.id) :
      history.nextEffect.branchItems.find(bch => bch.suffixBranches.some(suf => branchItem.suffixBranches.some(_suf => suf.id === _suf.id)))
    if (next) {
      const nextClone = next.clone(history)
      nextClone.setHistoryRecord(branchItem.record)
      nextClone.suffixBranches.forEach(suffix => {
        const find = branchItem.suffixBranches.find(suf => suf.id === suffix.id)
        if (find) {
          suffix.setHistoryRecord(find.record)
        }
      })
      history.nexts.set(branchItem, nextClone)
    }
  })
}

function setBranchAttrsDefaultValue(effectItem: SkillEffectItem) {
  effectItem.branchItems.forEach(branchItem => {
    const defaultValueList = BRANCH_ATTRS_DEFAULT_VALUE[branchItem.name] || {}
    Object.entries(defaultValueList).forEach(([key, value]) => {
      if (!branchItem.hasAttr(key)) {
        branchItem.setAttr(key, value)
      }
    })
  })
}

export {
  convertEffectEquipment,
  effectOverwrite,
  effectAttrsToBranch,
  separateSuffixBranches,
  handleVirtualBranches,
  initStackStates,
  regressHistoryBranches,
  initHistoryNexts,
  setBranchAttrsDefaultValue,
}
