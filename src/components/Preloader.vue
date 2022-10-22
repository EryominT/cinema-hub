<template>
  <section>
    <slot v-if="status === LoadingInterface.LoadingStatus.loading" name="loading">
      <Icons name="loader"/>
    </slot>
    <slot v-else-if="status === LoadingInterface.LoadingStatus.ready" name="content"/>
    <slot v-else-if="status === LoadingInterface.LoadingStatus.empty" name="empty">
      <p>данных нет</p>
    </slot>
    <slot v-else-if="status === LoadingInterface.LoadingStatus.error" name="error">
      <p>произошла ошибка</p>
    </slot>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Icons from '@/components/Icons.vue';
import { LoadingInterface } from '@/interfaces/Loading.interface';

export default defineComponent({
  props: {
    status: String,
  },
  setup (props) {
    return {
      LoadingInterface,
    };
  },
  components: {
    Icons,
  },
});
</script>
