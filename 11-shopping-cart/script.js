const cartItems = document.querySelector('.cart__items');
const productsList = document.querySelector('section.items');

const updateCartDefs = () => {
  saveCartItems(cartItems.innerHTML);
  const total = [...cartItems.children].reduce((sum, item) => 
    sum + Number(item.innerText.match(/\$([\d.]+)/)[1]), 0);
  document.querySelector('.total-price').innerText = total;
};

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.remove();
  updateCartDefs();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addItemToCart = async (ev) => {
  const sku = ev.target.parentElement.children[0].innerText;
  const { title: name, price: salePrice } = await fetchItem(sku);
  const elem = createCartItemElement({ sku, name, salePrice });
  cartItems.appendChild(elem);
  updateCartDefs();
};

const populateProductList = async () => {
  const products = (await fetchProducts('computador')).results;
  products.forEach((product) => {
    const { id: sku, title: name, thumbnail: image } = product;
    const elem = createProductItemElement({ sku, name, image });
    elem.children[3].addEventListener('click', addItemToCart);
    productsList.appendChild(elem);
  });
};

const loadCartItems = () => {
  cartItems.innerHTML = getSavedCartItems();
  [...cartItems.children]
    .forEach((elem) => elem.addEventListener('click', cartItemClickListener));
};

window.onload = () => {
  populateProductList();
  loadCartItems();
  updateCartDefs();
};
