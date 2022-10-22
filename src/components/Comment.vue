<template>
  <div class="comment">
    <div v-if="!data?.kinopoiskId" class="comment__img">
      <template v-if="data.user.avatar">
        <img v-if="data.user.avatar.url" :src="data.user.avatar.url">
        <Icons v-else name="profile"/>
      </template>
      <div v-else class="profile__avatar-skeleton"></div>
    </div>
    <div class="comment__main">
      <div class="comment__header">
        <div class="comment__info">
          <div v-if="data?.kinopoiskId" class="comment__label shield shield--kinopoisk">кинопоиск</div>
          <router-link to="#" class="comment__author link">{{data?.author || data?.user?.name}}</router-link>
          <div class="comment__date">{{dateFormatting(data?.date, 'date')}}</div>
          <router-link v-if="source" :to="`/movie-detail/${data?.movieKinopoiskId}`" class="comment__source link">комментарий к записи</router-link>
        </div>
        <button v-if="myComment" @click="deleteComment()" class="comment__delete">
          <Icons name="close"/>
        </button>
      </div>
      <div class="comment__body">
        <div class="comment__title">{{data?.title}}</div>
        <div v-if="data?.description" class="comment__description" :class="{'comment__description--full': !isShowText}">
          <div ref="elDescriptionText" class="comment__description-text">
            <span v-if="isShowText" v-html="textPreview"></span>
            <span v-else v-html="data?.description"></span>
          </div>

          <template v-if="isBtnTextMore">
            <button v-if="isShowText" @click="isShowText = !isShowText" class="comment__description-more">читать дальше</button>
            <button v-else-if="!isShowText" @click="isShowText = !isShowText" class="comment__description-more">свернуть обратно</button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue';
import Icons from '@/components/Icons.vue';
import { dateFormatting } from '@/utils/date-formatting';
import { useStore } from "vuex";
import { key } from "@/store";

export default defineComponent({
  props: {
    data: {},
    source: Boolean,
  },
  setup (props: any) {
    const store = useStore(key);
    const isBtnTextMore = ref(false);
    const elDescriptionText = ref<any>(null);
    const isShowText = ref(true);
    const textPreviewLength = ref<number>(500);
    const textPreview = ref<string>('');
    const myComment = computed(() => {
      if (props?.data?.user?.userId) {
        return props.data.user.userId === store.getters['auth/userId'];
      }
      return false;
    });

    function countRow () {
      const textLength = props.data?.description?.length;

      if (textLength > textPreviewLength.value) {
        isBtnTextMore.value = true;
        textPreview.value = props.data?.description.slice(0, textPreviewLength.value) + '...';
      } else {
        isShowText.value = false;
      }
    }
    function deleteComment () {
      store.dispatch('info/deleteComment', props.data);
    }

    onMounted(() => {
      countRow();
    });

    return {
      dateFormatting,
      elDescriptionText,
      isBtnTextMore,
      isShowText,
      textPreview,
      myComment,
      deleteComment,
    };
  },
  components: {
    Icons,
  },
});
</script>

<style lang="scss" scoped>
.comment {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;

  &__img {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: 25px;
    height: 25px;
    background-color: var(--color-bg-main);
    border-radius: 2px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__main {
    flex-grow: 1;

    @media (any-hover: hover) {
      &:hover {
        .comment__delete {
          opacity: 1;
          pointer-events: auto;
        }
      }
    }
  }

  &__header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
  }

  &__info {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    column-gap: 15px;
    row-gap: 5px;
  }

  &__delete {
    position: absolute;
    top: 0;
    right: 0;
    color: var(--color-white);
    background-color: transparent;
    border: none;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;

    &:focus-visible {
      opacity: 1;
      pointer-events: auto;
    }
  }

  &__label {
    font-size: var(--text-md);
  }

  &__author {
    max-width: 100px;
    font-size: var(--text-lg);
    font-weight: 700;
    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__date {
    font-size: var(--text-md);
    color: var(--color-info);
    white-space: nowrap;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 10px;
  }

  &__title {
    font-size: var(--title-sm);
    font-weight: 700;
  }

  &__description {
    display: flex;
    flex-direction: column;

    &--full {
      //.comment__description-text {
      //  -webkit-line-clamp: unset;
      //}

      .comment__description-more {
        position: static;
        display: block;
        margin-top: 5px;
        margin-left: 0;
        margin-right: auto;

        &:before {
          display: none;
        }
      }
    }
  }

  &__description-text {
    margin: 0;
    padding: 0;
    font-size: 18px;
    line-height: 19px;
    //overflow: hidden;
    //display: -webkit-box;
    //-webkit-box-orient: vertical;
    //-webkit-line-clamp: 7;
  }

  &__description-more {
    background-color: transparent;
    margin-right: auto;
    line-height: 20px;
    border: none;
    color: var(--color-yellow);
  }

  &__source {
    text-decoration: none;
    white-space: nowrap;
  }
}
</style>
