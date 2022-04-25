import { SkillBranchItemBaseChilds } from '@/lib/Skill/SkillComputingContainer'

import { cloneBranchProps, handleDisplayData } from './utils'
import type { HandleBranchLangAttrsMap } from './utils'
import MapContainer from './utils/MapContainer'

export default function ProrationHandler<BranchItem extends SkillBranchItemBaseChilds>(branchItem: BranchItem) {
  const props = cloneBranchProps(branchItem)
  if (props['proration'] === 'auto') {
    props['proration'] = props['damage']
  }
  const langAttrsMap = new MapContainer<HandleBranchLangAttrsMap>(['damage', 'proration'])
  const titles = ['damage', 'proration']

  return handleDisplayData(branchItem, props, {
    langs: langAttrsMap.value,
    titles,
  })
}
