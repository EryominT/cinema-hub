<template>
  <div class="not-found">
    <h1 class="not-found__title">Страница не найдена</h1>
    <router-link to="/" class="not-found__subtitle">На главную</router-link>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  text-align: center;

  &__subtitle {
    display: inline-block;
    margin-top: 20px;
    font-size: var(--title-sm);
    color: var(--color-yellow);
  }
}
</style>
