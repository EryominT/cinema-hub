<template>
  <div class="main-layout">
    <headerComponent @toggleMenu="toggleMenu" @closeMenu="isOpenMenu = false"/>
    <div class="content">
      <sidebarComponent @closeMenu="isOpenMenu = false" :class="{active: isOpenMenu}"/>
       <router-view class="main" :key="route.path"/>
    </div>
    <footerComponent/>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import headerComponent from '@/components/Header.vue';
import sidebarComponent from '@/components/Sidebar.vue';
import footerComponent from '@/components/Footer.vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup () {
    const isOpenMenu = ref<boolean | string>(false);
    const store = useStore(key);
    const route: any = useRoute();
    const userId = localStorage.getItem('userId');

    function toggleMenu () {
      isOpenMenu.value = !isOpenMenu.value;
    }

    onMounted(async () => {
      await store.dispatch('userData/userDataLoad', userId);
    });

    return {
      isOpenMenu,
      toggleMenu,
      route,
    };
  },
  components: {
    headerComponent,
    sidebarComponent,
    footerComponent,
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/style/variables";

.main-layout {
  flex-direction: column;
  min-height: 100vh;
  display: flex;
}

.content {
  display: flex;
  flex-grow: 1;
  padding-left: 50px;
  background-color: var(--color-bg-main);

  @media (max-width: $media-md) {
    padding-left: 0;
  }
}

.main {
  flex-grow: 1;
  padding-top: var(--indent-lg);
  padding-bottom: var(--indent-xl);
  //background-color: var(--color-bg-main);
}
</style>
