<template>
  <div class="category container">
    <form @submit.prevent="searchByKeyword" class="category__search">
      <input v-model="inputSearch" type="text">
      <button @click="resetMovies" type="button"><Icons name="close"/></button>
      <button type="submit">Найти</button>
    </form>

    <form @submit.prevent="getMovies" class="category__filters">

      <div class="category__filter">
        <div class="category__filter-label">Жанр</div>
        <el-select v-model="genre" placeholder="Select" size="large" class="category__filter-item">
          <el-option
            v-for="item in getters"
            :key="item.id"
            :label="item.genre"
            :value="item.id"
            popperClass="custom-select"/>
        </el-select>
      </div>

      <div class="category__filter">
        <div class="category__filter-label">Отфильтровать по</div>
        <el-select v-model="sortGenre" placeholder="Select" size="large" class="category__filter-item">
          <el-option
            v-for="item in sortGenres"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </div>

      <div class="category__filter category__filter--multiple">
        <div class="category__filter-inner">
          <div class="category__filter-label">Рейтинг от</div>
          <el-input-number
            :min="1"
            :max="10"
            controls-position="right"
            v-model="ratingFrom"
            class="category__filter-item category__filter-range"/>
        </div>
        <div class="category__filter-inner">
          <div class="category__filter-label">Рейтинг до</div>
          <el-input-number
            :min="1"
            :max="10"
            controls-position="right"
            v-model="ratingTo"
            class="category__filter-item category__filter-range"/>
        </div>
      </div>

      <div class="category__filter category__filter--multiple">
        <div class="category__filter-inner">
          <div class="category__filter-label">Год выхода от</div>
          <el-input-number
            :min="1900"
            :max="2030"
            controls-position="right"
            v-model="yearFrom"
            class="category__filter-item category__filter-range"/>
        </div>
        <div class="category__filter-inner">
          <div class="category__filter-label">Год выхода до</div>
          <el-input-number
            :min="1900"
            :max="2030"
            controls-position="right"
            v-model="yearTo"
            class="category__filter-item category__filter-range"/>
        </div>
      </div>

      <div class="category__submit">
        <el-checkbox v-model="isTvSeries" label="только сериалы" />
        <button type="submit">Применить</button>
      </div>
    </form>

    <div class="category__result grid grid__cards">
      <template v-if="store.state.loadedPage" >
        <div v-for="(item, idx) in resultMovie" :key="idx" class="grid__item">
          <Card :data="item"/>
        </div>
      </template>
      <CardSkeleton v-if="!store.state.loadedPage"/>
    </div>
    <Loading v-if="loading"/>
    <IntersectionObserver @intersect="intersected"/>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import Card from '@/components/Card.vue';
import CardSkeleton from '@/components/skeleton/CardSkeleton.vue';
import IntersectionObserver from '@/components/IntersectionObserver.vue';
import Loading from '@/components/Loading.vue';
import { MoviesInterface } from "@/interfaces/Movies.interface";
import Icons from "@/components/Icons.vue";
import favorite from "@/views/Favorite.vue";

export default defineComponent({
  setup () {
    const store = useStore(key);
    const genre = ref(1);
    const sortGenre = ref('RATING');
    const getters = ref<any>([]);
    const sortGenres = ref<any>({
      rating: {
        label: 'По рейтингу',
        value: 'RATING',
      },
      numVote: {
        label: 'По голосам',
        value: 'NUM_VOTE',
      },
      year: {
        label: 'По году',
        value: 'YEAR',
      },
    });
    const isTvSeries = ref(false);
    const reviewsNumPage = ref(1);
    const ratingFrom = ref(0);
    const ratingTo = ref(10);
    const yearFrom = ref(1900);
    const yearTo = ref(3000);
    const loading = ref(false);
    const inputSearch = ref('');
    const searching = ref(false);
    const searchPageNum = ref(1);
    const resultFilter = ref<MoviesInterface.MoviesOnFilterData>();
    const resultMovie = ref<MoviesInterface.Films[]>([]);
    const resultSearch = ref<MoviesInterface.searchByKeyword>();
    const defaultFilter = ref<MoviesInterface.MoviesOnFilterLoadParams>({
      genre: 1,
      sortMode: 'RATING',
      typeMovie: false,
      pageNum: 1,
      ratingFrom: 0,
      ratingTo: 10,
      yearFrom: 1900,
      yearTo: 3000,
    });

    Object.entries(MoviesInterface.CategoryName).forEach((item, index) => {
      const key = item[0];
      getters.value.push({
        id: MoviesInterface.CategoryGenreId[key as keyof typeof MoviesInterface.CategoryGenreId],
        genre: item[1],
      });
    });

    async function searchByKeyword () {
      searching.value = true;
      resultSearch.value = await store.dispatch('cinema/searchByKeywordLoad', { keyword: inputSearch.value, page: searchPageNum.value });
      if (resultSearch.value) {
        resultMovie.value = resultSearch.value.films;
      }
    }

    async function getMovies () {
      store.commit('loadedPageSet', false);
      searching.value = false;
      const qwerty = await store.dispatch('cinema/moviesOnFiltersLoad', {
        genre: genre.value,
        sortMode: sortGenre.value,
        typeMovie: isTvSeries.value,
        pageNum: reviewsNumPage.value,
        ratingFrom: ratingFrom.value,
        ratingTo: ratingTo.value,
        yearFrom: yearFrom.value,
        yearTo: yearTo.value,
      });
      resultFilter.value = qwerty;
      resultMovie.value = qwerty.items;
      store.commit('loadedPageSet', true);
    }

    async function resetMovies () {
      searching.value = false;
      const qwerty = await store.dispatch('cinema/moviesOnFiltersLoad', defaultFilter.value);
      resultFilter.value = qwerty;
      resultMovie.value = qwerty.items;
      inputSearch.value = '';
    }

    async function intersected () {
      if (searching.value && resultSearch.value && resultSearch.value.pagesCount > 1) {
        searchPageNum.value++;
        searchByKeyword();
      }

      if (resultFilter.value && reviewsNumPage.value < resultFilter.value?.totalPages && !searching.value) {
        loading.value = true;
        reviewsNumPage.value++;
        const currentList = await store.dispatch('cinema/moviesOnFiltersLoad', {
          genre: genre.value,
          sortMode: sortGenre.value,
          typeMovie: isTvSeries.value,
          pageNum: reviewsNumPage.value,
          ratingFrom: ratingFrom.value,
          ratingTo: ratingTo.value,
          yearFrom: yearFrom.value,
          yearTo: yearTo.value,
        });

        resultMovie.value = [...resultMovie.value, ...currentList.items];

        loading.value = false;
      }
    }

    getMovies();

    return {
      store,
      genre,
      getters,
      sortGenres,
      sortGenre,
      isTvSeries,
      resultMovie,
      ratingFrom,
      ratingTo,
      yearFrom,
      yearTo,
      loading,
      inputSearch,
      intersected,
      searchByKeyword,
      getMovies,
      resetMovies,
    };
  },
  components: {
    Card,
    CardSkeleton,
    IntersectionObserver,
    Loading,
    Icons,
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/style/variables";

.category {
  margin: var(--indent-lg) auto var(--indent-lg);
  overflow: hidden;

  &__search {
    display: flex;
    width: 100%;
    height: 40px;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 5px;

    input {
      display: inline-block;
      width: 100%;
      padding: 5px 10px;
      background-color: var(--color-bg-main-middle);
      border: none;
    }

    button {
      padding: 5px 10px;
      color: var(--color-yellow);
      background-color: var(--color-bg-main-middle);
      border: none;
    }
  }

  &__filters {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    width: 100%;
    margin: 15px auto 0;
    font-size: var(--text-md);

    @media (max-width: 1400px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: $media-xs) {
      grid-template-columns: 1fr;
    }
  }

  &__filter {
    display: flex;
    flex-direction: column;
    gap: 5px;

    &--multiple {
      flex-direction: row;
    }

    .checkbox {
      display: flex;
      align-items: center;
      height: 100%;
    }
  }

  &__filter-inner {
    display: flex;
    flex-direction: column;
    gap: 5px;
    flex-grow: 1;
  }

  &__filter-item {
    height: 40px;
  }

  &__filter-range {
    display: flex;
    flex-grow: 1;
    gap: 15px;

    :deep(.el-input),
    :deep(.el-input__wrapper) {
      width: 100%;
      height: 100%;
    }
  }

  &__submit {
    display: flex;
    align-items: center;
    gap: 15px;
    justify-self: end;
    grid-column: 4/5;

    button {
      display: block;
      height: 40px;
      padding: 5px 10px;
      color: var(--color-yellow);
      background-color: var(--color-bg-main-middle);
      border: none;
      border-radius: 5px;
    }

    @media (max-width: 1400px) {
      grid-column: 2/3;
    }

    @media (max-width: $media-xs) {
      grid-column: auto;
    }
  }

  &__result {
    margin-top: 20px;
  }

  &__skeleton {
    display: flex;
    gap: 20px;
    width: 100%;
    justify-content: space-between;
  }
}
</style>
