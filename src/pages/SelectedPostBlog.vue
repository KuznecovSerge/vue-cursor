<template>
  <div>
    <ReportModal
      containerId="blogReportModal"
      :visible="reportContainerVisible"
      title="Жалоба на блог"
      :onSubmit="handleSubmit"
    />
    <div class="m-4">
      <div v-if="preload || note == null">
        <b-spinner variant="success" label="Spinning"></b-spinner>
      </div>

      <b-card
        v-else
        :img-src="`/public/assets/media/${note.mainPhoto}`"
        img-alt="Card Image"
        img-height="80px"
      >
        <b-card-title>
          <div class="flex-title">
            <span>{{note.title}}</span>
            <span v-if="comments.filter(i => i.new).length > 0" class="notice">
              <span>+</span>
              <span>{{comments.filter(i => i.new).length}}</span>
            </span>
          </div>
        </b-card-title>
        <b-card-body>
          <b-card-text>
            <p v-html="note.description"></p>
          </b-card-text>
          <b-card-text>
            <div class="mt-3">
              <p>Кол-во лайков: {{this.likes}}</p>
            </div>
            <div class="flex-row">
              <b-button-group>
                <b-button @click="like" type="submit" variant="outline-success">
                  <i class="far fa-heart"></i>
                </b-button>

                <b-button @click="repost" type="submit" variant="outline-success">
                  <i class="fas fa-reply"></i>
                </b-button>

                <b-button @click="report" type="submit" variant="outline-danger">
                  <i class="far fa-flag report-icon" v-b-tooltip.hover title="Пожаловаться" />
                </b-button>
              </b-button-group>
            </div>

            <div class="mt-5">
              <CommonComments :entityId="this.CONST.Entities.Blog" :referenceId="Number(this.$route.params.id)"/>
            </div>
          </b-card-text>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
import CommonComments from "@/components/common/Comments";
import ReportModal from "@/components/ReportModal";

export default {
  name: "SelectedPostBlog.vue",

  components: { ReportModal, CommonComments },

  data: () => {
    return {
      note: null,
      msgAlert: "",
      showAlert: false,
      preload: true,
      comments: [],
      loadedIds: [],
      updateTimeout: 10000,
      updateTimeoutId: -1,
      loaded: false,
      active: false,
      reportContainerVisible: false,
      likes: 0
    };
  },

  beforeCreate() {
    this.$http
      .get("/api/blog/get-note-blog/" + this.$route.params.id)
      .then(res => {
        this.likes = res.data.likes;
        this.note = res.data.items;
        this.preload = false;
      })
      .catch(err => {
        console.log(err);
      });
  },

  created() {
    this.renderComments();
    window.addEventListener("scroll", this.handleScroll);
  },

  beforeDestroy() {
    this.active = false;
    clearTimeout(this.updateTimeoudId);
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    async renderComments() {
      const comments = await this.getComments();
      const commentsItems = comments.map(c => {
        return {
          new: !this.loaded ? false : this.isNotExists(c),
          item: c
        };
      });

      if (!this.loaded) {
        this.loaded = true;
        this.loadedIds = commentsItems.map(c => c.item.id);
      }
      this.comments = commentsItems;

      if (this.updateTimeoutId === -1) {
        this.active = true;
        const that = this;
        this.updateTimeoutId = setTimeout(function recursive() {
          if (that.active) {
            that.renderComments();
            that.updateTimeoutId = setTimeout(recursive, that.updateTimeout);
          }
        }, that.updateTimeout);
      }
    },

    isNotExists(comment) {
      if (this.loadedIds.length === 0) {
        return true;
      }

      const lastItemId = this.loadedIds[this.loadedIds.length - 1];
      return lastItemId < comment.id;
    },

    handleScroll() {
      const that = this;
      setTimeout(() => {
        const comments = that.comments.map(i => {
          return {
            item: i.item,
            new: false
          };
        });
        const ids = comments.map(i => i.item.id);
        that.comments = comments;
        that.loadedIds = ids;
      }, 3000);
    },

    updateComments(comments) {
      this.comments = comments;
    },

    getComments() {
      const model = {
        entityId: this.CONST.Entities.Blog,
        referenceId: this.$route.params.id
      };

      return this.$http
        .get("/api/comments", {
          params: model
        })
        .then(res => {
          this.preload = false;
          return res.data.items;
        })
        .catch(err => console.error(err));
    },

    like() {
      this.$http
        .post("/api/blog/save-like", {
          userId: this.currentUser.id,
          blogPostId: this.$route.params.id,
          authorId: this.note.userId
        })
        .then(like => {
          this.msgAlert = "Вы поставили лайк!";
          this.showAlert = true;
        })
        .catch(error => {
          console.log(error);
          this.msgAlert = "Не удалось поставить лайк!";
        });
    },

    handleSubmit(value) {
      const model = {
        userId: this.currentUser.id,
        reference: this.CONST.BLOG_POSTS,
        referenceId: this.note.id,
        message: value
      };
      this.$http
        .post("/api/reports", model)
        .then(res => {
          this.reportContainerVisible = false;
        })
        .catch(error => {
          console.log(error);
          this.reportContainerVisible = false;
        });
    },

    repost() {
      this.$http
        .post("/api/blog/save-repost", {
          userId: this.currentUser.id,
          blogPostId: this.$route.params.id
        })
        .then(() => {
          this.msgAlert = "Вы сделали репост данной записи!";
          this.showAlert = true;
        })
        .catch(error => {
          console.log(error);
          this.msgAlert = "Не удалось сделать репост данной запис!";
        });
    },

    report() {
      this.reportContainerVisible = true;
    },

    saveComment(comment) {
      this.$http
        .post("/api/comments", {
          entityId: this.CONST.Entities.Blog,
          referenceId: this.$route.params.id,
          comment: comment.comment
        })
        .then(res => {
          const item = res.data.comment;
          this.comments.push({
            item: item,
            new: false
          });
          this.loadedIds.push(item.id);
          this.renderComments();
          this.msgAlert = "Вы оставили комментарий!";
          this.showAlert = true;
        })
        .catch(error => {
          console.log(error);
          this.msgAlert = "Не удалось оставить комментарий!";
        });
    }
  }
};
</script>

<style>
blockquote {
  border-left: 2px solid #ccc;
  margin-left: 1.5rem;
  padding-left: 1rem;
}

.post-header {
  display: flex;
  align-items: center;
}

.post-header .notice {
  font-size: 16px;
}

.flex-title {
  display: flex;
}
</style>