<template>
	<div class="mc-journal-tagslider">
		<span class="mc-journal-tagslider__nav mc-journal-tagslider__nav--left" @click="slideTagPrev">
			<simple-svg
				width="10px"
				height="14px"
				:src="`/assets/media/arrow-left.svg`"
				@click="slideTagPrev"
			/>
		</span>
		<div class="mc-journal-tagslider-wrapper">
			<div v-swiper:mySwiper="swiperOptions">
				<div class="swiper-wrapper">
					<div
						class="swiper-slide mc-journal-tagslider__item"
						:key="idx"
						v-for="(wrapper, idx) in tags"
						@click="$emit('select', wrapper.tag)"
					>{{ wrapper.tag.name }}</div>
				</div>
			</div>
		</div>
		<span class="mc-journal-tagslider__nav mc-journal-tagslider__nav--right" @click="slideTagNext">
			<simple-svg width="10px" height="14px" :src="`/assets/media/arrow-left.svg`" />
		</span>
	</div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {
	components: {
		SwiperSlide,
		Swiper,
		directive
	},

	directives: {
		swiper: directive
	},

	data: () => {
		return {
			limit: 10,
			swiperOptions: {
				slidesPerView: 5,
				spaceBetween: 32,
				visibilityFullFit: true,
				updateOnWindowResize: false,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				}
			},
			tags: []
		};
	},

	mounted() {
		this.fetchTags();
	},

	methods: {
		fetchTags() {
			const { limit } = this;
			const offset = this.tags.length;

			this.$http
				.get('/api/journalv2/tags', {
					params: {
						limit,
						offset
					}
				})
				.then(({ data }) => {
					if (!data.tags.length) {
						return;
					}
					this.tags = this.tags.concat(data.tags);
				});
		},

		slideTagPrev() {
			const { mySwiper } = this;

			mySwiper.slidePrev();
		},

		slideTagNext() {
			const { mySwiper, fetchTags } = this;

			if (!mySwiper.slideNext()) {
				fetchTags();
			}
		}
	}
};
</script>

<style lang="less">
.mc-journal-tagslider {
	padding: 24px 42px 0;

	.mc-journal-tagslider__item {
		font-size: 14px;
		line-height: 144%;
		color: @black;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		cursor: pointer;
	}

	.mc-journal-tagslider__nav {
		position: absolute;
		color: @gray-300;
		top: 120px;
		cursor: pointer;
		z-index: 2001;

		&.mc-journal-tagslider__nav--left {
			left: 0px;
		}

		&.mc-journal-tagslider__nav--right {
			right: 0px;
			transform: rotate(180deg);
		}
	}
}
</style>