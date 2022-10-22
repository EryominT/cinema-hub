<template>
  <div class="home container">
    <Preloader/>
    <h1 class="h2">CinemaHub - ваша библиотека фильмов и сериалов.</h1>
    <div class="home__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis dignissimos id ipsa, ipsum laboriosam maxime minus molestiae nobis sequi similique unde veniam voluptate! Dolor, ea inventore nisi saepe tempora veniam?</div>

    <div class="home__block">
      <slider title="Премьеры этого этого месяца" link="/category-movies/premier" :items="premieresMovies.items"/>
    </div>

    <div class="home__block">
      <slider :title="'Сериалы'" link="/category-movies/tv-series" :items="tvSeriesMovies.items"/>
    </div>

    <div class="home__block">
      <slider :title="'Аниме'" link="/category-movies/anime" :items="anime.items"/>
    </div>

    <div class="home__block">
      <slider :title="'Мультфильмы'" link="/category-movies/cartoon" :items="movies.items"/>
    </div>

    <div class="home__info">
      <h2 class="h3">Lorem ipsum dolor sit amet, consectetur.</h2>
      <div class="home__info-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores eius facere magnam non numquam porro quod, recusandae repudiandae rerum soluta. Ad, amet aut commodi deleniti dolores error, eum facere inventore, ipsa labore minima mollitia omnis quibusdam recusandae similique sit sunt ullam! Beatae, delectus inventore iste laboriosam officia optio veniam. Ut.</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import slider from '@/components/Slider.vue';
import { key } from '@/store';
import Preloader from '@/components/Preloader.vue';
import { MoviesInterface } from "@/interfaces/Movies.interface";

export default defineComponent({
  name: 'Home',
  components: {
    slider,
    Preloader,
  },
  setup () {
    const store = useStore(key);
    const tvSeriesMovies = ref<MoviesInterface.MoviesOnFilter[]>([]);
    const anime = ref<MoviesInterface.MoviesOnFilter[]>([]);
    const movies = ref<MoviesInterface.MoviesOnFilter[]>([]);
    const premieresMovies = ref<MoviesInterface.MovieCard[]>([]);

    onMounted(() => getMovies());

    async function getMovies () {
      const randomGenre = Math.floor(Math.random() * (33 + 1 - 0));
      store.commit('loadedPageSet', false);

      try {
        await store.dispatch('cinema/moviesPremieresLoad');
        tvSeriesMovies.value = await store.dispatch('cinema/moviesOnFiltersLoad', { genre: randomGenre, typeMovie: true });
        anime.value = await store.dispatch('cinema/moviesOnFiltersLoad', { genre: 24 });
        movies.value = await store.dispatch('cinema/moviesOnFiltersLoad', { genre: 18 });
        premieresMovies.value = store.getters['cinema/moviesPremieres'];
      } catch (e) {}

      store.commit('loadedPageSet', true);
    }

    return {
      store,
      premieresMovies,
      tvSeriesMovies,
      anime,
      movies,
    };
  },
});
</script>

<style lang="scss">
@import "../assets/style/variables";

.home {
  overflow: hidden;

  &__description {
    margin-top: var(--indent-md);
  }

  &__block {
    margin-top: var(--indent-lg);

    @media (max-width: $media-xs) {
      margin-top: var(--indent-sm);
    }
  }

  &__info {
    margin-top: var(--indent-xl);
  }

  &__info-text {
    margin-top: var(--indent-sm);
  }
}
</style>
