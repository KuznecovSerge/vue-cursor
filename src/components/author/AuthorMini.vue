<template>
	<div class="authormini">
        <div class="authormini__card" @click="$router.push(`/authors/${author.id}`)">
            <div class="authormini__top">
                <div class="authormini__avatar">
                    <img :src="imageAvatar"/>
                </div>
            </div>
            <div class="authormini__fio h5">
                {{this.author.firstName}} {{this.author.lastName}}
            </div>
            <div class="authormini__raiting">
                <mc-rate
                    :value="author.ball"
                    :readonly="true"
                />
            </div>
            <div class="authormini__about d-flex my-3">
                {{(this.author.authorAbout) ? this.author.authorAbout : 'Автор пока не указал информацию о себе!'}}
            </div>
            <div class="d-flex justify-content-between my-3">
                <div>{{this.productsCount}}</div>
                <div>
                    <simple-svg
                        width="24px"
                        height="24px"
                        :src="`/assets/media/comments.svg`"
                    />
                    {{this.reviewsCount}}
                </div>
            </div>
            <div class="authormini__subscribe">
                <div 
                    class="mc-btn-orange l w-100"
                    @click.stop="subscribeToAuthor"
                    >{{(this.author.subscribe) ? 'Отписаться': 'Подписаться на автора'}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import McRate from '@/components/common/mc-rate';
export default {
    components: {
        McRate
    },
    props: {
        author: {
            type: Object,
            default: function () {
                return {
                    firstName: 'Владимир',
                    lastName: 'Михайлович',
                    avatar: '/assets/media/avatar_author.png',
                    authorAbout: 'Эксперт по заработку в интернете, практик в интернет-рекламе и бизнесе с 2014 года. Автор обучающих курсов по прибыль...',
                    categories: ['Создание сайтов', 'Веб-дизайн', 'Создание лендингов'],
                    ball: 4,
                    seen: 179485,
                    productsCount: 8,
                    commentsCount: 24,
                }
            }
        },

    },
    computed: {
        imageAvatar(){
            return this.author.avatar ? this.author.avatar : '/assets/media/avatar_author.png';
        },
        reviewsCount() {
			return this.author.commentsCount + ' ' + this.sklonenie(this.author.commentsCount, ['Отзыв', 'Отзыва', 'Отзывов']);
		},
        productsCount() {
			return this.author.productsCount + ' ' + this.sklonenie(this.author.productsCount, ['продукт', 'продукта', 'продуктов']);
		},
    },
    data() {
        return {

        }
    },
    methods: {
        subscribeToAuthor() {
			this.$http.post('/api/users/authors/subscribe', {
				userId: this.currentUser.id,
				authorId: this.author.id,
				action: this.author.subscribe ? 'remove' : 'add'
			}).then(({ data }) => {
				this.author.subscribe = data.subscribe;
			});
		}
        
    }
};
</script>

<style lang="less">
.authormini {
    width: 290px;
    height: 450px;
    border: none;
    
    &__card {
        border: 1px solid @border-color;
        width: 100%;
        height: 418px;
        position: relative;
        top: 35px;
        padding: 0px 32px;
    }
    &__top {

        height: 131px;
    }
    &__avatar {
        width: 134px;
        height: 134px;
    }
    &__avatar img{
        position: relative;
        top: -35px;
        width: 134px;
        height: 134px;
    }
    &__raiting {
    }
    &__fio {
        height: 23px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    &__about {
        height: 102px;
        font-size: 12px;
        color: #808D99;
        text-align: left;
        line-height: 17px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    &__reviewicon {
        margin-right: 3px;
        width: 24px;
    }
    &__subscribe {
        display: flex;
        justify-content: center;
    }
}

</style>