<template>
  <div v-if="loading">
    <v-subheader>Формируем список покупок...</v-subheader>
    <v-progress-linear :active="loading" :indeterminate="true" :query="true"></v-progress-linear>
  </div>
  <div v-else>
    <v-layout wrap justify-space-around v-if="products.length">
      <v-flex v-for="product in products" v-bind:key="product.id" class="catalog-item mr-6">
        <CatalogItem :product="product" />
      </v-flex>
    </v-layout>
    <div v-else>
      <v-alert color="primary" dark border="left" prominent>У вас еще нет покупок!</v-alert>
    </div>
  </div>
</template>

<script>
import CatalogItem from "@/components/catalog/CatalogItem";
import loadImage from "image-promise";

export default {
  name: "Purchases",

  components: {
    CatalogItem
  },

  data: () => {
    return {
      products: [],
      loading: true,
      error: ""
    };
  },

  mounted() {
    this.loading = true;
    this.$http
      .get(`/api/users/section/student`)
      .then(res => {
        const model = res.data.viewmodel;
        if (!!model) {
          this.products = model.sales;
          this.loading = false;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },

  computed: {
    userId() {
      return this.currentUser.id;
    }
  }
};
</script>

<style scoped>
.catalog-item {
  width: 30%;
  margin-top: 15px;
}
</style>