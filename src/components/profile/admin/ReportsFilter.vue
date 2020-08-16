<template>
  <div class="filter">
    <b-dropdown right text="Тип жалобы" variant="outline-danger">
      <b-dropdown-item
        v-on:click="() => handleSelect(filter)"
        v-for="filter in filters"
        v-bind:key="filter.id"
      >{{filter.name}}</b-dropdown-item>
    </b-dropdown>
    <div class="selected">
      <b-button variant="outline-success" disabled>{{selectedItem.name}}</b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filters: Array,
    onSetFilter: Function
  },

  data: function() {
    return {
      selectedItem: Object
    };
  },

  methods: {
    handleSelect(filter) {
      this.selectedItem = filter;
      if (this.onSetFilter) {
          this.onSetFilter(filter);
      }
    }
  },

  created() {
      if (this.filters.length) {
          this.selectedItem = this.filters[0];
          if (this.onSetFilter) {
              this.onSetFilter(this.selectedItem);
          }
      }
  },

  computed: {
    selected() {
      return this.default || (this.filters.length && this.filters[0].name);
    }
  }
};
</script>

<style lang="css" scoped>
.filter {
  display: flex;
  align-items: center;
  height: 40px;
  margin: 10px 0;
}

.filter .selected {
  padding-left: 10px;
}
</style>