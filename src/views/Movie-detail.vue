<template>
  <div class="movie" :style="`background-image:  linear-gradient(transparent 40vw, #383838 53vw), url('${data?.coverUrl}')`">
    <div class="movie__overlay">
      <div class="movie__content app-block container">
       <div class="movie__left">
         <div v-if="data?.posterUrlPreview && store.state.loadedPage" class="movie__poster">
           <img :src="data?.posterUrlPreview">
           <div class="movie__favorite">
             <label>
               <input v-model="isFavorite" type="checkbox">
               <Icons @click="addFavorite(data)" name="star" class="movie__favorite-ico"/>
             </label>
           </div>
         </div>
         <div v-else-if="!store.state.loadedPage" class="movie__poster-skeleton"></div>

         <div v-if="videos && videos.total && store.state.loadedPage" @click="openPopUp(data?.coverUrl)" class="movie__video">
           <div class="video video--preview">
             <img :src="data?.coverUrl" alt="">
           </div>
         </div>
         <div v-else-if="!store.state.loadedPage" class="movie__video-skeleton"><div class="video video--preview"></div></div>
       </div>

       <div class="movie__center">
         <div v-if="store.state.loadedPage" class="movie__title">
           <div v-if="seasons.total" class="movie__title-season">сериал</div>
           <h1 class="movie__title-main h1">{{data?.nameRu}}<span v-if="ratingAgeLimits" class="movie__rating-age-wrap"><span class="movie__rating-age"><span>{{ratingAgeLimits}}</span></span></span></h1>
           <div class="movie__title-origin h4">{{data?.nameOriginal}}</div>
         </div>
         <div v-else class="movie__title-skeleton"></div>

         <div v-if="data?.shortDescription && store.state.loadedPage" class="movie__description">
           <div class="movie__description-short">{{data?.shortDescription}}<button v-if="!isFullDescription" @click="isFullDescription = true" class="movie__description-more">&nbsp;подробно (могут быть спойлеры)</button></div>
           <div v-if="isFullDescription" class="movie__description-full">{{data?.description}}<button v-if="isFullDescription" @click="isFullDescription = false" class="movie__description-more">&nbsp;скрыть</button></div>
         </div>

         <div v-if="store.state.loadedPage" class="movie__info">
           <div class="movie__info-title">О фильме</div>
           <div v-if="data?.genres" class="movie__info-item">
             <div class="movie__info-item-title">Жанр:</div>
             <div class="movie__info-item-content">
               <ul>
                 <li v-for="(item, idx) in data?.genres" :key="idx">{{item.genre}}</li>
               </ul>
             </div>
           </div>
           <div v-if="movieLengthMin" class="movie__info-item">
             <div class="movie__info-item-title">Продолжительность:</div>
             <div class="movie__info-item-content">{{movieLengthMin}}мин.<template v-if="movieLengthHours"> / {{movieLengthHours}}</template></div>
           </div>
           <div v-if="ratingAgeLimits" class="movie__info-item">
             <div class="movie__info-item-title">Возрастной рейтинг:</div>
             <div class="movie__info-item-content">{{ratingAgeLimits}}</div>
           </div>
           <div v-if="seasons.total" class="movie__info-item">
             <div class="movie__info-item-title">Количество сезонов:</div>
             <div class="movie__info-item-content">{{seasons.items.length}}</div>
           </div>
           <div v-if="seasons.total" class="movie__info-item">
             <div class="movie__info-item-title">Количество серий:</div>
             <div class="movie__info-item-content">
               <ul>
                 <li v-for="(item, idx) in seasons.items" :key="idx"><span class="shield">сезон {{idx + 1}}: {{item.episodes.length}} серий</span></li>
               </ul>
             </div>
           </div>
           <div v-if="localPremier?.date" class="movie__info-item">
             <div class="movie__info-item-title">Премьера в {{localPremier.country.country}}:</div>
             <div class="movie__info-item-content">{{dateFormatting(localPremier.date, 'date')}}</div>
           </div>
           <div v-if="worldPremier?.date" class="movie__info-item">
             <div class="movie__info-item-title">Премьера в мире:</div>
             <div class="movie__info-item-content">{{dateFormatting(worldPremier.date, 'date')}}</div>
           </div>
           <div v-if="dvdPremier?.date" class="movie__info-item">
             <div class="movie__info-item-title">Релиз на DVD:</div>
             <div class="movie__info-item-content">{{dateFormatting(dvdPremier.date, 'date')}}</div>
           </div>
           <div v-if="blurayPremier?.date" class="movie__info-item">
             <div class="movie__info-item-title">Релиз на Blu-ray:</div>
             <div class="movie__info-item-content">{{dateFormatting(blurayPremier.date, 'date')}}</div>
           </div>

           <div v-if="blurayPremier?.date" class="movie__info-item">
             <div class="movie__info-item-title">Релиз на Blu-ray:</div>
             <div class="movie__info-item-content">{{dateFormatting(blurayPremier.date, 'date')}}</div>
           </div>

           <div v-if="boxOfficeBudget" class="movie__info-item">
             <div class="movie__info-item-title">Бюджет:</div>
             <div class="movie__info-item-content">{{boxOfficeBudget.symbol}}{{new Intl.NumberFormat("ru", {maximumSignificantDigits: 3}).format(boxOfficeBudget.amount)}}</div>
           </div>
           <div v-if="boxOfficeMarketing" class="movie__info-item">
             <div class="movie__info-item-title">Маркетинг:</div>
             <div class="movie__info-item-content">{{boxOfficeMarketing.symbol}}{{new Intl.NumberFormat("ru", {maximumSignificantDigits: 3}).format(boxOfficeMarketing.amount)}}</div>
           </div>
           <div v-if="boxOfficeWorld" class="movie__info-item">
             <div class="movie__info-item-title">Сборы в мире:</div>
             <div class="movie__info-item-content">{{boxOfficeWorld.symbol}}{{new Intl.NumberFormat("ru", {maximumSignificantDigits: 3}).format(boxOfficeWorld.amount)}}</div>
           </div>
           <div v-if="boxOfficeRus" class="movie__info-item">
             <div class="movie__info-item-title">Сборы в России:</div>
             <div class="movie__info-item-content">{{boxOfficeRus.symbol}}{{new Intl.NumberFormat("ru", {maximumSignificantDigits: 3}).format(boxOfficeRus.amount)}}</div>
           </div>
           <div v-if="boxOfficeUsa" class="movie__info-item">
             <div class="movie__info-item-title">Сборы в США:</div>
             <div class="movie__info-item-content">{{boxOfficeUsa.symbol}}{{new Intl.NumberFormat("ru", {maximumSignificantDigits: 3}).format(boxOfficeUsa.amount)}}</div>
           </div>
         </div>
         <div v-else class="movie__info-skeleton"></div>
       </div>

       <div v-if="ratingInfo || data?.ratingKinopoisk || data?.ratingImdb" class="movie__right">
         <div class="movie__rating">
           <div v-if="ratingTotal" class="movie__rating-item">
             <div class="movie__rating-count rating-color" :class="setColorRating(ratingTotal, 'color')">{{ratingTotal}}</div>
             <div class="movie__rating-source">cinemaHub ({{ratingCount}} оценок)</div>
           </div>
           <div v-if="data?.ratingKinopoisk" class="movie__rating-item">
             <div class="movie__rating-count rating-color" :class="setColorRating(data?.ratingKinopoisk, 'color')">{{data?.ratingKinopoisk}}</div>
             <div class="movie__rating-source">Кинопоиск ({{data?.ratingKinopoiskVoteCount}} оценок)</div>
           </div>
           <div v-if="data?.ratingImdb" class="movie__rating-item">
             <div class="movie__rating-count rating-color" :class="setColorRating(data?.ratingImdb, 'color')">{{data?.ratingImdb}}</div>
             <div class="movie__rating-source">IMDb ({{data?.ratingImdbVoteCount}} оценок)</div>
           </div>
         </div>
       </div>
      </div>

      <div class="app-block container">
        <div class="app-block__title">Также рекомендуем</div>
        <div class="grid grid__cards">
          <template  v-if="store.state.loadedPage">
            <div v-for="(item, idx) in similars?.items" :key="idx" class="grid__item">
              <Card :data="item"/>
            </div>
          </template>
          <CardSkeleton v-if="!store.state.loadedPage"/>
        </div>
      </div>

      <div class="app-block container">
        <div class="app-block__title">Оценки</div>
        <div class="app-block__subtitle h4">Ваша оценка</div>
        <div class="movie__reviews">
          <div class="movie__reviews-set">
            <button
              v-for="(item, idx) in 10" :key="idx"
              @click="addMyRating(10 - idx)"
              :class="[setColorRating(10 - idx, 'background'), 10 - ratingMy === idx ? 'active' : '']"
              class="rating-color rating-color--hover">{{10 - idx}}</button>
          </div>
        </div>
      </div>

      <div class="app-block container">
        <div class="app-block__subtitle h4">Кинопоиск</div>
        <div class="movie__reviews">
          <div class="movie__reviews-items">
            <div class="movie__reviews-item">
              <div class="movie__reviews-item-title">Положительные</div>
              <div class="rating-color rating-color--bg-high">{{reviewsData?.totalPositiveReviews}}</div>
            </div>
            <div class="movie__reviews-item">
              <div class="movie__reviews-item-title">Нейтральные</div>
              <div class="rating-color rating-color--bg-middle">{{reviewsData?.totalNeutralReviews}}</div>
            </div>
            <div class="movie__reviews-item">
              <div class="movie__reviews-item-title">Негативные</div>
              <div class="rating-color rating-color--bg-low">{{reviewsData?.totalNegativeReviews}}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="app-block container">
        <div class="app-block__title">Рецензии (Кинопоиск)</div>
        <el-tabs v-model="activeName" class="demo-tabs">
          <el-tab-pane label="Cinemahub" name="first" role="button">
            <div class="movie__comments">
              <div class="movie__comments__set">
                <CommentSet :data="data"/>
              </div>
              <div class="movie__comments-items">
                <div v-for="(item, key, idx) in comments" :key="idx" class="movie__comments-item">
                  <Comment :data="item" :idx="idx"/>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane v-if="reviewsList?.length" label="Кинопоиск" name="second" role="button">
            <div class="movie__comments">
              <div class="movie__comments-items">
                <div v-for="(item, idx) in reviewsList" :key="idx" class="movie__comments-item">
                  <Comment :data="item"/>
                </div>
              </div>
              <IntersectionObserver @intersect="intersectedKinopoisk"/>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import { useRoute } from 'vue-router';
import { dateFormatting } from '@/utils/date-formatting';
import Icons from '@/components/Icons.vue';
import Comment from '@/components/Comment.vue';
import IntersectionObserver from '@/components/IntersectionObserver.vue';
import { setColorRating } from '@/utils/calc-color-rating';
import Card from '@/components/Card.vue';
import CardSkeleton from '@/components/skeleton/CardSkeleton.vue';
import CommentSet from "@/components/CommentSet.vue";
import { MoviesInterface } from "@/interfaces/Movies.interface";

export default defineComponent({
  setup () {
    const store = useStore(key);
    const route = useRoute();
    const id = ref<string | string[]>(route.params.id);
    const ratingAgeLimits = ref('');
    const movieLengthMin = ref<number>(0);
    const movieLengthHours = ref('');
    const isFullDescription = ref(false);
    const localPremier = ref<MoviesInterface.PremierInfo>();
    const worldPremier = ref<MoviesInterface.PremierInfo>();
    const dvdPremierArr = ref<MoviesInterface.PremierInfo[]>();
    const dvdPremier = ref<MoviesInterface.PremierInfo | null>(null);
    const blurayPremierArr = ref<MoviesInterface.PremierInfo[]>();
    const blurayPremier = ref<MoviesInterface.PremierInfo | null>(null);
    const boxOfficeWorld = ref<MoviesInterface.MoviesBoxOfficeItem>();
    const boxOfficeBudget = ref<MoviesInterface.MoviesBoxOfficeItem>();
    const boxOfficeMarketing = ref<MoviesInterface.MoviesBoxOfficeItem>();
    const boxOfficeRus = ref<MoviesInterface.MoviesBoxOfficeItem>();
    const boxOfficeUsa = ref<MoviesInterface.MoviesBoxOfficeItem>();
    const reviewsNumPage = ref(1);
    const isFavorite = ref<boolean>(false);
    const infoMovie = ref<MoviesInterface.infoMovie | null>(null);
    const userRating = ref<number>(0);
    const ratingInfo = ref<any>(null);
    const ratingCount = ref<number | null>(null);
    const ratingTotal = ref<number | null>(null);
    const ratingMy = ref<any | null>(null);
    const activeName = ref('first');
    const comments = computed(() => { return store.getters['info/movieInfo']?.comments?.items; });

    function minutesToTimeFormat (allMinutes: number) {
      const hours = Math.floor(allMinutes / 60) < 10 ? '0' + Math.floor(allMinutes / 60) : Math.floor(allMinutes / 60);
      const minutes = allMinutes % 60 < 10 ? '0' + allMinutes % 60 : allMinutes % 60;
      return hours + ':' + minutes;
    }

    const data = ref<MoviesInterface.Movie>();
    store.commit('loadedPageSet', false);

    const videos = ref<MoviesInterface.MovieVideo>();
    const seasons = ref<MoviesInterface.TvSeriesSeasons>();
    const distributions = ref<MoviesInterface.MoviesDistributions>();
    const boxOffice = ref<MoviesInterface.MoviesBoxOffice>();
    const similars = ref<MoviesInterface.MoviesSimilar>();
    const reviewsData = ref<MoviesInterface.MoviesReviewsData>();
    const reviewsList = ref< MoviesInterface.MoviesReview[]>();

    async function getData () {
      data.value = await store.dispatch('cinema/movieByIdLoad', id.value);
      const filmLength = data.value ? data.value?.filmLength : 0;
      if (data.value) {
        document.title = data.value?.nameRu;
      }

      if (data.value?.ratingAgeLimits) ratingAgeLimits.value = data.value.ratingAgeLimits.replace(/[^\d-]/g, '') + '+';
      movieLengthMin.value = filmLength;
      movieLengthHours.value = Math.floor(filmLength / 60) ? minutesToTimeFormat(filmLength) : '';

      seasons.value = await store.dispatch('cinema/tvSeriesSeasonsLoad', id.value);
      distributions.value = await store.dispatch('cinema/moviesDistributionsLoad', id.value);

      localPremier.value = distributions.value?.items.find((item: MoviesInterface.PremierInfo) => { if (item.type === 'COUNTRY_SPECIFIC') { return item; } });

      worldPremier.value = distributions.value?.items.find((item: MoviesInterface.PremierInfo) => { if (item.type === 'WORLD_PREMIER') { return item; } });

      dvdPremierArr.value = distributions.value?.items.filter((item: MoviesInterface.PremierInfo) => { if (item.subType === 'DVD') { return item; } });

      if (dvdPremierArr.value?.length) {
        dvdPremier.value = dvdPremierArr.value.reduce(function (a: MoviesInterface.PremierInfo, b: MoviesInterface.PremierInfo) {
          return (new Date(a.date) < new Date(b.date) ? a : b);
        });
      }

      blurayPremierArr.value = distributions.value?.items.filter((item: MoviesInterface.PremierInfo) => { if (item.subType === 'BLURAY') { return item; } });

      if (blurayPremierArr.value?.length) {
        blurayPremier.value = blurayPremierArr.value.reduce(function (a: MoviesInterface.PremierInfo, b: MoviesInterface.PremierInfo) {
          return (new Date(a.date) < new Date(b.date) ? a : b);
        });
      }

      boxOffice.value = await store.dispatch('cinema/moviesBoxOfficeLoad', id.value);

      boxOfficeWorld.value = boxOffice.value?.items.find((item: MoviesInterface.MoviesBoxOfficeItem) => { if (item.type === 'WORLD') { return item; } });

      boxOfficeBudget.value = boxOffice.value?.items.find((item: MoviesInterface.MoviesBoxOfficeItem) => { if (item.type === 'BUDGET') { return item; } });

      boxOfficeMarketing.value = boxOffice.value?.items.find((item: MoviesInterface.MoviesBoxOfficeItem) => { if (item.type === 'MARKETING') { return item; } });

      boxOfficeRus.value = boxOffice.value?.items.find((item: MoviesInterface.MoviesBoxOfficeItem) => { if (item.type === 'RUS') { return item; } });

      boxOfficeUsa.value = boxOffice.value?.items.find((item: MoviesInterface.MoviesBoxOfficeItem) => { if (item.type === 'USA') { return item; } });

      similars.value = await store.dispatch('cinema/moviesSimilarLoad', id.value);
      reviewsData.value = await store.dispatch('cinema/moviesReviewsLoad', { id: id.value, pageNum: reviewsNumPage.value });
      reviewsList.value = reviewsData.value?.items;

      videos.value = await store.dispatch('cinema/movieVideosLoad', id.value);

      await store.dispatch('info/getMyInfo', id.value);

      if (infoMovie.value) isFavorite.value = !!infoMovie.value.isFavorite;
      if (infoMovie.value?.rating) { userRating.value = infoMovie.value?.rating; }

      ratingInfo.value = await store.dispatch('info/getRatingInfo', id.value);

      if (ratingInfo.value && ratingInfo.value.usersRating) {
        ratingCount.value = Object.values(ratingInfo.value.usersRating).length;
        ratingTotal.value = ratingInfo.value.totalRating;

        const isRatingMy = Object.entries(ratingInfo.value.usersRating).filter((item) => {
          if (item[0] === store.getters["auth/userId"]) {
            return item;
          }
        });

        ratingMy.value = isRatingMy.length ? isRatingMy[0][1] : null;
      }

      store.commit('loadedPageSet', true);
    }

    const countRating = computed(() => { return store.getters['info/countRating']; });

    async function intersectedKinopoisk () {
      if (reviewsData.value && reviewsNumPage.value < reviewsData.value.totalPages) {
        reviewsNumPage.value++;
        reviewsData.value = await store.dispatch('cinema/moviesReviewsLoad', { id: id.value, pageNum: reviewsNumPage.value });

        if (reviewsList.value && reviewsData.value && reviewsData.value.items) {
          reviewsList.value = [...reviewsList.value, ...reviewsData.value?.items];
        }
      }
    }

    function openPopUp () {
      if (videos.value?.items && videos.value.items.length) {
        store.commit('dialog/openDialog', { data: videos.value });
      }
    }

    function addFavorite (data: MoviesInterface.Movie) {
      if (isFavorite.value) {
        store.dispatch('info/removeFavorite', data);
      } else {
        store.dispatch('info/addFavorite', data);
      }
    }

    async function addMyRating (currentUserRating: number) {
      if (ratingInfo.value && ratingInfo.value.usersRating) {
        ratingInfo.value.usersRating[store.getters["auth/userId"]] = currentUserRating;
        ratingCount.value = Object.values(ratingInfo.value.usersRating).length;
      }

      ratingMy.value = currentUserRating;

      if (!ratingCount.value) {
        ratingCount.value = 1;
      }

      ratingTotal.value = await store.dispatch('info/addMyRating', { movieId: id.value, ...ratingInfo.value, ratingMy: ratingMy.value });
    }

    getData();

    return {
      store,
      data,
      ratingAgeLimits,
      movieLengthMin,
      movieLengthHours,
      isFullDescription,
      videos,
      seasons,
      localPremier,
      worldPremier,
      dvdPremier,
      blurayPremier,
      boxOfficeWorld,
      boxOfficeBudget,
      boxOfficeMarketing,
      boxOfficeRus,
      boxOfficeUsa,
      similars,
      reviewsData,
      reviewsList,
      isFavorite,
      userRating,
      ratingInfo,
      ratingCount,
      ratingTotal,
      ratingMy,
      countRating,
      activeName,
      comments,
      openPopUp,
      setColorRating,
      dateFormatting,
      intersectedKinopoisk,
      addFavorite,
      addMyRating,
    };
  },
  components: {
    Icons,
    Comment,
    IntersectionObserver,
    Card,
    CommentSet,
    CardSkeleton,
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/style/variables";

.movie {
  padding-top: 0;
  padding-bottom: 0;
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: top;
  overflow: hidden;

  &__overlay {
    width: 100%;
    height: 100%;
    padding-bottom: var(--indent-lg);
    background-color: rgba(0, 0, 0, 0.8);
  }

  &__center,
  &__left,
  &__right {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  &__left {
    @media (max-width: $media-xs) {
      flex-direction: row;
      align-items: flex-start;
    }
  }

  &__content {
    display: grid;
    grid-template-columns: 288px 1fr 180px;
    gap: 30px;

    @media (max-width: $media-lg) {
      grid-template-columns: 288px 1fr;
    }

    @media (max-width: $media-md) {
      grid-template-columns: 160px 1fr;
    }

    @media (max-width: $media-xs) {
      grid-template-columns: 1fr;
    }
  }

  &__poster {
    position: relative;
    width: 100%;
    border: 1px solid var(--color-yellow);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media (max-width: $media-xs) {
      width: 50%;
      height: auto;
    }
  }

  &__poster-skeleton {
    width: 288px;
    height: 435px;
    background-repeat: no-repeat;
    background-image: linear-gradient(var(--color-skeleton) 100%, transparent 0%);
    background-size: 100% 100%;
    background-position: 0 0;
    animation: fade 1s linear infinite alternate;

    @media (max-width: $media-md) {
      width: 160px;
      height: 241px;
    }

    @media (max-width: $media-xs) {
      width: 50%;
      height: 60vw;
    }
  }

  &__video {
    border: 1px solid var(--color-yellow);

    @media (max-width: $media-xs) {
      width: 50%;
    }
  }

  &__video-skeleton {
    margin-bottom: auto;

    .video {
      background-repeat: no-repeat;
      background-image: linear-gradient(var(--color-skeleton) 100%, transparent 0%);
      background-size: 100% 100%;
      background-position: 0 0;
      animation: fade 1s linear infinite alternate;

      &--preview:before {
        background-color: transparent;
      }
    }

    @media (max-width: $media-xs) {
      width: 50%;
    }
  }

  &__title-skeleton {
    flex-shrink: 0;
    height: 90px;
    background-repeat: no-repeat;
    background-image:
      linear-gradient(var(--color-skeleton) 100%, transparent 0%),
      linear-gradient(var(--color-skeleton) 100%, transparent 0%);
    background-size: 100% 50%, 100% 30%;
    background-position: 0 0, 0 100%;
    animation: fade 1s linear infinite alternate;

    @media (max-width: $media-md) {
      height: 70px;
    }
  }

  &__title-season {
    font-size: 14px;
    color: var(--color-info);
  }

  &__rating-age-wrap {
    display: inline;
    white-space: nowrap;

    &:before {
      content: "\A0";
    }
  }

  &__rating-age {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 0.8em;
    width: 0.8em;
    border: 1px solid currentColor;
    border-radius: 50%;
    transform: translate(0px, -18px);

    span {
      font-size: 10px;
      line-height: 1;
    }

    @media (max-width: $media-xs) {
      transform: translate(0px, -10px);
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__info-title {
    font-size: 24px;
    font-weight: 700;
  }

  &__info-item {
    display: grid;
    gap: 10px;
    grid-template-columns: 160px 1fr;
    font-size: 14px;
    color: var(--color-info);
  }

  &__info-item-title {
  }

  &__info-skeleton {
    height: 100%;
    background-repeat: no-repeat;
    background-image:
      linear-gradient(var(--color-skeleton) 100%, transparent 0%),
      linear-gradient(var(--color-skeleton) 100%, transparent 0%),
      linear-gradient(var(--color-skeleton) 100%, transparent 0%),
      linear-gradient(var(--color-skeleton) 100%, transparent 0%),
      linear-gradient(var(--color-skeleton) 100%, transparent 0%),
      linear-gradient(var(--color-skeleton) 100%, transparent 0%),
      linear-gradient(var(--color-skeleton) 100%, transparent 0%),
      linear-gradient(var(--color-skeleton) 100%, transparent 0%),
      linear-gradient(var(--color-skeleton) 100%, transparent 0%);
    background-size: 60% 3%, 55% 3%, 50% 3%, 50% 3%, 50% 3%, 50% 3%, 50% 3%, 50% 3%, 50% 3%;
    background-position: 0 0, 0 6%, 0 12%, 0 18%, 0 24%, 0 30%, 0 36%, 0 42%, 0 48%;
    animation: fade 1s linear infinite alternate;

    @media (max-width: $media-xs) {
      height: 250px;
    }
  }

  &__description-full {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid var(--color-info);
  }

  &__description-more {
    color: var(--color-yellow);
    background-color: transparent;
    border: none;
  }

  &__info-item-content {
    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    }
  }

  &__rating {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &__rating-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__rating-count {
    font-size: 20px;
    font-weight: 700;
  }

  &__rating-source {
    font-size: 13px;
    color: var(--color-info);
  }

  &__similars {
    margin-top: 20px;
  }

  &__comments-items {
    display: flex;
    flex-direction: column;
    gap: var(--indent-lg);
    margin-top: 40px;
  }

  &__reviews {
    display: flex;
    align-items: flex-end;
    gap: 50px;
  }

  &__reviews-items {
    display: flex;
    gap: 15px;
  }

  &__reviews-item {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 130px;

    .rating-color {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 40px;
      font-size: 18px;
      border-radius: 4px;

      @media (max-width: $media-xs) {
        height: 30px;
        font-size: 14px;
      }
    }

    @media (max-width: $media-xs) {
      width: 85px;
    }
  }

  &__reviews-item-title {
    width: 100%;
    text-align: start;

    @media (max-width: $media-xs) {
      display: none;
    }
  }

  &__reviews-set {
    display: flex;
    justify-content: flex-end;
    gap: 5px;
    direction: rtl;

    .rating-color {
      display: inline-block;
      width: 40px;
      height: 40px;
      font-size: 18px;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      @media (max-width: $media-xs) {
        width: 25px;
        height: 25px;
        font-size: 14px;
      }
    }

    button {
      display: block;
      width: 40px;
      height: 40px;
      //background: crimson;
      color: #fff;
    }
  }

  &__favorite {
    position: absolute;
    top: -2px;
    right: -2px;
    display: flex;
    width: 85px;
    height: 85px;
    background-color: var(--color-bg-main-middle);
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%);

    label {
      display: inline-block;
      margin: 5px 5px auto auto;
    }

    input {
      display: none;

      &:checked + .movie__favorite-ico {
        fill: var(--color-yellow);
      }
    }
  }

  &__favorite-ico {
    width: 35px;
    height: 35px;
    fill: transparent;
    stroke: var(--color-yellow);
    cursor: pointer;
  }
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 100%;
  text-decoration: none;
  cursor: pointer;

  &__img {
    position: relative;
    height: 250px;

    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__title {
    padding: 0 var(--indent-xs);
    font-size: var(--text-xl);
    text-align: center;
  }

  &__description {
  }
}

@keyframes fade {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}
</style>
