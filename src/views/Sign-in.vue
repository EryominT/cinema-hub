<template>
  <div class="popup-form">
    <h1 class="popup-form__title">Войти</h1>
    <div v-if="ErrorSubmit">{{ErrorSubmit}}</div>
    <form @submit.prevent="onSubmit" class="popup-form__form">
      <TextInput
        name="email"
        type="text"
        label="Почта"/>

      <TextInput
        name="password"
        type="password"
        label="Пароль"/>

      <button type="submit"
              class="popup-form__form-submit"
              :class="{'popup-form__form-submit--wrong': validClass}"
              @click="isValid">Войти</button>
      <router-link to="/register" class="popup-form__link">Регистрация</router-link>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { object, string } from 'yup';
import { useForm } from 'vee-validate';
import TextInput from '@/components/TextInput.vue';
import { key } from '@/store';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'sign-in',
  setup () {
    const store = useStore(key);
    const router = useRouter();
    const schema = object({
      email: string().trim().required('Поле email не должно быть пустым').email('введите корректный email'),
      password: string().trim().required('Введите пароль'),
    });
    const validClass = ref<boolean>(false);

    const { handleSubmit, meta } = useForm({ validationSchema: schema });

    const ErrorSubmit = ref<string>('');

    const onSubmit = handleSubmit(async (values) => {
      try {
        await store.dispatch('auth/login', values);
      } catch (e) {
        ErrorSubmit.value = e;
      }

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
      schema,
      onSubmit,
      validClass,
      isValid,
      ErrorSubmit,
    };
  },
  components: {
    TextInput,
  },
});
</script>
