<template>
  <aside class="sidebar-wrap">
    <nav class="menu">
      <ul>
        <li v-for="item in links" :key="item.title">
          <a @click.prevent="toLink(item.url)" :href="item.url">
            <Icons :name="item.ico"/>
            <span class="menu__text">{{item.title}}</span>
          </a>
        </li>
      </ul>
    </nav>
    <div @click="closeMenu" class="sidebar-overlay"></div>
  </aside>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Icons from "@/components/Icons.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  emits: ['closeMenu'],
  setup (props: any, context: any) {
    const router = useRouter();
    const links = ref([
      {
        title: 'Главная',
        url: '/',
        ico: 'home',

      },
      {
        title: 'Поиск',
        url: '/category-search',
        ico: 'search',
      },
      // {
      //   title: 'Чат',
      //   url: '/',
      //   ico: 'chat',
      // },
      // {
      //   title: 'Мои сообщения',
      //   url: '/',
      //   ico: 'letter',
      // },
    ]);

    function closeMenu () {
      context.emit('closeMenu');
    }

    function toLink (url: string) {
      router.push(url);
      closeMenu();
    }

    return {
      links,
      toLink,
      closeMenu,
    };
  },
  components: {
    Icons,
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/style/variables";

.sidebar-wrap {
  position: fixed;
  left: 0;
  height: 100%;
  width: 50px;
  padding: 10px 0;
  background: var(--color-bg-main-middle);
  box-shadow: 0 0 6px 1px #000;
  transition: width 0.3s;
  z-index: 2;

  &.active {
    width: 200px;

    .menu__text {
      display: block;
    }

    .sidebar-overlay {
      display: block;
    }
  }

  @media (max-width: $media-md) {
    width: 0;
  }
}

.menu {
  position: sticky;
  top: calc(var(--indent-xl) + 10px);
  margin: 0;
  overflow: hidden;
  transition: all 0.3s ease;
  z-index: 2;

  &__text {
    display: none;
    white-space: nowrap;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      a {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 5px 12px;
        text-decoration: none;

        .ico {
          flex-shrink: 0;
        }
      }
    }
  }
}

.sidebar-overlay {
  position: fixed;
  left: 0;
  top: 0;
  display: none;
  width: 100%;
  height: 100%;
}
</style>
