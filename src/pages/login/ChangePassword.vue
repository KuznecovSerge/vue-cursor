<template>
    <div class="changepwd-page">
        <el-form v-if="!success" :model="ruleForm" :rules="rules" ref="ruleForm" class="mc-form">
            <div class="changepwd-page__title">
                Придумайте новый пароль
            </div>
            <div class="changepwd-page__password">
                <el-form-item
                    class="is-no-asterisk"
                    label="Пароль"
                    prop="password"
                >
                    <el-input v-model="ruleForm.password"
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
                    <el-input v-model="ruleForm.password2"
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
            <div class="changepwd-page__passwordhint">
                Пароль должен содержать не менее восьми знаков, включать буквы, цифры и специальные символы.
            </div>
            <div class="changepwd-page__feedback">
                {{errorMsg}}
            </div>
            <el-form-item>
                <el-button class="mc-btn-orange xl" @click="submitForm('ruleForm')">Изменить</el-button>
            </el-form-item>
            <div class="changepwd-page__action" @click="$router.push('/login')">
                Вернуться на экран входа
            </div>
        </el-form>

        <div v-if="success">
            <div class="changepwd-page__logo">
                <img src="/assets/media/check-circle.svg"/>
            </div>
            <div class="changepwd-page__title">
                Пароль успешно изменен
            </div>
            <div class="changepwd-page__action changepwd-page__action--success" @click="gotoProfile">
                Перейти в личный кабинет
            </div>
        </div>

    </div>
</template>
<script>
export default {
    name: 'ChangePassword',

    data() {
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
                password: '',
                password2: '',
            },
            rules: {
                password: [
                    { validator: validatePass, trigger: 'blur' },
                    { min: 8, max: 16, message: 'Пароль должен быть от 6 до 16 символов', trigger: 'blur' }
                ],
                password2: [
                    { validator: validatePass2, trigger: 'blur' },
                    { min: 8, max: 16, message: 'Пароль должен быть от 6 до 16 символов', trigger: 'blur' }
                ],
                
            },
            token: '',
            showPassword: false,
            success: false,
            errorMsg: ''
        }
    },

    mounted() {
        this.token = this.$route.query.token;
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
            const { token } = this;
            const { password } = this.ruleForm; 
            this.$http.post('/api/users/password', { 
                token,
                password
            })
            .then(({ data }) => {
                this.success = true;
                // вручную устанавливаем токен (авторизация)
                this.$auth.token(null, data.token);
                document.cookie='rememberMe=false; path=/;';
            })
            .catch(( error ) => {
                try {
                    this.errorMsg = error.response.data.message;
                } catch (err) {
                    this.errorMsg = error.message;
                }
            });
        },
        gotoProfile() {
            window.location.href = '/profile';
        }
    }

}
</script>
<style lang="less">
    .changepwd-page {
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
        &__action {
            text-align: right;
            color: @orange-100;
            font-weight: 500;
            font-size: 14px;
            cursor: pointer;
            &:hover{
                color: @orange-200;
            }
            &--success {
                text-align: center;
            }
        }
    }
</style>