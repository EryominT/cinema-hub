<template>
  <div class="slider">
    <div class="slider__header">
      <div v-if="link" class="slider__title"><router-link :to="link">{{title}}</router-link></div>
      <div v-else class="slider__title">{{title}}</div>

      <div v-if="items && items.length" class="slider__navigation">
        <button ref="prev" class="slider__nav-item slider__nav-item--prev"><icons name="arrow"/></button>
        <button ref="next" class="slider__nav-item slider__nav-item--next"><icons name="arrow"/></button>
      </div>
    </div>

    <swiper
      v-if="items && items.length && store.state.loadedPage"
      :navigation="{ prevEl: prev, nextEl: next }"
      :modules="modules"
      :breakpoints="sliderBreakpoints">
      <swiper-slide v-for="(item, idx) in items" :key="idx">
        <Card :data="item"/>
      </swiper-slide>
    </swiper>
    <div v-if="!store.state.loadedPage" class="slider__skeleton">
      <CardSkeleton/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useStore } from "vuex";
import { key } from "@/store";
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue.js';
import 'swiper/swiper-bundle.css';
import icons from '@/components/Icons.vue';
import Card from '@/components/Card.vue';
import CardSkeleton from '@/components/skeleton/CardSkeleton.vue';

export default defineComponent({
  name: 'Slider',
  components: {
    Swiper,
    SwiperSlide,
    icons,
    Card,
    CardSkeleton,
  },
  props: {
    title: {},
    items: {},
    link: {},
  },
  setup () {
    const store = useStore(key);
    const prev = ref(null);
    const next = ref(null);
    const BREAKPOINTS_1440 = 1440;
    const BREAKPOINTS_1200 = 1200;
    const BREAKPOINTS_1024 = 1024;
    const BREAKPOINTS_900 = 900;
    const BREAKPOINTS_640 = 640;
    const BREAKPOINTS_400 = 400;
    const BREAKPOINTS_320 = 320;

    const SLIDE_COUNT_1440 = 7;
    const SLIDE_COUNT_1200 = 6;
    const SLIDE_COUNT_1024 = 5;
    const SLIDE_COUNT_900 = 4;
    const SLIDE_COUNT_640 = 3;
    const SLIDE_COUNT_400 = 2;
    const SLIDE_COUNT_320 = 1;

    const sliderBreakpoints = {
      [BREAKPOINTS_1440]: { slidesPerView: SLIDE_COUNT_1440 },
      [BREAKPOINTS_1200]: { slidesPerView: SLIDE_COUNT_1200 },
      [BREAKPOINTS_1024]: { slidesPerView: SLIDE_COUNT_1024 },
      [BREAKPOINTS_900]: { slidesPerView: SLIDE_COUNT_900 },
      [BREAKPOINTS_640]: { slidesPerView: SLIDE_COUNT_640 },
      [BREAKPOINTS_400]: { slidesPerView: SLIDE_COUNT_400, spaceBetween: 20 },
      [BREAKPOINTS_320]: { slidesPerView: SLIDE_COUNT_320, spaceBetween: 0, autoHeight: true },
    };

    const cardLoaded = ref(false);

    return {
      store,
      modules: [Navigation],
      prev,
      next,
      SLIDE_COUNT_1440,
      cardLoaded,
      sliderBreakpoints,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/style/variables";

.slider {
  &__header {
    display: flex;
    align-content: center;
    gap: 10px;
    margin-bottom: 10px;
  }

  &__title {
    padding: 0 var(--indent-xs);
    font-size: var(--title-md);

    a {
      text-decoration: none;
    }

    @media (max-width: $media-md) {
      font-size: var(--title-sm);
    }
  }

  &__navigation {
    display: flex;
    gap: 5px;
    margin-left: auto;
    color: var(--color-yellow);
  }

  &__nav-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    background-color: transparent;
    border: none;

    &:disabled {
      color: var(--color-bg-main-middle);
    }
  }

  &__nav-item--prev {
    transform: rotate(-180deg);
  }

  &__skeleton {
    display: flex;
    gap: 20px;
    width: 100%;
    justify-content: space-between;

    :deep(.card-skeleton) {
      &:nth-child(-n+14) {
        display: none;
      }

      @media (max-width: $media-slider-xl) {
        &:nth-child(-n+15) {
          display: none;
        }
      }
      @media (max-width: $media-slider-ld) {
        &:nth-child(-n+16) {
          display: none;
        }
      }
      @media (max-width: $media-lg) {
        &:nth-child(-n+17) {
          display: none;
        }
      }
      @media (max-width: $media-slider-md) {
        &:nth-child(-n+18) {
          display: none;
        }
      }
      @media (max-width: $media-slider-xs) {
        &:nth-child(-n+19) {
          display: none;
        }
      }
      @media (max-width: $media-slider-sm) {
        &:nth-child(-n+20) {
          display: none;
        }
      }
    }
  }
}

.swiper-slide {
  height: auto;
  padding: var(--indent-xs);
}

:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  color: var(--color-bg-main-middle);
}
</style>
