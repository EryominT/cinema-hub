import axios from "axios";
import { Auth } from "@/interfaces/Register.interface";
import { store } from "@/store";

export async function registerApi (authData: Auth.AuthRegisterData) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`;
  const response = await axios.post(url, { email: authData.email, password: authData.password, returnSecureToken: true });

  const urlDataBase = `${process.env.VUE_APP_FB_BASE_URL}/users/${response.data.localId}.json`;
  await axios.put(urlDataBase, { ...authData, userId: response.data.localId });

  return response;
}

export async function loginApi (authData: Auth.AuthRegisterData) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`;
  return await axios.post(url, { ...authData, returnSecureToken: true });
}

export async function updateAccountsDataApi (idToken: string, target: string, newValue: string, userId: string) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.VUE_APP_FB_KEY}`;

  try {
    await axios.post(url, {
      idToken,
      target: newValue,
      returnSecureToken: true,
    });

    const emailUrl = `${process.env.VUE_APP_FB_BASE_URL}/users/${userId}/${target}.json`;
    await axios.put(emailUrl, JSON.stringify(newValue));
  } catch (e) {
    store.dispatch('alerts/add', {
      text: 'Данные не удалось обновить. Попробуйте повторить попытку позже',
      timeout: 5000,
      critical: false,
    });

    throw new Error(e);
  }
}

export async function updateUserNameApi (userId: string, userName: string) {
  const urlDataBase = `${process.env.VUE_APP_FB_BASE_URL}/users/${userId}/name.json`;

  try {
    await axios.put(urlDataBase, JSON.stringify(userName));
  } catch (e) {
    store.dispatch('alerts/add', {
      text: 'Данные не удалось Имя. Попробуйте повторить попытку позже',
      timeout: 5000,
      critical: false,
    });

    throw new Error(e);
  }
}
