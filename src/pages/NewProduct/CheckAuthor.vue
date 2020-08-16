<template>
  <div>

    <b-container>
        <h2>Проверьте все поля в вашем профиле</h2>

        <v-tabs vertical>
            <v-tab>Ученик</v-tab>
            <v-tab>Партнер</v-tab>
            <v-tab-item>
                <UserInfo />
            </v-tab-item>
            <v-tab-item>
                <PartnerInfo />
            </v-tab-item>
        </v-tabs>

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

        <v-form
          v-model="valid"
          ref="form"
          lazy-validation
        >
          <v-btn
            v-if="newProduct"
            @click="back"
            text
            >Назад</v-btn>

          <v-btn
            @click="submit"
            :disabled="!valid"
            text
          >Далее</v-btn>

        </v-form>

    </b-container>

  </div>

</template>

<script>
import UserInfo from '@/components/profile/student/UserInfo';
import PartnerInfo from '@/components/profile/partner/PartnerInfo';

export default {
  name: 'CheckAuthor',
  props: {
    newProduct: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      user: this.currentUser,
      valid: true,
      msgAuthor: [],
    };
  },
  components: {
    UserInfo,
    PartnerInfo
  },
  methods: {
    submit () {
        this.$http.get(`/api/users/${this.currentUser.id}?authoremptyfields=1`).then(res => {
            this.user = res.data;
            if (this.user.authorEmptyFields.length > 0) {
                this.msgAuthor = this.user.authorEmptyFields;
            } else {
                this.newProduct.step = 'Page4';
            }
        });
    },
    back () {
      this.newProduct.step = 'Page3';
    },

  },
  beforeCreate() {
      this.$http.get(`/api/users/${this.currentUser.id}?authoremptyfields=1`).then(res => {
          this.user = res.data;
          if (this.user.authorEmptyFields.length > 0) {
              this.msgAuthor = this.user.authorEmptyFields;
          }
      });
  },
}
</script>
