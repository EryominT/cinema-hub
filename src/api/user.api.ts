import axios from "axios";
import { initializeApp } from "firebase/app";
import { getStorage, ref as refFB, getDownloadURL, uploadBytes } from "firebase/storage";
import { store } from "@/store";

const firebaseConfig = { storageBucket: 'gs://cinema-hub-88bb9.appspot.com' };
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const metadata = { contentType: 'image/*, .png, .jpg, .gif, .web' };

export async function getUserAvatarApi (userId: string) {
  const avatarInfo = {
    url: '',
  };

  try {
    avatarInfo.url = await getDownloadURL(refFB(storage, `/users/${userId}/avatar.jpg`));
  } catch (e) {
    console.log(e);
  }

  return avatarInfo;
}

export async function getUserDataApi (userId: string) {
  return await axios.get(`${process.env.VUE_APP_FB_BASE_URL}/users/${userId}.json`);
}

export async function updateAvatarApi (userId: string, file: any) {
  try {
    const storageRef = refFB(storage, `/users/${userId}/avatar.jpg`);
    await uploadBytes(storageRef, file, metadata);
    return await getUserAvatarApi(userId);
  } catch (e) {
    store.dispatch('alerts/add', {
      text: 'Неудалось загрузить изображение',
      timeout: 5000,
      critical: false,
    });
    return await getUserAvatarApi(userId);
  }
}
