<template>
    <div class="login-page">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="mc-form">
            <div class="login-page__logo">
            </div>
            <div class="login-page__title">
                Авторизация
            </div>
            <div class="login-page__social" v-if="false">
                Через соц. сети:
            </div>
            <el-form-item
                class="login-page__email"
                prop="email"
                label="Электронная почта"
            >
                <el-input v-model="ruleForm.email"
                    placeholder="Введите электронную почту"
                    @keyup.enter.native="setFocus('password')"
                />
            </el-form-item>
            <el-form-item
                class="login-page__password is-no-asterisk"
                label="Пароль"
                prop="password"
            >
                <el-input v-model="ruleForm.password" ref="password" 
                    :type="showPassword ? 'text' :'password'" 
                    placeholder="************" 
                    autocomplete="off"
                    @keyup.enter.native="submitForm('ruleForm')"
                />
                <div class="login-page__password-show" @click="showPassword=!showPassword">
                    <img v-if="showPassword" src="/assets/media/eye.svg"/>
                    <img v-else src="/assets/media/eye-off.svg"/>
                </div>
            </el-form-item>
            <div class="login-page__restore">
                Забыли пароль или электронную почту? 
                <span @click="$router.push('/restore')">Восстановить</span>
            </div>
            <div class="login-page__feedback">
                {{errorMsg}}
            </div>
            <el-form-item>
                <el-button class="mc-btn-orange xl" @click="submitForm('ruleForm')">Войти</el-button>
            </el-form-item>
            <div class="login-page__register">
                Ещё нет аккаунта? 
                <span @click="$router.push('/signup')">Зарегистрироваться</span>
            </div>
        </el-form>
        
    </div>
</template>
<script>
export default {
    name: 'Login',

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
                password: '',
            },
            rules: {
                email: [
                    { required: true, message: 'Пожалуйста введите email', trigger: 'blur' },
                    { validator: validEmail, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Пожалуйста введите пароль', trigger: 'blur' },
                    { min: 8, max: 16, message: 'Пароль должен быть от 6 до 16 символов', trigger: 'blur' }
                ],
                
            },
            showPassword: false,
            errorMsg: ''
        }
    },
    methods: {
        submitForm(formName) {
            this.errorMsg = '';
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.onSubmit();
            } else {
                return false;
            }
            });
        },
        onSubmit: function () {
            this.$auth.login({
                data: this.ruleForm
            }).then((response) => {
                this.$router.push('/catalog');
            }).catch((error) => {
                try {
                    this.errorMsg = error.response.data.message;
                } catch (err) {
                    this.errorMsg = error;
                }
            });

        },
        setFocus(el) {
            this.$refs[el].focus();
        }
    }

}
</script>
<style lang="less">
    .login-page {
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
            margin-bottom: 48px;
        }
        &__social {
            margin-bottom: 47px;
            opacity: 0.5;
        }
        &__email {
            margin-bottom: 41px;
        }
        &__password {
            margin-bottom: 27px;
        }
        &__password-show {
            position: absolute;
            right: 12px;
            top: 12px;
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
        &__restore {
            margin-bottom: 4px;
            text-align: right;
            span {
                color: @orange-100;
                cursor: pointer;
            }
        }
        &__register {
            margin-top: 17px;
            margin-bottom: 10px;
            text-align: right;
            span {
                color: @orange-100;
                cursor: pointer;
            }
        }
    }
</style>