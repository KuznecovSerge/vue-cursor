<template>
    <div class="singup-page">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="mc-form">
            <div class="singup-page__logo">
            </div>
            <div class="singup-page__title">
                Регистрация
            </div>
            <div class="singup-page__social mb-5" v-if="false">
                Через соц. сети:
            </div>
            <el-form-item
                class="singup-page__firstname is-no-asterisk"
                prop="firstName"
                label="Имя"
            >
                <el-input v-model="ruleForm.firstName" @keyup.enter.native="setFocus('lastName')" 
                    placeholder="Имя"
                />
            </el-form-item>
            <el-form-item
                class="singup-page__lastname is-no-asterisk"
                prop="lastName"
                label="Фамилия"
            >
                <el-input v-model="ruleForm.lastName" ref="lastName" @keyup.enter.native="setFocus('email')"
                    placeholder="Фамилия"
                />
            </el-form-item>
            <el-form-item
                class="singup-page__email is-no-asterisk"
                prop="email"
                label="Электронная почта"
            >
                <el-input v-model="ruleForm.email"  ref="email" @keyup.enter.native="setFocus('phone')"
                    placeholder="Введите электронную почту"
                />
            </el-form-item>
            <el-form-item
                class="singup-page__phone is-no-asterisk"
                prop="phone"
                label="Номер телефона"
            >
                <el-input v-model="ruleForm.phone" ref="phone" @keyup.enter.native="setFocus('password')"
                    v-mask="'+# (###) ### - ## - ##'" placeholder="+7 (XXX) XXX - XX - XX"
                />
            </el-form-item>
            <div class="singup-page__password">
                <el-form-item
                    class="is-no-asterisk"
                    label="Пароль"
                    prop="password"
                >
                    <el-input v-model="ruleForm.password" ref="password" @keyup.enter.native="setFocus('password2')"
                        :type="showPassword ? 'text' :'password'"
                        placeholder="************"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item
                    class="is-no-asterisk"
                    label="Повторите пароль"
                    prop="password2"
                >
                    <el-input v-model="ruleForm.password2" ref="password2" @keyup.enter.native="submitForm('ruleForm')"
                        :type="showPassword ? 'text' :'password'"
                        placeholder="************"
                        autocomplete="off"
                    />
                </el-form-item>
                <div @click="showPassword=!showPassword">
                    <img v-if="showPassword" src="/assets/media/eye.svg"/>
                    <img v-else src="/assets/media/eye-off.svg"/>
                </div>
            </div>
            <div class="singup-page__passwordhint">
                Пароль должен содержать не менее восьми знаков, включать буквы, цифры и специальные символы.
            </div>
            <div class="singup-page__feedback">
                {{errorMsg}}
            </div>
            <el-form-item>
                <el-button class="mc-btn-orange xl" @click="submitForm('ruleForm')">Зарегистрироваться</el-button>
            </el-form-item>
            <div class="singup-page__footer">
                <div class="singup-page__confedence">
                    Регистрируясь, вы подтверждаете нашу <br/>
                    <span>политику конфиденциальности</span>
                </div>
                <div class="singup-page__login">
                    Уже есть аккаунт? <br/>
                    <span @click="$router.push('/login')">Войти</span>
                </div>
            </div>
        </el-form>
        
    </div>
</template>
<script>
import McInput from '@/components/common/mc-input'; 
export default {
    name: 'Login',

    components: {
        McInput
    },

    data() {
        const validEmail = (rule, value, callback) => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(value)) {
                callback(new Error('Не верно указан адрес'))
            } else {
                callback()
            }
        };

        const validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('Пожалуйста введите пароль'));
            } else {
            if (this.ruleForm.password2 !== '') {
                this.$refs.ruleForm.validateField('password2');
            }
            callback();
            }
        };

        const validatePass2 = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('Пожалуйста повторите пароль'));
            } else if (value !== this.ruleForm.password) {
            callback(new Error('Пароли не совпадают'));
            } else {
            callback();
            }
        };

        return {
            ruleForm: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                password: '',
                password2: ''
            },
            rules: {
                firstName: [
                    { required: true, message: 'Пожалуйста введите имя', trigger: 'blur' },
                ],
                lastName: [
                    { required: true, message: 'Пожалуйста введите фамилию', trigger: 'blur' },
                ],
                email: [
                    { required: true, message: 'Пожалуйста введите email', trigger: 'blur' },
                    { validator: validEmail, trigger: 'blur' }
                ],
                phone: [
                    { required: false, message: 'Пожалуйста введите телефон', trigger: 'blur' },
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' },
                    { min: 8, max: 16, message: 'Пароль должен быть от 6 до 16 символов', trigger: 'blur' }
                ],
                password2: [
                    { validator: validatePass2, trigger: 'blur' },
                    { min: 8, max: 16, message: 'Пароль должен быть от 6 до 16 символов', trigger: 'blur' }
                ],
                
            },
            showPassword: false,
            errorMsg: ''
        }
    },
    methods: {
        setFocus(el) {
            this.$refs[el].focus();
        },
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
            this.$auth.register({
                data: {
                    ...this.ruleForm,
                    origin: window.location.origin
                },
                autoLogin: false
            }).then((response)=>{
                this.$router.push(`/signup/confirm?email=${this.ruleForm.email}`);
            }).catch((error)=>{
                try {
                    this.errorMsg = error.response.data.message;
                } catch (err) {
                    this.errorMsg = error;
                }
            });

        },
        isValid: function (key) {
            return this.errors.hasOwnProperty(key) ? 'invalid' : null;
        },
        errorMessage: function(key) {
            return this.errors.hasOwnProperty(key) ? this.errors[key].msg : '';
        },
    }
}
</script>
<style lang="less">
    .singup-page {
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
            margin-bottom: 47px;
        }
        &__social {
            margin-bottom: 48px;
            opacity: 0.5;
        }
        &__firstname,
        &__lastname,
        &__email,
        &__phone {
            margin-bottom: 41px;
        }
        &__password {
            display: flex;
            margin-bottom: 24px;
            align-items: center;
            
            .el-form-item {
                margin-right: 16px;
            }
        }
        &__passwordhint {
            margin-bottom: 4px;
            font-size: 12px;
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
        &__footer {
            display: flex;
            margin-top: 16px;
            font-size: 12px;
        }
        &__confedence {
            color: @gray-300;
            span {
                text-decoration: underline;
                cursor: pointer;
            }
        }
        &__login {
            margin-left: auto;
            text-align: right;
            span {
                color: @orange-100;
                font-weight: 500;
                font-size: 14px;
                cursor: pointer;
            }
        }
    }
</style>