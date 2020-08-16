<template>
    <div class="verify-page">
        <div class="verify-page__logo">
            <img v-if="success" src="/assets/media/check-circle.svg"/>
        </div>
        <div class="verify-page__title">
            {{ success ? 'Ваша эл. почта успешно подтверждена' : errorMsg}}
        </div>
        <div v-if="success"
            class="verify-page__action"
            @click="gotoProfile"
            >Перейти в личный кабинет
        </div>
        <div v-else 
            class="verify-page__action" 
            @click="$route.push('/signup')"
            >Повторить регистрацию
        </div>
    </div>
</template>
<script>
export default {
    name: 'Verify',
    
    data() {
        return {
            success: false,
            errorMsg: 'Идёт подтверждение электронной почты',
        }
    },

    mounted() {
        const { token } = this.$route.query;
        if (!token) return;

        // подтверждаем email и получаем токен для входа
        this.$http.post('/api/users/token', { token })
        .then(({ data }) => {
            this.success = true;
            // вручную устанавливаем токен (авторизация)
            this.$auth.token(null, data.token);
            document.cookie='rememberMe=false; path=/;';
        })
        .catch(( error ) => {
            this.errorMsg = 'Ошибка подтверждение электронной почты: ' + error.message;
        });
    },

    methods: {
        gotoProfile() {
            window.location.href = '/profile';
        }
    },
}
</script>
<style lang="less">
    .verify-page {
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
            margin-bottom: 16px;
        }
        &__message {
            margin-bottom: 40px;
            text-align: center;
            span {
                font-weight: bold;
            }
        }
        &__action {
            text-align: center;
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