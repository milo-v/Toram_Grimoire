import { MessageNotifyOptions } from '@/shared/services/Notify';

import loading from './loading.js';

const modules = {
  loading,
};

const storeState = {
  messages: [],
  idCounter: 0,
};

const mutations = {
  appendMessage(state, msg) {
    state.messages.push(msg);
  },
  removeMessage(state, msg) {
    const msgs = state.messages;
    const idx = msgs.indexOf(msg);
    if (idx != -1)
      msgs.splice(idx, 1);
  },
  increaseMessageCounter(state, msg) {
    msg.counter += 1;
    msg.removeTime += 2;
  },
};

/**
 * @typedef CreateMessageParams
 * @type {Object}
 * @property {string} [icon] - icon ID of iconify
 * @property {string} message - main message
 * @property {string} [id] - ID of message, messages with the same ID will not be displayed at the same time
 * @property {MessageNotifyOptions} options
 */

const actions = {
  /**
   * @param {Object} context
   * @param {CreateMessageParams} params
   */
  createMessage({ state, commit }, { icon, message, id, options }) {
    const find = id !== null ? state.messages.find(p => p.id !== null && p.id === id) : null;
    if (!find) {
      if (options.buttons) {
        options.buttons.forEach((p, i) => p.iid = i);
      }
      const msg = {
        icon,
        message,
        id,
        options,
        counter: 1,
        removeTime: 4,
        iid: state.idCounter,
      };
      state.idCounter += 1;
      const timer = setInterval(() => {
        msg.removeTime -= 1;
        if (msg.removeTime <= 0) {
          commit('removeMessage', msg);
          clearInterval(timer);
        }
      }, 1000);

      commit('appendMessage', msg);
    }
    else {
      commit('increaseMessageCounter', find);
    }
  },
};

export default {
  namespaced: true,
  state: storeState,
  mutations,
  actions,
  modules,
};
