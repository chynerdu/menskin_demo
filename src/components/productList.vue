<template>
  <div class="container">
    <div class="row">
      <div
        class="col-md-4 smallWidth mb88"
        v-for="product in products"
        :key="product.id"
      >
        <img :src="product.image_url" class="productImg" />
        <h2 class="productTitle pt16">{{ product.title }}</h2>
        <h3 class="productPrice">
          From {{ activeCurrency }} {{ product.price }}
        </h3>
        <button
          type="button"
          @click="addToCart(product)"
          class="no-border-radius btn btn-secondary btn-style"
        >
          Add To Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  props: ["products"],
  data() {
    return {
      allProducts: [
        {
          id: 0,
          image:
            "https://images.squarespace-cdn.com/content/v1/5784fc82893fc03407e35727/1552530204384-AYIK39YVQCYXNXQFHHRE/ke17ZwdGBToddI8pDm48kGDpvalPb1SqHoCn1hwN0Y57gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmx-YtV7KdJhhcFMxgH7DNwVWsr4BytTuzU0mdZNjZkC7ehjA8nxqmKGxR1QtMJl5J/Whipped+Body+Cream+Pure+Goat.png",
          name: "Age management collection",
          price: "$48",
        },
        {
          id: 1,
          image:
            "https://images.squarespace-cdn.com/content/v1/5784fc82893fc03407e35727/1552530204384-AYIK39YVQCYXNXQFHHRE/ke17ZwdGBToddI8pDm48kGDpvalPb1SqHoCn1hwN0Y57gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmx-YtV7KdJhhcFMxgH7DNwVWsr4BytTuzU0mdZNjZkC7ehjA8nxqmKGxR1QtMJl5J/Whipped+Body+Cream+Pure+Goat.png",
          name: "Growth management collection",
          price: "$100",
        },
        {
          id: 2,
          image:
            "https://images.squarespace-cdn.com/content/v1/5784fc82893fc03407e35727/1552530204384-AYIK39YVQCYXNXQFHHRE/ke17ZwdGBToddI8pDm48kGDpvalPb1SqHoCn1hwN0Y57gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmx-YtV7KdJhhcFMxgH7DNwVWsr4BytTuzU0mdZNjZkC7ehjA8nxqmKGxR1QtMJl5J/Whipped+Body+Cream+Pure+Goat.png",
          name: "Body collection",
          price: "$200",
        },
        {
          id: 3,
          image:
            "https://images.squarespace-cdn.com/content/v1/5784fc82893fc03407e35727/1552530204384-AYIK39YVQCYXNXQFHHRE/ke17ZwdGBToddI8pDm48kGDpvalPb1SqHoCn1hwN0Y57gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmx-YtV7KdJhhcFMxgH7DNwVWsr4BytTuzU0mdZNjZkC7ehjA8nxqmKGxR1QtMJl5J/Whipped+Body+Cream+Pure+Goat.png",
          name: "Hair Growth collection",
          price: "$120",
        },
        {
          id: 2,
          image:
            "https://images.squarespace-cdn.com/content/v1/5784fc82893fc03407e35727/1552530204384-AYIK39YVQCYXNXQFHHRE/ke17ZwdGBToddI8pDm48kGDpvalPb1SqHoCn1hwN0Y57gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmx-YtV7KdJhhcFMxgH7DNwVWsr4BytTuzU0mdZNjZkC7ehjA8nxqmKGxR1QtMJl5J/Whipped+Body+Cream+Pure+Goat.png",
          name: "Skin care",
          price: "$100",
        },
      ],
    };
  },

  computed: {
    activeCurrency() {
      return this.$store.state.productsModule.activeCurrency;
    },
  },

  methods: {
    openDrawer() {
      this.$emit("openDrawer");
    },

    async addToCart(product) {
      let result = await this.$store.dispatch(
        "productsModule/addToCart",
        product
      );
      this.openDrawer();
      // this.produce = produce
      // this.modalActiveView = 2
      // $('#single_market_produce').modal({
      //         show: true,
      //         keyboard: false,
      //         backdrop: 'static'
      //       })
    },
  },
};
</script>
