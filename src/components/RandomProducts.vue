<template>
	<v-expansion-panels class="mt-6">
		<v-expansion-panel>
			<v-expansion-panel-header expand-icon="mdi-menu-down">{{selector.title}}</v-expansion-panel-header>
			<v-expansion-panel-content>
				<v-layout wrap justify-space-around>
					<v-flex v-for="product in products" v-bind:key="product.id" class="catalog-item">
						<CatalogItem :product="product" />
					</v-flex>
				</v-layout>
			</v-expansion-panel-content>
		</v-expansion-panel>
	</v-expansion-panels>
</template>

<script>
import CatalogItem from '@/components/catalog/CatalogItem';
import loadImage from 'image-promise';

export default {
	name: 'RandomProducts',

	data: function() {
		return {
			products: [],
 			loading: true,
			sortBy: ['ball', 'date'],
			selector: {
				title: '',
				select: ['Лучшие по рейтингу', 'Новые уроки']
			}
		};
	},

	components: {
		CatalogItem
	},

	mounted() {
		this.loading = true;
		const randomSort = Math.floor(Math.random() * 2); // рандомное число 0 или 1
		this.selector.title = this.selector.select[randomSort];
		let catID = this.$route.query.categoryId;

		const response = this.$http
			.get('/api/catalog', {
				params: {
					limit: 15,
					sort: this.sortBy[randomSort],
					categoryId: catID
				}
			})
			.then(res => {
				this.loading = false;
				this.products = res.data.items;
			});
	}
};
</script>

<style scoped>
.catalog-item {
	width: 30%;
}
</style>