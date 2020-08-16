<template>
    <div class="restore-page" v-if="stage">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="mc-form">
            <div class="restore-page__logo">
            </div>
            <div class="restore-page__title">
                Восстановление
            </div>
            <div class="restore-page__choice" v-if="false">
                <div 
                    :class="stage.choice == 'password' ? 'choice--active' : ''"
                    @click="stage=stages['pwdEmailEntering']; $refs['ruleForm'].resetFields();"
                >Пароля
                </div>
                <div 
                    :class="stage.choice == 'email' ? 'choice--active' : ''"
                    @click="stage=stages['emlPhoneEntering']; $refs['ruleForm'].resetFields();"
                >Электронной почты
                </div>
            </div>
            <el-form-item
                v-if="stage.choice == 'password'"
                class="restore-page__email is-no-asterisk"
                prop="email"
                label="Электронная почта"
            >
                <el-input v-model="ruleForm.email" placeholder="Введите электронную почту"></el-input>
            </el-form-item>
            <el-form-item
                v-if="stage.choice == 'email'"
                class="restore-page__phone is-no-asterisk"
                label="Телефон"
                prop="phone"
            >
                <el-input v-model="ruleForm.phone" v-mask="'+# (###) ### - ## - ##'" placeholder="+7 (XXX) XXX - XX - XX"></el-input>
            </el-form-item>
            <div class="restore-page__message">
                {{stage.message}}
            </div>
            <div class="restore-page__feedback">
                {{errorMsg}}
            </div>
            <el-form-item>
                <el-button 
                    class="mc-btn-orange xl"
                    :class="stage.btnEnabled ? '' : 'disable'"
                    @click="stage.btnEnabled && submitForm('ruleForm')">
                    {{stage.btnText + btnTextAdd}}
                </el-button>
            </el-form-item>
            <div class="restore-page__action" @click="$router.push('/login')">
                Вернуться на экран входа
            </div>
        </el-form>
        
    </div>
</template>
<script>
export default {
    name: 'Restore',

    data() {
        var validEmail = (rule, value, callback) => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(value)) {
                callback(new Error('Не верно указан адрес'))
            } else {
                callback()
            }
        }

        return {
            ruleForm: {
                email: '',
                phone: '',
            },
            rules: {
                email: [
                    { required: true, message: 'Пожалуйста введите email', trigger: 'blur' },
                    { validator: validEmail, trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: 'Пожалуйста введите телефон', trigger: 'blur' },
                    { min: 22, max: 22, message: 'Телефон должен 10 цифр', trigger: 'blur' }
                ],
                
            },
            submitText: '',
            errorMsg: '',
            btnTextAdd: '',
            stage: null,
            stages: {
                // Восстановление пароля
                'pwdEmailEntering': {
                    choice: 'password',
                    message: 'Введите электронную почту, указанную при регистрации, и мы отправим на нее письмо с дальнейшими инструкциями.',
                    btnText: 'Отправить',
                    btnEnabled: true,
                    btnAction: this.passwordRestore
                },
                'pwdBlock': {
                    choice: 'password',
                    message: 'Сообщение с инструкциями успешно отправлено на указанную электронную почту. Если сообщение долго не приходит, проверьте папку “спам” или повторите попытку.',
                    btnEnabled: false,
                    btnText: 'До повторной попытки осталось: ',
                    btnAction: null
                },
                'pwdResend': {
                    choice: 'password',
                    message: 'Сообщение с инструкциями успешно отправлено на указанную электронную почту. Если сообщение долго не приходит, проверьте папку “спам” или повторите попытку.',
                    btnEnabled: true,
                    btnText: 'Отправить сообщение повторно',
                    btnAction: this.passwordRestore
                },
                // Восстановление email
               'emlPhoneEntering': {
                    choice: 'email',
                    message: 'Введите номер телефона, указанный при регистрации, и мы отправим на него SMS с вашей электронной почтой.',
                    btnEnabled: true,
                    btnText: 'Отправить',
                    btnAction: this.emailRestore
                },
                'emlBlock': {
                    choice: 'email',
                    message: 'Сообщение с электронной почтой успешно отправлено на указанный номер телефона. Если сообщение долго не приходит, повторите попытку.',
                    btnEnabled: false,
                    btnText: 'До повторной попытки осталось: ',
                    btnAction: null
                },
                'emlResend': {
                    choice: 'email',
                    message: 'Сообщение с электронной почтой успешно отправлено на указанный номер телефона. Если сообщение долго не приходит, повторите попытку.',
                    btnEnabled: true,
                    btnText: 'Отправить сообщение повторно',
                    btnAction: this.emailRestore
                },
            }
        }
    },
    created() {
        this.stage = this.stages['pwdEmailEntering'];
    },
    methods: {
        submitForm(formName) {
            this.errorMsg = '';
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.stage.btnAction();
            } else {
                return false;
            }
            });
        },
        passwordRestore() {
            const { email } = this.ruleForm;
            this.$http.post('/api/users/password', { 
                email, 
                origin: window.location.origin
            })
            .then(({ data }) => {
                // блокируем кнопку и включаем таймер
                this.stage = this.stages['pwdBlock'];
                let timeLeft = 60;
                const timerId = setInterval(() => { 
                    this.btnTextAdd = ` ${timeLeft} сек.`;
                    timeLeft -= 1;
                    if (timeLeft < 1) { 
                        clearInterval(timerId);
                        this.btnTextAdd = '';
                        this.stage = this.stages['pwdResend'];
                    } 
                }, 1000);
            })
            .catch(( error ) => {
                try {
                    this.errorMsg = error.response.data.message;
                } catch (err) {
                    this.errorMsg = error.message;
                }
            });

        },
        emailRestore() {
            this.stage = this.stages['emlBlock'];
            let timeLeft = 60;
            const timerId = setInterval(() => { 
                this.btnTextAdd = ` ${timeLeft} сек.`;
                timeLeft -= 1;
                if (timeLeft < 1) { 
                    clearInterval(timerId);
                    this.btnTextAdd = '';
                    this.stage = this.stages['emlResend'];
                } 
            }, 1000);
        },
        onSubmit: function () {
            this.$auth.login({
                data: this.ruleForm
            }).then((response) => {
                window.location = '/catalog';
            }).catch((err) => {
                this.errorMsg = err;
            });

        }
    }

}
</script>
<style lang="less">
    .restore-page {
        width: 400px;
        display: flex;
        flex-direction: column;

        &__logo {
            text-align: center;
        }
        &__title {
            text-align: center;
            font-weight: bold;
            font-size: 28px;
            line-height: 33px;
            margin-bottom: 40px;
        }
        &__choice {
            display: flex;
            height: 36px;
            margin-bottom: 47px;
            div {
                width: 100%;
                font-size: 16px;
                color: @gray-300;
                text-align: center;
                border-bottom: 1px solid @border-color;
                cursor: pointer;
            }
            .choice--active {
                color: @black;
                border-bottom: 2px solid @orange-100;
                cursor: default;
            }
        }
        &__email {
            margin-bottom: 41px;
        }
        &__password {
            margin-bottom: 27px;
        }
        &__message {
            margin-bottom: 4px;
            text-align: left;
        }
        &__feedback {
            height: 36px;
            font-size: 12px;
            color: @red-300;
            display: flex;
            align-items: flex-end;
            justify-content: center;
        }
        .mc-btn-orange {
            width: 100%;
        }
        &__action {
            text-align: right;
            color: @orange-100;
            font-weight: 500;
            font-size: 14px;
            cursor: pointer;
            &:hover{
                color: @orange-200;
            }
        }
    }
</style>