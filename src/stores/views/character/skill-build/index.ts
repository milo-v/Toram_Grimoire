import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Ref, ComputedRef } from 'vue'

import Grimoire from '@/shared/Grimoire'

import { SkillBuild } from './SkillBuild'

export const useCharacterSkillBuildStore = defineStore('view-character-skill-build', () => {
  const skillBuilds: Ref<SkillBuild[]> = ref([])
  const currentSkillBuildIndex = ref(-1)

  const currentSkillBuild: ComputedRef<SkillBuild | null> = computed(() => skillBuilds.value[currentSkillBuildIndex.value] ?? null)

  const setCurrentSkillBuild = (idx: number) => {
    currentSkillBuildIndex.value = idx
  }

  const createSkillBuild = () => {
    const newBuild = new SkillBuild(Grimoire.i18n.t('skill-simulator.skill-build') + ' ' + (skillBuilds.value.length + 1))
    skillBuilds.value.push(newBuild)
    currentSkillBuildIndex.value = skillBuilds.value.length - 1
    return newBuild
  }

  const appendSkillBuild = (build: SkillBuild) => {
    skillBuilds.value.push(build)
    currentSkillBuildIndex.value = skillBuilds.value.length - 1
  }

  const copyCurrentSkillBuild = () => {
    if (!currentSkillBuild.value) {
      return
    }
    appendSkillBuild(currentSkillBuild.value.clone())
  }

  const removeCurrentSkillBuild = () => {
    skillBuilds.value.splice(currentSkillBuildIndex.value, 1)
    currentSkillBuildIndex.value = Math.max(0, currentSkillBuildIndex.value - 1)
  }

  const saveSkillBuilds = () => {
    return skillBuilds.value.map(build => build.save())
  }

  return {
    skillBuilds,
    currentSkillBuildIndex,
    currentSkillBuild,
    setCurrentSkillBuild,
    createSkillBuild,
    copyCurrentSkillBuild,
    removeCurrentSkillBuild,
    appendSkillBuild,
    saveSkillBuilds,
  }
})
