'use strict';

class ProductList {
    #goods;
    #allProducts;

    constructor(container = '.products', price = '.price') {
        this.container = container;
        this.price = price;
        this.#goods = [];
        this.#allProducts = [];

        this.#fetchGoods();
        this.#render();
        this.#countBasketPrice();
    }

    #fetchGoods() {
        this.#goods = [
            {id: 1, title: 'Notebook', price: 20000},
            {id: 2, title: 'Mouse', price: 1500},
            {id: 3, title: 'Keyboard', price: 5000},
            {id: 4, title: 'Gamepad', price: 4500},
        ];
    }

    #render() {
        const block = document.querySelector(this.container);
        const price = document.querySelector(this.price);

        this.#goods.forEach(product => {
            const productObject = new ProductItem(product);
            this.#allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
            console.log(this.#allProducts);
        });

        price.insertAdjacentHTML('beforeend', `Сумма заказа: ${this.#countBasketPrice()} &#8381`);
    }

    #countBasketPrice() {
        return this.#allProducts.reduce((totalPrice, cartItem) => totalPrice += cartItem.price, 0);
    }


    //addButtonListner()
    //deleteGood()
    //renderEmptyBasket()
}

class ProductItem {
    constructor(product, img='https://placehold.it/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class="product-item">
        <img src="img/${this.id}.jpg" alt="${this.title}">
        <h3>${this.title}</h3>
        <p>${this.price} &#8381</p>
        <button class="by-btn">Добавить в корзину</button>
      </div>`;
    }

    //addGood()
}
const productList = new ProductList();
