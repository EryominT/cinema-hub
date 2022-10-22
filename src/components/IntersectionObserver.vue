<template>
  <div ref="observeEl" class="intersection-observer"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';

export default defineComponent({
  props: {
    options: {},
  },
  emits: ['intersect'],
  setup (props, context) {
    const options: any = props.options || {};
    const observeEl = ref(null);
    let observer: any = null;

    onMounted(() => {
      observer = new IntersectionObserver(([entry]) => {
        if (entry && entry.isIntersecting) {
          context.emit('intersect');
        }
      }, options);

      observer.observe(observeEl.value);
    });

    onUnmounted(() => {
      observer.disconnect();
    });

    return {
      observeEl,
    };
  },
});
</script>
