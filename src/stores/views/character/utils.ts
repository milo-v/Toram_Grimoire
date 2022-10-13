import { Character } from '@/lib/Character/Character'
import { EquipmentFieldTypes } from '@/lib/Character/Character/enums'
import { EquipmentTypes } from '@/lib/Character/CharacterEquipment/enums'
import { StatRestriction } from '@/lib/Character/Stat'
import { EnemyElements } from '@/lib/Enemy/enums'

export function checkStatRestriction(
  chara: Character,
  stat: StatRestriction
): boolean {
  const types = stat.restriction
  if (!types) {
    return true
  }
  if (
    (['main', 'sub', 'body', 'other'] as const).every(
      key => types[key] === null
    )
  ) {
    return true
  }
  return (
    !!types.other ||
    (types.main !== null &&
      chara.checkFieldEquipmentType(
        EquipmentFieldTypes.MainWeapon,
        types.main
      )) ||
    (types.sub !== null &&
      chara.checkFieldEquipmentType(
        EquipmentFieldTypes.SubWeapon,
        types.sub
      )) ||
    (types.body !== null &&
      chara.checkFieldEquipmentType(EquipmentFieldTypes.BodyArmor, types.body))
  )
}

export function getCharacterElement(
  chara: Character
): Partial<Record<EnemyElements, number>> {
  const element: Partial<Record<EnemyElements, number>> = {
    fire: 0,
    water: 0,
    earth: 0,
    wind: 0,
    light: 0,
    dark: 0,
  }
  const setElement = (stat: StatRestriction) =>
    (element[stat.baseId.replace('element_', '') as EnemyElements] = 1)

  const sub = chara.equipmentField(EquipmentFieldTypes.SubWeapon)
  // 主手弓/弩、副手矢時，矢優先於弓
  if (
    (chara.checkFieldEquipmentType(
      EquipmentFieldTypes.MainWeapon,
      EquipmentTypes.Bow
    ) ||
      chara.checkFieldEquipmentType(
        EquipmentFieldTypes.MainWeapon,
        EquipmentTypes.Bowgun
      )) &&
    chara.checkFieldEquipmentType(
      EquipmentFieldTypes.SubWeapon,
      EquipmentTypes.Arrow
    ) &&
    sub.equipment!.elementStat
  ) {
    setElement(sub.equipment!.elementStat)
    return element
  }

  // 主手
  const main = chara.equipmentField(EquipmentFieldTypes.MainWeapon)
  if (!main.isEmpty && main.equipment!.elementStat) {
    setElement(main.equipment!.elementStat)
  }

  // 雙劍副手：雙重屬性
  if (
    chara.checkFieldEquipmentType(
      EquipmentFieldTypes.SubWeapon,
      EquipmentTypes.OneHandSword
    ) &&
    sub.equipment!.elementStat
  ) {
    setElement(sub.equipment!.elementStat)
  }
  return element
}
