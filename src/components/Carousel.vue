<template>
	<div>
		<div class="display-1" v-if="titleLink">
			<router-link class="nav-link" :to=" `${titleLink}` ">{{title}}</router-link>
		</div>
		<div class="display-1" v-else>
			{{ title }}
		</div>
		<v-carousel
			cycle
			height="300"
			show-arrows-on-hover
			hide-delimiters
			:show-arrows="itemsLength > 1"
		>
			<div v-if="itemsLength">
				<v-carousel-item
					class="hovered"
					v-for="item in items"
					:key="item.id"
					@click="onClickItem(item)"
				>
					<v-sheet :color="bcolor || color" height="100%">
						<b-row class="fill-height" align-v="center" align-content="center">
							<div class="subtitle-1 pa-5">{{ itemName(item) }} <br>
								<slot name="newsDescription"></slot> <br>
								<slot name="newsPicture"></slot> 
							</div>
						</b-row>
					</v-sheet>
				</v-carousel-item>
			</div>
			<div v-else>
				<v-carousel-item>
					<v-sheet :color="bcolor || color" height="100%">
						<b-row class="fill-height" align-v="center" align-content="center">
							<div class="subtitle-1 pa-5">{{ placeholder }}
								<slot name="additional"></slot>
							</div>
						</b-row>
					</v-sheet>
				</v-carousel-item>
			</div>
		</v-carousel>
	</div>
</template>

<script>
const VSheet = () => import(/* webpackChunkName: "vuetify" */'@/plugins/v-sheet');
const VCarousel = () => import(/* webpackChunkName: "vuetify" */'@/plugins/v-carousel');
const VCarouselItem = () => import(/* webpackChunkName: "vuetify" */'@/plugins/v-carousel-item');
export default {
	name: `Carousel`,

	components: {
		VSheet,
		VCarousel,
		VCarouselItem
	},

	data: () => {
		return {
			color: 'blue-grey darken-1'
		};
	},

	props: {
		title: String,
		bcolor: String,
		items: Array,
		placeholder: String,
		nameProperty: String,
		nameGetter: Function,
		onClickItem: Function,
		onCreated: Function,
		onRenderEmptySubTitle: Function,
		titleLink: String
	},

	created() {
		this.$vnode.tag = `${this.$vnode.tag}__(${this.$vnode.key || this.randomString()} `;

		if (this.onCreated) {
			this.onCreated();
		}
	},

	methods: {
		itemName(item) {
			if (this.nameGetter) {
				return this.nameGetter(item);
			}
			return Reflect.get(item, this.nameProperty);
		},

		randomString() {
			return (
				Math.random()
					.toString(36)
					.substring(2, 15) +
				Math.random()
					.toString(36)
					.substring(2, 15)
			);
		}
	},

	computed: {
		itemsLength() {
			return this.items ? this.items.length : 0;
		}
	}
};
</script>

<style scoped>
.v-application .display-1 {
	margin-bottom: 15px;
}
</style>