<template>
  <div class="profile">
    <div class="profile__content container">
      <div class="profile__header">
        <div  v-loading="isLoadingAvatar" :element-loading-spinner="LoadingIco" element-loading-svg-view-box="0 0 100 100" class="profile__avatar">
          <div class="profile__avatar">
            <template v-if="userData.avatar">
              <img v-if="userData.avatar.url" :src="userData.avatar.url" alt="Ваша аватарка">
              <Icons v-else name="profile"/>
            </template>
            <div v-else class="profile__avatar-skeleton"></div>
            <label class="profile__upload">
              <input @change="upload($event)" type="file" accept="image/*, .png, .jpg, .gif, .web">
              <div class="profile__upload-target">
                <Icons name="plus"/>
              </div>
            </label>
          </div>
        </div>
        <form @submit.prevent="changeUserData" class="profile__info">
          <div class="profile__info-items">
            <div class="profile__info-item">
              <div class="profile__info-label">Имя</div>
              <div class="profile__info-value">
                <input v-model="newName" type="text" :placeholder="userData.name" class="profile__info-text"/>
              </div>
            </div>

            <div class="profile__info-item">
              <div class="profile__info-label">Почта</div>
              <div class="profile__info-value">
                <input v-model="newEmail" type="text" :placeholder="userData.email" class="profile__info-text"/>
              </div>
            </div>

            <div class="profile__info-item">
              <div class="profile__info-label">Пароль</div>
              <div class="profile__info-value">
                <input v-model="newPassword" type="text" placeholder="*******" class="profile__info-text"/>
              </div>
            </div>
          </div>
          <button class="profile__info-submit">сохранить</button>
        </form>
      </div>
      <div v-if="userData?.comments?.items" class="profile__body">
        <div class="profile__body-title">Мои комментарии</div>
        <div class="profile__comments">
          <div v-for="(item, key, idx) in userData?.comments?.items" :key="idx" class="movie__comment">
            <Comment :data="item" source/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import Icons from "@/components/Icons.vue";
import { useStore } from "vuex";
import { key } from "@/store";
import Comment from '@/components/Comment.vue';
import { LoadingInterface } from "@/interfaces/Loading.interface";
import { User } from "@/interfaces/User.interface";

export default defineComponent({
  setup () {
    const store = useStore(key);
    const userData = computed(() => store.getters['userData/userData']);
    const LoadingIco = LoadingInterface.LoadingIco.ico;
    const isLoadingAvatar = computed(() => store.getters['userData/loadingAvatar']);
    const newEmail = ref('');
    const newPassword = ref('');
    const newName = ref('');

    function upload (e: any) {
      const file = e.target.files[0];
      store.dispatch('userData/updateAvatar', file);
    }

    async function changeUserData () {
      await store.dispatch('userData/updateAccountsData', { target: User.descriptors.Email, newValue: newEmail.value });
      await store.dispatch('userData/updateAccountsData', { target: User.descriptors.Password, newValue: newPassword.value });
      await store.dispatch('userData/updateUserName', { newName: newName.value });
      newEmail.value = '';
      newPassword.value = '';
      newName.value = '';
    }

    return {
      userData,
      LoadingIco,
      isLoadingAvatar,
      newEmail,
      newPassword,
      newName,
      upload,
      changeUserData,
    };
  },
  components: {
    Icons,
    Comment,
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/style/variables";

.profile {
  &__avatar {
    position: relative;
    width: 200px;
    height: 200px;

    @media (any-hover: hover) {
      &:hover {
        .profile__upload-target {
          opacity: 1;
          visibility: visible;
        }
      }
    }

    img,
    .ico {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media (max-width: $media-xs) {
      width: 150px;
      height: 150px;
    }
  }

  &__avatar-skeleton {
    width: 200px;
    height: 200px;
    background-repeat: no-repeat;
    background-image: linear-gradient(var(--color-skeleton) 100%, transparent 0%);
    background-size: 100% 100%;
    background-position: 0 0;
    animation: fade 1s linear infinite alternate;

    @media (max-width: $media-xs) {
      width: 150px;
      height: 150px;
    }
  }

  &__avatar-load {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
  }

  &__upload {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;

    input {
      width: 0;
      height: 0;

      &:focus-visible {
        & + .profile__upload-target {
          opacity: 1;
          visibility: visible;
          box-shadow: 0 0 0 1px var(--color-yellow) inset;
        }
      }
    }

    .ico {
      width: 110px;
      height: 110px;
    }
  }

  &__upload-target {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease-in;
    color: #fff;
    background: rgb(70, 70, 70, 0.74);
    cursor: pointer;
  }

  &__header {
    display: flex;
    gap: 15px;

    @media (max-width: $media-xs) {
      flex-direction: column;
    }
  }

  &__info {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  &__info-label {
    font-size: 14px;
  }

  &__info-value {
    font-size: 18px;

    input {
      display: inline-block;
      width: 100%;
      padding: 5px 10px;
      background-color: var(--color-bg-main-middle);
      border: none;
    }
  }

  &__info-submit {
    display: block;
    height: 40px;
    margin: 10px 0 0 auto;
    padding: 5px 10px;
    color: var(--color-yellow);
    background-color: var(--color-bg-main-middle);
    border: none;
    border-radius: 5px;
  }

  &__info-items {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;

    @media (max-width: $media-md) {
      grid-template-columns: 1fr;
    }
  }

  &__info-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__body {
    margin-top: 30px;
  }

  &__body-title {
    font-size: 25px;
  }

  &__comments {
    display: flex;
    flex-direction: column;
    gap: var(--indent-lg);
    margin-top: 20px;
  }

  &__comment {

  }
}

:deep(.el-loading-spinner) {
  height: 150px;
  width: 150px;
  margin: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

:deep(.el-loading-spinner .circular) {
  height: 150px;
  width: 150px;
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
