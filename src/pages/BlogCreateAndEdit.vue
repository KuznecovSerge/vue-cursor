<template>
  <div>
    <div class="m-3">
      <b-alert class="fixed-top" v-model="showAlert" :variant="variant" dismissible>{{ msgAlert }}</b-alert>

      <div>
        <b-form @submit.stop.prevent>
          <label for="title-note">Заголовок:</label>
          <b-input v-model="title" id="title-note"></b-input>
        </b-form>
      </div>

      <div class="mt-3">
        Картинка:
        <b-form-file v-model="mainPhoto" ref="file-input" class="mb-2"></b-form-file>

        <b-button @click="mainPhoto = undefined">Убрать картинку</b-button>
      </div>

      <div class="mt-3">
        Теги:
        <multiselect
          v-model="selectTags"
          tag-placeholder="Добавить новый тег"
          placeholder="Поиск по тегам"
          :max="4"
          label="name"
          track-by="code"
          :options="tags"
          :multiple="true"
          :taggable="true"
          @tag="addTag"
        />
      </div>

      <div class="mt-3">
        Описание:
        <TinyEditor :content="description" :onChange="(data) => description = data" />
      </div>

      <b-button class="mt-3" @click="save" variant="success">Сохранить</b-button>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import TinyEditor from "@/components/common/TinyEditor";

export default {
  name: "BlogCreateAndEdit",

  components: { Multiselect, TinyEditor },

  data: function() {
    return {
      title: "",
      mainPhoto: undefined,
      tags: [],
      selectTags: [],
      description: "",
      msgAlert: "",
      showAlert: false,
      variant: "success"
    };
  },

  beforeCreate() {
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

    // если редактируем блог
    if (this.$route.params.id !== undefined) {
      this.$http
        .get("/api/blog/get-note-blog/" + this.$route.params.id)
        .then(res => {
          this.description = res.data.items.description;
          this.mainPhoto = res.data.items.mainPhoto;
          this.title = res.data.items.title;
          this.selectTags = res.data.items.tags.split(",");

          this.selectTags = this.selectTags.map(tag => {
            return { name: tag, code: Math.floor(Math.random() * 10000000) };
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  methods: {
    validationTitle() {
      if (this.title.length > 9 && this.title.length < 21) {
        return true;
      } else {
        this.msgAlert =
          "Заголовок должен быть не меньше 10 и не больше 20 символов!";
        this.showAlert = true;
        this.variant = "danger";

        return false;
      }
    },
    validationMainPhoto() {
      if (this.mainPhoto !== undefined) {
        return true;
      } else {
        this.msgAlert = "Фотография должна быть загружена!";
        this.showAlert = true;
        this.variant = "danger";

        return false;
      }
    },
    validationTags() {
      if (this.tags.length > 0) {
        return true;
      } else {
        this.msgAlert = "Должен быть выбран хотя бы один тег!";
        this.showAlert = true;
        this.variant = "danger";

        return false;
      }
    },
    validationDescription() {
      if (this.description.length > 100) {
        return true;
      } else {
        this.msgAlert = "Описание должно быть не менее 100 символов!";
        this.showAlert = true;
        this.variant = "danger";

        return false;
      }
    },

    addTag(newTag) {
      const tag = {
        name: newTag,
        code: "newTag-" + Math.floor(Math.random() * 10000000)
      };
      this.tags.push(tag);
      this.selectTags.push(tag);
    },

    save() {
      if (
        this.validationTitle() &&
        this.validationMainPhoto() &&
        this.validationTags() &&
        this.validationDescription()
      ) {
        let formData = new FormData();

        formData.append("title", this.title);
        formData.append("file", this.mainPhoto);
        formData.append("tags", JSON.stringify(this.selectTags));
        formData.append("description", this.description);
        formData.append("userId", this.currentUser.id);

        if (this.$route.params.id !== undefined) {
          formData.append("blogPostId", this.$route.params.id);
        }

        this.$http
          .post(`/api/blog/create/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(res => {
            if (res.data.success) {
              this.msgAlert = "Запись успешно сохранена!";
              this.showAlert = true;
              this.variant = "success";
              this.$router.push(`/blog/${res.data.blogId}`);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style scoped>
</style>