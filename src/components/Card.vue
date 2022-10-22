<template>
  <div class="card">
    <div @click="toDetailMove" class="card__img">
      <img :src="data.posterUrlPreview" :alt="data.nameRu">
    </div>

    <div class="card__title">{{data.nameRu}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useRouter } from 'vue-router';
import { MoviesInterface } from '@/interfaces/Movies.interface';
import icons from '@/components/Icons.vue';

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<MoviesInterface.MovieCard>,
    },
  },
  setup (props: any) {
    const router = useRouter();

    function toDetailMove () {
      const moveId = props.data.kinopoiskId ? props.data.kinopoiskId : props.data.filmId;
      router.push(`/movie-detail/${moveId}`);
    }

    return {
      toDetailMove,
    };
  },
  components: {
    icons,
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/style/variables";

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--indent-xs);
  height: 100%;
  width: 170px;
  margin: 0 auto;
  text-decoration: none;

  &__img {
    position: relative;
    height: 250px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      box-shadow: 0 0 3px 5px var(--color-bg-main-dark-alfa);
      border-radius: 7px;
    }
  }

  &__title {
    margin-top: var(--indent-xs);
    padding: 0 var(--indent-xs);
    font-size: var(--text-xl);
    text-align: center;
  }
}
</style>
