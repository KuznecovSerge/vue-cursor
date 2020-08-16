<template>
  <div>
    <div class="mt-3 min-vh-100 d-flex justify-content-center align-items-center" v-if="preload">
      <b-spinner variant="success" label="Spinning"></b-spinner>
    </div>

    <div v-else class="m-4">
      <div class="d-flex flex-column w-25">
        <b-img class="w-100" :src="author.avatar" fluid alt="Fluid image"></b-img>

        <div class="mt-4">
          <p>
            О себе:
            <br />
            {{ author.descriptionAuthor }}
          </p>
        </div>

        <div class="mt-4">
          <p>
            Рейтинг:
            {{ this.rating }}
          </p>
        </div>

        <div class="mt-4">
          <p>Email: {{ author.email }}</p>
        </div>

        <b-button pill variant="success" @click="subscribingToAuthor">Подписаться на автора</b-button>
      </div>

      <div class="m-4" v-for="note in blogPosts">
        <router-link class="nav-link" :to="`/blog/${note.id}`">
          <b-card
            overlay
            :img-src="`/public/assets/media/${note.mainPhoto}`"
            img-alt="Card Image"
            text-variant="black"
            :title="note.title"
          >
            <div class="d-flex flex-row">
              <p>Теги:</p>
              <div class="ml-1" v-for="tag in note.tags">
                <router-link class="btn btn-primary" :to="`/blog?tag=${tag}`">{{ tag }}</router-link>
              </div>
            </div>
            <div>
              Описание:
              <p>{{ note.description.substring(0, 100) }}</p>

              <router-link
                v-if="$auth.user().role === 'manager'"
                :to="{ name: 'blog-create' }"
                class="btn btn-primary mt-3"
              >Создать блог</router-link>
            </div>
          </b-card>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
 

export default {
  name: "BlogAuthor",

  data: () => {
    return {
      blogPosts: {},
      author: {},
      rating: 0,
      preload: true
    };
  },

  mounted() {
    this.postsGet();
    this.authorGet();
  },

  methods: {
    postsGet() {
      this.$http
        .get("/api/blog/get-note-blog-by-author/" + this.$route.params.id)
        .then(res => {
          this.blogPosts = res.data.items;

          this.blogPosts = res.data.items.map(item => {
            if (item.tags !== null) {
              item.tags = item.tags.split(",");
            }

            return item;
          });

          this.preload = false;
        });
    },

    authorGet() {
      this.$http
        .get("/api/users/" + this.$route.params.id)
        .then(res => {
          this.author = res.data;
          this.preload = false;
          return this.author;
        })
        .then(author => {
          this.$http
            .get("/api/blog/get-top-author-rating")
            .then(res => {
              const authors = res.data.items.filter(i => i.author.id == author.id);
              if (authors.length) {
                const authorItem = authors[0];
                this.rating = authorItem.countUserLike;
              }
            })
            .catch(err => {
              console.log(err);
            });
        });
    },

    subscribingToAuthor() {
      this.$http.post("/api/blog/subscribing-author", {
        authorId: this.$route.params.id
      });
    }
  }
};
</script>

<style scoped>
</style>