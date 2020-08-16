<template>
  <div class="blogs-container">
    <b-alert class="fixed-top" v-model="showAlert" :variant="variant" dismissible>{{ msgAlert }}</b-alert>
    <div class="user-actions">
      <RatingBlog :userId="currentUser.id" />
    </div>
    <div class="tag-actions">
      <div v-if="selectTag">
        <b-button-group>
          <b-button variant="success" @click="subscribing">{{subscribeMessage(selectTag)}}</b-button>
          <b-button variant="danger" @click="resetSearch">Очистить поиск</b-button>
        </b-button-group>
      </div>
    </div>

    <div v-if="!blogPosts">
      <b-spinner variant="success" label="Spinning"></b-spinner>
    </div>

    <div v-else class="d-flex flex-row -between">
      <b-card-group deck columns>
        <b-card
          v-for="blog in blogPosts"
          v-bind:key="blog.id"
          :img-src="`/public/assets/media/${blog.mainPhoto}`"
          img-alt="Card Image"
          img-height="50px"
          class="blog-item"
          v-on:click="(e) => handleSwitch(e, blog)"
        >
          <template v-slot:header>
            <h4 class="mb-0">{{blog.title}}</h4>
          </template>
          <b-card-body>
            <b-card-text>
              <div class="d-flex flex-row justify-content-end">
                <span v-for="tag in blog.tags" v-bind:key="tag.id">
                  <b-button
                    :id="blog.id + '___tag_' + tag"
                    size="sm"
                    variant="outline-primary"
                    class="tag-item"
                    @click.stop="toTag(tag)"
                  >{{tag}}</b-button>
                  <b-tooltip
                    :target="blog.id + '___tag_' + tag"
                    triggers="hover"
                    placement="bottom"
                  >Фильтр по тегу {{tag}}</b-tooltip>
                </span>
              </div>
            </b-card-text>
            <b-card-text>
              <div>
                <p style="font-weight: 600">Описание:</p>
                <p v-html="blog.description.substring(0, 100)"></p>
              </div>
            </b-card-text>
          </b-card-body>
        </b-card>
        <div class="w-25 position-fixed" style="right: 20px">
          <TopAuthor :authors="topAuthors" />
        </div>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import RatingBlog from "../components/RatingBlog";
import TopAuthor from "../components/TopAuthor";

export default {
  name: "Blog",

  components: { RatingBlog, TopAuthor },

  data: () => {
    return {
      blogPosts: null,
      tags: {},
      selectTag: null,
      isLoading: false,
      msgAlert: "",
      showAlert: false,
      variant: "success",
      topAuthors: null,
      unsubscribe: false
    };
  },

  beforeCreate() {
    const tag = this.$route.tag;

    this.$http
      .get("/api/blog/get-note-blog", {
        params: {
          tag: tag !== undefined ? tag : ""
        }
      })
      .then(res => {
        this.blogPosts = res.data.items.reverse().map(item => {
          if (item.tags !== null) {
            item.tags = item.tags.split(",");
          }
          return item;
        });
      })
      .catch(err => {
        console.log(err);
      });

    // получение всех тегов
    this.$http
      .get("/api/journal/get-all-tags", {
        params: {
          name: ""
        }
      })
      .then(res => {
        this.tags = res.data.items;
      })
      .catch(err => {
        console.log(err);
      });
  },

  mounted() {
    this.getTopAuthorRating();
  },

  created() {
    const params = this.$route.query.tag;
    if (params) {
      this.selectTag = params;
      this.renderWithTag();
      this.checkTagSubscribing();
    }
  },

  computed: {
    currentUser() {
      return this.currentUser;
    }
  },

  methods: {
    subscribeMessage(tag) {
      const message = this.unsubscribe
        ? "Подписаться на тег"
        : "Отписаться от тега";
      return `${message}: ${tag}`;
    },

    subscribing() {
      this.$http
        .post("/api/journal/subscribing-tag", {
          name: this.selectTag,
          userId: this.currentUser.id
        })
        .then(res => {
          this.unsubscribe = res.data.result === 1;
          this.msgAlert = this.unsubscribe
            ? "Вы отписались от тега!"
            : "Вы успешно подписались на тег!";
          this.showAlert = true;
          this.variant = "success";
        })
        .catch(err => {
          this.msgAlert = "Не удалось подписаться на тег, попробуйте позже!";
          this.showAlert = true;
          this.variant = "danger";
          console.log(err);
        });
    },

    toTag(tag) {
      this.$router.push(`/blog?tag=${encodeURIComponent(tag)}`);
      this.selectTag = tag;
      this.renderWithTag();
      this.checkTagSubscribing();
    },

    checkTagSubscribing() {
      this.$http
        .post("/api/journal/is-subscribed-tag", {
          name: this.selectTag,
          userId: this.currentUser.id
        })
        .then(res => {
          const value = res.data.result;
          this.unsubscribe = !value;
        });
    },

    renderWithTag() {
      this.$http
        .get("/api/blog/get-note-blog", {
          params: {
            tag: decodeURIComponent(this.selectTag)
          }
        })
        .then(res => {
          this.blogPosts = res.data.items.reverse().map(item => {
            if (item.tags !== null) {
              item.tags = item.tags.split(",");
            }

            return item;
          });
        }).then(res => {
          window.scrollTo({top: 0, behavior: 'smooth'});
        })
        .catch(err => {
          console.log(err);
        });
    },

    resetSearch() {
      this.selectTag = "";
      this.$router.push("/blog");
      this.renderWithTag();
    },

    handleSwitch(e, blog) {
      const target = e.target;
      if (!target.classList.contains("tag-item")) {
        this.$router.push(`/blog/${blog.id}`);
      }
    },

    getTopAuthorRating() {
      this.$http
        .get("/api/blog/get-top-author-rating")
        .then(res => {
          this.topAuthors = res.data.items.map(el => {
            let author = {};

            author.countLike = el.countUserLike;
            author.id = el.author.id;
            author.email = el.author.email;
            author.avatar = el.author.avatar;

            return author;
          });

          this.topAuthors.sort(function(a, b) {
            return b.countLike - a.countLike;
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>



<style scoped>
.blog-item {
  flex: 0 0 70%;
  margin-bottom: 15px;
  cursor: pointer;
  max-width: 70%;
}

.blog-item:hover {
  border: 1px solid #bfa4a4;
}

.blogs-container {
  margin: 10px;
}

.user-actions,
.tag-actions {
  margin: 0 1em 1em 0;
  display: flex;
}

.tag-item {
  margin-left: 5px;
}
</style>
