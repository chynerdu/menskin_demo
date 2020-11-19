<template>
  <div>
    <!-- Image and text -->
    <nav class="navbar navbar-light bg-light" style="padding: 0 30px 0 30px;">
      <a class="navbar-brand appTitle" href="#">LUMIN</a>
      <div class="">
        <font-awesome-icon
          icon="cart-arrow-down"
          @click="openDrawer"
          style="font-size:25px;"
        />
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  methods: {
    openDrawer() {
      this.$emit("openDrawer");
    },
  },
};
</script>
