<template>
  <div class="fullWidth">
    <AppHeader v-if="!loading" class="mb64" @openDrawer="toggle" />
    <PageHeader v-if="!loading" class="mb40" />
    <Spinner v-if="loading" />
    <section v-if="!loading" class="productListingSection">
      <ProductList :products="products" @openDrawer="toggle" />
    </section>
    <Drawer @close="toggle" align="right" :closeable="true">
      <DrawerContent :currencies="currency" v-if="open" />
    </Drawer>
  </div>
</template>

<script>
import Drawer from "vue-simple-drawer";
import ProductList from "../components/productList";
import AppHeader from "../components/appHeader";
import PageHeader from "../components/pageHeader";
import DrawerContent from "../components/drawerContent";
import Spinner from "../components/spinner";
import { ALL_PRODUCTS_QUERY, ALL_CURRENCY_QUERY } from "../graphQl/queries";
export default {
  components: {
    ProductList,
    PageHeader,
    Drawer,
    DrawerContent,
    Spinner,
    AppHeader,
  },
  data() {
    return {
      open: false,
      products: [],
      currency: [],
      loading: 0,
    };
  },

  created() {
    // this.checkArray();
    // this.updateProductPrice();
    this.$apollo
      .query({
        query: ALL_PRODUCTS_QUERY,
      })
      .then((data) => {
        console.log(data);
      });

    // this.$apollo.watchQuery().then((data) => console.log(data));
  },

  computed: {
    activeCurrency() {
      // update cart with new price when currency changes
      this.updateProductPrice();
      return this.$store.state.productsModule.activeCurrency;
    },
  },

  methods: {
    toggle() {
      this.open = !this.open;
    },

    updateProductPrice() {
      let cart = this.$store.state.productsModule.cart;
      // loop thorugh cart
      cart.forEach((cartItem, itemIndex) => {
        // loop through products
        this.products.forEach((product) => {
          if (cartItem.id == product.id) {
            // update price in store using itemIndex and new product price
            this.$store.dispatch("productsModule/updateProductPrice", {
              index: itemIndex,
              price: product.price,
            });
          }
        });
      });
    },
  },

  apollo: {
    products: {
      query: ALL_PRODUCTS_QUERY,
      loadingKey: "loading",
      variables() {
        return {
          currency: `${this.activeCurrency}`,
        };
      },
    },

    currency: {
      query: ALL_CURRENCY_QUERY,
      loadingKey: "loading",
    },
  },
};
</script>
