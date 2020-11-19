// check cart in storage before decoding and parsing
function checkCartInLocalStorage() {
  if (localStorage.getItem("cart") == null) {
    let cart = null;
    return cart;
  } else {
    let cart = window.atob(localStorage.getItem("cart"));
    cart = JSON.parse(cart);
    return cart;
  }
}

// check price value
function checkPriceInLocalStorage() {
  if (localStorage.getItem("cartPrice") == null) {
    let price = null;
    return price;
  } else {
    let price = window.atob(localStorage.getItem("cartPrice"));
    return price;
  }
}

const decodedCart = checkCartInLocalStorage();
const decodedPrice = checkPriceInLocalStorage();

console.log("price in store ", decodedPrice);

export default {
  namespaced: true,
  state: {
    cart: decodedCart,
    cartPrice: decodedPrice,
    activeCurrency: "USD",
  },

  mutations: {
    updateCart(state, product) {
      let decodedCart = window.atob(localStorage.getItem("cart"));
      state.cart = JSON.parse(decodedCart);
    },

    UpdateTotalPrice(state, price) {
      console.log(
        "cart price ",
        window.atob(localStorage.getItem("cartPrice"))
      );
      state.cartPrice = price;
    },

    updateCurrencyMutation(state, currency) {
      state.activeCurrency = currency;
    },
  },

  actions: {
    updateCurrency(context, currency) {
      console.log("calling action");
      context.commit("updateCurrencyMutation", currency);
    },

    checkIfCartExist() {
      let cart = localStorage.getItem("cart");
      // check if cart exist in storage,
      // if not assign an empty array
      if (cart == null) {
        return (cart = []);
      } else {
        //  decode cart
        let decoardedCart = window.atob(cart);
        console.log("cart ", cart);
        return (cart = JSON.parse(decoardedCart));
      }
    },

    updatePriceAndStorage(context, cart) {
      // calculate total price

      const productPriceArray = cart.map((item) => {
        return item.price;
      });

      // calculate total price only when there are is an item
      // not neccessary for addTocart and updating price though

      let totalPrice;
      if (productPriceArray.length > 0) {
        totalPrice = productPriceArray.reduce((accumulator, value) => {
          return accumulator + value;
        });
      } else {
        totalPrice = productPriceArray[0];
      }

      // encode cart and price

      let encodedCart = window.btoa(JSON.stringify(cart));
      let encodedPrice = window.btoa(totalPrice);
      localStorage.setItem("cartPrice", encodedPrice);
      localStorage.setItem("cart", encodedCart);

      context.commit("UpdateTotalPrice", totalPrice);
    },

    async addToCart(context, product) {
      let cart = await context.dispatch("checkIfCartExist");

      //  create product object

      let singleproduct = {
        quantity: 1,
        title: product.title,
        id: product.id,
        price: product.price,
        image: product.image_url,
        pricePerUnit: product.price,
      };

      // return the index of existing object and sum new product

      var index = cart.findIndex((value) => {
        return value.id == product.id;
      });

      // if product exist in cart array i.e index > -1
      // increease quantity count and sum price
      // else push new product

      if (index > -1) {
        cart[index].quantity++;
        cart[index].price = cart[index].price + product.price;
        cart[index].pricePerUnit = product.price;
      } else {
        cart.push(singleproduct);
      }
      await context.dispatch("updatePriceAndStorage", cart);

      // update produce in store

      context.commit("updateCart", singleproduct);
    },

    async removeCartItem(context, index) {
      let cart = await context.dispatch("checkIfCartExist");

      // remove item based on index

      cart.splice(index, 1);
      // update produce in store

      await context.dispatch("updatePriceAndStorage", cart);
      context.commit("updateCart");
    },

    async updateQuantity(context, data) {
      let { index, quantity } = data;
      console.log("quantity ", quantity);
      console.log("index ", index);
      let cart = localStorage.getItem("cart");
      if (cart == null) {
        cart = [];
      } else {
        let decodedCart = window.atob(cart);
        cart = JSON.parse(decodedCart);
        console.log("cart ", cart);
      }

      // update qunatity and price

      cart[index].price = cart[index].pricePerUnit * quantity;
      cart[index].quantity = quantity;

      // // update produce in store

      await context.dispatch("updatePriceAndStorage", cart);
      context.commit("updateCart");
    },

    async updateProductPrice(context, data) {
      let { index, price } = data;
      let cart = localStorage.getItem("cart");
      if (cart == null) {
        cart = [];
      } else {
        let decodedCart = window.atob(cart);
        cart = JSON.parse(decodedCart);
        console.log("cart ", cart);
      }
      // update pricePerUnit and total price

      cart[index].pricePerUnit = price;
      cart[index].price = price * cart[index].quantity;

      // calculate total price

      const productPrice = cart.map((ObjectsInArray) => {
        return ObjectsInArray.price;
      });
      let totalPrice = productPrice.reduce((accumulator, value) => {
        return accumulator + value;
      });
      console.log("total price ", totalPrice);
      let encodedPrice = window.btoa(totalPrice);
      let endcodedCart = window.btoa(JSON.stringify(cart));
      localStorage.setItem("cartPrice", encodedPrice);
      localStorage.setItem("cart", endcodedCart);

      // update produce in store

      context.commit("updateCart");
      context.commit("UpdateTotalPrice", totalPrice);
    },
  },
};
