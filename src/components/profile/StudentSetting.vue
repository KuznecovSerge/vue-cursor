<template>
    <div>
        <div class="row mb-5">
            <h1>Настройки</h1>
        </div>
        <div class="row">
            <b-card class="w-75 mb-5 rounded-0">
                <b-row class="ml-5 mr-5 align-items-center border-bottom">
                    <b-col md="3" class="pl-0"><span class="grey--text">Фото профиля</span></b-col>
                    <b-col md="6" class="">
                        <b-img v-if="currentUser.avatar" :src="currentUser.avatar" width="40" alt="avatar"></b-img>
                        <span v-else>Фото профиля не установлено</span>
                    </b-col>
                    <b-col md="3" class="text-end pr-0">
                        <b-button variant="link" class="pr-0 orange--text" @click="handleOpenFileDialog">
                            Загрузить новое фото
                        </b-button>
                        <input style="display: none" ref="fileInput" type="file" @input="handleSelectFile" />
                    </b-col>
                </b-row>

                <b-row class="ml-5 mr-5 align-items-center border-bottom">
                    <b-col md="3" class="pl-0"><span class="grey--text">Имя</span></b-col>
                    <b-col md="6" class="">
                        {{ currentUser.firstName }} {{currentUser.lastName}}
                    </b-col>
                    <b-col md="3" class="text-end pr-0">
                        <b-button v-b-toggle.collapse-name variant="link" class="pr-0 orange--text">Изменить</b-button>
                    </b-col>
                    <b-col cols="12" class="p-0">
                        <b-collapse id="collapse-name" class="">
                            <el-form :model="nameForm" :rules="formRules" ref="nameForm">
                                <b-row class="ml-0 align-items-center">
                                    <b-col md="3" class="pl-0"><span>Фамилия</span></b-col>
                                    <b-col md="4" class="pl-2">
                                        <el-form-item class="mb-0" prop="lastName">
                                            <el-input placeholder="Фамилия" v-model="nameForm.lastName"></el-input>
                                        </el-form-item>
                                    </b-col>
                                </b-row>
                                <b-row class="ml-0 align-items-center">
                                    <b-col md="3" class="pl-0"><span>Имя</span></b-col>
                                    <b-col md="4" class="pl-2">
                                        <el-form-item class="mb-0" prop="firstName">
                                            <el-input placeholder="Имя" v-model="nameForm.firstName"></el-input>
                                        </el-form-item>
                                    </b-col>
                                </b-row>
                                <b-row class="ml-0 align-items-center">
                                    <b-col md="3" class="pl-0"><span>Отчество</span></b-col>
                                    <b-col md="4" class="pl-2">
                                        <el-form-item class="mb-0" prop="patronymic">
                                            <el-input placeholder="Отчество" v-model="nameForm.patronymic"></el-input>
                                        </el-form-item>
                                    </b-col>
                                </b-row>
                                <b-row class="ml-0 mb-5">
                                    <b-col md="6">
                                        <b-button @click="handleChangeName" size="lg" squared class="mr-5 orange">
                                            Сохранить
                                        </b-button>
                                        <b-button type="reset" size="lg" variant="outline-secondary" squared>Отмена
                                        </b-button>
                                    </b-col>
                                </b-row>
                            </el-form>
                        </b-collapse>
                    </b-col>
                </b-row>

                <b-row class="ml-5 mr-5 align-items-center border-bottom">
                    <b-col md="3" class="pl-0"><span class="grey--text">Телефон</span></b-col>
                    <b-col md="6" class="">
                        {{ currentUser.phone }}
                    </b-col>
                    <b-col md="3" class="text-end pr-0">
                        <b-button v-b-toggle.collapse-phone variant="link" class="pr-0 orange--text">Изменить</b-button>
                    </b-col>
                    <b-col cols="12" class="p-0">
                        <b-collapse id="collapse-phone" class="">
                            <el-form :model="phoneForm" :rules="formRules" ref="phoneForm">
                                <b-row class="ml-0 align-items-center">
                                    <b-col md="3" class="pl-0"><span>Новый телефон</span></b-col>
                                    <b-col md="4" class="pl-2">
                                        <el-form-item class="mb-0" prop="numberPhone">
                                            <el-input type="tel" v-model="phoneForm.phone"
                                                      v-mask="'+# (###) ### - ## - ##'"
                                                      placeholder="+7 (XXX) XXX - XX - XX"/>
                                        </el-form-item>
                                    </b-col>
                                </b-row>
                                <b-row class="ml-0 align-items-center">
                                    <b-col md="3" class="pl-0"><span>Ваш текущий пароль</span></b-col>
                                    <b-col md="4" class="pl-2">
                                        <el-form-item class="mb-0" prop="currentPassword">
                                            <el-input type="password" placeholder="Текущий пароль"
                                                      v-model="phoneForm.currentPassword"></el-input>
                                        </el-form-item>
                                    </b-col>
                                </b-row>
                                <b-row class="ml-0 mb-5">
                                    <b-col md="6">
                                        <b-button @click="handleChangePhone" size="lg" squared class="mr-5 orange">
                                            Сохранить
                                        </b-button>
                                        <b-button type="reset" size="lg" variant="outline-secondary" squared>Отмена
                                        </b-button>
                                    </b-col>
                                </b-row>
                            </el-form>
                        </b-collapse>
                    </b-col>
                </b-row>

                <b-row class="ml-5 mr-5 align-items-center border-bottom">
                    <b-col md="3" class="pl-0"><span class="grey--text">E-mail</span></b-col>
                    <b-col md="6" class="">
                        {{ currentUser.email }}
                    </b-col>
                    <b-col md="3" class="text-end pr-0">
                        <b-button v-b-toggle.collapse-email variant="link" class="pr-0 orange--text">Изменить</b-button>
                    </b-col>
                    <b-col cols="12" class="p-0">
                        <b-collapse id="collapse-email" class="">
                            <el-form :model="emailForm" :rules="formRules" ref="emailForm">
                                <b-row class="ml-0 align-items-center">
                                    <b-col md="3" class="pl-0"><span>Новый E-mail</span></b-col>
                                    <b-col md="4" class="pl-2">
                                        <el-form-item class="mb-0" prop="email">
                                            <el-input type="email" placeholder="E-mail"
                                                      v-model="emailForm.email"></el-input>
                                        </el-form-item>
                                    </b-col>
                                </b-row>
                                <b-row class="ml-0 align-items-center">
                                    <b-col md="3" class="pl-0"><span>Ваш текущий пароль</span></b-col>
                                    <b-col md="4" class="pl-2">
                                        <el-form-item class="mb-0" prop="currentPassword">
                                            <el-input type="password" placeholder="Текущий пароль"
                                                      v-model="emailForm.currentPassword"></el-input>
                                        </el-form-item>
                                    </b-col>
                                </b-row>
                                <b-row class="ml-0 mb-5">
                                    <b-col md="6">
                                        <b-button @click="handleChangeEmail" size="lg" squared class="mr-5 orange">
                                            Сохранить
                                        </b-button>
                                        <b-button type="reset" size="lg" variant="outline-secondary" squared>Отмена
                                        </b-button>
                                    </b-col>
                                </b-row>
                            </el-form>
                        </b-collapse>
                    </b-col>
                </b-row>

                <b-row class="ml-5 mr-5 align-items-center">
                    <b-col md="3" class="pl-0"><span class="grey--text">Пароль</span></b-col>
                    <b-col md="6">
                    </b-col>
                    <b-col md="3" class="text-end pr-0">
                        <b-button v-b-toggle.collapse-password variant="link" class="pr-0 orange--text">Изменить
                        </b-button>
                    </b-col>
                    <b-col cols="12" class="p-0">
                        <b-collapse id="collapse-password" class="">
                            <el-form :model="passwordForm" :rules="formRules" ref="passwordForm">
                                <b-row class="ml-0 align-items-center">
                                    <b-col md="3" class="pl-0"><span>Старый пароль</span></b-col>
                                    <b-col md="4" class="pl-2">
                                        <el-form-item class="mb-0" prop="currentPassword">
                                            <el-input placeholder="Старый пароль"
                                                      type="password"
                                                      v-model="passwordForm.currentPassword"></el-input>
                                        </el-form-item>
                                    </b-col>
                                </b-row>
                                <b-row class="ml-0 align-items-center">
                                    <b-col md="3" class="pl-0"><span>Новый пароль</span></b-col>
                                    <b-col md="4" class="pl-2">
                                        <el-form-item class="mb-0" prop="password">
                                            <el-input type="password" placeholder="Новый пароль"
                                                      v-model="passwordForm.password"></el-input>
                                        </el-form-item>
                                    </b-col>
                                </b-row>
                                <b-row class="ml-0 align-items-center">
                                    <b-col md="3" class="pl-0"><span>Повторите пароль</span></b-col>
                                    <b-col md="4" class="pl-2">
                                        <el-form-item class="mb-0" prop="password2">
                                            <el-input type="password" placeholder="Повторите пароль"
                                                      v-model="passwordForm.password2"></el-input>
                                        </el-form-item>
                                    </b-col>
                                </b-row>
                                <b-row class="ml-0 mb-5">
                                    <b-col md="6">
                                        <b-button @click="handleChangePassword" size="lg" squared class="mr-5 orange">
                                            Сохранить
                                        </b-button>
                                        <b-button type="reset" size="lg" variant="outline-secondary" squared>Отмена
                                        </b-button>
                                    </b-col>
                                </b-row>
                            </el-form>
                        </b-collapse>
                    </b-col>
                </b-row>
            </b-card>
        </div>
        <div class="row mt-5 mb-5">
            <b-button variant="outline-secondary" size="lg" squared>Удаление аккаунта</b-button>
        </div>
    </div>
</template>

<script>
    import UploadImageInput from "@/components/UploadImageInput";

    export default {
        name: "StudentSetting",
        components: {
            UploadImageInput
        },
        data() {
            const current = this.$root.currentUser;
            const timeZone = current.timeZone || (new Date().getTimezoneOffset() / -60).toFixed(1);

            const validEmail = (rule, value, callback) => {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!re.test(value)) {
                    callback(new Error('Не верно указан адрес'))
                } else {
                    callback()
                }
            };

            const validatePassword = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('Пароль должен содержать минимум 8 символов'))
                } else {
                    if (this.passwordForm.password2 !== '') {
                        this.$refs.passwordForm.validateField('passwordConfirmation')
                    }

                    callback()
                }
            }

            const validateConfirmPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Пожалуйста, повторите пароль'))
                } else if (value !== this.passwordForm.password) {
                    callback(new Error('Пароли должны совпадать'))
                } else {
                    callback()
                }
            }

            return {
                nameForm: {
                    firstName: current.firstName,
                    lastName: current.lastName,
                    patronymic: ''
                },
                phoneForm: {
                    phone: current.phone,
                    currentPassword: ''
                },
                emailForm: {
                    email: current.email,
                    currentPassword: ''
                },
                passwordForm: {
                    currentPassword: "",
                    password: "",
                    password2: "",
                },
                user: {
                    id: current.id,
                    description: current.descriptionAuthor,
                    timeZone: timeZone,
                    avatar: current.avatar
                },
                formRules: {
                    firstName: [{required: true, message: 'Укажите имя', trigger: 'blur'}],
                    lastName: [{required: true, message: 'Укажите фамилию', trigger: 'blur'}],
                    email: [{required: true, trigger: 'blur', validator: validEmail}],
                    currentPassword: [{required: true, message: 'Укажите текущий пароль (8-16 символов)', trigger: 'blur', min: 8, max: 16}],
                    password: [{required: true, trigger: 'blur', validator: validatePassword}],
                    password2: [{required: true, trigger: 'blur', validator: validateConfirmPassword}]
                },
                timeZones: [{value: "-12.0", text: "(GMT -12:00) Эниветок, Кваджалейн"}, {
                    value: "-11.0",
                    text: "(GMT -11:00) Остров Мидуэй, Самоа"
                }, {value: "-10.0", text: "(GMT -10:00) Гавайи"}, {
                    value: "-9.0",
                    text: "(GMT -9:00) Аляска"
                }, {value: "-8.0", text: "(GMT -8:00) Тихоокеанское время (США и Канада)"}, {
                    value: "-7.0",
                    text: "(GMT -7:00) Горное время (США и Канада)"
                }, {value: "-6.0", text: "(GMT -6:00) Центральное время (США и Канада), Мехико"}, {
                    value: "-5.0",
                    text: "(GMT -5:00) Восточное время (США и Канада), Богота, Лима"
                }, {value: "-4.0", text: "(GMT -4:00) Атлантическое время (Канада), Каракас, Ла-Пас"}, {
                    value: "-3.5",
                    text: "(GMT -3:30) Ньюфаундленд"
                }, {value: "-3.0", text: "(GMT -3:00) Бразилия, Буэнос-Айрес, Джорджтаун"}, {
                    value: "-2.0",
                    text: "(GMT -2:00) Срединно-Атлантического"
                }, {value: "-1.0", text: "(GMT -1:00 час) Азорские острова, острова Зеленого Мыса"}, {
                    value: "0.0",
                    text: "(GMT) Время Западной Европе, Лондон, Лиссабон, Касабланка"
                }, {value: "1.0", text: "(GMT +1:00 час) Брюссель, Копенгаген, Мадрид, Париж"}, {
                    value: "2.0",
                    text: "(GMT +2:00) Киев, Калининград, Южная Африка"
                }, {value: "3.0", text: "(GMT +3:00) Багдад, Москва, Санкт-Петербург, Эр-Рияд"}, {
                    value: "3.5",
                    text: "(GMT +3:30) Тегеран"
                }, {value: "4.0", text: "(GMT +4:00) Абу-Даби, Мускат, Баку, Тбилиси"}, {
                    value: "4.5",
                    text: "(GMT +4:30) Кабул"
                }, {value: "5.0", text: "(GMT +5:00) Екатеринбург, Исламабад, Карачи, Ташкент"}, {
                    value: "5.5",
                    text: "(GMT +5:30) Бомбей, Калькутта, Мадрас, Нью-Дели"
                }, {value: "5.75", text: "(GMT +5:45) Катманду"}, {
                    value: "6.0",
                    text: "(GMT +6:00) Алматы, Дакке, Коломбо"
                }, {value: "7.0", text: "(GMT +7:00) Бангкок, Ханой, Джакарта"}, {
                    value: "8.0",
                    text: "(GMT +8:00) Пекин, Перт, Сингапур, Гонконг"
                }, {value: "9.0", text: "(GMT +9:00) Токио, Сеул, Осака, Саппоро, Якутск"}, {
                    value: "9.5",
                    text: "(GMT +9:30) Аделаида, Дарвин"
                }, {value: "10.0", text: "(GMT +10:00) Восточная Австралия, Гуам, Владивосток"}, {
                    value: "11.0",
                    text: "(GMT +11:00) Магадан, Соломоновы острова, Новая Каледония"
                }, {value: "12.0", text: "(GMT +12:00) Окленд, Веллингтон, Фиджи, Камчатка"}]
            }
        },
        methods: {
            handleChangeName() {
                this.$refs.nameForm.validate(valid => {
                    if (valid) {
                        this.updateUser(this.nameForm).then(_ => {
                            this.$root.$emit('bv::toggle::collapse', 'collapse-name')
                        }).catch(() => {
                        })
                    }
                })
            },
            handleChangePhone() {
                this.$refs.phoneForm.validate(valid => {
                    if (valid) {
                        this.updateUser(this.phoneForm).then(_ => {
                            this.$root.$emit('bv::toggle::collapse', 'collapse-phone')
                        }).catch(() => {
                        })
                    }
                })
            },
            handleChangeEmail() {
                this.$refs.emailForm.validate(valid => {
                    if (valid) {
                        this.updateUser(this.emailForm).then(_ => {
                            this.$root.$emit('bv::toggle::collapse', 'collapse-email')
                        }).catch(() => {
                        })
                    }
                })
            },
            handleChangePassword() {
                this.$refs.passwordForm.validate(valid => {
                    if (valid) {
                        this.updateUser(this.passwordForm).then(_ => {
                            this.$root.$emit('bv::toggle::collapse', 'collapse-password')
                        }).catch(() => {
                        })
                    }
                })
            },
            handleChangeAvatar(data) {
                const config = {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }

                this.updateUser(data, config)
            },
            async updateUser(data, config = null) {
                return new Promise(((resolve, reject) => {
                    this.$http
                        .put(`/api/users/${this.user.id}`, data, config)
                        .then(response => {
                            const {data} = response;
                            if (data.success === true) {
                                this.$swal("Данные обновлены", undefined, "success");
                                this.$auth.fetch();
                                resolve(data);
                            } else {
                                if (data.error && data.error.message) {
                                    this.$swal("Ошибка", data.error.message, "error");
                                }
                                reject();
                            }
                        })
                        .catch(error => {
                            this.$swal("Ошибка", undefined, "error");
                            reject(error)
                        });
                }))
            },
            handleOpenFileDialog() {
                this.$refs.fileInput.click();
            },
            handleSelectFile() {
                const input = this.$refs.fileInput;
                const files = input.files;
                if (files && files[0]) {
                    const reader = new FileReader();
                    reader.onload = e => {
                        this.imageData = e.target.result;
                    };
                    reader.readAsDataURL(files[0]);

                    const formData = new FormData();
                    formData.append("avatar", files[0]);

                    this.handleChangeAvatar(formData);
                }
            }
        }
    }
</script>

<style scoped>

</style>