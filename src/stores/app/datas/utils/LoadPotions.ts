import {
  type BagItemObtain,
  BagPotion,
  type BagPotionsRoot,
} from '@/lib/Items/BagItem'

import type { PotionData } from '@/data/types/potion'
import { parseStatValueData } from './utils'

export function LoadPotions(root: BagPotionsRoot, data: PotionData) {
  data.forEach(categoryEntry => {
    try {
      const category = root.appendCategory(categoryEntry.id, categoryEntry.name)

      categoryEntry.obtainCategories.forEach(obtainCatEntry => {
        const obtainCategory = category.appendObtainCategory(obtainCatEntry.id, obtainCatEntry.name)

        obtainCatEntry.potions.forEach(potionEntry => {
          const potion = obtainCategory.appendPotion(potionEntry.name)

          potionEntry.stats.forEach(stat => {
            const { value, type } = parseStatValueData(stat.value1)
            potion.appendStat(stat.name, value, type, stat.value2)
          })

          potionEntry.obtains.forEach(obtainData => {
            const obtain = potion.appendObtain()
            Object.assign(obtain, obtainData)
          })
        })
      })
    } catch (error) {
      console.warn('[LoadPotions] unknown error', categoryEntry, error)
    }
  })
}
