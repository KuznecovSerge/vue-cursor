<template>
    <div class="profileInfo-container border-left pl-3 pb-10">
        <v-form id="changeForm" v-model="valid" ref="form">
            <v-flex>
                <div class="float-left mr-5">
                    <UploadImageInput
                      :imageData="user.avatar"
                      @input="loadAvatar($event)"
                    />
                </div>
                <div class="row">
                    <div class="col-12 col-md-6">
                        <span>Ваше имя</span>
                        <v-text-field
                            v-model="user.firstName"
                            required
                            :rules="[
                              (v) => !!v || 'Введите, Ваше имя'
                            ]"
                            solo
                            hide-details="auto"
                        ></v-text-field>
                    </div>
                    <div class="col-12 col-md-6">
                        <span>Ваша фамилия</span>
                        <v-text-field
                            v-model="user.lastName"
                            required
                            :rules="[
                              (v) => !!v || 'Введите, Вашу фамилию'
                            ]"
                            solo
                            hide-details="auto"
                        ></v-text-field>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-md-6">
                        <span>Email</span>
                        <v-text-field
                            v-model="user.email"
                            required
                            solo
                            :rules="[
                              (v) => !!v || 'Введите email',
                              rules.email
                            ]"
                            hide-details="auto"
                        ></v-text-field>
                    </div>
                    <div class="col-12 col-md-6">
                        <span>Телефон</span>
                        <v-text-field
                            v-model="user.phone"
                            required
                            solo
                            hide-details="auto"
                        ></v-text-field>
                    </div>
                </div>
            </v-flex>
            <div class="pt-5">
                <span>Часовой пояс</span>
                <v-select
                    v-model="user.timeZone"
                    :items="timeZones"
                    required
                    solo
                    hide-details="auto"
                ></v-select>
            </div>
            <b-row>
                <b-col cols="12" md="4">
                    <span>Пароль</span>
                    <v-text-field
                        v-model="user.password"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassword ? 'text' : 'password'"
                        required
                        :rules="blocks.passwordChange ? [ rules.min ] : []"
                        solo
                        hide-details="auto"
                        :placeholder="passwordHolder"
                        :disabled="!blocks.passwordChange"
                        @click:append="showPassword = !showPassword"
                    ></v-text-field>
                </b-col>
                <b-col cols="12" md="4" v-if="blocks.passwordChange && !showPassword">
                    <span>Повторите пароль</span>
                    <v-text-field
                        v-model="user.password2"
                        type="password"
                        required
                        :rules="[ rules.passequal ]"
                        solo
                        hide-details="auto"
                    ></v-text-field>
                </b-col>
                <b-col cols="12" md="4" align-self="end" v-if="!blocks.passwordChange">
                    <v-btn color="primary"
                        align-self="end"
                        outlined
                        large
                        @click="blocks.passwordChange = !blocks.passwordChange; blocks.cancel = !blocks.cancel"
                        >Изменить пароль
                    </v-btn>
                </b-col>
            </b-row>
            <div class="pt-2">
                <v-btn
                    color="primary"
                    :disabled="!valid"
                    @click="onSave()"
                    >Обновить профиль
                </v-btn>
            </div>

      </v-form>
    </div>
</template>

<script>
import UploadImageInput from "@/components/UploadImageInput";
export default {
  data: function() {
    let current = this.$root.currentUser;
    let timeZone = current.timeZone || (new Date().getTimezoneOffset() / -60).toFixed(1);
    return {
      blocks: {
        passwordChange: false,
        cancel: false
      },
      showPassword: false,
      valid: true,
      rules: {
        email: v => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(v) || 'Неверный e-mail.'
        },
        min: v => v.length >= 8 || 'Минимум 8 символов',
        passequal: v=> {
            let valid = (this.user.password === this.user.password2) || this.showPassword;
            return valid || 'Пароли не совпадают' ;
        }
      },
      user: {
        id: current.id,
        firstName: current.firstName,
        lastName: current.lastName,
        description: current.descriptionAuthor,
        password: "",
        password2: "",

        phone: current.phone,
        timeZone: timeZone,

        currentPassword: current.password,
        email: current.email,

        avatar: current.avatar
      },
      timeZones: [{value: "-12.0", text: "(GMT -12:00) Эниветок, Кваджалейн"},{value: "-11.0", text: "(GMT -11:00) Остров Мидуэй, Самоа"},{value: "-10.0", text: "(GMT -10:00) Гавайи"},{value: "-9.0", text: "(GMT -9:00) Аляска"},{value: "-8.0", text: "(GMT -8:00) Тихоокеанское время (США и Канада)"},{value: "-7.0", text: "(GMT -7:00) Горное время (США и Канада)"},{value: "-6.0", text: "(GMT -6:00) Центральное время (США и Канада), Мехико"},{value: "-5.0", text: "(GMT -5:00) Восточное время (США и Канада), Богота, Лима"},{value: "-4.0", text: "(GMT -4:00) Атлантическое время (Канада), Каракас, Ла-Пас"},{value: "-3.5", text: "(GMT -3:30) Ньюфаундленд"},{value: "-3.0", text: "(GMT -3:00) Бразилия, Буэнос-Айрес, Джорджтаун"},{value: "-2.0", text: "(GMT -2:00) Срединно-Атлантического"},{value: "-1.0", text: "(GMT -1:00 час) Азорские острова, острова Зеленого Мыса"},{value: "0.0", text: "(GMT) Время Западной Европе, Лондон, Лиссабон, Касабланка"},{value: "1.0", text: "(GMT +1:00 час) Брюссель, Копенгаген, Мадрид, Париж"},{value: "2.0", text: "(GMT +2:00) Киев, Калининград, Южная Африка"},{value: "3.0", text: "(GMT +3:00) Багдад, Москва, Санкт-Петербург, Эр-Рияд"},{value: "3.5", text: "(GMT +3:30) Тегеран"},{value: "4.0", text: "(GMT +4:00) Абу-Даби, Мускат, Баку, Тбилиси"},{value: "4.5", text: "(GMT +4:30) Кабул"},{value: "5.0", text: "(GMT +5:00) Екатеринбург, Исламабад, Карачи, Ташкент"},{value: "5.5", text: "(GMT +5:30) Бомбей, Калькутта, Мадрас, Нью-Дели"},{value: "5.75", text: "(GMT +5:45) Катманду"},{value: "6.0", text: "(GMT +6:00) Алматы, Дакке, Коломбо"},{value: "7.0", text: "(GMT +7:00) Бангкок, Ханой, Джакарта"},{value: "8.0", text: "(GMT +8:00) Пекин, Перт, Сингапур, Гонконг"},{value: "9.0", text: "(GMT +9:00) Токио, Сеул, Осака, Саппоро, Якутск"},{value: "9.5", text: "(GMT +9:30) Аделаида, Дарвин"},{value: "10.0", text: "(GMT +10:00) Восточная Австралия, Гуам, Владивосток"},{value: "11.0", text: "(GMT +11:00) Магадан, Соломоновы острова, Новая Каледония"},{value: "12.0", text: "(GMT +12:00) Окленд, Веллингтон, Фиджи, Камчатка"}]
    };
  },
  components: {
    UploadImageInput
  },
  methods: {
    onSave() {
      if (this.$refs.form.validate()) {

          let formData = new FormData();

          formData.append("firstName", this.user.firstName);
          formData.append("lastName", this.user.lastName);
          formData.append("phone", this.user.phone);
          formData.append("timeZone", this.user.timeZone);
          formData.append("email", this.user.email);
          formData.append("password", this.user.password);
          formData.append("avatar", this.user.avatar);

          this.$http
            .put(`/api/users/${this.user.id}`, formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            })
            .then(res => {
              this.$swal("Данные обновлены", undefined, "success");
            })
            .catch(err => {
              this.$swal("Ошибка", undefined, "error");
            });
          this.loading = false;
      }
    },

    loadAvatar(avatar) {
      this.user.avatar = avatar;
    }
  },
  computed: {
      passwordHolder() {
          return (this.blocks.passwordChange) ? '':'********';
      }
  }
};
</script>

<style scoped>
.profile-change {
  margin: 15px;
}
</style>
