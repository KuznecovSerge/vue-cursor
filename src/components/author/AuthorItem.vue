<template>
	<div class="authoritem border-white">
        <div class="authoritem-card" @click="$router.push(`/authors/${author.id}`)">
            <div class="authoritem-top d-flex justify-content-center">
                <div class="authoritem-avatar">
                    <img :src="imageAvatar"/>
                    <div class="authoritem-raiting">
                        <span class="mr-1">{{Number(author.ball).toFixed(1)}}</span>
                        <el-rate 
                            :value="Number(author.ball)"
                            disabled
                            :colors="['#FFFFFF', '#FFFFFF', '#FFFFFF']"
                            void-color="#FFFFFF"
                        >
                        </el-rate>
                    </div>
                </div>
            </div>
            <div class="authoritem-ribbon d-flex justify-content-center">
                <div class="authoritem-views">
                    <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.14496 6.58992C0.995379 6.35831 0.874632 6.15773 0.783552 6.00033C0.874632 5.84294 0.995379 5.64236 1.14496 5.41075C1.52916 4.81585 2.09813 4.02475 2.83681 3.23683C4.32936 1.64477 6.41611 0.166741 8.99997 0.166741C11.5838 0.166741 13.6706 1.64477 15.1631 3.23683C15.9018 4.02475 16.4708 4.81585 16.855 5.41075C17.0046 5.64236 17.1253 5.84294 17.2164 6.00033C17.1253 6.15773 17.0046 6.35831 16.855 6.58992C16.4708 7.18481 15.9018 7.97592 15.1631 8.76384C13.6706 10.3559 11.5838 11.8339 8.99997 11.8339C6.41611 11.8339 4.32936 10.3559 2.83681 8.76384C2.09813 7.97592 1.52916 7.18481 1.14496 6.58992ZM7.33323 6.00033C7.33323 5.07982 8.07945 4.33359 8.99997 4.33359C9.92048 4.33359 10.6667 5.07982 10.6667 6.00033C10.6667 6.92085 9.92048 7.66707 8.99997 7.66707C8.07945 7.66707 7.33323 6.92085 7.33323 6.00033ZM8.99997 2.66685C7.15894 2.66685 5.66648 4.1593 5.66648 6.00033C5.66648 7.84136 7.15894 9.33381 8.99997 9.33381C10.841 9.33381 12.3334 7.84136 12.3334 6.00033C12.3334 4.1593 10.841 2.66685 8.99997 2.66685Z" fill="#999999"/>
                    </svg>
                    {{Number(this.author.seen).toLocaleString('ru-RU')}}
                </div>
            </div>
            <div class="authoritem-fio h5">
                {{this.author.firstName}} {{this.author.lastName}}
            </div>
            <div class="authoritem-about d-flex justify-content-center m-3">
                {{(this.author.authorAbout) ? this.author.authorAbout : 'Автор пока не указал информацию о себе!'}}
            </div>
            <div class="authoritem-categories m-3">
                <template v-for="(item, index) in author.categories">
                    {{(index != 0) ? '|' : '' }}
                    <span 
                        :key="index"
                        @click.stop="$router.push(`/authors?categoryId=${item.id}`)"
                    >{{item.name}}
                    </span>
                </template>
            </div>
            <div class="d-flex justify-content-between statusbar">
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
            <div class="authoritem-subscribe">
                <button type="button"
                    class="btn btn-primary w-100"
                    @click.stop="subscribeToAuthor"
                    >{{(this.author.subscribe) ? 'Отписаться': 'Следить за автором'}}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Authors',
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

<style>
.authoritem {
    min-width: 290px;
    width: 600px;
    height: 475px;
}
.authoritem-card {
    border: 1px solid #E7E7E7;
    width: 100%;
    height: 392px;
    position: relative;
    top: 35px;
    cursor: pointer;
}
.authoritem-card:hover {
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.15);
	transition: 0.4s all;
    height: 440px;
}
.authoritem-card:hover .authoritem-subscribe {
    opacity: 1;
    transition: 0.4s all;
    transition-delay: 0.2s;
}
.authoritem-top {
    height: 131px;
}
.authoritem-avatar {
    width: 134px;
    height: 134px;
}
.authoritem-avatar img{
    position: relative;
    top: -35px;
    width: 134px;
    height: 134px;
    box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.25);
}
.authoritem-raiting {
    background: #f58e15;
    position: relative;
    left: 0px;
    top: -59px;
    width: 134px;
    height: 24px;
    font-size: 12px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 5px;
}
.authoritem-raiting .el-rate {
    height: 14px;
}
.authoritem-raiting .el-rate__icon {
    font-size: 12px;
}
.authoritem-ribbon {
    height: 18px;
    background: #F1F1F1;
}
.authoritem-views {
    width: 104px;
    text-align: center;
    background: #fff;
    clip-path: polygon(8% 0%,92% 0%, 100% 50%, 92% 100%, 8% 100%, 0% 50%);
    padding: 0px 14px;
    font-size: 12px;
    color: #999999;
}
.authoritem-views svg {
    margin-right: 8px;
}
.authoritem-fio {
    height: 23px;
    margin-top: 27px;
    justify-content: center;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
}
.authoritem-about {
    height: 50px;
    font-size: 14px;
    text-align: center;
    line-height: 17px;
    overflow: hidden;
    text-overflow: ellipsis;
}
.authoritem-categories {
    height: 49px;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
}
.authoritem-categories span:hover {
    color: #F58E15;
}
.authoritem-categories span:active:hover {
    color: #EA6200;
}
.authoritem-reviewicon {
    margin-right: 3px;
    width: 24px;
}
.authoritem-subscribe {
    display: flex;
    opacity: 0;
    justify-content: center;
    padding-left: 16px;
    padding-right: 16px;
}
.authoritem-subscribe .btn {
    border-radius: 0;
}
.authoritem-subscribe .btn-primary {
    background-color: #F58E15;
    border-color: #F58E15;
    margin-top: 10px;
}
.authoritem-subscribe .btn-primary:not(:disabled):not(.disabled):hover {
    background-color: #EA6200;
    border-color: #EA6200;
}
.authoritem-subscribe .btn-primary:not(:disabled):not(.disabled):active {
    background-color: #DA5B00;
    border-color: #DA5B00;
}
.statusbar {
    margin: 0 25px;
}
</style>