<template>
	<b-card class="product-item-cart">
		<div class="product-item-cart__title">Стоимость курса</div>
		<div class="product-item-cart__price">{{product.price}} &#8381;</div>
		<div class="product-item-cart__name">{{ product.title }}</div>
		<div class="product-item-cart__body">
			<div class="product-item-cart__rating">
				<mc-rating v-model="product.userRating" :readonly="true" @change="updateRate" />
			</div>
			<div class="product-item-cart__review">
				<simple-svg width="24px" height="24px" :src="`/assets/media/comments.svg`" />
				<span>{{ commentsCount }}</span>
			</div>
		</div>
		<div class="product-item-cart__actions">
			<b-button class="product-item-cart__start-button" @click="cartActionMethod">{{ cartActionName }}</b-button>
			<b-button class="product-item-cart__favorite" @click="toggleLike">
				<b-icon :icon="`${product.favorite ? 'heart-fill' : 'heart'}`"></b-icon>
			</b-button>
			<b-button id="product-item-share" class="product-item-cart__share">
				<b-icon icon="reply-fill"></b-icon>
			</b-button>
			<b-popover
				custom-class="product-item-cart__sharepopover"
				target="product-item-share"
				triggers="click"
				placement="bottom"
			>
				<template v-slot:title>Поделитель статьей</template>
				<mc-socialshare class="product-item-shareitems" />
			</b-popover>
		</div>
		<div class="product-item-cart__footer">
			<span v-if="product.sales">Этот курс приобрели уже {{ product.sales.count }} человек.</span>
			<span>Не успустите свой шанс освоить новую профессию.</span>
		</div>
	</b-card>
</template>

<script>
import mcRating from '@/components/common/mc-rate';
import mcSocialshare from '@/components/common/mc-socialshare';

const productAction = {
	ADD: "ADD",
	REMOVE: "REMOVE",
	BOUGHT: "BOUGHT"
};

export default {
	props: ['product'],

	components: {
		mcRating,
		mcSocialshare
	},

	computed: {
		commentsCount() {
			const { commentsCount } = this.product;

			return `${commentsCount} ${this.sklonenie(commentsCount, [
				'Отзыв',
				'Отзыва',
				'Отзывов'
			])}`;
		},

		alreadyInCart() {
			const { product } = this;
			const products = this.$store.getters['basket/getProducts'];

			return products.find(p => p.id === product.id);
		},

		isBought() {
			const { product, currentUser } = this;

			if (!product.sales) return false;

			const { students } = this.product.sales;

			return students.split(",").find(student => Number(student) == currentUser.id)
		},

		cartAction() {
			const { alreadyInCart, isBought } = this;

			if (isBought) return productAction.BOUGHT;

			return alreadyInCart ? productAction.REMOVE : productAction.ADD;
		},

		cartActionName() {
			const { cartAction } = this;

			switch (cartAction) {
				case productAction.ADD: {
					return 'Добавить в корзину';
				}
				case productAction.REMOVE: {
					return 'Убрать из корзины';
				}
				case productAction.BOUGHT: {
					return 'Начать обучение';
				}
			}
		}
	},

	methods: {
		productAdd() {
			const { product } = this;

			this.$http.post('/api/basket/', {
					productId: product.id
			}).then(res => {
					this.$store.commit('basket/addProduct', product);
			});
		},

		productRemove() {
			const { product } = this;

			this.$http.post('/api/basket/delete', {
				productId: product.id
			}).then(({ data }) => {
				const { success } = data;

				if (success) {
					this.$store.commit('basket/remove', product.id);
				}
			});
		},

		cartActionMethod() {
			const { cartAction, productAdd, productRemove } = this;

			switch (cartAction) {
				case productAction.ADD: {
					return productAdd();
				}
				case productAction.REMOVE: {
					return productRemove();
				}
				case productAction.BOUGHT: {
					console.log('test');
				}
			}
		},

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

		updateRate(rate) {
			const { product } = this;

			this.$http.post('/api/product/rate', {
				referenceId: product.id,
				entityId: product.entityId,
				rate
			});
		}
	}
};
</script>

<style lang="less">
.product-item-cart {
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	.card-body {
		padding: 0;
	}

	margin: 0px;
	padding: 32px 40px;

	&__title {
		font-size: 14px;
		line-height: 24px;
		color: @gray-300;
	}

	&__price {
		padding-top: 8px;
		font-weight: bold;
		font-size: 28px;
		line-height: 130%;
		color: @black;
	}

	&__name {
		padding-top: 16px;
		font-size: 14px;
		line-height: 24px;
		color: @black;
	}

	&__body {
		padding-top: 20px;
		display: flex;
		justify-content: space-between;
	}

	&__review {
		display: flex;
		align-items: center;

		span {
			padding-left: 4px;
			font-size: 14px;
			line-height: 16px;
			color: @black;
		}
	}

	&__actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 28px;
	}

	&__start-button {
		min-width: 197px;
		height: 40px;
		background-color: @green;
		font-size: 14px;
		line-height: 24px;
		color: @white;
		border-color: @green;

		&:active,
		&:focus,
		&:hover {
			background-color: @green !important;
			border-color: @green !important;
			box-shadow: unset !important;
		}
	}

	&__favorite,
	&__share {
		width: 40px;
		height: 40px;
		background-color: white;
		border: 1px solid @gray-200;
		color: @gray-300;

		&:hover,
		&:active,
		&:focus {
			background-color: white !important;
			color: @gray-200 !important;
			box-shadow: unset !important;
			border: 1px solid @gray-200 !important;
		}
	}

	&__sharepopover {
		border: 1px solid #e7e7e7;
		box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.25);
		left: -110px !important;
		border-radius: 0%;

		.popover-header {
			font-weight: 500;
			font-size: 18px;
			line-height: 130%;
			color: @black;
			padding: 24px 24px 16px 24px;
			background-color: unset;
			border: unset;
		}

		.popover-body {
			padding: 0 24px 24px;

			.mc-socialshare-box span:not(:last-child) {
				margin-right: 16px;
			}
		}
	}

	&__footer {
		padding-top: 16px;
		font-size: 12px;
		line-height: 20px;
		color: @gray-300;
		display: flex;
		flex-direction: column;
	}
}
</style>