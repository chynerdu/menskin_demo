<template>
  <div class="drawer-content">
    <!-- currency -->
    <P>YOUR CART</P>
    <div class="form-group no-pl col-md-3">
      <select
        @change="updateCurrency($event)"
        id="inputState"
        class="form-control"
      >
        <option v-for="(currency, key) in currencies" :key="key">
          {{ currency }}</option
        >
        <!-- <option selected>USD</option>
        <option>NGN</option> -->
      </select>
    </div>
    <!-- cart item -->
    <template v-if="cartItems.length > 0">
      <div
        v-for="(cartItem, key) in cartItems"
        :key="key"
        class="product-item mb24"
      >
        <div class="mb48">
          <div class="d-flex justify-content-between">
            <h3 class="productTitle">{{ cartItem.title }}</h3>
            <div class="productTitle">
              <font-awesome-icon icon="times" @click="remove(key)" />
            </div>
          </div>
        </div>
        <div class="row">
          <!-- select quantity and price -->
          <div class="col-md-4 align-item-center">
            <div class="quantity-wrapper d-flex justify-content-between">
              <button
                :disabled="isDisabled || cartItem.quantity < 1"
                @click="decrement(cartItem, key)"
                class="decrement"
                name="decrement"
                type="submit"
                value="0"
              >
                -
              </button>
              <div class="value">{{ cartItem.quantity }}</div>
              <button
                @click="increment(cartItem, key)"
                class="increment"
                name="increment"
                type="submit"
                value="1"
              >
                +
              </button>
            </div>
          </div>
          <div class="col-md-4">
            <h2 class="productPrice">
              {{ activeCurrency }} {{ cartItem.price }}
            </h2>
          </div>
          <div class="col-md-4">
            <img :src="cartItem.image" class="cartImage" />
          </div>
        </div>
      </div>
      <!-- cart summary -->
      <hr />
      <div class="d-flex justify-content-between mb16">
        <h3 class="productTitle">Subtotal</h3>
        <h2 class="productPrice">{{ activeCurrency }} {{ cartPrice }}</h2>
      </div>
      <button
        type="button"
        class="mb24 btn-style2 btn btn-block btn-outline-dark no-border-radius"
      >
        MAKE THIS A SUBSCRIPTION (SAVE 20%)
      </button>

      <button
        type="button"
        class="btn-style2 btn btn-block btn-secondary no-border-radius"
      >
        PROCEED TO CHECKOUT
      </button>
    </template>
    <template v-else>
      <h3 class="pt88">You have not added any item to the cart</h3>
    </template>
  </div>
</template>
<script>
export default {
  props: ["currencies"],
  data() {
    return {
      isDisabled: false,
      currency: "",
      imageUrl:
        "https://images.squarespace-cdn.com/content/v1/5784fc82893fc03407e35727/1552530204384-AYIK39YVQCYXNXQFHHRE/ke17ZwdGBToddI8pDm48kGDpvalPb1SqHoCn1hwN0Y57gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmx-YtV7KdJhhcFMxgH7DNwVWsr4BytTuzU0mdZNjZkC7ehjA8nxqmKGxR1QtMJl5J/Whipped+Body+Cream+Pure+Goat.png",
    };
  },

  computed: {
    activeCurrency() {
      return this.$store.state.productsModule.activeCurrency;
    },
    cartPrice() {
      return this.$store.state.productsModule.cartPrice;
    },
    cartItems() {
      return this.$store.state.productsModule.cart
        ? this.$store.state.productsModule.cart
        : [];
    },

    cartLength() {
      return this.$store.state.productsModule.cart
        ? this.$store.state.productsModule.cart.length
        : 0;
    },
  },
  methods: {
    async updateCurrency(event) {
      console.log("calling update currency", event.target.value);
      await this.$store.dispatch(
        "productsModule/updateCurrency",
        event.target.value
      );
    },

    async remove(index) {
      let result = await this.$store.dispatch(
        "productsModule/removeCartItem",
        index
      );
      // this.showAlert = true
      // setTimeout(() => {
      //   this.showAlert = false
      // }, 3000)
    },

    decrement(cartItem, key) {
      console.log("quantity oooo", cartItem.quantity);
      if (cartItem.quantity <= 1) {
        this.remove(key);
        // this.isDisabled = true;
        console.log("diabled ", this.isDisabled);
      } else {
        // this.isDisabled = false;
        let updatedQuantity = cartItem.quantity - 1;
        this.$store.dispatch("productsModule/updateQuantity", {
          index: key,
          quantity: updatedQuantity,
        });
      }
    },

    increment(cartItem, key) {
      let updatedQuantity = cartItem.quantity + 1;
      this.$store.dispatch("productsModule/updateQuantity", {
        index: key,
        quantity: updatedQuantity,
      });
      // this.$forceUpdate()
    },
  },
};
</script>
