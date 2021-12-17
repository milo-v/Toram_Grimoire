import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import { useStore } from 'vuex';

import { CalcItemContainer, Calculation } from '@/lib/Calculation/Damage/Calculation';

import Notify from '@/setup/Notify';
import RegisterLang from '@/setup/RegisterLang';

import { calcStructDisplay, calcStructCritical, calcStructWithoutCritical } from './consts';


const setupCalcMode = () => {
  const calcModeList = [{
    id: 'common',
    calcStruct: calcStructDisplay,
    outsideItems: ['atk/two_handed'],
  }, {
    id: 'critical',
    calcStruct: calcStructCritical,
    outsideItems: ['critical/critical_rate'],
  }];
  const currentCalcModeId = ref('common');
  const selectCalcMode = (id: string) => currentCalcModeId.value = id;
  const calcMode = computed(() => calcModeList.find(item => item.id === currentCalcModeId.value));

  return {
    calcModeList,
    calcMode,
    selectCalcMode,
  };
};

const setupCalculationStoreState = () => {
  const store = useStore();

  const calculations = computed(() => store.state['damage-calculation'].calculations as Calculation[]);
  const currentCalculation = computed(() => store.getters['damage-calculation/currentCalculation'] as Calculation);

  return {
    calculations,
    currentCalculation,
  };
};

const setupCalculationStore = () => {
  const store = useStore();
  const { lang, rootLang } = RegisterLang('Damage Calculation');
  const { notify } = Notify();

  const { calculations, currentCalculation } = setupCalculationStoreState();

  const removeCurrentCalculation = () => {
    if (calculations.value.length === 1) {
      notify(lang('tips/At least one build must be kept'));
      return;
    }
    const calculation = currentCalculation.value;
    store.commit('damage-calculation/removeCalculation', calculation);
    notify(lang('tips/Successfully removed build', [calculation.name]), {
      buttons: [{
        text: rootLang('global/recovery'),
        removeMessageAfterClick: true,
        click: () => store.commit('damage-calculation/appendCalculation', calculation),
      }],
    });
  };

  const copyCurrentCalculation = () => {
    const calculation = currentCalculation.value.copy();
    store.commit('damage-calculation/appendCalculation', calculation);
  };

  const calculationItems = computed(() => {
    return calculations.value.map((calc, index) => ({
      index,
      origin: calc,
    }));
  });

  return {
    calculations,
    currentCalculation,
    calculationItems,

    removeCurrentCalculation,
    copyCurrentCalculation,
  };
};

const setupExpectedResults = (calculation: Ref<Calculation>) => {
  const expectedResultComputedBase = [calcStructCritical, calcStructWithoutCritical]
    .map(calcStruct => ({
      id: calcStruct.id,
      result: computed(() => calculation.value.result(calcStruct)),
    }));

  const getResult = (target: string) => {
    const cr = (calculation.value.containers.get('critical/critical_rate') as CalcItemContainer).result();
    const stability = (calculation.value.containers.get('stability') as CalcItemContainer).getItemValue('stability');
    const stabilityValue = (() => {
      if (target === 'min') {
        return stability;
      }
      if (target === 'grazeMin') {
        return Math.floor(stability / 2);
      }
      return 100;
    })();
    const criticalValue = Math.floor(expectedResultComputedBase[0].result.value * stabilityValue / 100);
    const withoutCriticalValue = Math.floor(expectedResultComputedBase[1].result.value * stabilityValue / 100);
    return Math.floor((cr * criticalValue) / 100 + ((100 - cr) * withoutCriticalValue) / 100);
  };

  const expectedResultMax = computed(() => getResult('max'));
  const expectedResultMin = computed(() => getResult('min'));
  const expectedResultGrazeMin = computed(() => getResult('grazeMin'));

  const expectedResult = computed(() => {
    const max = expectedResultMax.value;
    const stability = (calculation.value.containers.get('stability') as CalcItemContainer).result();
    return Math.floor(max * stability / 100);
  });

  const stabilityResult = computed(() => ({
    min: expectedResultMin.value,
    max: expectedResultMax.value,
  }));
  const stabilityResultGraze = computed(() => ({
    min: expectedResultGrazeMin.value,
    max: expectedResultMax.value,
  }));

  return {
    expectedResult,
    stabilityResult,
    stabilityResultGraze,
  };
};

const setupResultMode = (calculation: Ref<Calculation>) => {
  const {
    expectedResult,
    stabilityResult,
    stabilityResultGraze,
  } = setupExpectedResults(calculation);

  const resultModeId = ref('expected');

  const selectResultMode = (modeId: string) => {
    resultModeId.value = modeId;
  };

  const resultModeList = computed(() => {
    return [{
      id: 'stability',
      icon: 'tabler:angle',
      value: stabilityResult.value,
    }, {
      id: 'stability: with graze',
      icon: 'tabler:angle',
      value: stabilityResultGraze.value,
    }, {
      id: 'expected',
      icon: 'ant-design:star-outlined',
      value: expectedResult.value,
    }];
  });
  const resultMode = computed(() => resultModeList.value.find(item => item.id === resultModeId.value));

  return {
    resultMode,
    resultModeList,
    selectResultMode,
  };
};

const setupCalculationCalcOptions = (calculation: Ref<Calculation>) => {
  const options = [{
    containerId: 'damage_type',
  }];

  const calculationContainerOptions = computed(() => {
    return options.map(item => {
      const container = calculation.value.containers.get(item.containerId) as CalcItemContainer;
      return {
        container,
        containerItems: Array.from(container.items.values()),
      };
    });
  });

  return {
    calculationContainerOptions,
  };
};

export {
  setupCalcMode,
  setupCalculationStoreState,
  setupCalculationStore,
  setupExpectedResults,
  setupResultMode,
  setupCalculationCalcOptions,
};
