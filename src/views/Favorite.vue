<template>
  <div class="favorite">
    <div class="favorite__content app-block container">
      <h1>
        <template v-if="userFavorite.favoriteMovies && userFavorite.favoriteMovies.length">Избранное</template>
        <template v-else-if="userFavorite.favoriteMovies && !userFavorite.favoriteMovies.length">Список пуст</template>
      </h1>
      <div class="favorite__result grid grid__cards">
        <template v-if="userFavorite.favoriteMovies">
          <div v-for="(item ,idx) in userFavorite.favoriteMovies" :key="idx" class="grid__item">
            <Card :data="item"/>
          </div>
        </template>
        <CardSkeleton v-else v-for="(item, idx) in 7" :key="idx"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import Card from '@/components/Card.vue';
import CardSkeleton from '@/components/skeleton/CardSkeleton.vue';

export default defineComponent({
  setup () {
    const store = useStore(key);
    const userFavorite = computed(() => store.getters['userData/userData']);
    console.log(userFavorite);

    return {
      userFavorite,
    };
  },
  components: {
    Card,
    CardSkeleton,
  },
});
</script>

<style lang="scss" scoped>
.favorite {
  &__result {
    margin: var(--indent-md) 0;
  }
}
</style>
