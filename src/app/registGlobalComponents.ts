import type { App, FunctionalComponent } from 'vue'
import { h, mergeProps } from 'vue'

import CyButton from '@/components/global/Cyteria/button.vue'
import CyButtonAction from '@/components/global/Cyteria/cy-button/cy-button-action.vue'
import CyButtonCircle from '@/components/global/Cyteria/cy-button/cy-button-circle.vue'
import CyButtonPlain from '@/components/global/Cyteria/cy-button/cy-button-plain.vue'
import CyButtonCheck from '@/components/global/Cyteria/cy-button/cy-button-check.vue'
import CyButtonRadio from '@/components/global/Cyteria/cy-button/cy-button-radio.vue'
import CyButtonRadioGroup from '@/components/global/Cyteria/cy-button/cy-button-radio-group.vue'
import CyButtonToggle from '@/components/global/Cyteria/cy-button/cy-button-toggle.vue'
import CyDefaultTips from '@/components/global/Cyteria/default-tips.vue'
import CyDetailWindow from '@/components/global/Cyteria/detail-window.vue'
import CyHoverFloat from '@/components/global/Cyteria/hover-float.vue'
import CyHr from '@/components/global/Cyteria/hr.vue'
import CyIconText from '@/components/global/Cyteria/icon-text.vue'
import CyIcon from '@/components/global/Cyteria/icon.vue'
import CyInputCounter from '@/components/global/Cyteria/input-counter.vue'
import CyListItem from '@/components/global/Cyteria/list-item.vue'
import CyModal from '@/components/global/Cyteria/modal.vue'
import CyOptions from '@/components/global/Cyteria/options.vue'
import CyPagination from  '@/components/global/Cyteria/pagination.vue'
import CyStickyHeader from '@/components/global/Cyteria/sticky-header.vue'
import CyTitleInput from '@/components/global/Cyteria/title-input.vue'
import CyTopHeaderMenu from '@/components/global/Cyteria/top-header-menu.vue'
import CyTopHeader from '@/components/global/Cyteria/top-header.vue'
import CyPopover from '@/components/global/Cyteria/popover.vue'
import CyTransitionGroup from '@/components/global/Cyteria/transition-group.vue'
import CyTransition from '@/components/global/Cyteria/transition.vue'
import ImageIcon from '@/components/global/image-icon.vue'
import SvgIcon from '@/components/global/svg-icon.vue'

export default function (app: App<Element>) {
  app.component('cy-default-tips', CyDefaultTips)
  app.component('cy-detail-window', CyDetailWindow)
  app.component('cy-hover-float', CyHoverFloat)
  app.component('cy-hr', CyHr)
  app.component('cy-icon-text', CyIconText)
  app.component('cy-icon', CyIcon)
  app.component('cy-input-counter', CyInputCounter)
  app.component('cy-list-item', CyListItem)
  app.component('cy-modal', CyModal)
  app.component('cy-options', CyOptions)
  app.component('cy-pagination', CyPagination)
  app.component('cy-sticky-header', CyStickyHeader)
  app.component('cy-title-input', CyTitleInput)
  app.component('cy-top-header-menu', CyTopHeaderMenu)
  app.component('cy-top-header', CyTopHeader)
  app.component('cy-popover', CyPopover)
  app.component('cy-transition-group', CyTransitionGroup)
  app.component('cy-transition', CyTransition)
  app.component('image-icon', ImageIcon)
  app.component('svg-icon', SvgIcon)

  app.component('cy-button', CyButton)
  app.component('cy-button-action', CyButtonAction)
  app.component('cy-button-circle', CyButtonCircle)
  app.component('cy-button-plain', CyButtonPlain)
  app.component('cy-button-check', CyButtonCheck)
  app.component('cy-button-radio', CyButtonRadio)
  app.component('cy-button-radio-group', CyButtonRadioGroup)
  app.component('cy-button-toggle', CyButtonToggle)
  registButtonAlias(app)
}

function registButtonAlias(app: App<Element>) {
  const aliasNames = ['icon', 'line', 'drop-down', 'inline']
  aliasNames.map(name => {
    const componentFunction: FunctionalComponent = function (props, context) {
      const attrs = mergeProps({
        type: name,
      }, context.attrs)
      return h(
        CyButton,
        attrs,
        context.slots,
      )
    }
    app.component('cy-button-' + name, componentFunction)
  })
}
