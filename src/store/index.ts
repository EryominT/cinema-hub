import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import auth from './modules/auth';
import cinema from './modules/cinema';
import info from '@/store/modules/info';
import alerts from '@/store/modules/alerts';
import dialog from '@/store/modules/dialog';
import userData from '@/store/modules/user';
import { addResponseHandler } from '@/api/http';

export interface State {
  error: any,
  loadedPage: boolean,
}

export const key: InjectionKey<Store<State>> = Symbol('injection Key');

export const store = createStore<State>({
  state: {
    error: null,
    loadedPage: false,
  },
  getters: {
    loadingPage (state) {
      return state.loadedPage;
    },
  },
  mutations: {
    loadedPageSet (state, value) {
      state.loadedPage = value;
    },
  },
  actions: {},
  modules: {
    auth,
    cinema,
    info,
    alerts,
    userData,
    dialog,
  },
});

addResponseHandler(
function (response: any) {
    if ('errorAlert' in response.config) {
      response.data = { res: true, data: response.data };
    }

    return response;
  },
  function (error: any) {
    const config = error.config;

    if ('errorAlert' in config) {
      let { errorAlert } = config;

      if (typeof errorAlert === 'string') {
        errorAlert = { text: errorAlert };
      }

      store.dispatch('alerts/add', {
        text: 'Ошибка ответа от сервера ' + errorAlert.text,
        timeout: errorAlert.timeout ?? 5000,
        critical: errorAlert.critical ?? false,
      });

      return { data: { res: false, data: null } };
    }

    return Promise.reject(error);
  },
);
