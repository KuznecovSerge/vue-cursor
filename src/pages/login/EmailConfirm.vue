<template>
    <div class="confirm-page">
        <div class="confirm-page__logo">
            <img src="/assets/media/mail.svg"/>
        </div>
        <div class="confirm-page__title">
            Подтвердите эл. почту
        </div>
        <div class="confirm-page__message">
            Мы отправили сообщение с дальнейшими инструкциями на <br/>
            указанную почту: <span>{{$route.query.email}}</span>
        </div>
        <div 
            class="confirm-page__action"
            @click="gotoMail"
            >Перейти к эл. почте
        </div>
    </div>
</template>
<script>
export default {
    name: 'Confirm',
    
    computed: {
        mailUrl() {
            const { email } = this.$route.query; 
            if (!email || email.indexOf('@') === -1) return;
            
            return "https://" + email.split('@')[1];
        }
    },

    methods: {
        gotoMail() {
            window.location = this.mailUrl;
        }
    },
}
</script>
<style lang="less">
    .confirm-page {
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