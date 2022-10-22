<template>
  <div class="register-layout">
    <div class="register-layout__content">
      <router-view/>
    </div>
    <footerComponent/>

    <div class="register-layout__bg" :style="`background-image:url(${require('@/assets/images/register-layout-bg-video-preview.png')})`">
      <iframe :src="BG_VIDEO"
              :style="`background-image:url(${require('@/assets/images/register-layout-bg-video-preview.png')})`">
      </iframe>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import headerComponent from '@/components/Header.vue';
import footerComponent from '@/components/Footer.vue';

export default defineComponent({
  setup () {
    const BG_VIDEO = 'https://player.vimeo.com/video/629172467?background=1&quality=1080&autoplay=1&loop=1&muted=1';
    return {
      BG_VIDEO,
    };
  },
  components: {
    headerComponent,
    footerComponent,
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/style/variables";

.register-layout {
  position: relative;
  flex-direction: column;
  min-height: 100vh;
  display: flex;
  overflow: hidden;

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    padding-bottom: 56.25%;
    z-index: -1;
    pointer-events: none;
    background-size: cover;

    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
    }

    iframe {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: contain;
      display: none;

      @media (min-device-aspect-ratio: 16/9) {
        display: block;
      }

      @media (max-width: $media-slider-ld) {
        display: none;
      }
    }
  }
}
</style>
