import ItemsSystem from '@/lib/Items'
import { BagCrystal, type BagItemObtain } from '@/lib/Items/BagItem'

import type { CrystalData } from '@/data/types/crystal'
import { parseStatValueData } from './utils'

export function LoadCrystals(root: ItemsSystem, data: CrystalData) {
  data.forEach(entry => {
    try {
      const crystal = root.appendCrystal(entry.name, entry.type, entry.bossType)

      entry.stats.forEach(stat => {
        const { value, type } = parseStatValueData(stat.value1)
        crystal.appendStat(stat.name, value, type, stat.value2)
      })

      entry.obtains.forEach(obtainData => {
        const obtain = crystal.appendObtain()
        Object.assign(obtain, obtainData)
      })

      if (entry.enhancer) {
        crystal.setEnhancer(entry.enhancer)
      }
    } catch (error) {
      console.warn('[LoadCrystals] unknown error', entry, error)
    }
  })
}
