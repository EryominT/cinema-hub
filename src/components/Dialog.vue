<template>
  <el-dialog :model-value="visible" @close="close" :show-close="false">
    <template #header="{ close, titleId, titleClass }">
      <div class="dialog__header">
        <h4 v-if="store.getters['dialog/headerText']" :id="titleId" :class="titleClass">{{store.getters["dialog/headerText"]}}</h4>
        <el-button @click="close" type="danger" class="dialog__close">X</el-button>
      </div>
    </template>

    <div v-if="store.getters['dialog/bodyText']" class="dialog__content-text">
      {{store.getters["dialog/bodyText"]}}
    </div>
    <div v-if="videoInfo?.items" class="dialog__video">
      <div class="video">
        <template v-if="videoInfo?.items.length">
          <iframe :src="videoInfo.items[0].url" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </template>
        <div v-else>Видео недоступно</div>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { ElButton, ElDialog } from 'element-plus';
import { useStore } from "vuex";
import { key } from "@/store";

export default defineComponent({
  setup () {
    const store = useStore(key);
    const visible = computed(() => { return store.getters['dialog/isOpen']; });
    const videoInfo = computed(() => { return store.getters['dialog/videoInfo']; });

    function close () {
      store.commit('dialog/closeDialog');
    }

    return {
      visible,
      store,
      videoInfo,
      close,
    };
  },
});
</script>

<style lang="scss">
@import "../assets/style/variables";

.dialog {
  &__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__close {
    margin-left: auto;
  }
}

.el-dialog {
  &__header.el-dialog__header {
    margin: 0;
    padding: 5px;
  }

  &__body.el-dialog__body {
    padding: 20px 15px;
  }
}
</style>
