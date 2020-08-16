<template>
    <div class="teacher-products">
        <div class="teacher-products__filter p-3 mb-5">
            <span class="teacher-products__myproduct">{{isManager ? 'Продукты' : 'Мои продукты'}} ({{productsCount}})</span>
            <div class="teacher-products__find">
                <b-form-input
                    v-model="search"
                    debounce="500"
                    class="border-0"
                    placeholder="Искать в списке"
                />
                <div class="teacher-products__find-magnifier">
                    <img src="/assets/media/find.svg" />
                </div>
            </div>
            <mc-cascader
                class="teacher-products__sort"
                v-model="filterSortModel"
                :options="filterMyproductSort"
                placeholder="По дате создания"
                :clearable="true"
            >
                <template v-slot:icon>
                    <img width="24" height="24" src="/assets/media/filters.svg" />
                </template>
            </mc-cascader>
            <div 
                class="teacher-products__selectview"
                @click="view='list'"
            >
                <simple-svg 
                    src="/assets/media/list.svg"
                    stroke-class-name="stroke"
                    :stroke="view == 'list' ? '#F58E15' : '#999999'"
                />
            </div>
            <div 
                class="teacher-products__selectview"
                @click="view='card'"
            >
                <simple-svg 
                    src="/assets/media/card.svg"
                    stroke-class-name="stroke"
                    :stroke="view == 'card' ? '#F58E15' : '#999999'"
                />
            </div>
        </div>
        <div v-if="view == 'card'" class="card-deck">
            <template v-for="item of products">
                <ProductHorizontal
                    class="card border-white mb-5 align-items-end" 
                    :editable="true"
                    :product=item
                    :key="item.id"
                    @change="refreshProduct"
                />
            </template>
        </div>
        <div v-else class="">
            <template v-for="item of products">
                <ProductListItem
                    class=""
                    :product=item
                    :key="item.id"
                    @change="refreshProduct"
                />
            </template>
        </div>
        <div 
            class="mc-btn-white l w-100 my-3 text-uppercase"
            v-if="beNextPage"
            @click="loadNextProducts"
            >Показать ещё
        </div>
    </div>
</template>

<script>
import ProductHorizontal from '@/components/products/ProductHorizontal';
import ProductListItem from '@/components/products/ProductListItem';
import McCascader from '@/components/common/mc-cascader';
import { myproductSort } from "@/components/profile/sort";
export default {
	name: 'TeacherProducts',

	components: {
        ProductHorizontal,
        ProductListItem,
        McCascader
    },
    
    data() {
        const { currentUser } = this.$root;
        return {
            products: [],
            productsCount: 0,
            filter: {
				limit: 4,
				totalPages: 1,
				current_page: 1,
                title: '',
                authorId: currentUser.id,
                sort: 'date',
                direction: 'desc',
                append: false
            },
            loading: true,
            search: '',
            view: 'list',
        }
    },

    computed: {
        isManager() {
            return this.currentUser.role=='manager';
        },
        beNextPage() {
            return this.productsCount && (this.filter.current_page < this.filter.totalPages);
        },
        filterMyproductSort() {
			return myproductSort;
        },
        filterSortModel: {
			get() {
				const { sort, direction } = this.filter;

				return [sort, direction];
			},

			set(value) {
				const [sort, direction] = value;
				const { filter } = this;

				if (filter.sort !== sort || filter.direction !== direction) {
					Object.assign(filter, {
						sort,
						direction
                    });
				}
			}
		},
    },

    watch: {
		filter: {
			handler: function(val, oldVal) {
				this.fetchItems(val.append);
			},
			deep: true
        },
        search: function (newValue, oldValue) {
            this.searchByTitle(newValue);
        }
	},

    async created() {
        // список продуктов (с пагинацией)
        if (this.isManager) {
            this.filter.authorId = null;
        }
        this.fetchItems();
    },

    mounted() {
        
    },

    methods: {
        onChangePage(page) {
			Object.assign(this.filter, {
				current_page: page,
                offset: (page-1) * this.filter.limit,
                append: false
			});
        },

        async searchByTitle(value) {
			Object.assign(this.filter, {
                title: value,
                current_page: 1,
                append: false
			});
        },
        
        loadNextProducts() {
            const page = this.filter.current_page + 1;
            Object.assign(this.filter, {
				current_page: page,
                offset: (page-1) * this.filter.limit,
                append: true
			});
        },

        updateFilter(source) {
			const {
				limit,
				totalPages,
				current_page,
                title,
                authorId,
                append
			} = source;
			const offset = (current_page-1) * limit;

			this.filter = {
				limit: Number(limit),
				totalPages: Number(totalPages),
				current_page: Number(current_page),
				title: title,
                offset: Number(offset),
                authorId: Number(authorId),
                append: append
			};
        },
                
        async fetchItems(append) {
			this.loading = true;

			const { data } = await this.$http.get('/api/catalog', {
				params: this.filter
			});

			if (data.items) {
				if (append) {
                    this.products.push(...data.items);
                } else {
                    this.products = data.items;
                }
            }
            // количество продуктов и страниц
            this.filter.totalPages = Math.ceil(data.count / this.filter.limit);
            this.productsCount = data.count;

			this.loading = false;
        },
        
        refreshProduct(product) {
            const index = this.products.findIndex(p => p.id === product.id);
            if (index != -1) {
                this.products.splice(index, 1, product);
            }
        }
    }
};
</script>

<style lang="less">
.teacher-products {
    &__filter {
        background-color: #F2F2F2;
        display: flex;
        align-items: center;
    }
    &__myproduct {
        font-weight: bold;
        font-size: 24px;
        min-width: 235px;
        margin-right: 40px;
    }
    &__find {
        position: relative;
        border: 1px solid @gray-200;
        border-radius: 0px;
        margin-right: 16px;
        width: 100%;
        min-width: 180px;
    }
    &__find input {
        padding-left: 50px;
        height: 38px;
    }
    &__find-magnifier {
        position: absolute;
        left: 15px;
        top: 10px;
    }
    &__sort{
        margin-left: auto;
        min-width: 200px;
    }
    &__selectview {
        width: 40px;
        height: 40px;
        min-width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid @gray-200;
        background-color: @white;
        cursor: pointer;
        margin-left: 16px;
    }

}


</style>