<template>
	<div class="gutters">
		<div class="category-title">
			Корзина
			<span v-if="basketItems.length > 0">({{this.basketItems.length}})</span>
		</div>
		<b-overlay :value="apiCall"></b-overlay>
		<b-row>
			<b-col sm="12" md="8">
				<b-table-simple class="sale-table" v-if="basketItems.length" no-footer-sorting borderless>
					<b-thead>
						<b-tr>
							<b-th class="item-table-title" colspan="4">Список продуктов</b-th>
							<b-th colspan="2">
								<b-btn class="clear" @click="clear">Очистить список</b-btn>
							</b-th>
						</b-tr>
					</b-thead>
					<b-tbody v-for="item in basketItems" :key="item.id">
						<b-tr class="line">
							<b-td>
								<b-img class="product__image" :src="item.image"></b-img>
							</b-td>
							<b-td class="item-title">{{ item.title }}</b-td>
							<b-td class="item-price">{{ Number(item.price).toLocaleString('ru-RU') }} {{CONST.CURRENCY_SYMBOL}}</b-td>
							<b-td class="item-title">
								<span class="ribbon">- {{ discount }}%</span>
								</b-td>
							<b-td class="item-old-price">{{ Number(item.price).toLocaleString('ru-RU') }} {{CONST.CURRENCY_SYMBOL}}</b-td>
							<b-td>
								<b-btn class="remove-btn" @click="basketItemClear(item)">
									<img src="/assets/media/trash.svg" />
								</b-btn>
							</b-td>
						</b-tr>
					</b-tbody>
				</b-table-simple>
			</b-col>
			<b-col sm="12" md="4">
				<b-table-simple class="sale-table" v-if="basketItems.length" no-footer-sorting borderless>
					<b-tbody>
						<b-tr>
							<b-td class="total-header">
								<span class="total-header__basket">Ваша корзина</span>
								<span class="count-header__basket">{{this.basketItems.length + ' ' + this.sklonenie(this.basketItems.length, ['товар', 'товара', 'товаров'])}}</span>
							</b-td>
							<b-td class="total-header" id="medium-first">
								<span class="total-header__discount">Товары</span>
								<span class="total-header__discount">{{Number(this.amount()).toLocaleString('ru-RU')}} {{CONST.CURRENCY_SYMBOL}}</span>
							</b-td>
							<b-td class="total-header">
								<span class="total-header__discount">Скидка</span>
								<span class="total-header__discounts">{{Number(discount).toLocaleString('ru-RU')}} {{CONST.CURRENCY_SYMBOL}}</span>
							</b-td>
							<b-td class="total-header">
								<span class="total-header__basket">Общая стоимость</span>
								<span class="total-header__basket">{{Number(this.amount()).toLocaleString('ru-RU')}} {{CONST.CURRENCY_SYMBOL}}</span>
							</b-td>
							<b-td class="total-header">
								<b-btn class="deal" @click="basketItemClear(item)">Перейти к оформлению</b-btn>
							</b-td>
						</b-tr>
					</b-tbody>
				</b-table-simple>
				<b-modal id="sale-variants" title="Выберите тип оплаты" hide-footer>
					<div>
						<div>
							<InterCassa
								:description="saleDTO.description"
								:amount="saleDTO.amount"
								:saleId="saleDTO.saleId"
								buttonPayName="Интеркасса"
							/>
						</div>
					</div>
				</b-modal>
			</b-col>
		</b-row>
		<b-row>
			<b-col>
				<div class="d-flex justify-center flex-column" v-if="!basketItems.length">
					<div class="alert-img">
						<b-img src="/assets/media/emptyCart.svg" />
					</div>
					<div class="alert">В корзине пока ничего нет</div>
				</div>
			</b-col>
		</b-row>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import InterCassa from '@/components/pay/InterCassa';

export default {
	name: 'Sale',

	data: () => {
		return {
			discount: 10,
			apiCall: false,
			error: '',
			message: '',
			beginSale: false,
			saleDTO: {
				description: '',
				amount: '',
				saleId: ''
			}
		};
	},

	components: {
		InterCassa
	},

	/**
	 * * В режиме дебаг в случае успешного ответа от интеркассы очищаем корзину
	 * ? В релизе очищается после интеграционного ответа АПИ кассы
	 */
	created() {
		if (window.monecle.debug && this.basketItems.length) {
			const { ik_inv_st } = this.$route.query;
			if (ik_inv_st === 'success') {
				this.$http.post('/api/basket/clear').then(res => {
					this.$store.commit('basket/clear');
				});
			}
		}
	},

	methods: {
		async onBeforeSale() {
			const products = this.basketItems;
			const sale = {
				userId: this.user.id,
				amount: this.amount(),
				discount: 0,
				items: this.basketItems.map(b => {
					return {
						productId: b.id,
						name: b.title,
						content: `${b.content ? b.content : ''} ${b.description}`,
						count: 1,
						cost: b.price
					};
				})
			};
			const res = await this.$http.post('/api/sale', { sale });
			const { id, amount } = res.data.item;

			this.saleDTO.saleId = id.toString();
			this.saleDTO.amount = amount.toString();
			this.saleDTO.description = `Pay for order #${id}`;
		},

		basketItemClear(productId) {
			this.$http
				.post('/api/basket/delete', {
					productId: productId
				})
				.then(({ data }) => {
					const { success } = data;

					if (success) {
						this.$store.commit('basket/remove', productId);
					}
				});
		},

		amount() {
			return this.basketItems.reduce((acc, b) => (acc += Number(b.price)), 0);
		},

		clear() {
			if (this.basketItems.length) {
				this.$http.post('/api/basket/clear').then(res => {
					this.$store.commit('basket/clear');
				});
			}
		},
	},

	computed: {
		user() {
			return this.currentUser;
		},

		basketItems() {
			const products = this.$store.getters['basket/getProducts'];
			return products;
		},

		priceWithDiscount() {
			const { discount, price } = this.product;

			if (!discount) return price;

			return Math.round(price * ((100 - discount.percent) / 100));
		}
	}
};
</script>

<style lang="less">
.total-header {
	position: relative;
	&:first-child {
		&:after {
		content: "";
		position: absolute;
		width: 88.5%;
		height: 1px;
		top: 65px;
		background-color: @border-color;
		}
	}
	&:last-child {
		&:after {
		content: "";
		position: absolute;
		width: 88.5%;
		height: 1px;
		top: -65px;
		background-color: @border-color;
		}
	}
}
.table td.total-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 24px;
	.total-header__basket {
		font-weight: 500;
		font-size: 18px;
		line-height: 130%;
		color: @black;
	}
	.count-header__basket {
		font-size: 14px;
		line-height: 18px;
		color: @gray-300;
	}
	.total-header__discount {
		font-size: 14px;
		color: @black;
		font-weight: 500;
	}
	.total-header__discounts {
		font-size: 14px;
		color: @orange-100;
		font-weight: 500;
	}
}
.total-actions {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
.remove-btn {
	background-color: transparent;
	border-color: transparent;
	border: none;
	&:hover {
		background-color: transparent;
		border-color: transparent;
	}
}
.deal {
	background-color: @orange-100;
	border-color: transparent;
	border: none;
	border-radius: 0;
	text-align: center;
	color: @white;
	width: 100%;
	height: 48px;
	transition: 0.4s all;
	&:hover {
		background-color: @orange-200;
		transition: 0.4s all;
	}
}
.product__image {
	width: 48px;
}
.table th,
.table td,
.table thead th {
	padding: 24px 8px;
	vertical-align: middle;
	&:first-child {
		padding-left: 24px;
	}
	&:last-child {
		padding-right: 24px;
	}
}
.clear {
	background-color: transparent;
	color: @gray-300;
	border: none;
	font-size: 14px;
	padding: 0;
	&:hover {
		background-color: transparent;
		color: @black;
	}
}
.sale-table {
	border: 1px solid @border-color;
	&:hover {
		box-shadow: 0px 12px 44px rgba(0, 0, 0, 0.15);
		transition: 0.4s all;
	}
}
.item-title {
	font-weight: 500;
	font-size: 16px;
	line-height: 22px;
	color: @black;
}
.item-price {
	font-weight: 500;
	font-size: 18px;
	line-height: 23px;
	color: @black;
}
.item-old-price {
	font-weight: 500;
	font-size: 12px;
	line-height: 14px;
	letter-spacing: 0.02em;
	color: @gray-300;
	text-decoration: line-through;
}
.item-table-title {
	font-weight: 500;
	font-size: 18px;
	line-height: 23px;
	color: @black;
}
.ribbon {
	width: 62px;
	height: 26px;
	line-height: 50px;
	background: @orange-100;
	color: @white;
	display: flex;
	justify-content: center;
	align-items: center;
	clip-path: polygon(0% 0%, 100% 0%, 92% 50%, 100% 100%, 0% 100%);
	font-size: 14px;
}
.btn-secondary:not(:disabled):not(.disabled):active, .btn-secondary:not(:disabled):not(.disabled).active, .show > .btn-secondary.dropdown-toggle {
	background-color: transparent;
	border-color: transparent;
}
.line {
	position: relative;
	&:after {
		content: "";
		position: absolute;
		width: 90%;
		height: 1px;
		left: 36px;
		top: 180px;
		background-color: @border-color;
	}
}
#medium-first {
	padding-bottom: 0px;
}
</style>