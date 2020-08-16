<template>
	<div class="author-collections">
		<div class="author-collections-header">
			<span class="author-collections-header__title">Другие продукты от автора</span>
			<div class="author-collections-header__controls">
				<button
					class="author-collections-header__showall"
					@click="$router.push(`/authors/${authorId}`)"
				>Смотреть все курсы</button>
				<span @click="mySwiper.slidePrev()">
					<simple-svg
						class="author-collections-header__prev"
						width="40px"
						height="40px"
						src="/assets/media/prevSlide.svg"
					></simple-svg>
				</span>
				<span @click="fetchNext">
					<simple-svg
						class="author-collections-header__next"
						width="40px"
						height="40px"
						src="/assets/media/nextSlide.svg"
					></simple-svg>
				</span>
			</div>
		</div>
		<div class="author-collections-body">
			<div v-swiper:mySwiper="swiperOptions">
				<div class="swiper-wrapper">
					<CatalogItem
						class="swiper-slide"
						:key="idx"
						v-for="(product, idx) in productItems"
						:product="product"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CatalogItem from '@/components/catalog/CatalogItem';
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {
	props: ['authorId', 'productId'],

	components: {
		CatalogItem,
		Swiper,
		SwiperSlide
	},

	directives: {
		swiper: directive
	},

	data: function() {
		return {
			filter: {
				limit: 20,
				sort: 'ball'
			},
			products: [],
			swiperOptions: {
				slidesPerView: 4,
				spaceBetween: 40,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				}
			}
		};
	},

	methods: {
		prev() {
			const { mySwiper } = this;

			mySwiper.slidePrev();
		},

		fetchNext() {
			const { mySwiper, filterDTO } = this;

			if (!mySwiper.slideNext()) {
				this.$http.get('/api/catalog/', {
					params: filterDTO
				}).then(({ data }) => {
					this.products = this.products.concat(data.items);

					mySwiper.slideNext();
				});
			}
		}
	},

	mounted() {
		const { fetchNext } = this;

		fetchNext();
	},

	computed: {
		filterDTO() {
			const { filter, authorId, products } = this;

			return { ...filter, authorId, offset: products.length };
		},

		productItems() {
			const { products, productId } = this;

			return products.filter(product => product.id !== productId);
		}
	}
};
</script>

<style lang="less">
.author-collections {
	position: relative;
	width: 100%;

	.swiper-wrapper {
		padding-top: 25px;
	}

	.author-collections-header {
		display: flex;
		justify-content: space-between;
		align-items: center;

		svg {
			cursor: pointer;
		}

		&__title {
			font-weight: bold;
			font-size: 28px;
			line-height: 130%;
			color: @black;
		}

		&__showall {
			border: 1px solid #c9c9c9;
			color: #c9c9c9;
			padding: 8px 24px;
			margin-right: 32px;
			transition: 0.4s all;

			&:hover {
				border: 1px solid #f58e15;
				color: #f58e15;
				transition: 0.4s all;
			}
		}

		&__prev {
			margin-right: 12px;
		}
	}

	.author-collections-body {
		margin: 40px 0 48px;
	}
}
</style>