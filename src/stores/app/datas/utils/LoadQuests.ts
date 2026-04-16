import QuestSystem from '@/lib/Quest'
import { MainQuestChapter, MainQuestSection } from '@/lib/Quest/Quest'
import { QuestItemType } from '@/lib/Quest/Quest/enums'

import type { QuestData } from '@/data/types/quest'

type HandleQuestItemCallback = (type: QuestItemType, name: string, quantity: number) => void

function handleQuestItem(data: string, cb: HandleQuestItemCallback) {
  const lines = data.split('\n')
  let currentType: QuestItemType = QuestItemType.Item
  const submitTypes: QuestItemType[] = [QuestItemType.Mob, QuestItemType.Item]
  lines.forEach(line => {
    if (!line) return
    let currentLine = line
    const submitTypeCheck = submitTypes.find(type => currentLine.startsWith(`${type}:`))
    if (submitTypeCheck) {
      currentType = submitTypeCheck
      currentLine = currentLine.replace(`${submitTypeCheck}:`, '').trim()
    }
    if (!currentLine) return
    const [name, quantity] = currentLine.split('#')
    if (name) cb(currentType, name, parseInt(quantity) || 0)
  })
}

export function LoadQuests(questSystem: QuestSystem, data: QuestData) {
  data.chapters.forEach(ch => {
    questSystem.appendMainQuestChapter(new MainQuestChapter(ch.id, ch.name))
  })

  data.sections.forEach((sec, index) => {
    const quest = new MainQuestSection(index, sec.chapter, sec.section, sec.name, sec.exp)
    if (sec.skippable) {
      quest.setSkippableExp(sec.skippable.name, sec.skippable.exp)
    }
    handleQuestItem(sec.submit, (type, name, qty) => quest.appendSubmitItem(type, name, qty))
    handleQuestItem(sec.reward, (type, name, qty) => quest.appendRewardItem(type, name, qty))
    quest.appendCaption(sec.caption)
    questSystem.appendMainQuestSection(quest)
  })
}
