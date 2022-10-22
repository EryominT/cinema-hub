import { error } from '@/utils/error';
import { ActionContext } from 'vuex';
import { registerApi, loginApi } from "@/api/auth.api";
import { Auth } from "@/interfaces/Register.interface";

interface stateType {
  token: string | null,
  userId: string | null,
  isAuthenticated: boolean
}

const TOKEN_KEY = 'jwt-token';
const USER_ID = 'userId';

export default {
  namespaced: true,
  state () {
    return {
      token: localStorage.getItem(TOKEN_KEY),
      userId: localStorage.getItem(USER_ID),
    };
  },
  getters: {
    token (state: stateType) {
      return state.token;
    },
    isAuthenticated (state: stateType, getters: stateType) {
      return !!getters.token;
    },
    userId (state: stateType) {
      return state.userId;
    },
  },
  mutations: {
    setToken (state: stateType, token: string) {
      state.token = token;
      localStorage.setItem(TOKEN_KEY, token);
    },
    logout (state: stateType) {
      state.token = null;
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_ID);
    },
    setUserId (state: stateType, id: string) {
      state.userId = id;
      localStorage.setItem(USER_ID, id);
    },
    deleteUserId (state: stateType) {
      state.userId = null;
      localStorage.removeItem(USER_ID);
    },
  },
  actions: {
    async register (context: ActionContext<stateType, any>, authData: Auth.AuthRegisterData) {
      try {
        const { data } = await registerApi(authData);
        context.commit('setToken', data.idToken);
        context.commit('setUserId', data.localId);
      } catch (e) {
        console.log('Error !', error(e.response.data.error.message));
      }
    },
    async login (context: ActionContext<stateType, any>, authData: Auth.AuthRegisterData) {
      try {
        const { data } = await loginApi(authData);
        context.commit('setToken', data.idToken);
        context.commit('setUserId', data.localId);
      } catch (e) {
        throw new Error(error(e.response.data.error.message));
      }
    },
  },
};
