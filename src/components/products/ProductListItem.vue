<template>
    <div class="product-line">
        <div class="product-line__img" :class="product.active ? '': 'product-line--inactive'">
            <img :src="imageCourse" />
        </div>
        <div class="product-line__name" :class="product.active ? '': 'product-line--inactive'">
            {{product.title}}
        </div>
        <div class="product-line__market" :class="product.active ? '': 'product-line--inactive'">
            <div class="product-line__sales">
                {{salesCount}} {{lastSale}}
            </div>
            <div class="product-line__price">
                <span class="product-line__price-cost"
                    >{{Number(priceWithDiscount).toLocaleString('ru-RU')}} ₽
                </span>
                <div v-if="product.discount" class="product-line__price-ribbon"
                    >{{product.discount.percent}} %
                </div>
                <span v-if="product.discount" class="product-line__price-nodiscount"
                    >{{Number(product.price).toLocaleString('ru-RU')}} ₽
                </span>
            </div>
        </div>

        <ProductActionMenu 
            class="product-line__editmenu"
            :product="product"
            @change="$emit('change', $event)"
        />
    </div>
</template>

<script>
const moment = require("moment");
import ProductActionMenu from './ProductActionMenu';
export default {
    name: 'ProductListItem',
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
                    discount: {
                        percent: 40
                    },
                    ball: 4,
                }
            }
        },
    },
    computed: {
        imageCourse() {
            return this.product.image ? this.product.image : '/assets/media/background-courses.png';
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
.product-line {
    display: flex;
    border-top: 1px solid @border-color;
    border-bottom: 1px solid @border-color;
    width: 100%;
    height: 80px;
    padding: 18px 0px;

    &--inactive {
        opacity: 0.5;
    }

    &__img {
        width: 50px;
        height: 50px;
        margin-right: 16px;
    }
    &__img img {
        width: 48px;
        height: 48px;
        overflow: auto;
    }
    &__name {
        font-weight: 500;
        font-size: 16px;
        min-width: 300px;
        width: 400px;
        margin-right: 40px;
        overflow: hidden;
    }
    &__sales {
        height: 20px;
        font-size: 12px;
        line-height: 14px;
        color: @gray-300;
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
        margin-left: auto;
    }
}
</style>