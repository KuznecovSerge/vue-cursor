<template>
	<div class="authors-page">
		<div class="row">
			<div class="col p-0 d-flex flex-wrap-reverse align-items-center">
				<div class="col-6 mr-auto pl-0 h1">{{this.selectedCategoryName}}</div>
				<div class="col-3 p-2">
					<div class="authors-find">
						<b-form-input
							v-model="search"
							debounce=500
							class="border-0"
							placeholder="Введите имя автора"
						/>
						<div class="authors-find-magnifier">
							<img src="/assets/media/find.svg"/>
						</div>
                    </div>
				</div>
				<div class="col-3 p-2 pr-0">
					<el-cascader
						class="authors-sort w-100"
						popper-class="authors-sort-dropdown"
						:options="sorting"
						:show-all-levels="true"
						placeholder="По кол-ву продуктов"
						@change="changeSort"
					/>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="p-0">
				<el-cascader
					class="authors-catmenu"
					popper-class="mc-cascader-dropdown"
					placeholder="Категории"
				 	:options="categories"
					:props="props"
					v-model="cascaderValue"
					@change="changeCategory"
					ref="catmenu"
				>
					<template slot-scope="{ node, data }">
						<div 
							@click="changeCategory([data.id, data.id])"
							class="w-100"
						>{{ data.name }}</div>
					</template>
				</el-cascader>
			</div>
			<div class="col p-0"><hr/></div>
		</div>
		<div 
			v-if="selectedCategoryIndex >= 0"
			class="row pb-5 d-flex"
		>
			<div 
				v-for="item in categories[selectedCategoryIndex].subCategories"
				:key="item.id"
				:class="{'authors-subcategory': true, 'activ': selectedSubcategories.includes(item.id) }"
				@click="changeSubcategory(item.id)"
			>{{item.name}}
			</div>
		</div>
		<div class="row">
			<div class="card-deck" v-if="!loading">
				<template v-for="item of authors">
					<AuthorItem
						class="card authors-page__author-item" 
						:key="item.id"
						:author="item"
					/>
				</template>
				<div class="empty-1 card"></div>
				<div class="empty-2 card"></div>
				<div class="empty-3 card"></div>
			</div>
			<loader v-else />
		</div>
		<div class="mc-pagination row justify-content-center">
			<b-pagination
				v-model="filter.current_page"
				:total-rows="authorsCount"
				:per-page="filter.limit"
				align="center"
				page-class="page"
				prev-class="prev"
				next-class="next"
				first-number
				last-number
				prev-text="Предыдущая"
				next-text="Следующая"
				@change="changePage"
			></b-pagination>
		</div>
	</div>
</template>

<script>
import AuthorItem from '@/components/author/AuthorItem.vue';
import loader from "@/components/loader";

export default {
	name: 'Authors',

	props: ["query"],

	components: {
		AuthorItem,
		loader
	},

	data: function() {
		return {
			filter: {
				categoryId: '',
				limit: 20,
				totalPages: 1,
				current_page: 1,
				sort: 'product',
				direction: 'desc'
			},
			authors: [],
			authorsCount: 0,
			categories: [],
			sorting: [{
				label: 'По объёмам продаж',
				value: 'sale',
				children: [{
					label: 'популярные',
					value: 'desc'
				},{
					label: 'не популярные',
					value: 'asc'
				}]
			},{
				label: 'По просмотрам',
				value: 'seen',
				children: [{
					label: 'больше',
					value: 'desc'
				},{
					label: 'меньше',
					value: 'asc'
				}]
				
			},{
				label: 'По кол-ву продуктов',
				value: 'product',
				children: [{
					label: 'больше',
					value: 'desc'
				},{
					label: 'меньше',
					value: 'asc'
				}]
				
			},{
				label: 'По дате регистрации',
				value: 'date',
				children: [{
					label: 'новые',
					value: 'desc'
				},{
					label: 'старые',
					value: 'asc'
				}]
				
			}],
			search: '',
			selectedCategoryIndex: -1,
			loading: true,
			cascaderValue: 0,
			props: { 
				label: 'name',
				value: 'id',
				children: 'subCategories',
				expandTrigger: 'hover'
			}
		};
	},

	computed: {
		selectedSubcategories() {
			return (this.filter.categoryId) ? this.filter.categoryId.split(",").map(el => Number(el)) : []; 
		},
		selectedCategoryName() {
			return (this.selectedCategoryIndex >= 0) ? this.categories[this.selectedCategoryIndex].name : 'Все авторы Kursor';
		}
	},

	watch: {
		filter: {
			handler: function(val, oldVal) {
				this.updateUrl();
				this.fetchItems();
			},
			deep: true
		},
		query: {
			handler: async function(val, oldVal) {
				// отслеживаем изменения в query параметрах из роута
				const { categoryId, findstr, offset } = val;
				if (this.filter.categoryId != categoryId && this.filter.findstr != findstr) {
					if ( val && Object.keys(val).length !=0 ) {
						this.selectedCategoryIndex = -1;
					}
					Object.assign(this.filter, {
						findstr: findstr ?? '',
						categoryId: categoryId ?? '',
						offset: offset ?? 0,
						pagesCount: await this.updatePagesCount(categoryId ? categoryId : '', findstr ? findstr: '')
					});
					// основная категория
					this.categories.forEach((c,index) => {
						if (c.subCategories.findIndex(s => s.id == categoryId) >= 0) {
							this.selectedCategoryIndex = index
						}
					});
				}
			},
			deep: true
		},
		search: function (newValue, oldValue) {
            this.searchByTitle(newValue);
        }
	},

	async created() {
		const { categoryId, findstr } = this.$route.query;
		this.filter.totalPages = await this.updatePagesCount(categoryId, findstr);

		// получаем категории
		this.$http
			.get(`/api/categories`)
			.then(({data}) => {
				this.categories = data.categories;
			});

	},
	mounted() {
		const {
			categoryId,
			findstr,
			limit,
			totalPages,
			current_page,
			sort,
			direction
		} = this.$route.query;
		this.updateFilter({
			categoryId: categoryId ? categoryId : '',
			findstr: findstr ? findstr : '',
			limit: limit ? limit : this.filter.limit,
			totalPages: totalPages ? totalPages : this.filter.totalPages,
			current_page: current_page
				? current_page
				: this.filter.current_page,
			sort: (['date','product'].includes(sort))
				? sort
				: 'product',
			direction: (direction == 'asc') ? direction : 'desc' 
		});

	},

	methods: {
		changePage(page) {
			Object.assign(this.filter, {
				current_page: page,
				offset: (page-1) * this.filter.limit
			});
			window.scrollTo(0, 200);
		},
		changeSort(sorting){
			const [sort, direction] = sorting;
			Object.assign(this.filter, {
				sort,
				direction,
				current_page: 1,
				offset: 0,
			});
		},
		async changeCategory(select) {
			this.$refs.catmenu.dropDownVisible = false;	// закрываем дропдаун по клику на слот
			const [catId, subcatId] = select; 
			this.$nextTick(() => {this.cascaderValue = 0});
			this.selectedCategoryIndex = this.categories.findIndex(elem => elem.id == catId);
			this.changeSubcategory(subcatId);	
		},
		async changeSubcategory(subcatId) {
			Object.assign(this.filter, {
				categoryId: String(subcatId),
				current_page: 1,
				offset: 0,
				totalPages: await this.updatePagesCount(subcatId, this.filter.findstr)
			});
		},
		async searchByTitle(value) {
			const pagesCount = await this.updatePagesCount(this.filter.categoryId, value);
			Object.assign(this.filter, {
                findstr: value,
				current_page: 1,
				offset: 0,
                totalPages: pagesCount
			});
        },

		updateFilter(source) {
			const {
				categoryId,
				limit,
				totalPages,
				current_page,
				findstr,
				sort,
				direction
			} = source;
			const offset = (current_page-1) * limit;

			this.filter = {
				categoryId: categoryId,
				limit: Number(limit),
				totalPages: Number(totalPages),
				current_page: Number(current_page),
				findstr: findstr,
				offset: Number(offset),
				sort: sort,
				direction: direction
			};
		},

		updateUrl() {
			let query = Object.keys(this.filter)
				.reduce((acc, value) => {
					const filterValue = this.filter[value];
					if (Number.isInteger(filterValue) && filterValue <= 0) {
						return acc;
					}
					if (!filterValue) {
						return acc;
					}
					acc.push(`${value}=${filterValue}`);
					return acc;
				}, [])
				.join('&');

			this.$router.push(`?${query}`);
		},

		async updatePagesCount(categoryId, findstr) {
			const res = await this.$http.get('/api/users/authors', {
				params: {
					countOnly: true,
					categoryId: categoryId,
					findstr: findstr
				}
			});

			this.authorsCount = res.data.items.count;
			return Math.ceil(res.data.items.count / this.filter.limit);;
		},

		async fetchItems() {
			this.loading = true;

			const {data} = await this.$http.get('/api/users/authors', {
				params: this.filter
			});
			if (data.items) {
				this.authors = data.items;
			}
			this.loading = false;
		},
		
	}
};
</script>

<style lang="less">
.authors-page {
	&__author-item {
		margin: 24px 15px;
	}
}
.authors-catmenu {
	width: 130px;
}
.authors-catmenu .el-input__suffix {
	left: 0px;
	top: 6px;
    text-align: left;
}
.authors-catmenu .el-input .el-input__inner {
	padding-left: 30px;
	padding-right: 0px;
	border: 0px;
}
.authors-catmenu .el-input .el-input__inner::placeholder {
	color: #222222;
	font-weight: bold;
	font-size: 18px;
}
.authors-catmenu:hover .el-input .el-input__inner::placeholder {
	color: #F58E15;
}
.authors-catmenu .el-input .el-input__inner:focus::placeholder {
	color: #F58E15;
}
.authors-catmenu .el-icon-arrow-down:before {
	content: url('/assets/media/hamburger.svg');
}
.authors-catmenu:hover .el-icon-arrow-down:before {
	content: url('/assets/media/hamburger_active.svg');
}
.authors-catmenu .el-input__inner:focus + .el-input__suffix .el-icon-arrow-down:before {
	content: url('/assets/media/hamburger_active.svg');
}  
.h1 {
	font-size: 40px;
}
.authors-catmenu .is-reverse {
	transform: rotateZ(0deg) !important;
}
.authors-find {
	position: relative;
	border: 1px solid #C9C9C9;
	border-radius: 0px;
}
.authors-find input {
	padding-left: 40px;
}
.authors-find-magnifier {
	position: absolute;
	left: 15px;
    top: 8px;
}
.authors-sort input {
	border: 1px solid #C9C9C9;
	border-radius: 0px;
}
.authors-sort-dropdown .el-cascader-menu__wrap {
	height: 165px;
}
.authors-subcategory {
	background-color: #F1F1F1;
	padding: 6px 12px;
	margin-right: 16px;
	margin-bottom: 16px;
	cursor: pointer;
}
.authors-subcategory.activ {
	background-color: #F58E15;
	color: #fff;
}
/* вёрстка на флексах - для эффекта грида на колонках */
.empty-1, .empty-2, .empty-3 {
	min-width: 290px;
	width: 600px;
	background: none;
	border: none;
	margin-bottom: 24px;
}
</style>