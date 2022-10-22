<template>
  <div class="field-item">
    <label class="field-item__label">{{label}}</label>
    <div class="field-item__input" :class="{invalid: errorMessage}">
      <input
        :name="name"
        :type="currentType"
        :value="inputValue"
        :placeholder="placeholder"
        @input="handleChange"/>
        <button @click.prevent="toggleIco" v-if="type === 'password'" class="field-item__ico">
          <icons :name="ico"/>
        </button>
    </div>
    <small class="field-item__message" v-show="errorMessage || meta.valid">{{ errorMessage || successMessage }}</small>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef, ref } from 'vue';
import { useField } from 'vee-validate';
import icons from '@/components/Icons.vue';

export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      reqared: true,
    },
    label: {
      type: String,
      requared: true,
    },
    successMessage: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  setup (props) {
    const ico = ref<string>('showPassword');
    const name: string | any = toRef(props, 'name');
    const currentType = ref(props.type);
    const {
      value: inputValue,
      errorMessage,
      // handleBlur,
      handleChange,
      meta,
    } = useField<string>(name, undefined, {
      initialValue: props.value,
    });

    function toggleIco () {
      ico.value = ico.value === 'showPassword' ? 'hidePassword' : 'showPassword';
      currentType.value = currentType.value === 'password' ? 'text' : 'password';
    }

    return {
      handleChange,
      // handleBlur,
      inputValue,
      toggleIco,
      currentType,
      errorMessage,
      meta,
      ico,
    };
  },
  components: {
    icons,
  },
});
</script>

<style lang="scss" scoped>
.field-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &__input {
    display: flex;
    width: 100%;
    margin-top: 10px;
    border-bottom: 1px solid var(--color-border);

    &.invalid {
      color: var(--color-error);
      border-color: var(--color-error);

      & + small {
        display: inline-block;
      }
    }
  }

  &__message {
    text-align: left;
  }

  input {
    display: block;
    width: 100%;
    padding: 5px;
    color: inherit;
    background-color: transparent;
    border: none;
  }

  small {
    display: none;
    margin-top: 5px;
    color: var(--color-error);
  }

  &__ico {
    padding: 5px;
    color: var(--color-white);
    background-color: transparent;
    border: none;
    cursor: pointer;
    margin-left: 10px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
