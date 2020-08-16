<template>
	<div class="gutters">
		<div class="main-content">
			<div class="category-title">Избранное</div>
			<div class="d-flex justify-space-between align-center toppanel">
				<b-col md="8" sm="12">
					<search-input v-model="filter.findstr" :hasbutton="false" placeholder="Искать в избранном"/>
				</b-col>
				<b-col md="2" sm="4" class="offset-md-2">
					<mc-cascader
						v-model="filter.theme"
						placeholder="Темы курсов"
						:clearable="true"
						:options="filterThemesSort"
					>
						<template v-slot:icon>
							<img width="24" height="24" src="/assets/media/allCats.svg" />
						</template>
					</mc-cascader>
				</b-col>
			</div>
			<b-container fluid v-if="favorites && favorites.length">
				<b-row>
					<b-col
						v-for="product in favoritesFiltered"
						v-bind:key="product.id"
						class="catalog-item col-lg-3 col-md-6 col-12"
					>
						<CatalogItem :product="product" />
					</b-col>
				</b-row>
				<b-row>
					<b-col>
						<div class="mc-pagination">
							<b-pagination
								align="center"
								page-class="page"
								prev-class="prev"
								next-class="next"
								first-number
								last-number
								prev-text="Предыдущая"
								next-text="Следующая"
								v-model="filter.current_page"
								:total-rows="totalCount"
								:per-page="filter.limit"
								@change="filter.current_page = $event"
							/>
						</div>
					</b-col>
				</b-row>
			</b-container>
			<b-container v-else>
				<div class="alert-img">
					<b-img src="/assets/media/emptyFavorites.svg" />
				</div>
				<div class="alert">В избранном пока ничего нет</div>
			</b-container>
		</div>
	</div>
</template>

<script>
import CatalogItem from '@/components/catalog/CatalogItem';
import loadImage from 'image-promise';
import SearchInput from '@/components/catalog/SearchInput';
import CategoryFilter from '@/components/catalog/CategoryFilter';
import McCascader from '@/components/common/mc-cascader';
import { popularSort, typesSort } from '@/components/catalog/sort';

export default {
	name: 'Favorites',

	components: {
		CatalogItem,
		SearchInput,
		CategoryFilter,
		McCascader
	},

	data: function() {
		return {
			searchString: '',
			totalCount: 0,
			filter: {
				findstr: '',
				theme: '',
				sort: '',
				limit: 10,
				current_page: 1
			}
		};
	},

	computed: {
		favorites() {
			const products = this.$store.getters['favorite/getFavoriteProducts'];

			return products;
		},

		favoritesFiltered() {
			const { favorites } = this;
			const { findstr, theme, sort, current_page, limit } = this.filter;
			let filtered = favorites;
			const filterFunc = func => {
				return favorites.filter(product => {
					return func(product);
				});
			};

			if (findstr) {
				filtered = filterFunc(product => {
					const fts = `${product.title} ${product.author.firstName} ${product.author.lastName}`.toLowerCase();

					return fts.indexOf(findstr) !== -1;
				});
			}

			if (theme.length) {
				const [category] = theme;

				filtered = filterFunc(product =>
					product.categories.find(_category => _category.id === category)
				);
			}

			this.totalCount = filtered.length;

			return filtered.slice((current_page - 1) * limit, limit * current_page);
		},

		filterPopularSort() {
			return popularSort;
		},

		filterThemesSort() {
			const { favorites } = this;

			return favorites.reduce((acc, favorite) => {
				favorite.categories
					.map(category => {
						return {
							label: category.name,
							value: category.id
						};
					})
					.forEach(category => {
						if (!acc.find(exist => exist.value === category.value)) {
							acc.push(category);
						}
					});

				return acc;
			}, []);
		}
	}
};
</script>

<style lang="less">
.alert {
	font-weight: bold;
	font-size: 24px;
	line-height: 28px;
	text-align: center;
	letter-spacing: 0.02em;
	color: @black;
	margin-bottom: 96px;
}
.gutters {
	margin-left: -15px;
	margin-right: -15px;
}
.alert-img {
	display: flex;
	justify-content: center;
	margin: 56px 0 37px 0;
}
</style>