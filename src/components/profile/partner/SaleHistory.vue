<template>
  <v-card class="mt-8 pl-4 pr-4 pb-4" v-if="saleItems && saleItems.length">
    <Search :onSearch="handleSearch" :onReset="onReset" />
    <SaleItems :saleItems="items" />
  </v-card>
</template>

<script>
import Search from "@/components/profile/partner/history/Search";
import SaleItems from "@/components/profile/partner/history/SaleItems";

export default {
  name: "SaleHistory",

  components: {
    Search,
    SaleItems
  },

  props: {
    saleItems: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
    filter: {
      enabled: false,
      saleItems: []
    }
  }),

  methods: {
    handleSearch(search) {
      if (search.state === "date") {
        const parse = date => {
          return Date.parse(new Date(date).toDateString());
        };
        this.filter.saleItems = this.saleItems.filter(s => {
          const createTime = parse(s.createdAt);
          const begin = parse(search.from);
          const todate = parse(search.to);

          if (begin > todate) {
            return createTime >= todate && createTime <= begin;
          }

          return createTime >= begin && createTime <= todate;
        });
        this.filter.enabled = true;
      } else {
        this.filter.saleItems = this.saleItems.filter(s => {
          return s.name.toLowerCase().indexOf(search.text.toLowerCase()) !== -1;
        });
        this.filter.enabled = true;
      }
    },

    onReset() {
      if (this.filter.enabled) {
        this.filter.enabled = false;
        this.filter.saleItems = [];
      }
    }
  },

  computed: {
    items() {
      if (this.filter.enabled) {
        return this.filter.saleItems;
      }

      return this.saleItems;
    }
  }
};
</script>

<style scoped>
</style>