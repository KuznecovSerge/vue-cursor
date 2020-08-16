<template>
    <div class="product-h__card">
        <div class="product-h__border">
            <div class="product-h__img" :class="product.active ? '': 'product-h--inactive'">
                <img :src="imageCourse" />
                <div class="product-h__raiting px-2">
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
            <div class="product-h__content mt-5" :class="product.active ? '': 'product-h--inactive'">
                <div class="product-h__author"
                    v-if="!editable" 
                >
                    <img :src="imageAvatar"/>
                    {{product.author.firstName}} {{product.author.lastName}}
                </div>
                <div class="product-h__sales"
                    v-else
                >
                    {{salesCount}} {{lastSale}}
                </div>

                <div class="product-h__name">
                    {{product.title}}
                </div>
                <div class="product-h__price">
                    <span class="product-h__price-cost"
                        >{{Number(priceWithDiscount).toLocaleString('ru-RU')}} ₽
                    </span>
                    <div v-if="product.discount" class="product-h__price-ribbon"
                        >{{product.discount.percent}} %
                    </div>
                    <span v-if="product.discount" class="product-h__price-nodiscount"
                        >{{Number(product.price).toLocaleString('ru-RU')}} ₽
                    </span>
                </div>
            </div>
            <ProductActionMenu 
                class="product-h__editmenu"
                v-if="editable"
                :product="product"
                @change="$emit('change', $event)"
            />
        </div>
    </div>
</template>

<script>
const moment = require("moment");
import ProductActionMenu from './ProductActionMenu';
export default {
    name: 'ProductHorizontal',
    components: { ProductActionMenu },
    props: {
        product: {
            type: Object,
            default: function () {
                return {
                    title: 'Видеокурс "PHP-Мастер. От теории до собственной CMS интернет-магазина"',
                    'author.firstName': 'Владимир',
                    'author.lastName': 'Михайлович',
                    image: '/assets/media/background-courses.png',
                    price: '23999',
                    'discount.percent': 40,
                    ball: 4,
                }
            }
        },
        editable: { // разрешает редактирование
            type: Boolean,
            default: false
        },  
    },
    computed: {
        imageCourse() {
            return this.product.image ? this.product.image : '/assets/media/background-courses.png';
        },
        imageAvatar() {
            return this.product.author.avatar ? this.product.author.avatar : '/assets/media/avatar_author.png';
        },
        salesCount() {
            const n = this.product.sales ? this.product.sales.count : 0;
            return n + ' ' + this.sklonenie(n, ['Продажа', 'Продажи', 'Продаж']);
        },
        lastSale() {
            if (this.product.sales) {
                const date = moment(this.product.sales.last).format("DD.MM.YYYY");
                return `| Последняя - ${date}`    
            } else {
                return '';
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
            rating: 0
        } 
    }
};
</script>

<style lang="less">
.product-h {
    &--inactive {
        opacity: 0.5;
    }
    &__card {
        min-width: 400px;
        width: 800px;
        height: 182px;
    }
    &__border {
        width: calc(100% - 24px);
        display: flex;
        border: 1px solid @border-color;
    }
    &__img {
        width: 134px;
        height: 180px;
    }
    &__img img {
        width: 134px;
        height: 134px;
        overflow: auto;
        position: relative;
        left: -24px;
        top: 20px;
        box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.25);
    }
    &__raiting {
        display: flex;
        align-items: center;
        background: @orange-100;
        position: relative;
        left: -24px;
        top: -4px;
        width: 134px;
        height: 24px;
        font-size: 12px;
        color: @white;
    }
    &__raiting .el-rate {
        height: 14px;
    }
    &__raiting .el-rate__icon {
        font-size: 12px;
    }
    &__content {
        width: calc(100% - 136px);
        height: 136px;
    }
    &__author {
        height: 20px;
        font-size: 12px;
        font-weight: 500;
    }
    &__author img {
        width: 20px;
        height: 20px;
        overflow: auto;
        border-radius: 50%;
        margin-right: 12px;
    }
    &__sales {
        height: 20px;
        font-size: 12px;
        line-height: 14px;
        color: @gray-300;
    }
    &__name {
        font-weight: 500;
        font-size: 16px;
        height: 72px;
        margin: 8px 0px;
        overflow: hidden;
    }
    &__price {
        display: flex;
    }
    &__price-cost {
        font-size: 18px;
        font-weight: 500;
        margin-right: 12px;
    }
    &__price-ribbon {
        background: @orange-100;
        clip-path: polygon(0% 0%, 100% 0%, 92% 50%, 100% 100%, 0% 100%);
        color: @white;
        justify-content: center;
        align-items: center;
        width: 62px;
        height: 26px;
        display: flex;
        line-height: 26px;
        font-size: 14px;
        margin-right: 12px;
    }
    &__price-nodiscount {
        font-weight: 500;
        font-size: 12px;
        line-height: 26px;
        color: @gray-300;
        text-decoration: line-through;
    }
    &__editmenu {
        position: absolute;
        top: 4px;
        right: 6px;
    }
}
</style>