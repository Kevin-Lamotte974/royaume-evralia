export const addFavorite = (article) => {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites = favorites.filter(fav => fav.id !== article.id); // Remove duplicate entries
  favorites.push(article);
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const getFavorites = () => {
  return JSON.parse(localStorage.getItem('favorites')) || [];
};

export const removeFavorite = (articleId) => {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites = favorites.filter(article => article.id !== articleId);
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const isFavorite = (articleId) => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  return favorites.some(article => article.id === articleId);
};
