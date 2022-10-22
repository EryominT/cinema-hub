import axios from "axios";

export async function getRatingApi (kinopoiskId: string) {
  const urlMoviesDataBase = `${process.env.VUE_APP_FB_BASE_URL}/movies/${kinopoiskId}/rating.json`;
  return await axios.get(urlMoviesDataBase);
}

export async function setUserRatingApi (kinopoiskId: string, userId: string, value: number) {
  const userMoviesUrl = `${process.env.VUE_APP_FB_BASE_URL}/movies/${kinopoiskId}/rating/usersRating/${userId}.json`;
  return await axios.put(userMoviesUrl, value);
}

export async function setTotalRatingApi (kinopoiskId: string, newRating: number) {
  const totalRatingUrl = `${process.env.VUE_APP_FB_BASE_URL}/movies/${kinopoiskId}/rating/totalRating.json`;
  return await axios.put(totalRatingUrl, newRating);
}

export async function setCommetApi (kinopoiskId: string, commentId: string, comment: string) {
  const commentUrl = `${process.env.VUE_APP_FB_BASE_URL}/movies/${kinopoiskId}/comments/items/${commentId}.json`;
  return await axios.put(commentUrl, comment);
}

export async function setCommetLengthApi (kinopoiskId: string, newLength: string) {
  const commentUrlLength = `${process.env.VUE_APP_FB_BASE_URL}/movies/${kinopoiskId}/comments/commentsLength.json`;
  return await axios.put(commentUrlLength, newLength);
}

export async function deleteCommentApi (kinopoiskId: string, commentId: string) {
  const commentUrl = `${process.env.VUE_APP_FB_BASE_URL}/movies/${kinopoiskId}/comments/items/${commentId}.json`;
  return await axios.delete(commentUrl);
}
