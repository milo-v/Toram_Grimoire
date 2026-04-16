import EnchantSystem from '@/lib/Enchant'
import {
  EnchantCategory,
  EnchantItem,
  EnchantItemConditions,
  type MaterialPointTypeRange,
} from '@/lib/Enchant/Enchant'

import type { EnchantData } from '@/data/types/enchant'

const CONDITION_LIST = ['主手武器', '身體裝備', '原有屬性']

export function LoadEnchant(root: EnchantSystem, data: EnchantData) {
  data.forEach(categoryEntry => {
    const category = root.appendCategory(categoryEntry.title)
    if (categoryEntry.weaponOnly) {
      category.setWeaponOnly()
    }

    categoryEntry.items.forEach(itemEntry => {
      const item = category.appendItem({
        baseId: itemEntry.statId,
        potential: itemEntry.potential,
        limit: itemEntry.limit,
        extraLimit: itemEntry.extraLimit,
        unitValue: itemEntry.unitValue,
        materialPointType: itemEntry.materialPointType as MaterialPointTypeRange,
        materialPointValue: itemEntry.materialPointValue,
        potentialConvertThreshold: itemEntry.potentialConvertThreshold,
      })

      itemEntry.conditionals.forEach(cond => {
        const condId = CONDITION_LIST.indexOf(cond.condition)
        if (condId === -1) return
        const condEnum = [
          EnchantItemConditions.MainWeapon,
          EnchantItemConditions.BodyArmor,
          EnchantItemConditions.OriginalElement,
        ][condId]
        item.appendConditionalProps(condEnum, { potential: cond.potential })
      })
    })
  })
}
