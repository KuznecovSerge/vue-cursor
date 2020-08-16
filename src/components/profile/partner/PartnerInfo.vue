<template>
  <div class="profileInfo-container border-left pl-3 pb-10">
      <v-form id="userPartner">

          <span>О себе</span>
          <v-textarea
              v-model="user.authorAbout"
              class="mt-2"
              solo
          ></v-textarea>

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

          <v-btn color="primary" @click="onSave">Обновить профиль</v-btn>
    </v-form>

  </div>
</template>

<script>
export default {
  name: "PartnerInfo",
  props: {
      question: {
          type: Object
      }
  },
  data: function() {
    let currentUser = this.currentUser;
    if (!currentUser.authorSocial) currentUser.authorSocial = ['','',''];
    return {
      user: currentUser
    };
  },
  computed: {
    currentUser() {
      return this.user;
    }
  },
  methods: {
      onSave(evt) {
          this.$http
            .put(`/api/users/${this.user.id}`, {
                authorAbout: this.user.authorAbout,
                authorSocial: this.user.authorSocial,
            })
            .then(res => {
              this.$swal("Данные обновлены", undefined, "success");
              console.log(res);
            })
            .catch(err => {
              this.$swal("Ошибка", undefined, "error");
            });
      }
  }
};
</script>

<style scoped>
.image-input {
  display: block;
  width: 200px;
  height: 200px;
  background-size: cover;
  background-position: center center;
  border: 1px solid #e9e9e9;
  border-radius: 50%;
}
</style>
