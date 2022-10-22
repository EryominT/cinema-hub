import axios from 'axios';
import { ActionContext } from 'vuex';
import { MoviesInterface } from "@/interfaces/Movies.interface";
import {
  setUserRatingApi,
  setTotalRatingApi,
  setCommetApi,
  setCommetLengthApi,
  deleteCommentApi, getRatingApi,
} from "@/api/fbMovie.api";
import {
  setCommetUserApi,
  deleteCommentUserApi,
} from "@/api/fbUsers.api";

interface stateType {
  totalRating: number,
  countRating: number,
  commentsLength: number,
  movieInfo: MoviesInterface.infoMovie,
}

export default {
  namespaced: true,
  state: {
    totalRating: 0,
    countRating: 0,
    commentsLength: 0,
    movieInfo: {
      comments: {
        items: {},
      },
    },
  },
  getters: {
    totalRating (state: stateType): stateType["totalRating"] {
      return state.totalRating;
    },
    countRating (state: stateType): stateType["countRating"] {
      return state.countRating;
    },
    commentsLength (state: stateType): stateType["commentsLength"] {
      return state.commentsLength;
    },
    movieInfo (state: stateType): stateType["movieInfo"] {
      return state.movieInfo;
    },
  },
  mutations: {
    setTotalRating (state: stateType, { newRating, newcountRating }: {newRating: number, newcountRating: number}): void {
      state.totalRating = newRating;
      state.countRating = newcountRating;
    },
    setCountRating (state: stateType, count: number): void {
      state.countRating = count;
    },
    setCommentsLength (state: stateType, length: number): void {
      state.commentsLength = length;
    },
    setMovieInfo (state: stateType, info: MoviesInterface.infoMovie) {
      state.movieInfo = { ...info };
    },
    setComment (state: stateType, data: any) {
      if (state.movieInfo.comments && state.movieInfo.comments.items) {
        state.movieInfo.comments.items[data.commentId] = data;
      } else {
        state.movieInfo.comments = { items: {} };
        state.movieInfo.comments.items[data.commentId] = data;
      }
    },
    deleteComment (state: stateType, data: any) {
      delete state.movieInfo.comments?.items[data.commentId];
    },
  },
  actions: {
    async getMyInfo (context: ActionContext<stateType, any>, kinopoiskId: any) {
      const userId = context.rootGetters['auth/userId'];
      const urlDataBase = `${process.env.VUE_APP_FB_BASE_URL}/users/${userId}/movies/${kinopoiskId}.json`;
      const moviesUrl = `${process.env.VUE_APP_FB_BASE_URL}/movies/${kinopoiskId}.json`;
      const { data } = await axios.get(urlDataBase);

      const { data: movieData } = await axios.get(moviesUrl);
      context.commit('setMovieInfo', movieData);

      if (movieData?.comments?.commentsLength) {
        context.commit('setCommentsLength', movieData.comments.commentsLength);
      }

      return data;
    },
    async getRatingInfo (context: ActionContext<stateType, any>, kinopoiskId: any) {
      const { data } = await getRatingApi(kinopoiskId);
      return data;
    },
    async addMyRating (context: ActionContext<stateType, any>, ratingInfo: any) {
      const userId = context.rootGetters['auth/userId'];

      await setUserRatingApi(ratingInfo.movieId, userId, ratingInfo.ratingMy);

      let totalResult = ratingInfo.ratingMy;

      if (ratingInfo.usersRating) {
        const sum:any = Object.values(ratingInfo.usersRating).reduce((result: any, item: any) => {
          return item + result;
        });
        totalResult = Math.floor((sum / Object.values(ratingInfo.usersRating).length) * 10) / 10;
      }

      await setTotalRatingApi(ratingInfo.movieId, totalResult);

      return totalResult;
    },
    async addFavorite (context: ActionContext<stateType, any>, newItem: any) {
      const userId = context.rootGetters['auth/userId'];
      const urlDataBaseFavorite = `${process.env.VUE_APP_FB_BASE_URL}/users/${userId}/movies/${newItem.kinopoiskId}/isFavorite.json`;
      const urlDataBaseMovie = `${process.env.VUE_APP_FB_BASE_URL}/users/${userId}/movies/${newItem.kinopoiskId}/movieInfo.json`;

      context.commit('userData/favoriteSet', newItem, { root: true });

      await axios.put(urlDataBaseFavorite, 'true');
      await axios.put(urlDataBaseMovie, newItem);
    },
    async removeFavorite (context: ActionContext<stateType, any>, newItem: any) {
      const userId = context.rootGetters['auth/userId'];
      const urlDataBase = `${process.env.VUE_APP_FB_BASE_URL}/users/${userId}/movies/${newItem.kinopoiskId}/isFavorite.json`;

      context.commit('userData/favoriteRemove', newItem.kinopoiskId, { root: true });

      await axios.put(urlDataBase, 'false');
    },
    async addComment (context: ActionContext<stateType, any>, data: any) {
      let commentsLength = context.getters.commentsLength;
      const userId = context.rootGetters['auth/userId'];
      const commentId = `id-${commentsLength}`;

      commentsLength++;

      context.commit('setCommentsLength', commentsLength);
      context.commit('setComment', { ...data, commentId: commentId });
      context.commit('userData/setComment', { ...data, commentId: commentId }, { root: true });

      await setCommetApi(data.movieKinopoiskId, commentId, { ...data, commentId: commentId });
      await setCommetLengthApi(data.movieKinopoiskId, commentsLength);
      await setCommetUserApi(userId, commentId, { ...data, commentId: commentId });
    },
    async deleteComment (context: ActionContext<stateType, any>, dataMovie: any) {
      context.commit('deleteComment', dataMovie);
      context.commit('userData/deleteComment', dataMovie, { root: true });
      await deleteCommentApi(dataMovie.movieKinopoiskId, dataMovie.commentId);
      await deleteCommentUserApi(dataMovie.user.userId, dataMovie.commentId);
    },
  },
};
