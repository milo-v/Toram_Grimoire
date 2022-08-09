
import { DatasStoreBase } from '@/stores/app/datas'
import { I18nStore } from '@/stores/app/language'

const Grimoire = {
  get Character() {
    return DatasStoreBase.Character!
  },

  get Items() {
    return DatasStoreBase.Items!
  },

  get Skill() {
    return DatasStoreBase.Skill!
  },

  get Glossary() {
    return DatasStoreBase.Glossary!
  },

  get Enchant() {
    return DatasStoreBase.Enchant!
  },

  get DamageCalculation() {
    return DatasStoreBase.DamageCalculation!
  },

  get i18n() {
    return I18nStore.i18n!
  },
}

export default Grimoire
