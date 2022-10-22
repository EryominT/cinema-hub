<template>
  <footer class="footer">
    <div class="footer__title">
      <a href="https://github.com/EryominT" target="_blank">&#169; Ерёмин Тимофей</a>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Footer',
});
</script>

<style lang="scss" scoped>
.footer {
  padding: var(--indent-lg) 10px;
  background: var(--color-bg-main-black);

  &__title {
    text-align: end;
    font-size: var(--text-md);
    color: var(--color-yellow);

    a {
      padding: 5px;
    }
  }
}
</style>
