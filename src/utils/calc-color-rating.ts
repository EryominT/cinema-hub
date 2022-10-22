export function setColorRating (count: number, property: string) {
  if (count > 0 && count < 4) {
    return property === 'color' ? 'rating-color--low' : property === 'background' ? 'rating-color--bg-low' : '';
  } else if (count > 3 && count < 7) {
    return property === 'color' ? 'rating-color--middle' : property === 'background' ? 'rating-color--bg-middle' : '';
  } else if (count > 6) {
    return property === 'color' ? 'rating-color--high' : property === 'background' ? 'rating-color--bg-high' : '';
  }
}
