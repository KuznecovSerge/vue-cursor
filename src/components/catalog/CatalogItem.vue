<template>
	<div class="catalogitem">
        <div class="catalogitem__card" @click="$router.push(`/catalog/${product.id}`)">
            <div class="catalogitem__top">
                <div class="catalogitem__image">
                    <img :src="imageProduct"/>
                    <div class="catalogitem__raiting">
                        <span class="mr-1">{{Number(product.ball).toFixed(1)}}</span>
                        <el-rate 
                            :value="Number(product.ball)"
                            disabled
                            :colors="['#FFFFFF', '#FFFFFF', '#FFFFFF']"
                            void-color="#FFFFFF"
                        >
                        </el-rate>
                    </div>
                </div>
            </div>
            <div class="catalogitem__ribbon">
                <div class="catalogitem__producttype">
                    <simple-svg
                        width="28px"
                        height="24px"
                        :src="`/assets/media/course.svg`"
                    />
                    {{ productType }}
                </div>
            </div>
            <div class="catalogitem__author"
                @click.stop="$router.push(`/authors/${product.author.id}`)" 
            >
                <img :src="imageAvatar"/>
                {{product.author.firstName}} {{product.author.lastName}}
            </div>
            <div class="catalogitem__title m-3">
                {{this.product.title}}
            </div>
            <div class="catalogitem__categories m-3">
                <template v-for="(item, index) in product.categories">
                    {{(index != 0) ? '|' : '' }}
                    <span 
                        :key="index"
                        @click.stop="$router.push(`/products?categoryId=${item.id}`)"
                    >{{item.name}}
                    </span>
                </template>
            </div>
            <div class="catalogitem__price">
                <div class="catalogitem__price-ribbon"
                    v-if="product.discount"
                >- {{product.discount.percent}} %
                </div>
                <div>
                    {{Number(priceWithDiscount).toLocaleString('ru-RU')}} {{CONST.CURRENCY_SYMBOL}}
                </div>
            </div>
            <div class="catalogitem__price-wo-discount"
                v-if="product.discount"
            >{{product.price.toLocaleString('ru-RU')}} {{CONST.CURRENCY_SYMBOL}}
            </div>
            <div class="catalogitem__action">
                <button type="button"
                    class="mc-btn-orange l outline"
                    >Подробнее
                </button>
                <button type="button"
                    class="catalogitem__action-favorite l"
                    :class="product.favorite ? 'mc-btn-orange outline' : 'mc-btn-white'"
                    @click.stop="toggleLike"
                >
                    <simple-svg
                        width="24px"
                        height="24px"
                        :src="`/assets/media/heart.svg`"
                        stroke-class-name="stroke"
						:stroke="product.favorite ? '#F58E15' : '#C9C9C9'"
                        fill-class-name="stroke"
						:fill="product.favorite ? '#F58E15' : ''"
                    />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CatalogItem',
    props: {
        product: {
            type: Object,
            default: function () {
                return {
                    image: '/assets/media/placeholder-image.png',
                    title: 'Видеокурс «PHP-Мастер. От теории до собственной CMS интернет-магазина»',
                    entityId: 6,
                    categories: [
                        { id: 1, name: 'Создание сайтов' },
                        { id: 2, name: 'Веб-дизайн'},
                        { id: 3, name: 'Создание лендингов'}
                    ],
                    ball: 4,
                    price: 23990,
                    discount: {
                        percent: 10,
                    },
                    author: {
                        firstName: 'Владимир',
                        lastName: 'Михайлович',
                        avatar: '/assets/media/avatar_author.png',
                    }
                }
            }
        },

    },
    computed: {
        imageProduct(){
            return this.product.image ? this.product.image : '/assets/media/placeholder-image.png';
        },
        imageAvatar(){
            return this.product.author.avatar ? this.product.author.avatar : '/assets/media/avatar_author.png';
        },
        productType() {
			const { entityId } = this.product;
			const { Entities } = this.CONST;

			if (entityId === Entities.Course) {
				return 'Курс';
			} else if (entityId === Entities.Lesson) {
				return 'Урок';
			} else if (entityId === Entities.Webinar) {
				return 'Вебинар';
			} else if (entityId === Entities.Consult) {
				return 'Консультация';
			} else if (entityId === Entities.Book) {
				return 'Книга';
			}
        },
        priceWithDiscount() {
			const { discount, price } = this.product;

			if (!discount) return price;

			return Math.round(price * ((100 - discount.percent) / 100));
		},
    },
    data() {
        return {

        }
    },
    methods: {
        toggleLike() {
			const { product } = this;
			const { Entities } = this.CONST;

			this.$http
				.post('/api/favorite', {
					entityId: product.id,
					typeId: Entities.Product
				})
				.then(({ data }) => {
					const { created } = data;

					this.$store.commit(
						`favorite/${
							created ? 'addFavoriteProduct' : 'removeFavoriteProduct'
						}`,
						this.product
					);
					this.product.favorite = created;
				});
        },
                
    }
};
</script>

<style lang="less">
.catalogitem {
    min-width: 290px !important;
    width: 600px;
    height: 490px;
    border: none !important;
    background: none !important;

    &__card {
        border: 1px solid #E7E7E7;
        width: 100%;
        height: 421px;
        position: relative;
        top: 35px;
        cursor: pointer;
    }
    &__card:hover {
        box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.15);
        transition: 0.4s all;
        height: 455px;
    }
    &__card:hover &__action {
        opacity: 1;
        transition: 0.4s all;
        transition-delay: 0.2s;
    }
    &__top {
        height: 131px;
        display: flex;
        justify-content: center;
    }
    &__image {
        width: 134px;
        height: 134px;
    }
    &__image img{
        position: relative;
        top: -36px;
        width: 134px;
        height: 134px;
        box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.20);
    }
    &__raiting {
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
    &__raiting .el-rate {
        height: 14px;
    }
    &__raiting .el-rate__icon {
        font-size: 12px;
    }
    &__ribbon {
        position: relative;
        height: 18px;
        background: #F1F1F1;
        display: flex;
        justify-content: center;
    }
    &__producttype {
        position: absolute;
        top: -2px;
        width: 104px;
        text-align: center;
        background: #fff;
        clip-path: polygon(8% 0%,92% 0%, 100% 50%, 92% 100%, 8% 100%, 0% 50%);
        padding: 0px 14px;
        font-size: 12px;
        color: #999999;
    }
    &__producttype svg {
        margin-right: 8px;
    }
    &__author {
        height: 20px;
        font-size: 12px;
        font-weight: 500;
        text-align: center;
        margin-top: 26px;
        margin-bottom: 18px;
    }
    &__author img {
        width: 20px;
        height: 20px;
        overflow: auto;
        border-radius: 50%;
        margin-right: 12px;
        overflow: hidden;
    }
    &__title {
        height: 72px;
        display: flex;
        justify-content: center;
        font-size: 18px;
        font-weight: 500;
        text-align: center;
        line-height: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    &__categories {
        height: 32px;
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
        text-align: center;
        color: #999999;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    &__categories span:hover {
        color: #F58E15;
    }
    &__categories span:active:hover {
        color: #EA6200;
    }
    &__price {
        height: 26px;
        font-size: 18px;
        font-weight: 500;
        text-align: center;
    }
    &__price-ribbon {
        position: absolute;
        background: #f58e15;
        clip-path: polygon(0% 0%, 100% 0%, 92% 50%, 100% 100%, 0% 100%);
        color: #ffffff;
        justify-content: center;
        align-items: center;
        width: 62px;
        height: 26px;
        display: flex;
        line-height: 26px;
        font-size: 14px;
        margin-right: 12px;
    }
    &__price-wo-discount {
        height: 16px;
        text-align: center;
        font-size: 12px;
        text-decoration: line-through;
    }
    &__action {
        margin-top: 24px;
        display: flex;
        opacity: 0;
        justify-content: center;
        padding-left: 16px;
        padding-right: 16px;
    }
    &__action-favorite {
        margin-left: 16px;
        width: 40px;
        padding: 5px !important;

        &:hover .stroke {
            fill: @white !important;
        }
    }

}


</style>