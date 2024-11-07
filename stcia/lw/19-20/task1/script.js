async function loadCatalog() {
    try {
      const response = await fetch('./data.json');
      const catalog = await response.json();
      renderCatalog(catalog);
    } catch (error) {
      console.error('Ошибка загрузки каталога:', error);
    }
  }
  
  function renderCatalog(catalog) {
    const catalogContainer = document.getElementById('catalog');
    catalog.forEach(item => {
      const productDiv = document.createElement('div');
      productDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}" style="width:100%">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p>Цена: ${item.price} руб.</p>
        <button onclick="addToCart(${item.id})">Добавить в корзину</button>
      `;
      catalogContainer.appendChild(productDiv);
    });
  }
  
  const cart = [];
  
  function addToCart(id) {
    const item = cart.find(product => product.id === id);
    if (item) {
      item.quantity += 1;
    } else {
      cart.push({ id, quantity: 1 });
    }
    updateCartDisplay();
  }
  
  function updateCartDisplay() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';
    cart.forEach(product => {
      const itemDiv = document.createElement('div');
      itemDiv.innerHTML = `
        Товар ID: ${product.id}, Количество: ${product.quantity}
        <button onclick="removeFromCart(${product.id})">Удалить</button>
      `;
      cartContainer.appendChild(itemDiv);
    });
  }
  
  function removeFromCart(id) {
    const index = cart.findIndex(product => product.id === id);
    if (index !== -1) {
      cart.splice(index, 1);
      updateCartDisplay();
    }
  }
  
  loadCatalog();
  