const cartKey = 'kr4-cart';

function readCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(cartKey) || '[]');
    return Array.isArray(saved) ? saved.filter(id => Number.isInteger(id) && products.some(product => product.id === id && product.isAvailable)) : [];
  } catch {
    return [];
  }
}

let cart = readCart();

function saveCart() {
  try { localStorage.setItem(cartKey, JSON.stringify(cart)); } catch { /* Cart remains usable in this tab. */ }
  document.querySelectorAll('.cart-count').forEach(count => { count.textContent = cart.length; });
  document.dispatchEvent(new Event('cartchange'));
}

function addToCart(id) {
  const product = products.find(item => item.id === id && item.isAvailable);
  if (!product) return false;
  cart.push(id);
  saveCart();
  return true;
}

function removeFromCart(id) {
  const index = cart.indexOf(id);
  if (index < 0) return;
  cart.splice(index, 1);
  saveCart();
}

function cartTotal() {
  return cart.reduce((total, id) => total + products.find(product => product.id === id).price, 0);
}

saveCart();

const cartList = document.querySelector('#cart-list');
if (cartList) {
  const empty = document.querySelector('#cart-empty');
  const summary = document.querySelector('#cart-summary');
  const count = document.querySelector('#cart-items-count');
  const total = document.querySelector('#cart-total');
  function renderCart() {
    cartList.replaceChildren();
    const quantities = new Map();
    cart.forEach(id => quantities.set(id, (quantities.get(id) || 0) + 1));
    for (const [id, quantity] of quantities) {
      const product = products.find(item => item.id === id);
      const row = document.createElement('li');
      row.classList.add('cart-row');
      const link = document.createElement('a');
      link.href = product.url;
      link.textContent = product.title;
      const controls = document.createElement('div');
      controls.classList.add('quantity-controls');
      const minus = document.createElement('button');
      minus.type = 'button';
      minus.classList.add('button', 'button--secondary');
      minus.dataset.cartMinus = id;
      minus.textContent = '−';
      minus.setAttribute('aria-label', `Убрать одну единицу: ${product.title}`);
      minus.addEventListener('click', () => {
        removeFromCart(id);
        (cartList.querySelector(`[data-cart-minus="${id}"]`) || cartList.querySelector('button') || empty.querySelector('a')).focus();
      });
      const amount = document.createElement('span');
      amount.classList.add('quantity-value');
      amount.textContent = quantity;
      const plus = document.createElement('button');
      plus.type = 'button';
      plus.classList.add('button', 'button--secondary');
      plus.dataset.cartPlus = id;
      plus.textContent = '+';
      plus.setAttribute('aria-label', `Добавить одну единицу: ${product.title}`);
      plus.addEventListener('click', () => {
        addToCart(id);
        cartList.querySelector(`[data-cart-plus="${id}"]`).focus();
      });
      controls.append(minus, amount, plus);
      const detail = document.createElement('span');
      detail.textContent = `${formatPrice(product.price)} × ${quantity} = ${formatPrice(quantity * product.price)}`;
      row.append(link, controls, detail);
      cartList.append(row);
    }
    empty.hidden = cart.length > 0;
    summary.hidden = cart.length === 0;
    count.textContent = cart.length;
    total.textContent = formatPrice(cartTotal());
  }
  document.addEventListener('cartchange', renderCart);
  renderCart();
}

const orderItems = document.querySelector('#order-items');
if (orderItems) {
  const empty = document.querySelector('#order-empty');
  const total = document.querySelector('#order-total');
  function renderOrderItems() {
    const quantities = new Map();
    cart.forEach(id => quantities.set(id, (quantities.get(id) || 0) + 1));
    orderItems.replaceChildren();
    for (const [id, quantity] of quantities) {
      const product = products.find(item => item.id === id);
      const row = document.createElement('li');
      row.classList.add('cart-row');
      row.textContent = `${product.title} — ${quantity} × ${formatPrice(product.price)} = ${formatPrice(quantity * product.price)}`;
      orderItems.append(row);
    }
    empty.hidden = cart.length > 0;
    total.hidden = cart.length === 0;
    total.textContent = `Итого: ${formatPrice(cartTotal())}`;
  }
  document.addEventListener('cartchange', renderOrderItems);
  renderOrderItems();
}
