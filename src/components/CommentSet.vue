<template>
  <form @submit.prevent="submit" class="send-text">
    <div class="send-text__img">
      <template v-if="user.avatar">
        <img v-if="user.avatar.url" :src="user.avatar.url">
        <Icons v-else name="profile"/>
      </template>
      <div v-else class="send-text__avatar-skeleton"></div>
    </div>

    <div class="send-text__main">
      <div class="send-text__input">
        <el-input
          v-model="text"
          type="textarea"
          placeholder="Вам есть что сказать?"
          resize="none"
          :autosize="{ minRows: 3, maxRows: 6 }"
        />
      </div>
      <div class="send-text__action">
        <button class="btn" type="submit">Отправить</button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
import Icons from "@/components/Icons.vue";
import { User } from "@/interfaces/User.interface";

export default defineComponent({
  props: {
    data: Object,
  },
  setup (props) {
    const store = useStore(key);
    const user = computed(() => (store.getters['userData/userData']));
    const text = ref('');

    async function submit () {
      if (text.value) {
        const data = {
          movieKinopoiskId: props.data?.kinopoiskId,
          date: new Date().getTime(),
          description: text.value,
          user: {
            name: user.value.name,
            userId: user.value.userId,
            avatar: {
              url: user.value.avatar.url,
            },
          },
        } as User.Comment;

        await store.dispatch('info/addComment', data);
      }

      text.value = '';
    }

    return {
      user,
      text,
      submit,
    };
  },
  components: {
    Icons,
  },
});
</script>

<style lang="scss" scoped>
.send-text {
  display: flex;
  gap: 10px;
  width: 100%;

  &__main {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
    border: 1px solid var(--color-bg-main);
    border-radius: 4px;
  }

  &__img {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid var(--color-bg-main);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .ico {
      width: 100%;
      height: 100%;
    }
  }

  &__input {
    display: flex;
    flex-direction: column;
    width: 100%;

    :deep(.el-textarea__inner) {
      padding: 5px;
      background-color: transparent;
      border: none;
      color: var(--color-white);
      box-shadow: none;

      &::placeholder {
        color: var(--color-white);
        opacity: 0.4;
      }
    }
  }

  &__action {
    margin-top: 10px;
  }

  &__avatar-skeleton {
    width: 50px;
    height: 50px;
    background-repeat: no-repeat;
    background-image: linear-gradient(var(--color-skeleton) 100%, transparent 0%);
    background-size: 100% 100%;
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
