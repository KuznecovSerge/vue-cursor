<template>
  <div>
    <b-container>

      <h2>Автор курса</h2>

      <v-form
        v-model="valid"
        ref="form"
        lazy-validation
      >

      <div class="pt-3 row">
          <b-col cols="12" md="6">
          <v-card
            class="mx-auto d-block"
            outlined
            >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">АВТОР</div>
                <v-list-item-title class="headline mb-1">{{user.firstName + ' ' + user.lastName}}</v-list-item-title>
                <v-list-item-subtitle>{{user.authorAbout}}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar
                tile
                size="80"
                color="grey"
              >
              <v-img :src="`${user.avatar}?nocache=${nocache}`"/>
              </v-list-item-avatar>
            </v-list-item>

            </v-card>
            </b-col>

            <b-col cols="12" md="6" align-content="start" align-h="center">
                <v-btn
                v-if="!isProfileEditing"
                @click="isProfileEditing=true"

                >Исправить профиль автора</v-btn>
            </b-col>
      </div>

      <div v-if="msgAuthor.length != 0" class="pt-5">
        <span>Ошибки при заполнении профиля</span>

        <v-alert
            border="top"
            colored-border
            type="error"
            elevation="2"
        >
            <div
                v-for="(item, i) in msgAuthor"
                :key="i"
                > {{item.text}}
            </div>
        </v-alert>
      </div>

      
      <div v-if="isProfileEditing" class="pt-3">
        <div class="float-left mr-5">
            <UploadImageInput
              size=200
              :imageData="`${user.avatar}?${nocache}`"
              @input="user.avatar = $event"
            />
        </div>
        <div class="row">
          <div class="col-12 col-sm-12">
            <span>Имя</span>
            <v-text-field
                v-model="user.firstName"
                required
                class="mt-2"
                solo
                hide-details="auto"
            ></v-text-field>
          </div>
          <div class="col-12 col-sm-12">
            <span>Фамилия</span>
            <v-text-field
                v-model="user.lastName"
                required
                class="mt-2"
                solo
                hide-details="auto"
            ></v-text-field>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-sm-6">
            <div class="mb-2">О себе</div>
            <v-textarea
                v-model="user.authorAbout"
                required
                class="mt-2"
                height=204
                solo
            ></v-textarea>
          </div>
          <div class="col-12 col-sm-6">
            <div class="mb-2">Социальные сети</div>
            <v-text-field
                v-model="user.authorSocial['0']"
                required
                solo
                label="например, facebook.com/profile.php?id=1"
            ></v-text-field>
            <v-text-field
                v-model="user.authorSocial['1']"
                required
                solo
                label="например, vk.com/durov"
            ></v-text-field>
            <v-text-field
                v-model="user.authorSocial['2']"
                required
                solo
                label="например, ok.ru/user123"
            ></v-text-field>
          </div>
        </div>

        <div class="b-flex pb-5">
          <v-btn color="primary" @click="onUpdateProfile">Обновить профиль</v-btn>
        </div>

      </div>


      <v-btn
        v-if="newProduct.step !== 'ShowCourse'"
        @click="back"
        text
        >Назад</v-btn>

      <v-btn
        v-if="newProduct.step !== 'ShowCourse'"
        @click="submit"
        :disabled="!valid"
        text
      >Далее</v-btn>

      </v-form>
    </b-container>
  </div>
</template>

<script>
import UploadImageInput from "@/components/UploadImageInput";
export default {
  name: 'step4',
  props: [
    'newProduct'
  ],
  components: {
    UploadImageInput
  },
  data() {
    return {
      valid: true,
      issetAuthor: false, // Есть ли страницы автора у пользователя
      user: this.currentUser,
      msgAuthor: [],
      nocache: Date.now(),
      isProfileEditing: false // показывать форму редактирования профиля
    };
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.newProduct.authorId = this.user.id;
        this.newProduct.step = 'PostProduct';
      }
    },
    back () {
      this.newProduct.step = 'Page3';
    },
    changeAuthor() {
      this.isProfileEditing = true;
    },
    onUpdateProfile() {
      let formData = new FormData();

      formData.append("firstName", this.user.firstName);
      formData.append("lastName", this.user.lastName);
      formData.append("authorAbout", this.user.authorAbout);
      for (let social of this.user.authorSocial) formData.append("authorSocial[]", social);
      formData.append("avatar", this.user.avatar);

      this.$http
        .put(`/api/users/${this.user.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          this.$swal("Данные обновлены", undefined, "success")
          .then(this.checkAuthor);
        })
        .catch(err => {
          this.$swal("Ошибка", undefined, "error");
        });
    },
    checkAuthor() {
      this.nocache = Date.now();
      this.$http.get(`/api/users/${this.currentUser.id}?authoremptyfields=1`).then(res => {
          this.user = res.data;
          this.msgAuthor = this.user.authorEmptyFields;
          // если у автора есть пустые поля
          if (this.user.authorEmptyFields.length > 0) {
            // кнопка Далее не доступна, профиль открыт на редактирование
            this.valid = false;
            this.isProfileEditing = true;
          } else {
            // кнопка Далее доступна, профиль не открыт на редактирование (но можно редактировать по кнопке)
            this.valid = true;
            this.isProfileEditing = false;
          }
      });
    }
  },
  beforeCreate() {
    this.$http.get(`/api/users/${this.currentUser.id}?authoremptyfields=1`).then(res => {
          this.user = res.data;
          if (this.user.authorEmptyFields.length > 0) {
            this.msgAuthor = this.user.authorEmptyFields;
            this.valid = false;
            this.isProfileEditing = true;
          };
      });
  },
}
</script>
