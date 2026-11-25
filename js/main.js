document.querySelectorAll('.cart-count').forEach(count => { count.textContent = cart.length; });

const orderSelect = document.querySelector('#order-product');
if (orderSelect) {
  const catalogGroup = document.createElement('optgroup');
  catalogGroup.label = 'Товары каталога КР №4';
  products.filter(product => product.isAvailable).forEach(product => {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = product.title;
    catalogGroup.append(option);
  });
  orderSelect.append(catalogGroup);
  const selected = Number(new URLSearchParams(location.search).get('product')) || cart[0];
  if (products.some(product => product.id === selected && product.isAvailable)) orderSelect.value = selected;
}

const detailActions = document.querySelector('.product-detail .product-card__actions');
if (detailActions) {
  const path = location.pathname.split('/').slice(-2).join('/');
  const product = products.find(item => path.endsWith(item.url));
  if (product) {
    const orderLink = detailActions.querySelector('a[href$="order.html"]');
    if (orderLink && product.isAvailable) orderLink.href += `?product=${product.id}`;
    if (orderLink && !product.isAvailable) orderLink.hidden = true;
    const button = document.createElement('button');
    button.classList.add('button');
    button.type = 'button';
    button.textContent = product.isAvailable ? 'В корзину' : 'Нет в наличии';
    button.disabled = !product.isAvailable;
    const status = document.createElement('span');
    status.setAttribute('role', 'status');
    button.addEventListener('click', () => {
      if (addToCart(product.id)) status.textContent = 'Добавлено в корзину';
    });
    detailActions.append(button, status);
  }
}
