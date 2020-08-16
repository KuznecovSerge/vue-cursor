<template>
	<div>
		<template v-if="product !== null">
			<div class="product-container">
				<div class="col-8">
					<product-item :product="product" :skills="skills" class="product-container__product">
						<template v-slot:comments>
							<div class="product-container-rating">
								<div class="d-flex">
									<span class="product-container-rating__text pr-6">Оцените продукт</span>
									<mc-rate v-model="product.userRating" @change="updateRate" />
								</div>
								<div class="d-flex align-items-center">
									<span class="product-container-rating__text pr-6">Поделитесь статьей</span>
									<span>
										<mc-socialshare />
									</span>
								</div>
							</div>
							<comments
								class="product-container-comments"
								:entityId="product.entityId"
								:referenceId="Number($route.params.id)"
							>
								<template v-slot:header>
									<span class="product-container-comments__title">Отзывы о продукте</span>
								</template>
							</comments>
						</template>
					</product-item>
				</div>
				<product-item-cart class="product-container__cart col-4" :product="product" />
			</div>
			<div class="product-collections row">
				<product-author :authorId="productAuthor" :productId="product.id" />
			</div>
		</template>
		<div v-else>Загружаем информацию...</div>
	</div>
</template>

<script>
import ProductItem from '@/components/products/ProductItem';
import ProductItemCart from '@/components/products/ProductItemCart';
import ProductAuthor from '@/components/products/ProductAuthor';
import Comments from '@/components/common/Comments';
import McRate from '@/components/common/mc-rate';
import McSocialshare from '@/components/common/mc-socialshare';

export default {
	beforeRouteUpdate(to, from, next) {
		if (from.params.id != to.params.id) {
			this.product = null;
			this.fetchItem(to.params.id);
		}
	},

	components: {
		Comments,
		ProductItem,
		ProductItemCart,
		McRate,
		McSocialshare,
		ProductAuthor
	},

	data: () => {
		return {
			product: null,
			skills: []
		};
	},

	computed: {
		productAuthor() {
			const { product } = this;

			return product.authorId;
		}
	},

	methods: {
		updateRate(rate) {
			const { product } = this;

			this.$http
				.post('/api/product/rate', {
					referenceId: product.id,
					entityId: product.entityId,
					rate
				})
				.then(({ data }) => {
					const { ball } = data;

					if (ball) {
						this.product.userRating = ball;
					}
				});
		},

		fetchItem(id) {
			this.$http.get(`/api/catalog/${id}`).then(({ data }) => {
				this.skills = data.product.skills.map(skill => skill.description);
				this.product = data.product;
			});
		}
	},

	created() {
		const { id } = this.$route.params;

		this.fetchItem(id);
	}
};
</script>

<style lang="less">
.product-container {
	display: flex;
	flex-direction: row;
	align-items: flex-start;

	&__cart {
		margin-left: 25px;
		flex: 0 0 400px;
	}

	.product-container-comments {
		margin-bottom: 48px;

		&__title {
			font-size: 28px;
			line-height: 130%;
			font-weight: bold;
			padding: 65px 0 40px;
			display: block;
		}
	}

	&__product {
		width: 100%;

		.product-container-rating {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-bottom: 32px;

			&__text {
				font-weight: 500;
				font-size: 18px;
				line-height: 130%;
				color: @black;
			}
		}
	}
}
</style>