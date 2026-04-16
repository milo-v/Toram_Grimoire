export interface QuestChapter {
  id: number
  name: string
}

export interface QuestSection {
  chapter: number
  section: number
  name: string
  exp: number
  skippable?: { name: string; exp: number }
  submit: string
  reward: string
  caption: string
}

export interface QuestData {
  chapters: QuestChapter[]
  sections: QuestSection[]
}
