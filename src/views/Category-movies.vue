<template>
  <div class="category container">
    <h1>{{title}}</h1>
    <div class="category__result grid grid__cards">
      <template v-if="store.state.loadedPage">
        <div v-for="(item, idx) in movieList" :key="idx" class="grid__item">
          <Card :data="item" @click="$router.push(`/movie-detail/${item.kinopoiskId}`)"/>
        </div>
      </template>
      <CardSkeleton v-if="!store.state.loadedPage"/>
    </div>
    <Loading v-if="loading"/>
    <IntersectionObserver @intersect="intersected"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import { useRoute } from "vue-router";
import Card from '@/components/Card.vue';
import CardSkeleton from '@/components/skeleton/CardSkeleton.vue';
import IntersectionObserver from '@/components/IntersectionObserver.vue';
import Loading from '@/components/Loading.vue';
import { MoviesInterface } from "@/interfaces/Movies.interface";

export default defineComponent({
  setup () {
    const store = useStore(key);
    const movieList = ref<MoviesInterface.MovieCard[]>([]);
    const route = useRoute();
    const currentRoute: MoviesInterface.CategoryId = route.meta.categoryId as MoviesInterface.CategoryId;
    const reviewsNumPage = ref(1);
    const loading = ref(false);
    const genre = ref<MoviesInterface.CategoryGenreId>(MoviesInterface.CategoryGenreId.thriller);
    const sortGenre = ref('RATING');
    const isTvSeries = ref(false);
    const ratingFrom = ref(0);
    const ratingTo = ref(10);
    const yearFrom = ref(1900);
    const yearTo = ref(3000);
    const totalPages = ref(0);
    const title = ref<MoviesInterface.CategoryName | string>('');
    // const loadingSkeleton = ref(false);

    async function getMovies () {
      // loadingSkeleton.value = false;
      let moviesList: MoviesInterface.MoviesList | null = null;
      genre.value = MoviesInterface.CategoryGenreId[currentRoute as keyof typeof MoviesInterface.CategoryGenreId];
      title.value = MoviesInterface.CategoryName[currentRoute as keyof typeof MoviesInterface.CategoryName];

      if (currentRoute === MoviesInterface.CategoryId.Premier) {
        moviesList = await store.dispatch('cinema/moviesPremieresLoad');
        title.value = 'Премьеры этого этого месяца';
      } else if (currentRoute === MoviesInterface.CategoryId.TvSerie) {
        isTvSeries.value = true;
        genre.value = Math.floor(Math.random() * (33 + 1 - 0));
        title.value = 'Сериалы';
        moviesList = await getMoviesApi();
      } else {
        moviesList = await getMoviesApi();
      }

      // loadingSkeleton.value = true;
      store.commit('loadedPageSet', true);

      if (moviesList && moviesList.items) {
        movieList.value = moviesList.items;
        totalPages.value = moviesList.totalPages;
      }
    }

    getMovies();

    async function getMoviesApi () {
      return await store.dispatch('cinema/moviesOnFiltersLoad', {
        genre: genre.value,
        sortMode: sortGenre.value,
        typeMovie: isTvSeries.value,
        pageNum: reviewsNumPage.value,
        ratingFrom: ratingFrom.value,
        ratingTo: ratingTo.value,
        yearFrom: yearFrom.value,
        yearTo: yearTo.value,
      });
    }

    async function intersected () {
      if (reviewsNumPage.value < totalPages.value) {
        loading.value = true;
        reviewsNumPage.value++;
        const newArr = await store.dispatch('cinema/moviesOnFiltersLoad', {
          genre: genre.value,
          sortMode: sortGenre.value,
          typeMovie: isTvSeries.value,
          pageNum: reviewsNumPage.value,
          ratingFrom: ratingFrom.value,
          ratingTo: ratingTo.value,
          yearFrom: yearFrom.value,
          yearTo: yearTo.value,
        });
        movieList.value = [...movieList.value, ...newArr.items];
        loading.value = false;
      }
    }

    return {
      store,
      movieList,
      loading,
      intersected,
      title,
      // loadingSkeleton,
    };
  },
  components: {
    Card,
    CardSkeleton,
    IntersectionObserver,
    Loading,
  },
});
</script>

<style lang="scss" scoped>
.category {
  margin-top: var(--indent-lg);
  overflow: hidden;

  &__search {
    display: flex;
    max-width: 650px;
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
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    max-width: 650px;
    width: 100%;
    margin: 15px auto 0;
    font-size: var(--text-md);
  }

  &__filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    background-color: var(--color-bg-main-middle);
    overflow: hidden;
    border-radius: 3px;

    input {
      background-color: var(--color-bg-main-middle);
    }

    input[type="number"] {
      width: 50%;
      height: 100%;
      padding: 5px;
      border: none;
    }

    &--text {
      background-color: transparent;
    }
  }

  &__filter-label {
    padding: 5px;
  }

  &__filter-range {
    height: 100%;
  }

  &__filter-checkbox {
    display: flex;
    align-items: center;
    gap: 5px;
    height: 100%;
  }

  &__result {
    margin: var(--indent-md) 0;
  }
}

:deep(.el-select__icon) {
  svg {
    width: 15px;
    height: 15px;
  }
}

:deep(.category__filter .el-input) {
  display: flex;
  height: 100%;
}

:deep(.category__filter .category__filter-dropdown),
:deep(.category__filter .select-trigger),
:deep(.category__filter .el-select) {
  height: 100%;
  width: 100%;
}

:deep(.category__filter .el-input__inner) {
  height: 100%;
  padding: 5px;
  background-color: var(--color-bg-main-middle);
  border: none;
  cursor: pointer;
}

:deep(.category__filter .el-input__suffix) {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  cursor: pointer;
}

:deep(.category__filter .is-disabled .el-input__suffix) {
  opacity: 0.3;
}

//:global(.el-select-dropdown) {
//  margin: -12px 0 0;
//  padding: 10px 5px;
//  background-color: var(--color-bg-main-middle);
//  border-radius: 3px;
//}

//:global(.el-select-dropdown__list) {
//  display: flex;
//  flex-direction: column;
//  gap: 7px;
//  max-height: 300px;
//  overflow-y: auto;
//}
//
//:global(.el-select-dropdown__list li) {
//  display: flex;
//  flex-direction: column;
//  gap: 5px;
//  cursor: default;
//  font-size: var(--text-md);
//}
</style>
