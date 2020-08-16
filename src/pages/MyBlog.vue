<template>
  <div>
    <div class="m-4">
      <div v-if="preload">
        <b-spinner variant="success" label="Spinning"></b-spinner>
      </div>
      <v-btn large @click="$router.push('/blog-create')">Создать блог</v-btn>

      <div>
        <router-link
          v-if="$auth.user().role === 'manager'"
          :to="{ name: 'blog-create' }"
          class="btn btn-primary"
        >
          manager
          Создать блог
        </router-link>

        <p>Ваши посты:</p>
        <b-list-group>
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
            v-for="item in items"
            v-bind:key="item.id"
          >
            <div class="post-actions">
              <router-link
                class="nav-link"
                :to="`/blog/${item.id}`"
              >{{ item.title }}</router-link>
              <router-link class="nav-link" :to="`/edit-blog/${item.id}`">
                <i class="fas fa-edit">Редактировать</i>
              </router-link>
            </div>
            <b-badge variant="primary" pill>{{ item.comments.length }}</b-badge>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "MyBlog",

  data: () => {
    return {
      preload: true,
      items: new Array()
    };
  },
  beforeCreate() {
    this.$http.get("/api/blog/get-blog-user/").then(res => {
      this.preload = false;
      this.items = res.data.items;
      return res.data.items;
    });
  }
};
</script>

<style scoped>
.post-actions {
  display: flex;
  align-items: center;
}
</style>