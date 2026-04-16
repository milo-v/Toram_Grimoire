export interface RegistletRow {
  type: string
  value: string
}

export interface RegistletItem {
  id: string
  name: string
  obtainLevels: number[]
  maxLevel: number
  powderCost: number
  powderCostAdditional: number
  link: string
  rows: RegistletRow[]
}

export interface RegistletGroup {
  groupId: string
  items: RegistletItem[]
}

export interface RegistletCategory {
  id: string
  groups: RegistletGroup[]
}

export interface RegistletData {
  skillCategory: RegistletCategory
  statCategory: RegistletCategory
  specialCategory: RegistletCategory
}
