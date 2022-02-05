const cartItems = document.querySelector('.cart__items');
const productsList = document.querySelector('section.items');
let anim = { playState: 'finished', playbackRate: -1 };

const priceFormat = (price) => {
  const [dollars, cents] = price.toFixed(2).split('.');
  // Fonte: https://stackoverflow.com/a/47644519
  return `R$${dollars.match(/\d{1,3}(?=(\d{3})*$)/g).join('.')},${cents}`;
}

const updateCartDefs = () => {
  saveCartItems([...cartItems.children]);
  const total = [...cartItems.children].reduce((sum, item) =>
    sum + parseFloat(item.dataset.price), 0);
  document.querySelector('.total-price').innerText = priceFormat(total);
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

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

function cartItemClickListener(event) {
  event.currentTarget.parentElement.remove();
  updateCartDefs();
}

const shorten = (name) => {
  const short = name.match(/^.{0,65}\w*/)[0]
  if (short === name) return name;
  return `${short}...`;
}

function createCartItemElement({ sku, image, name, price }) {
  const li = createCustomElement('li', 'cart__item', '');
  li.dataset.sku = sku;
  li.dataset.image = image;
  li.dataset.name = name;
  li.dataset.price = price;

  const img = createCustomElement('img', 'cart__image', '');
  img.src = image;
  const nameDiv = createCustomElement('div', 'cart__name', '');
  nameDiv.appendChild(createCustomElement('div', 'cart__subname', name));
  nameDiv.title = name;
  const removeBtn = createCustomElement('button', 'cart__remove', '');
  removeBtn.innerHTML = '<span class="material-icons">close</span>';
  removeBtn.addEventListener('click', cartItemClickListener);
  const priceDiv = createCustomElement('div', 'cart__price', priceFormat(parseFloat(price)));

  li.append(img, nameDiv, removeBtn, priceDiv);
  return li;
}

const createAnim = (elem) => {
  var keyframe = new KeyframeEffect(
    elem,
    [{ right: '-300px' }, { right: '25px' }],
    { duration: 500, iterations: 1, easing: 'ease' },
  );
  anim = new Animation(keyframe, document.timeline);
  anim.onfinish = (ev) => {
    if (ev.target.playbackRate < 0) {
      document.querySelector('.loading').remove();
    }
  }
}

const startLoading = () => {
  if (anim.playState === 'finished' && anim.playbackRate < 0) {
    const mainDiv = createCustomElement('div', 'loading', 'Carregando');
    document.body.appendChild(mainDiv);
    createAnim(mainDiv);
    anim.play();
  } else if (anim.playState === 'running' && anim.playbackRate < 0) {
    anim.reverse();
  }
};

const stopLoading = () => {
  if (anim.playbackRate > 0) anim.reverse();
};

const addItemToCart = async (ev) => {
  const sku = getSkuFromProductItem(ev.target.parentElement);

  startLoading();
  const { thumbnail: image, title: name, price } = await fetchItem(sku);
  stopLoading();

  const elem = createCartItemElement({ sku, image, name, price });
  cartItems.appendChild(elem);
  updateCartDefs();
};

const populateProductList = async () => {
  startLoading();
  const products = (await fetchProducts('computador')).results;
  stopLoading();
  
  products.forEach((product) => {
    const { id: sku, title: name, thumbnail: image } = product;
    const elem = createProductItemElement({ sku, name, image });
    elem.querySelector('.item__add').addEventListener('click', addItemToCart);
    productsList.appendChild(elem);
  });
};

const emptyCart = () => {
  cartItems.innerHTML = '';
  updateCartDefs();
};

const loadCartItems = () => {
  const elems = getSavedCartItems();
  elems.forEach((elem) => cartItems.appendChild(createCartItemElement(elem)));
  updateCartDefs();
};

window.onload = () => {
  populateProductList();
  loadCartItems();
  document.querySelector('.empty-cart').addEventListener('click', emptyCart);
};
