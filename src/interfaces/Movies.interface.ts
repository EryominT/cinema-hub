// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace MoviesInterface {
  export interface MovieCard {
    countries: {
      country: string;
    }[],
    duration: number;
    genres: {
      genre: string;
    }[],
    kinopoiskId: number;
    nameEn: string;
    nameRu: string;
    posterUrl: string;
    posterUrlPreview: string;
    premiereRu: string;
    year: number;
  }

  export interface Movie {
    completed: boolean;
    countries: {
      country: string;
    }[],
    coverUrl: string | null;
    description: string;
    editorAnnotation: number | null;
    endYear: number;
    filmLength: number;
    genres:{
      genre: string;
    }[];
    has3D: boolean;
    hasImax: boolean;
    imdbId: string | null;
    isTicketsAvailable: boolean;
    kinopoiskId: string;
    lastSync: string;
    logoUrl: string | null;
    nameEn: string | null;
    nameOriginal: string;
    nameRu: string;
    posterUrl: string;
    posterUrlPreview: string;
    productionStatus: string | null;
    ratingAgeLimits: string;
    ratingAwait: string | null;
    ratingAwaitCount: number;
    ratingFilmCritics: string | null;
    ratingFilmCriticsVoteCount: number;
    ratingGoodReview: number;
    ratingGoodReviewVoteCount: number;
    ratingImdb: number;
    ratingImdbVoteCount: number;
    ratingKinopoisk: number;
    ratingKinopoiskVoteCount: number;
    ratingMpaa: string | null;
    ratingRfCritics: string | null;
    ratingRfCriticsVoteCount: number;
    reviewsCount: number;
    serial: boolean;
    shortDescription: string | null;
    shortFilm: boolean;
    slogan: string | null;
    startYear: number;
    type: string;
    webUrl: string;
    year: number;
    number: number;
  }

  export interface MovieVideoSingle {
    name: string;
    site?: string;
    url?: string;
  }

  export interface MovieVideo {
    items: MovieVideoSingle[],
    total: number;
  }

  export interface TvSeriesSeasons {
    items: {
      episodes: {
        episodeNumber: number;
        nameEn: string;
        nameRu: string;
        releaseDate: string;
        seasonNumber: number;
        synopsis: string;
      }
      number: number
    }[],
    total: number
  }

  export interface PremierInfo {
    companies: {
      name: string;
    }
    country: {
      country: string;
    };
    date: string;
    reRelease: boolean;
    subType: string;
    type: any;
  }

  export interface MoviesDistributions {
    items: PremierInfo[],
    total: number;
  }

  export interface MoviesBoxOfficeItem {
    amount: number;
    currencyCode: string;
    name: string;
    symbol: string;
    type: string;
  }

  export interface MoviesBoxOffice {
    items: MoviesBoxOfficeItem[],
    total: number;
  }

  export interface MoviesSimilar {
    items: {
      filmId: number;
      nameEn: string;
      nameOriginal: string;
      nameRu: string;
      posterUrl: string;
      posterUrlPreview: string;
      relationType: string;
    }[],
    total: number;
  }

  export interface MoviesReview {
    author: string;
    date: string;
    description: number;
    kinopoiskId: number;
    negativeRating: number;
    positiveRating: number;
    title: string | null;
    type: string;
  }

  export interface MoviesReviewsData {
    items: MoviesReview[],
    total: number;
    totalNegativeReviews: number;
    totalNeutralReviews: number;
    totalPages: number;
    totalPositiveReviews: number;
  }

  export interface MoviesList {
    items: MovieCard[],
    total: number;
    totalPages: number;
  }

  export interface MoviesReviewsLoadParams {
    id: string;
    pageNum: string;
  }

  export interface MoviesOnFilter {
    countries: {
      country: string;
    }[];
    genres: {
      genre: string
    }[];
    imdbId: string;
    kinopoiskId: number;
    nameEn: string | null;
    nameOriginal: string;
    nameRu: string;
    posterUrl: string;
    posterUrlPreview: string;
    ratingImdb: number;
    ratingKinopoisk: number;
    type: string;
    year: string | number;
  }

  export interface MoviesOnFilterData {
    items: MoviesOnFilter[];
    total: number
    totalPages: number;
  }

  export interface MoviesOnFilterLoadParams {
    genre: number;
    sortMode: string;
    typeMovie?: boolean;
    isTvSeries?: string;
    pageNum: number;
    ratingFrom: number;
    ratingTo: number;
    yearFrom: number;
    yearTo: number;
  }

  export interface searchByKeywordLoadParam {
    keyword: string,
    page: number
  }

  export interface Films {
    countries: {
      country: string;
    }[]
    description: string;
    filmId: number;
    genres: {
      genre: string;
    }[]
    nameEn: string;
    nameRu: string;
    posterUrl: string;
    posterUrlPreview: string;
    rating: string;
    ratingVoteCount: number;
    type: string;
    year: string | number;
    imdbId: string;
    kinopoiskId: number;
    nameOriginal: string;
    ratingImdb: number;
    ratingKinopoisk: number;
  }

  export interface searchByKeyword {
    films: Films[]
    keyword: string;
    pagesCount: number;
    searchFilmsCountResult: number;
  }

  export interface infoMovie {
    isFavorite: boolean;
    rating?: number;
    movieInfo: Movie;
    comments?: {
      items?: any,
    };
  }

  export interface ratingUserInfo {
    [key: string]: number;
  }

  export interface MovieRating {
    totalRating: number,
    usersRating: {
      [key: string]: number;
    }
  }

  export enum CategoryId {
    Premier = 'premier',
    TvSerie = 'tvSeries',
    Thriller = 'thriller',
    Drama = 'drama',
    Crime = 'crime',
    Melodrama = 'melodrama',
    Detective = 'detective',
    Fantastic = 'fantastic',
    Adventure = 'adventure',
    Biography = 'biography',
    Noir = 'noir',
    Western = 'western',
    Action = 'action',
    Fantasy = 'fantasy',
    Comedy = 'comedy',
    Military = 'military',
    History = 'history',
    Music = 'music',
    Horror = 'horror',
    Cartoon = 'cartoon',
    Family = 'family',
    Musical = 'musical',
    Sports = 'sports',
    Documentary = 'documentary',
    Short = 'short',
    Anime = 'anime',
    Unown = 'unown',
    News = 'news',
    Concert = 'concert',
    Adult = 'adult',
    Ceremony = 'ceremony',
    RealTV = 'realTV',
    Game = 'game',
    TalkShow = 'talkShow',
    Childish = 'childish',
  }

  export enum CategoryName {
    thriller = 'Триллеры',
    drama = 'драмы',
    crime = 'криминал',
    melodrama = 'мелодрама',
    detective = 'детектив',
    fantastic = 'фантастика',
    adventure = 'приключения',
    biography = 'биография',
    noir = 'фильмнуар',
    western = 'вестерн',
    action = 'боевик',
    fantasy = 'фэнтези',
    comedy = 'комедия',
    military = 'военный',
    history = 'история',
    music = 'музыка',
    horror = 'ужасы',
    cartoon = 'мультфильм',
    family = 'семейный',
    musical = 'мюзикл',
    sports = 'спорт',
    documentary = 'документальный',
    short = 'короткометражка',
    anime = 'аниме',
    unown = 'Неизвестный',
    news = 'новости',
    concert = 'концерт',
    adult = 'для взрослых',
    ceremony = 'церемония',
    realTV = 'реальное ТВ',
    game = 'игра',
    talkShow = 'ток-шоу',
    childish = 'детский',
  }

  export enum CategoryGenreId {
    thriller = 1,
    drama = 2,
    crime = 3,
    melodrama = 4,
    detective = 5,
    fantastic = 6,
    adventure = 7,
    biography = 8,
    noir = 9,
    western = 10,
    action = 11,
    fantasy = 12,
    comedy = 13,
    military = 14,
    history = 15,
    music = 16,
    horror = 17,
    cartoon = 18,
    family = 19,
    musical = 20,
    sports = 21,
    documentary = 22,
    short = 23,
    anime = 24,
    unown = 25,
    news = 26,
    concert = 27,
    adult = 28,
    ceremony = 29,
    realTV = 30,
    game = 31,
    talkShow = 32,
    childish = 33,
  }
}
