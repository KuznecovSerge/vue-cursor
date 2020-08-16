<template>
	<div class="author-social col-3">
		<h5>Полезные ссылки</h5>
		<div class="author-social__items">
			<div class="social__items_item" v-for="(item, idx) in social.filter(s => !!s.condition)" :key="idx">
				<span class="social__items_item_icon" :class="item.background">
					<simple-svg
						width="20px"
						height="20px"
						:src="`/assets/media/${item.icon}.svg`"
						fill-class-name="fill"
						stroke-class-name="stroke"
						:stroke="item.color.stroke"
						:fill="item.color.fill"
					/>
				</span>
				<a class="social__items_item_name" :href="getHref(item)">
					<span>{{item.text}}</span>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['vk', 'youtube', 'site', 'inst'],

	data() {
		return {
			social: [
				{
					icon: 'web',
					text: 'Личный сайт',
					background: 'icon-orange',
					condition: this.site,
					color: {
						stroke: 'white'
					}
				},
				{
					icon: 'lesson',
					text: 'Канал на YouTube',
					background: 'icon-red',
					condition: this.youtube,
					color: {
						fill: 'red',
						stroke: 'white'
					}
				},
				{
					icon: 'vk',
					text: 'Страница Вконтакте',
					background: 'icon-blue',
					condition: this.vk,
					color: {
						fill: 'white'
					}
				},
				{
					icon: 'twitter',
					text: 'Страница Instagram',
					background: 'icon-light-blue',
					condition: this.inst,
					color: {
						fill: 'white'
					}
				}
			]
		};
	},

	methods: {
		getHref(name) {
			if (this.hasOwnProperty(name)) {
				return this[name];
			}
			return '#';
		}
	}
};
</script>

<style lang="less">
.author-social {
	padding: 24px 32px;
	border: 1px solid @border-color;
	flex: 0 0 25%;

	.author-social__items {
		.social__items_item {
			display: flex;
			align-items: center;
			margin-top: 12px;

			.social__items_item_icon {
				width: 40px;
				height: 40px;
				display: flex;
				align-items: center;
				justify-content: center;

				&.icon-red {
					background-color: @red-200;
				}

				&.icon-orange {
					background-color: @orange-100;
				}

				&.icon-blue {
					background-color: @blue-200;
				}

				&.icon-light-blue {
					background-color: @blue-100;
				}
			}

			.social__items_item_name {
				margin-left: 16px;
				font-size: 14px;
				line-height: 24px;
				text-decoration: none;
				color: @black;

				&:hover {
					font-weight: 600;
				}
			}
		}
	}
}
</style>