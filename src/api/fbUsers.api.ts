import axios from "axios";

export async function setCommetUserApi (useerId: string, commentId: string, comment: any) {
  const commentUrl = `${process.env.VUE_APP_FB_BASE_URL}/users/${useerId}/comments/items/${commentId}.json`;
  return await axios.put(commentUrl, comment);
}

export async function deleteCommentUserApi (useerId: string, commentId: string) {
  const commentUrl = `${process.env.VUE_APP_FB_BASE_URL}/users/${useerId}/comments/items/${commentId}.json`;
  return await axios.delete(commentUrl);
}
