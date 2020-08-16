<template>
  <b-spinner v-if="loading" variant="success" label="Spinning"></b-spinner>
  <b-table
    v-else
    striped
    bordered
    hover
    fixed
    :fields="fields"
    :items="dataItems"
    responsive="sm"
    class="posts-table"
  >
    <template v-slot:cell(actions)="data">
      <b-button size="sm" v-on:click="() => $router.push(`/blog/${data.item.id}`)" variant="success">Перейти</b-button>
    </template>
  </b-table>
</template>

<script>
export default {
  name: "UsersPosts",
  data: function() {
    return {
      loading: true,
      dataItems: Array,
      fields: [
        { key: "user", label: "Автор" },
        { key: "title", label: "Заголовок" },
        { key: "tags", label: "Теги" },
        { key: "actions", label: "Действия" }
      ]
    };
  },

  beforeCreate() {
    const that = this;
    this.$http
      .get("/api/blog/get-note-blog", {
        params: {
          tag: this.$route.tag !== undefined ? this.$route.tag : ""
        }
      })
      .then(res => {
        that.dataItems = res.data.items.reverse().map(item => {
          that.loading = false;
          return {
            id: item.id,
            user: item.users.email,
            title: item.title,
            tags: item.tags
          };
        });
      })
      .catch(err => {
        that.loading = false;
        console.log(err);
      });
  }
};
</script>

<style scoped>
.posts-table {
  margin: 10px;
}
</style>