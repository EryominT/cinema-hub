export default {
  namespaced: true,
  state: {
    isOpen: false,
    headerText: '',
    bodyText: '',
    videoInfo: {},
  },
  getters: {
    isOpen (state: any) {
      return state.isOpen;
    },
    headerText (state: any) {
      return state.headerText;
    },
    bodyText (state: any) {
      return state.bodyText;
    },
    videoInfo (state: any) {
      return state.videoInfo;
    },
  },
  mutations: {
    openDialog (state: any, { data }: any) {
      state.isOpen = true;
      state.videoInfo = data;
    },
    closeDialog (state: any) {
      state.isOpen = false;
    },
  },
  actions: {},
};
