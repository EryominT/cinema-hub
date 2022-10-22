import { ActionContext } from 'vuex';
import { MoviesInterface } from '@/interfaces/Movies.interface.ts';
import { LoadingInterface } from '@/interfaces/Loading.interface';

import { sortGenresInterface } from '@/interfaces/Genres.interface';
import {
  moviesPremieresApi,
  movieByIdApi,
  movieVideoApi,
  tvSeriesSeasonsApi,
  moviesDistributionsApi,
  moviesBoxOfficeApi,
  moviesSimilarApi,
  moviesReviewsDataApi,
  moviesOnFiltersApi,
  searchByKeywordApi,
} from "@/api/cinema.api";

interface stateType {
  loadingStatus: string;
  moviesPremieres: MoviesInterface.MovieCard;
  sortGenres: sortGenresInterface[];
}

export default {
  namespaced: true,
  state: {
    loadingStatus: false,
    moviesPremieres: [],
    sortGenres: [
      { label: 'по рейтингу', value: 'RATING' },
      { label: 'по количеству голосов', value: 'NUM_VOTE' },
      { label: 'по году', value: 'YEAR' },
    ],
  },
  getters: {
    moviesPremieres (state: stateType): stateType["moviesPremieres"] {
      return state.moviesPremieres;
    },
    sortGenres (state: stateType) {
      return state.sortGenres;
    },
  },
  mutations: {
    loadingStatusSet (state: stateType, status: stateType['loadingStatus']) {
      state.loadingStatus = status;
    },
    moviesPremieresSet (state: stateType, movies: stateType['moviesPremieres']) {
      state.moviesPremieres = movies;
    },
  },
  actions: {
    async moviesPremieresLoad (context: ActionContext<stateType, any>) {
      try {
        context.commit('loadingStatusSet', LoadingInterface.LoadingStatus.loading);
        const response = await moviesPremieresApi();
        context.commit('moviesPremieresSet', response.data);
        context.commit('loadingStatusSet', LoadingInterface.LoadingStatus.ready);
        return response.data;
      } catch (e) {
        context.commit('loadingStatusSet', LoadingInterface.LoadingStatus.error);
        throw new Error(e);
      }
    },
    async movieByIdLoad (context: ActionContext<stateType, any>, id: string) {
      const { data }: any = await movieByIdApi(id);
      return data;
    },
    async movieVideosLoad (context: ActionContext<stateType, any>, id: string) {
      try {
        const { data } = await movieVideoApi(id);
        return data;
      } catch (e) {
        throw new Error(e);
      }
    },
    async  tvSeriesSeasonsLoad (context: ActionContext<stateType, any>, id: string) {
      try {
        const { data } = await tvSeriesSeasonsApi(id);

        return data;
      } catch (e) {
        throw new Error(e);
      }
    },
    async moviesDistributionsLoad (context: ActionContext<stateType, any>, id: string) {
      try {
       const { data } = await moviesDistributionsApi(id);

       return data;
      } catch (e) {
        throw new Error(e);
      }
    },
    async moviesBoxOfficeLoad (context: ActionContext<stateType, any>, id: string) {
      try {
        const { data } = await moviesBoxOfficeApi(id);

        return data;
      } catch (e) {
        throw new Error(e);
      }
    },
    async moviesSimilarLoad (context: ActionContext<stateType, any>, id: string) {
      try {
        const { data } = await moviesSimilarApi(id);

        return data;
      } catch (e) {
        throw new Error(e);
      }
    },
    async moviesReviewsLoad (context: ActionContext<stateType, any>, { id, pageNum }: MoviesInterface.MoviesReviewsLoadParams) {
      try {
        const { data } = await moviesReviewsDataApi({ id, pageNum });

        return data;
      } catch (e) {
        throw new Error(e);
      }
    },
    async moviesOnFiltersLoad (context: ActionContext<stateType, any>, {
      genre,
      sortMode = 'RATING',
      typeMovie = false,
      pageNum = 1,
      ratingFrom = 0,
      ratingTo = 10,
      yearFrom = 1900,
      yearTo = 3000,
    }: MoviesInterface.MoviesOnFilterLoadParams) {
      try {
        const isTvSeries = typeMovie ? 'TV_SERIES' : 'ALL';
        const { data } = await moviesOnFiltersApi({ genre, sortMode, isTvSeries, pageNum, ratingFrom, ratingTo, yearFrom, yearTo });

        return data;
      } catch (e) {
        throw new Error(e);
      }
    },
    async searchByKeywordLoad (context: ActionContext<stateType, any>, { keyword, page = 1 }: MoviesInterface.searchByKeywordLoadParam) {
      try {
        const { data } = await searchByKeywordApi({ keyword, page });

        return data;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
