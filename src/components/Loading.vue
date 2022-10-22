<template>
  <div class="loader">
    <Icons name="loader"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Icons from '@/components/Icons.vue';

export default defineComponent({
  components: {
    Icons,
  },
});
</script>

<style lang="scss">
.loader {
  .ico {
    width: 70px;
    height: 70px;
  }
}
</style>
