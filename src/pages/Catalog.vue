<template>
	<div class="row">
		<div class="catalog">
			<div class="category-title" v-if="filter.categoryId != -1 && category">{{ category }}</div>
			<div class="justify-space-between catalog__toppanel">
				<b-col md="4" sm="12">
					<search-input
						v-model="searchString"
						placeholder="Искать в категории"
						@search="filterMerge({ findstr: searchString })"
					/>
				</b-col>
				<b-col md="2" sm="4" class="offset-md-2">
					<mc-cascader
						v-model="filterCategoryModel"
						:options="categories"
						:props="themesProps"
						placeholder="Темы курсов"
						:clearable="true"
					>
						<template v-slot:icon>
							<img width="24" height="24" src="/assets/media/allProd.svg" />
						</template>
					</mc-cascader>
				</b-col>
				<b-col md="2" sm="4">
					<mc-cascader
						v-model="filterTypeModel"
						:options="filterTypesSort"
						placeholder="По типу продукта"
						:clearable="true"
					>
						<template v-slot:icon>
							<img width="24" height="24" src="/assets/media/allCats.svg" />
						</template>
					</mc-cascader>
				</b-col>
				<b-col md="2" sm="4">
					<mc-cascader
						v-model="filterSortModel"
						:options="filterPopularSort"
						placeholder="По популярности"
						:clearable="true"
					>
						<template v-slot:icon>
							<img width="24" height="24" src="/assets/media/filters.svg" />
						</template>
					</mc-cascader>
				</b-col>
			</div>

			<div v-if="!products.length">Ничего не найдено!</div>
			<div class="card-deck" v-if="!loading">
				<template v-for="product of products">
					<CatalogItem
						class="card catalog__catalog-item" 
						:key="product.id"
						:product="product"
					/>
				</template>
				<div class="empty-item card"></div>
				<div class="empty-item card"></div>
				<div class="empty-item card"></div>
			</div>
			<loader v-else />
		</div>
		<div class="mc-pagination">
			<b-pagination
				v-model="filter.current_page"
				:total-rows="count"
				:per-page="filter.limit"
				align="center"
				page-class="page"
				prev-class="prev"
				next-class="next"
				first-number
				last-number
				prev-text="Предыдущая"
				next-text="Следующая"
				@change="filterMerge({
					current_page: $event,
					offset: ($event-1) * filter.limit
				})"
			/>
		</div>
	</div>
</template>

<script>
import SearchInput from '@/components/catalog/SearchInput';
import CategoryFilter from '@/components/catalog/CategoryFilter';
import CatalogItem from '@/components/catalog/CatalogItem';
import McCascader from '@/components/common/mc-cascader';
import { popularSort, typesSort } from '@/components/catalog/sort';
import loader from "@/components/loader";

export default {
	beforeRouteUpdate(to, from, next) {
		const { categoryId } = to.query;
		if (this.filter.categoryId == categoryId)
			return next();

		this.changeCategory([to.query.categoryId, null]);
	},

	components: {
		CatalogItem,
		SearchInput,
		CategoryFilter,
		McCascader,
		loader
	},

	data: function() {
		return {
			filter: {
				categoryId: null,
				subCategoryId: null,
				findstr: '',
				limit: 20,
				current_page: 1,
				sort: 'ball',
				direction: 'desc',
				type: null
			},
			searchString: '',
			count: 1,
			products: [],
			categories: [],
			loading: true,
			themesProps: {
				label: 'name',
				value: 'id',
				children: 'subCategories'
			},
			debounceId: null
		};
	},

	computed: {
		category() {
			let categoryName = '';
			this.categories.forEach(item => {
				item.subCategories.forEach(subcat => {
					if (subcat.id == this.filter.categoryId) {
						categoryName = subcat.name;
					}
				});
				if (item.id == this.filter.categoryId) {
					categoryName = item.name;
				}
			});

			return categoryName;
		},

		filterTypeModel: {
			get() {
				const { type } = this.filter;

				return type;
			},

			set(value) {
				const { filterMerge, CONST } = this;

				if (!value.length) {
					filterMerge({
						type: CONST.Entities.Course
					});

					return;
				}

				const [type] = value;

				filterMerge({
					type
				});
			}
		},

		filterCategoryModel: {
			get() {
				const { categoryId, subCategoryId } = this.filter;

				return [Number(categoryId), Number(subCategoryId)];
			},

			set(value) {
				const [categoryId, subCategoryId] = value;
				const { filterMerge } = this;

				filterMerge({
					categoryId,
					subCategoryId
				});
			}
		},

		filterSortModel: {
			get() {
				const { sort, direction } = this.filter;

				return [sort, direction];
			},

			set(value) {
				const [sort, direction] = value;
				const { filter, filterMerge } = this;

				if (filter.sort !== sort || filter.direction !== direction) {
					filterMerge({
						sort,
						direction
					});
				}
			}
		},

		filterTypesSort() {
			return typesSort;
		},

		filterPopularSort() {
			return popularSort;
		},

		filterDTO() {
			const { filter } = this;

			const filterDTO = Object.assign({}, filter);
			filterDTO.categoryId = filterDTO.subCategoryId || filter.categoryId;
			return filterDTO;
		}
	},

	watch: {
		filter: {
			handler: function(val, oldVal) {
				const self = this;

				clearTimeout(this.debounceId);
				this.debounceId = setTimeout(() => {
					self.fetchItems();

					self.searchString = val.findstr;
				}, 200);
			},
			deep: true
		}
	},

	mounted() {
		// Получаем кол-во страниц
		const { categoryId } = this.$route.query;

		// список категорий для каскадера
		this.$http.get('/api/categories').then(({ data }) => {
			this.categories = data.categories;
		});

		this.filterInitialize();
	},

	methods: {
		filterMerge(source) {
			Object.assign(this.filter, source);
		},

		filterInitialize() {
			const keys = Object.keys(this.$route.query);
			const {
				categoryId,
				subCategoryId,
				findstr,
				limit,
				current_page,
				sort,
				direction,
				type
			} = this.$route.query;
			const { Entities } = this.CONST;

			this.filterUpdate({
				categoryId,
				subCategoryId,
				findstr,
				limit: limit ?? this.filter.limit,
				current_page: current_page ?? this.filter.current_page,
				sort: ['ball', 'date', 'price'].includes(sort) ? sort : 'ball',
				direction: direction == 'asc' ? direction : 'desc',
				type: Number(type || Entities.Course)
			});
		},

		filterUpdate(source) {
			const { filter } = this;

			source.offset = (source.current_page - 1) * source.limit;
			this.filter = { ...filter, ...source };
		},

		fetchItems() {
			const query = Object.keys(this.filter)
				.reduce((acc, value) => {
					const filterValue = this.filter[value];
					if (
						(Number.isInteger(filterValue) && filterValue <= 0) ||
						!filterValue
					)
						return acc;

					acc.push(`${value}=${filterValue}`);
					return acc;
				}, [])
				.join('&');

			this.$router.push(`?${query}`);

			this.loading = true;

			this.$http
				.get('/api/catalog', {
					params: this.filterDTO
				})
				.then(({ data }) => {
					this.products = data.items;
					this.count = data.count;
				})
				.finally(() => (this.loading = false));
		},

		// при клике категории дочернего компонента CatalogItem
		changeCategory(categories) {
			const [categoryId, subCategoryId] = categories;

			this.filterUpdate({
				categoryId,
				subCategoryId,
				findstr: '',
				limit: 20,
				current_page: 1
			});
			window.scrollTo(0, 0);
		}
	}
};
</script>

<style lang="less">
.catalog {
	width: 100%;

	&__toppanel {
		display: flex;
		align-items: center;
		padding: 12px;
		background: #f2f2f2;
		margin-bottom: 40px;
	}

	&__catalog-item {
		margin-bottom: 24px !important;
	}
}
.card-actions {
	display: flex;
	justify-content: space-between;
}
.prPrice {
	background: #fff;
	> span {
		color: #000;
	}
}
.toppanel {
	margin-bottom: 40px;
	background: #f2f2f2;
}
.category-title {
	font-weight: bold;
	font-size: 40px;
	line-height: 47px;
	letter-spacing: 0.02em;
	color: @black;
	margin-bottom: 30px;
}
.empty-item {
	min-width: 290px;
	width: 600px;
	background: none;
	border: none !important;
	margin-bottom: 24px;
}
</style>