<template>
  <div class="alert">
    <div v-for="alert in alerts" :key="alert.id">
      <el-alert type="error" :closable="!alert.critical">
        <div>{{alert.text}}</div>
        <div v-if="alert.critical">
          Ошибка не позволит сайту работать,
          <a href="#" @click="window.reload()">перезагрузите страницу</a>
        </div>
      </el-alert>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store';

export default defineComponent({
  setup () {
    const store = useStore(key);
    const alerts = computed(() => {
      return store.getters['alerts/all'];
    });

    return {
      alerts,
    };
  },
});
</script>

<style lang="scss" scoped>
@import url("//unpkg.com/element-ui@2.15.8/lib/theme-chalk/index.css");
.alert {
  position: fixed;
  right: 10px;
  top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  width: 100%;
  z-index: 10;
  box-shadow: 0 0 6px 1px #000;

  &:empty {
    display: none;
  }
}

.el-alert {
  border-radius: 0;
}

:deep(.el-alert__content) {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 0;
}

:deep(.el-alert .el-alert__close-btn) {
  width: 30px;
  height: 30px;
  margin-left: auto;
  cursor: pointer;
  position: static;
  color: #fff;
  flex-shrink: 0;
  align-self: flex-start;
  font-size: 20px;
}

:deep(.el-alert.is-light .el-alert__close-btn) {
  color: #fff;
}

:deep(.el-alert__description) {
  flex-grow: 1;
  margin: 0;
}
</style>
