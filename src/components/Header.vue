<template>
  <header class="header">
    <button class="header__toggle-menu" @click="toggleMenu">
      <icons name="burger"/>
    </button>

    <a @click.prevent="toHome" href="/" class="header__logo">
      <img src="../assets/images/icons/logo-text.png">
    </a>

    <div class="header__dropdown" ref="dropdown">
      <button @click="toggkeDropDown" class="header__dropdown-label header__profile">
        <div class="header__avatar">
          <template v-if="userInfo.avatar">
            <img v-if="userInfo.avatar.url" :src="userInfo.avatar.url">
            <icons v-else name="profile"/>
          </template>
          <div v-else class="header__avatar-skeleton"></div>
        </div>
        <span class="header__name">
        <template v-if="userInfo.name">{{userInfo.name}}</template>
        <span v-else class="header__name-skeleton"></span>
      </span>
      </button>
      <div v-if="dropDownLabel" class="header__dropdown-list">
        <ul>
          <li v-for="(item, index) in dropDownMenu" :key="index">
            <a href="#" @click.prevent="goToLink(item.url)">{{item.title}}</a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import icons from '@/components/Icons.vue';
import { defineComponent, ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { key } from '@/store';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { links } from '@/interfaces/Links.interface';

export default defineComponent({
  emits: ['toggleMenu', 'closeMenu'],
  setup (props: any, context: any) {
    const store = useStore(key);
    const router = useRouter();
    const dropDownLabel = ref(false);
    const dropDownMenu = [
      { title: 'Мой профиль', url: links.Profile, dataAction: 'to-settings' },
      { title: 'Избранное', url: links.Favorite, dataAction: 'to-critique' },
      { title: 'Выйти', url: links.Login, dataAction: 'to-login' },
    ];
    const dropdown = ref<any>(null);
    const userInfo = computed(() => store.getters['userData/userData']);

    onMounted(() => {
      document.addEventListener('click', closeDropdown);
    });

    function toggleMenu () {
      context.emit('toggleMenu');
    }

    function goToLink (url: string) {
      if (url === links.Login) {
        store.commit('auth/logout');
        router.push(url);
      } else {
        router.push(url);
      }
    }

    function closeDropdown (e: Event) {
      if (dropdown.value !== e.target && !dropdown.value?.contains(e.target)) {
        dropDownLabel.value = false;
      }
    }

    onBeforeUnmount(() => {
      document.removeEventListener('click', closeDropdown);
    });

    function toHome () {
      router.push('/');
      context.emit('closeMenu');
    }

    function toggkeDropDown () {
      dropDownLabel.value = !dropDownLabel.value;
      context.emit('closeMenu');
    }

    return {
      toggleMenu,
      goToLink,
      toHome,
      toggkeDropDown,
      dropDownMenu,
      dropDownLabel,
      dropdown,
      userInfo,
    };
  },
  components: {
    icons,
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/style/variables";

.header {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--indent-xl);
  padding: 0 0 0 0;
  background-color: var(--color-bg-main-dark);
  box-shadow: 0 0 6px 1px #000;
  z-index: 5;
  transition: all 0.3s ease;

  &__toggle-menu {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    padding: 0;
    color: var(--color-white);
    background-color: transparent;
    border: none;
    cursor: pointer;
    overflow: hidden;

    svg {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
  }

  &__logo {
    display: flex;
    align-items: center;
    height: 100%;
    margin-left: 20px;
    padding: 5px;
    font-size: 35px;
    text-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 20px #ffffff, 0 0 43px #ff0000, 0 0 84px #ff0000, 0 0 85px #ff0000, 0 0 57px #ff0000, 0 0 90px #ff0000;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__categories {
    display: flex;
    gap: 10px;
    margin: 0 auto;
    padding: 0;
    list-style: none;
  }

  .el-dropdown {
    display: flex;
    align-items: center;
    max-width: 200px;
    width: 100%;
    height: 100%;
    padding: 7px 20px;
  }

  :deep(.el-tooltip__trigger) {
    height: 100%;
  }

  .el-dropdown-link {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;

    &__profile {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }

  .el-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__profile-dropdown {
      margin: 0;
      padding: 0;
      list-style: none;
      background-color: var(--color-bg-main-dark);

    li {
      padding: 10px 20px;

      a {
        text-decoration: none;
      }
    }
  }

  &__dropdown {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 200px;
    width: 100%;
    height: 100%;

    @media (max-width: $media-md) {
      //max-width: 135px;
    }
  }

  &__dropdown-label {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  &__dropdown-list {
    position: absolute;
    right: 0;
    top: 100%;
    max-width: 200px;
    width: 100%;
    background-color: var(--color-bg-main-dark);
    transition: all 0.2s ease-in;

    li {
      padding: 10px;

      a {
        text-decoration: none;
      }
    }
  }

  &__profile {
    font-size: 16px;
  }

  &__avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--header-avatar);
    height: var(--header-avatar);
    overflow: hidden;
    border-radius: 50%;
    transition: all 0.3s ease;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__avatar-skeleton {
    width: var(--header-avatar);
    height: var(--header-avatar);
    background-repeat: no-repeat;
    background-image: linear-gradient(var(--color-bg-main) 100%, transparent 0%);
    background-size: 100% 100%;
    background-position: 0 0;
    animation: fade 1s linear infinite alternate;
  }

  &__name {
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__name-skeleton {
    display: inline-block;
    width: 100px;
    height: 1em;
    background-repeat: no-repeat;
    background-image: linear-gradient(var(--color-bg-main) 100%, transparent 0%);
    background-size: 90% 100%;
    background-position: 0 0;
    animation: fade 1s linear infinite alternate;
  }
}

@keyframes fade {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}
</style>
