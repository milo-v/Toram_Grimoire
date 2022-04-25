import Grimoire from '@/shared/Grimoire'

import { SkillBranchItem } from '@/lib/Skill/SkillComputingContainer'
import type { HandleBranchTextPropsMap } from '@/lib/Skill/SkillComputingContainer/compute'

import { cloneBranchProps, handleDisplayData, HandleDisplayDataOptionFilters } from './utils'
import MapContainer from './utils/MapContainer'

export default function PassiveHandler<BranchItem extends SkillBranchItem>(branchItem: BranchItem) {
  const { t } = Grimoire.i18n

  const props = cloneBranchProps(branchItem, {
    name: t('skill-query.branch.passive.base-name'),
  })

  const filters = new MapContainer<HandleDisplayDataOptionFilters>({
    caption: value => !!value,
  })

  const textPropsMap = new MapContainer<HandleBranchTextPropsMap>(['caption'])

  const pureDatas = ['name']

  return handleDisplayData(branchItem, props, {
    texts: textPropsMap.value,
    filters: filters.value,
    pureDatas,
  })
}
