import http from "@/api/http";
import axios from "axios";
import { MoviesInterface } from "@/interfaces/Movies.interface";
import router from "@/router";

const kinopoiskUrl = 'https://kinopoiskapiunofficial.tech/api/v2.2/films';
const headersKinopoiskApi = {
  'X-API-KEY': `${process.env.VUE_APP_KINOPOISK_KEY}`,
  'Content-Type': 'application/json',
};

export async function moviesPremieresApi () {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const currentDate = new Date();
  const premieresYear = currentDate.getFullYear();
  const premieresMonth = currentDate.getMonth();

  return await axios.get(`${kinopoiskUrl}/premieres?year=${premieresYear}&month=${monthNames[premieresMonth]}`, {
    headers: headersKinopoiskApi,
  });
}

export async function movieByIdApi (id: string) {
  try {
    return await axios.get(`${kinopoiskUrl}/${id}`, {
      headers: headersKinopoiskApi,
    });
  } catch (e) {
    console.log(11111);
    router.push('/404');
  }
}

export async function movieVideoApi (id: string) {
  return await axios.get(`${kinopoiskUrl}/${id}/videos`, {
    headers: headersKinopoiskApi,
  });
}

export async function tvSeriesSeasonsApi (id: string) {
  return await axios.get(`${kinopoiskUrl}/${id}/seasons`, {
    headers: headersKinopoiskApi,
  });
}

export async function moviesDistributionsApi (id: string) {
  return await axios.get(`${kinopoiskUrl}/${id}/distributions`, {
    headers: headersKinopoiskApi,
  });
}

export async function moviesBoxOfficeApi (id: string) {
  return await axios.get(`${kinopoiskUrl}/${id}/box_office`, {
    headers: headersKinopoiskApi,
  });
}

export async function moviesSimilarApi (id: string) {
  return await axios.get(`${kinopoiskUrl}/${id}/similars`, {
    headers: headersKinopoiskApi,
  });
}

export async function moviesReviewsDataApi ({ id, pageNum }: MoviesInterface.MoviesReviewsLoadParams) {
  return await axios.get(`${kinopoiskUrl}/${id}/reviews?page=${pageNum}`, {
    headers: headersKinopoiskApi,
  });
}

export async function moviesOnFiltersApi ({ genre, sortMode, isTvSeries, pageNum, ratingFrom, ratingTo, yearFrom, yearTo }: MoviesInterface.MoviesOnFilterLoadParams) {
  return await axios.get(`${kinopoiskUrl}?genres=${genre}&order=${sortMode}&type=${isTvSeries}&ratingFrom=${ratingFrom}&ratingTo=${ratingTo}&yearFrom=${yearFrom}&yearTo=${yearTo}&page=${pageNum}`, {
    headers: headersKinopoiskApi,
  });
}

export async function searchByKeywordApi ({ keyword, page }: MoviesInterface.searchByKeywordLoadParam) {
  return await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${keyword}&page=${page}`, {
    headers: headersKinopoiskApi,
  });
}

// //////////////////////////////////////////////////////////////////////////
// export async function test () {
//   const { data } = await http.get('https:/cinema-hub-88bb9-default-rtdb.firebaseio.com/test/name.php', {
//     headers: {
//       'X-API-KEY': `${process.env.VUE_APP_KINOPOISK_KEY}`,
//       'Content-Type': 'application/json'
//     },
//     errorAlert: 'при загругзки фильмов с премьерами'
//   });
//
//   return data;
// }
//
// export async function test2 () {
//   const { data } = await http.get('https:/cinema-hub-88bb9-default-rtdb.firebaseio.com/test/name.php', {
//     headers: {
//       'X-API-KEY': `${process.env.VUE_APP_KINOPOISK_KEY}`,
//       'Content-Type': 'application/json'
//     },
//     errorAlert: {
//       text: 'при загругзки фильмов с премьерами !!!!!!!',
//       critical: true
//     }
//   });
//
//   return data;
// }
