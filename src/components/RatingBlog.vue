<template>
  <b-card no-body class="overflow-hidden rating-container">
    <b-row no-gutters>
      <b-col md="4">
        <b-card-img
          id="profile-image"
          :src="userImage"
          class="rounded-0 profile-image"
          @click="$router.push('profile')"
        ></b-card-img>
        <b-tooltip target="profile-image" triggers="hover" placement="bottom">Перейти в профиль</b-tooltip>
      </b-col>
      <b-col md="8">
        <b-card-body>
          <b-card-text>
            <div class="d-flex flex-column justify-content-between">
              <div class="d-flex flex-row justify-content-between">
                <span>Количество лайков:</span>
                <span class="bold">{{likesCount}}</span>
              </div>
              <div class="d-flex flex-row justify-content-between">
                <span>О себе: </span>
                <span class="bold">{{this.description}}</span>
              </div>
              
            </div>
            <b-button size="sm" class="w-100" v-on:click="handleCreate">Создать блог</b-button>
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  name: "RatingBlog",

  props: {
    userId: 0
  },

  data: function() {
    return {
      preload: true,
      authorBlog: {
        count: 0
      }
    };
  },

  created() {
    this.$http
      .get("/api/blog/get-rating", {
        params: {
          userId: this.userId
        }
      })
      .then(res => {
        this.authorBlog = res.data.items;
        this.preload = false;
      })
      .catch(err => {
        this.preload = false;
      });
  },

  computed: {
    userImage() {
      return `/public/assets/media/${this.currentUser.avatar}`;
    },

    likesCount() {
      return this.authorBlog.count;
    },

    description() {
      const user = this.currentUser;
      return user.descriptionAuthor;
    }
  },

  methods: {
    handleCreate() {
      this.$router.push("/blog-create");
    }
  }
};
</script>

<style scoped>
.bold {
  font-weight: 600;
}
.rating-container {
  max-width: 320px;
}
.profile-image {
  height: 100%;
  width: 100%;
  border-right: 1px solid #b1b1b1;
  cursor: pointer;
}

.profile-image:hover {
  border: 1px solid #b1b1b1;
}
</style>