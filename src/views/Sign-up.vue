<template>
  <div class="popup-form">
    <h1 class="popup-form__title">Регистрация</h1>
    <form @submit.prevent="onSubmit" class="popup-form__form">
      <TextInput
        name="name"
        type="text"
        label="Имя"/>

      <TextInput
        name="email"
        type="text"
        label="Почта"/>

      <TextInput
        name="password"
        type="password"
        label="Пароль"/>

      <TextInput
        name="confirm_password"
        type="password"
        label="Повторите пароль"/>

      <button type="submit"
              class="popup-form__form-submit"
              :class="{'popup-form__form-submit--wrong': validClass}"
              @click="isValid">Зарегистрироваться</button>
      <router-link to="/login" class="popup-form__link">Войти</router-link>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { object, string, ref as refYup } from 'yup';
import { useForm } from 'vee-validate';
import TextInput from '@/components/TextInput.vue';
import { useI18n } from 'vue-i18n';
import { key } from '@/store';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'sign-up',
  setup () {
    const { t } = useI18n();
    const store = useStore(key);
    const router = useRouter();
    const validClass = ref<boolean>(false);
    const MIN_LENGTH = 6;
    const pErrorMessage: any = computed(() => `Пароль должен быть не менее чем ${MIN_LENGTH} символов. Вы ввели ${t('symbols', currentVal?.password?.length as number)}`);

    const schema = object({
      name: string().trim().required('Введите имя'),
      email: string().trim().required('Поле email не должно быть пустым').email('введите корректный email'),
      password: string().trim().required('Введите пароль').min(MIN_LENGTH, () => pErrorMessage.value),
      confirm_password: string().trim().required('Повторите пароль').oneOf([refYup('password')], 'Пароль не совпадает'),
    });

    const { handleSubmit, values: currentVal, meta } = useForm({ validationSchema: schema });

    const onSubmit = handleSubmit((values) => {
      store.dispatch('auth/register', values);
      router.push('/');
    });

    function isValid () {
      if (!meta.value.valid) {
        validClass.value = true;

        setTimeout(() => {
          validClass.value = false;
        }, 1000);
      }
    }

    return {
      onSubmit,
      validClass,
      isValid,
    };
  },
  components: {
    TextInput,
  },
});
</script>
