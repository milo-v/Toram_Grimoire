import type { SkillBuildSaveData } from './SkillBuild'
import { SkillBuild } from './SkillBuild'

export function encodeSkillBuild(build: SkillBuild): string {
  const json = JSON.stringify(build.save())
  return btoa(unescape(encodeURIComponent(json)))
}

export function decodeSkillBuild(encoded: string): SkillBuildSaveData | null {
  try {
    const json = decodeURIComponent(escape(atob(encoded)))
    const data = JSON.parse(json)
    if (
      typeof data.name === 'string' &&
      Array.isArray(data.skillStates) &&
      Array.isArray(data.selectedSkillTrees)
    ) {
      return data as SkillBuildSaveData
    }
    return null
  } catch {
    return null
  }
}
