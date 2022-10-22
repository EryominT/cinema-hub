export default {
  namespaced: true,
  state: {
    messages: [],
    lastAI: 0,
  },
  getters: {
    all: (state: any) => state.messages,
  },
  mutations: {
    add (state: any, { text, critical }: any) {
      state.messages.push({ id: ++state.lastAI, text, critical });
    },
    remove (state: any, { id }: any) {
      state.messages = state.messages.filter((msg: any) => msg.id !== id);
    },
  },
  actions: {
    add ({ commit, state }: any, { text, timeout, critical }: any) {
      commit('add', { text, critical });
      const { lastAI } = state;

      if (!critical) {
        setTimeout(() => {
          commit('remove', { id: lastAI });
        }, timeout);
      }
    },
  },
};
