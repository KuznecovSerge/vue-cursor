<template>
  <div v-if="blogPosts.length">
    <p>Новые блоги:</p>

    <ul>
      <li v-for="blogPost in blogPosts" v-bind:key="blogPost.id">
        <p>
          <b-button @click="handleShow(blogPost.id)">Блог с номером {{blogPost.id}}</b-button>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NewNotificationsBlogPosts",

  data: () => {
    return {
      blogPosts: []
    };
  },

  mounted() {
    this.getNotificationNewBlogPosts();
    this.getNewNotification();
  },

  methods: {
    handleShow(blogId) {
        this.setStatusRead(blogId);
    },

    getNotificationNewBlogPosts() {
      this.$http.get("/api/blog/get-new-blogPosts").catch(error => {
        console.log(error);
      });
    },

    getNewNotification() {
      this.$http
        .get("/api/blog/get-notification-new-blogPosts")
        .then(res => {
          this.blogPosts = res.data.items;
        })
        .catch(error => {
          console.log(error);
        });
    },

    setStatusRead(blogId) {
      this.$http.post("/api/blog/set-status-read", {
          id: blogId
      }).catch(error => {
        console.log(error);
      });
    }
  }
};
</script>

<style scoped>
</style>