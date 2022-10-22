<template>
  <component :is="layout" :class="{'small-header': isSmallHeader}" class="my-app">
    <router-view/>
  </component>
  <alert/>
  <customDialog></customDialog>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onBeforeUnmount, ref } from 'vue';
import registerLayout from '@/layout/Register-layout.vue';
import mainLayout from '@/layout/Main-layout.vue';
import { useRoute } from 'vue-router';
import alert from '@/components/alert.vue';
import customDialog from '@/components/Dialog.vue';

export default defineComponent({
  setup () {
    const route = useRoute();
    const isSmallHeader = ref(false);

    function toggleHeaderClass () {
      isSmallHeader.value = window.pageYOffset > 70;
    }

    onMounted(() => {
      window.addEventListener('scroll', toggleHeaderClass);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', toggleHeaderClass);
    });

    return {
      layout: computed(() => {
        return route.meta.layout;
      }),
      isSmallHeader,
    };
  },
  components: {
    registerLayout,
    mainLayout,
    alert,
    customDialog,
  },
});
</script>

<style lang="scss">
@import "assets/style/variables";
@import "assets/style/fonts";
@import "assets/style/base";
@import "assets/style/el-element";

.small-header {
  --indent-xl: 50px;
  --header-avatar: 35px;
}

.el-loading-mask.el-loading-mask {
  background-color: rgba(45, 45, 45, 0.64);
}
</style>
