import { User } from "@/interfaces/User.interface";
import { getUserDataApi, getUserAvatarApi, updateAvatarApi } from "@/api/user.api";
import { ActionContext } from "vuex";
import { updateAccountsDataApi, updateUserNameApi } from "@/api/auth.api";

interface stateType {
  userData: User.info,
  loadingAvatar: any,
}

const userId: string | null = localStorage.getItem('userId');

export default {
  namespaced: true,
  state: {
    userData: {},
    loadingAvatar: false,
  },
  getters: {
    userData (state: stateType) { return state.userData; },
    loadingAvatar (state: stateType) { return state.loadingAvatar; },
  },
  mutations: {
    userDataSet (state: stateType, data: User.info) {
      state.userData = data;
    },
    userDataPropertySet (state: stateType, { propertyName, descriptor }: { propertyName: User.descriptors, descriptor: any }) {
      state.userData[propertyName] = descriptor;
    },
    favoriteSet (state: stateType, movie: any) {
      state.userData.favoriteMovies = [...state.userData.favoriteMovies, movie];
    },
    favoriteRemove (state: stateType, movieId: any) {
      state.userData.favoriteMovies.forEach((movie: any, idx: number) => {
        if (movie.kinopoiskId === movieId) {
          state.userData.favoriteMovies.splice(idx, 1);
        }
      });
    },
    setComment (state: stateType, data: any) {
      if (state.userData.comments && state.userData.comments.items) {
        state.userData.comments.items[data.commentId] = data;
      } else {
        state.userData.comments = { items: {} };
        state.userData.comments.items[data.commentId] = data;
      }
    },
    deleteComment (state: stateType, data: any) {
      delete state.userData.comments.items[data.commentId];
    },
  },
  actions: {
    async userDataLoad ({ commit, state, dispatch }: any, id: string) {
      try {
        const { data } = await getUserDataApi(id);
        const urlAvatar = await getUserAvatarApi(id);
        const favoriteList: any = [];

        if (data.movies) {
          Object.values(data.movies).filter((item: any) => item.movieInfo).forEach((movieInfo: any) => {
            if (movieInfo.isFavorite) {
              favoriteList.push(movieInfo.movieInfo);
            }
          });
        }

        const newData = { ...data, avatar: urlAvatar, favoriteMovies: favoriteList };
        commit("userDataSet", newData);
      } catch (e) {
        console.log(e);
      }
    },
    async updateAvatar ({ commit, state, dispatch }: any, file: any) {
      if (userId) {
        state.loadingAvatar = true;
        const objectAvbatar = await updateAvatarApi(userId, file);
        commit('userDataPropertySet', { propertyName: User.descriptors.Avatar, descriptor: objectAvbatar });
        state.loadingAvatar = false;
      }
    },
    async updateAccountsData (context: ActionContext<stateType, any>, { target, newValue }: any) {
      const idToken = context.rootGetters['auth/token'];
      const userId = context.rootGetters['auth/userId'];

      if (newValue) {
        try {
          await updateAccountsDataApi(idToken, target, newValue, userId);
          context.commit('userDataPropertySet', { propertyName: target, descriptor: userId });
        } catch (e) {
          console.log(e);
        }
      }
    },
    async updateUserName (context: ActionContext<stateType, any>, { newName }: any) {
      const userId = context.rootGetters['auth/userId'];

      if (newName) {
        try {
          await updateUserNameApi(userId, newName);
          context.commit('userDataPropertySet', { propertyName: User.descriptors.Name, descriptor: newName });
        } catch (e) {
          console.log(e);
        }
      }
    },
  },
};
