const search = document.querySelector('#catalog-search');
const category = document.querySelector('#catalog-category');
const sort = document.querySelector('#catalog-sort');
const favoritesOnly = document.querySelector('#catalog-favorites');
const grid = document.querySelector('#catalog-grid');
const count = document.querySelector('#catalog-count');
const empty = document.querySelector('#catalog-empty');
const message = document.querySelector('#catalog-message');
const favoriteKey = 'kr4-favorites';
let favorites = [];
try {
  const saved = JSON.parse(localStorage.getItem(favoriteKey) || '[]');
  if (Array.isArray(saved)) favorites = saved.filter(id => Number.isInteger(id) && products.some(product => product.id === id));
} catch { favorites = []; }

function createCard(product) {
  const card = document.createElement('article');
  card.classList.add('product-card');
  const image = document.createElement('img');
  image.classList.add('product-card__image');
  image.src = `images/${product.image}`;
  image.alt = product.title;
  image.loading = 'lazy';
  const title = document.createElement('h3');
  title.classList.add('product-card__title');
  title.textContent = product.title;
  const description = document.createElement('p');
  description.classList.add('product-card__description');
  description.textContent = product.description;
  const price = document.createElement('p');
  price.classList.add('product-card__price');
  price.textContent = product.price === null ? 'Бесценно' : formatPrice(product.price);
  const actions = document.createElement('div');
  actions.classList.add('product-card__actions');
  const details = document.createElement('a');
  details.classList.add('button', 'button--secondary');
  details.href = product.url;
  details.textContent = 'Подробнее';
  const add = document.createElement('button');
  add.classList.add('button');
  add.type = 'button';
  add.dataset.id = product.id;
  add.textContent = product.isAvailable ? 'В корзину' : 'Нет в наличии';
  add.disabled = !product.isAvailable;
  const favorite = document.createElement('button');
  favorite.classList.add('button', 'button--secondary');
  favorite.type = 'button';
  favorite.dataset.favorite = product.id;
  favorite.setAttribute('aria-pressed', String(favorites.includes(product.id)));
  favorite.setAttribute('aria-label', favorites.includes(product.id) ? `Убрать из избранного: ${product.title}` : `В избранное: ${product.title}`);
  favorite.textContent = favorites.includes(product.id) ? '♥' : '♡';
  actions.append(details);
  if (product.price !== null) actions.append(add);
  actions.append(favorite);
  card.append(image, title, description, price, actions);
  return card;
}

function renderCatalog() {
  message.textContent = '';
  const query = search.value.trim().toLocaleLowerCase('ru');
  let visible = products.filter(product => product.title.toLocaleLowerCase('ru').includes(query)
    && (category.value === 'all' || product.category === category.value)
    && (!favoritesOnly.checked || favorites.includes(product.id)));
  if (sort.value === 'price-asc') visible = [...visible].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
  if (sort.value === 'price-desc') visible = [...visible].sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
  if (sort.value === 'title') visible = [...visible].sort((a, b) => a.title.localeCompare(b.title, 'ru'));
  grid.replaceChildren(...visible.map(createCard));
  count.textContent = `Найдено товаров: ${visible.length}`;
  empty.hidden = visible.length > 0;
}

search.addEventListener('input', renderCatalog);
category.addEventListener('change', renderCatalog);
sort.addEventListener('change', renderCatalog);
favoritesOnly.addEventListener('change', renderCatalog);
document.querySelector('#catalog-reset').addEventListener('click', () => {
  search.value = '';
  category.value = 'all';
  sort.value = 'default';
  favoritesOnly.checked = false;
  renderCatalog();
  search.focus();
});
grid.addEventListener('click', event => {
  const add = event.target.closest('[data-id]');
  if (add && addToCart(Number(add.dataset.id))) {
    const product = products.find(item => item.id === Number(add.dataset.id));
    message.textContent = `${product.title} добавлен в корзину.`;
  }
  const favorite = event.target.closest('[data-favorite]');
  if (favorite) {
    const id = Number(favorite.dataset.favorite);
    favorites = favorites.includes(id) ? favorites.filter(item => item !== id) : [...favorites, id];
    try { localStorage.setItem(favoriteKey, JSON.stringify(favorites)); } catch { /* Available in this tab. */ }
    const selected = favorites.includes(id);
    favorite.textContent = selected ? '♥' : '♡';
    favorite.setAttribute('aria-pressed', String(selected));
    favorite.setAttribute('aria-label', `${selected ? 'Убрать из избранного' : 'В избранное'}: ${products.find(product => product.id === id).title}`);
    if (favoritesOnly.checked) renderCatalog();
  }
});
renderCatalog();
