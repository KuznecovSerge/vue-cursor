<template>
    <b-container fluid>
        <b-row class="menu_first">
            <b-col
                    md="2 hover"
                    sm="4"
                    class="logo align-items-center"
                    @click="$router.push({ name: 'home'})"
            >
                <img max-height="40px" max-width="166px" contain src="/assets/media/logo1.png" alt="Kursor"/>
            </b-col>
            <b-col md="4" sm="8" class="align-items-center justify-content-center d-flex search flex-column">
                <search-input v-model="searchString" @search="handleSearchInput" :hasbutton="true" placeholder="Искать в каталоге"/>
                <dropdown :data="searchResult" :query="searchString" ref="searchDropdown" />
            </b-col>
            <b-col md="3" sm="6" class="align-items-center block_button justify-content-between" id="buttons_column">
                <b-badge
                        key="favoritesBadge"
                        color="#f58e15"
                        overlap
                        class="badge badge_violet col-sm-3"
                        :content="favoritesCount"
                        :value="favoritesCount > 0"
                >
                    <b-btn class="menu-item" text icon @click="$router.push('/favorites')">
                        <img size="25px" class="t-icon like" src="/assets/media/heart.svg"/>
                        <div class="title-icon">Избранное</div>
                    </b-btn>
                </b-badge>
                <b-badge
                        key="basketBadge"
                        color="#f58e15"
                        overlap
                        class="align-self-center badge badge-basket badge_gold col-sm-3"
                        :class="{'badge-basket__active': basketCount }"
                        :content="basketCount"
                        :value="basketCount > 0"
                >
                    <b-btn class="menu-item" text icon @click="$router.push('/cart')">
						<span class="basket-icon-wrapper">
							<simple-svg :src="`/assets/media/cart.svg`" class="badge__icon" width="24px" height="24px" />
							<span class="badge-counter basket-count" :class="{'basket-count--active': basketCount}">{{ basketCount }}</span>
						</span>

                        <!-- <img size="24px" class="t-icon" src="/assets/media/cart.svg" /> -->
                        <div class="title-icon">Корзина</div>
                    </b-btn>
                </b-badge>
                <b-badge
                        key="notificBadge"
                        color="#f58e15"
                        overlap
                        class="align-self-center badge badge_gold col-sm-1"
                        :content="notificBadge"
                        :value="notificBadge > 0"
                >
                    <b-btn class="menu-item" text icon @click="$router.push('/notifications')">
                        <img size="25px" class="t-icon" src="/assets/media/notifications.svg"/>
                    </b-btn>
                </b-badge>
            </b-col>
            <b-col md="3" sm="6" class="block_button align-items-center justify-content-end">
                <div v-if="!currentUser.id" class="d-flex">
                    <b-button
                            class="my-2 my-sm-0 login_button"
                            type="submit"
                            @click="window.location = '/catalog/'"
                    >
                        <span class="control__button">Войти</span>
                    </b-button>
                    <b-button
                            class="my-2 my-sm-0 target_button"
                            type="submit"
                            @click="window.location = '/signup'"
                    >
                        <div class="control__button1">Регистрация</div>
                    </b-button>
                </div>
                <div v-if="this.currentUser.id">
                    <b-dropdown variant="link" no-caret right menu-class="user-actions-dropdown">
                        <template v-slot:button-content>
                            <span class="text-dark font-weight-bold">{{ `${currentUser.firstName} ${currentUser.lastName}` }}</span>
                            <span class="ml-4"><b-img rounded="0" :src="currentUser.avatar" alt="avatar"
                                                      width="40"></b-img></span>
                        </template>

                        <b-dropdown-item to="/profile">
                            <simple-svg width="24px"
                                        height="24px"
                                        src="/assets/media/confederate-icon.svg"
                                        stroke-class-name="stroke"
                                        stroke="#C9C9C9"
                            />
                            <span class="text-dark ml-3">Кабинет ученика</span>
                        </b-dropdown-item>
                        <b-dropdown-item to="/profile/teacher">
                            <simple-svg width="24px"
                                        height="24px"
                                        src="/assets/media/user-caret-icon.svg"
                                        stroke-class-name="stroke"
                                        stroke="#C9C9C9"
                            />
                            <span class="text-dark ml-3">Кабинет автора</span>
                        </b-dropdown-item>
                        <b-dropdown-item :to="{ name: 'blogAuthor', params: { id: currentUser.id }}">
                            <simple-svg width="24px"
                                        height="24px"
                                        src="/assets/media/basket-icon.svg"
                                        stroke-class-name="stroke"
                                        stroke="#C9C9C9"
                            />
                            <span class="text-dark ml-3	">Мой блог</span>
                        </b-dropdown-item>
                        <b-dropdown-divider/>
                        <b-dropdown-item to="/profile/settings">
                            <simple-svg width="24px"
                                        height="24px"
                                        src="/assets/media/settings-icon.svg"
                                        stroke-class-name="stroke"
                                        stroke="#C9C9C9"
                            />
                            <span class="text-dark ml-3">Настройки</span>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <simple-svg width="24px"
                                        height="24px"
                                        src="/assets/media/headphones-icon.svg"
                                        stroke-class-name="stroke"
                                        stroke="#C9C9C9"
                            />
                            <span class="text-dark ml-3">Поддержка</span>
                        </b-dropdown-item>
                        <b-dropdown-item @click="handleLogout">
                            <simple-svg width="24px"
                                        height="24px"
                                        src="/assets/media/exit-icon.svg"
                                        stroke-class-name="stroke"
                                        stroke="#C9C9C9"
                            />
                            <span class="text-dark ml-3">Выход</span>
                        </b-dropdown-item>

                    </b-dropdown>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-button-toolbar class="v-menu-cls">
                <b-container fluid class="menu_last">
                    <b-icon-justify class="menuIcon"></b-icon-justify>
                    <el-cascader
                        popper-class="mc-cascader-dropdown"
                        class="dropdown_button d-flex justify-space-between"
                        :options="categories"
                        :props="props"
                        :show-all-levels="true"
                        expandTrigger="hover"
                        placeholder="Каталог курсов"
                        v-model="cascaderValue"
                        ref="catmenu"
                    >
                        <template slot-scope="{ node, data }">
                            <div @click.stop="toCategory(data.id)" class="w-100">{{ data.name }}</div>
                        </template>
                    </el-cascader>
                    <div class="stripes">
                        <img src="/assets/media/daws.png"/>
                    </div>

                    <ul class="d-flex justify-between">
                        <li>
                            <b-button class="menu-btn btn" @click="$router.push('/authors')">Авторы</b-button>
                        </li>
                        <li>
                            <b-button class="menu-btn btn" @click="$router.push('/journal')">Журнал</b-button>
                        </li>
                        <li>
                            <b-button class="menu-btn btn blog" @click="$router.push('/blog')">Блог</b-button>
                        </li>
                        <li>
                            <b-button class="menu-btn btn teaching">Преподавайте</b-button>
                        </li>
                    </ul>
                </b-container>
            </b-button-toolbar>
        </b-row>
        <b-row>
            <header-breadcrumbs/>
        </b-row>
    </b-container>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect';
import SearchInput from '@/components/catalog/SearchInput';
import Dropdown from '@/components/header/dropdown';
import { Cascader } from 'element-ui';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import headerBreadcrumbs from './header/breadcrumbs';

export default {
	name: 'Header',

	components: { Treeselect, SearchInput, Cascader, headerBreadcrumbs, Dropdown },

	data: function() {
		return {
			userTooltip: false,
			userMenu: false,
			searchString: '',
			filter: {
				count_goods: {
					select_count_goods: 20,
					options_count_goods: [
						{ value: 20, text: '20 товаров' },
						{ value: 40, text: '40 товаров' },
						{ value: 100, text: '100 товаров' }
					]
				},
				title: null,
				sort: {
					sortBy: 'ball',
					sortDesc: true,
					fields: [
						{ key: 'ball', sortable: true, label: 'Рейтинг' },
						{
							key: 'orders_paid',
							sortable: true,
							label: 'Продажи'
						},
						{ key: 'price', sortable: true, label: 'Цена' },
						{
							key: 'date_lessons',
							sortable: true,
							label: 'Начало курса'
						}
					]
				}
			},
			categories: [],
			props: {
				label: 'name',
				value: 'id',
				children: 'subCategories',
				expandTrigger: 'hover'
			},
			cascaderValue: 0,
			notificBadge: 0,
			searchResult: {},
		};
	},

	async created() {
		// Получаем список категорий
		this.$http.get('/api/categories').then(res => {
			const withoutCategory = [{ id: null, name: 'ВСЕ КУРСЫ' }];
			this.categories = [...withoutCategory, ...res.data.categories];
		});
	},

        computed: {
            messagesCount() {
                const notifies = this.$store.getters['sockets/notifies'];
                return notifies
                    ? notifies.filter(i => {
                        return !i.read;
                    }).length
                    : 0;
            },

            basketCount() {
                const products = this.$store.getters['basket/getProducts'];

                return products.length;
            },

            favoritesCount() {
                const favorites = this.$store.getters['favorite/getFavoriteProducts'];

                return favorites.length;
            }
        },

        methods: {
            handleLogout() {
                this.$auth.logout({
                    makeRequest: false,
                    data: {},
                    success: function () {
                        window.location = '/login';
                    },
                    error: function () {
                    },
                });
            },

            redirect() {
                window.location.href = 'https://monecle.com/';
            },

            handleSearchInput() {
                const { searchString } = this;

                if (searchString.length > 3) {
                    this.$http.get('/api/search', {params: {findstr: searchString}}).then(response => {
                        const { data } = response;

                        const {authors, products } = data;

                        this.searchResult = {
                            authors: authors.map(author => { return { id: author.id, label: `${author.firstName} ${author.lastName}`, image: author.avatar || null }}),
                            products: products.map(product => { return { id: product.id, label: product.title, image: product.image || null }})
                        };

                        this.$refs.searchDropdown.show();
                    })
                }
            },

			toCategory(categoryId) {
				// закрываем дропдаун по клику на слот
				this.$refs.catmenu.dropDownVisible = false;
				// сбрасываем выбранное значение, чтобы снова видеть слово "Каталог курсов"
				this.$nextTick(() => {this.cascaderValue = 0});
				// переходим в выбранную категорию каталога
				if (categoryId) {
					this.$router.push(`/catalog?categoryId=${categoryId}`);
				} else {
					this.$router.push(`/catalog`);
				}
			}
        },

        watch: {
            searchString(newVal, oldVal) {
                if (newVal.length > 3) {
                    this.handleSearchInput();
                }
            }
        }
    };
</script>

<style lang="less">
.menu-item:hover {
	.title-icon,
	.badge-counter,
	svg {
		color: #f58e15 !important;
		transition: 0.4s all;
	}
}

.badge-basket {
	.basket-icon-wrapper {
		position: relative;

		.basket-count {
			color: @gray-300;
			position: absolute;
			left: 9px;
			top: 9px;
			font-size: 10px;
			line-height: 12px;

			&.basket-count--active {
				color: @orange-100;
			}
		}
	}

	&.badge-basket__active svg {
		color: @orange-100;
	}

	svg {
		min-width: 24px;
		color: @gray-300;

		&:hover {
			color: @orange-100;
		}
	}
}
.user-actions-dropdown {
    padding-left: 0 !important;
    width: 280px;
    line-height: 24px;

    > li {
        padding: 5px 0;
    }
}
</style>

<style scoped>
.menu-btn {
	background: transparent;
	height: 48px;
	border: none;
	padding-right: 30px;
}
.menu_first {
	background: white;
	padding: 0;
}
.menu_first .container {
	height: 80px;
	padding: 0;
}
.logo {
	display: flex;
	color: #4f4367;
	cursor: pointer;
	padding-left: 0;
}
.stripes {
	display: flex;
	position: absolute;
	left: 21%;
}
.block_button {
	display: flex;
	padding-right: 0;
}
.target_button {
	position: relative;
	height: 40px;
	background-color: #f58e15;
	color: #fff;
	border: none;
	font-weight: 500;
	border-radius: 0px;
	padding: 10px;
}
.login_button {
	position: relative;
	height: 40px;
	background-color: transparent;
	color: #000;
	border: none;
	font-weight: 500;
	border-radius: 0px;
}
.badge button {
	height: 44px;
	width: 44px;
	background: transparent;
	border: none;
	font-weight: 500;
	display: flex;
}
.badge .count {
	margin-top: 8px;
}
.badge {
	padding-left: 0;
}
.menu_last {
	display: flex;
	height: 58px;
	padding: 0 10px 0 0;
	position: relative;
}
.menu_last .dropdown_button {
	background: linear-gradient(90deg, #f58e15 0%, #ffb800 99.88%);
	height: 100% !important;
	width: 285px;
	border-radius: 0;
	padding: 0 40px 0 20px !important;
	clip-path: polygon(0% 0%, 100% 0%, 92% 50%, 100% 100%, 0% 100%);
}
.dropdown_button span {
	font-size: 15px !important;
}
.dropdown_button .el-input__inner {
	background: none;
}
.menu_last ul {
	margin-left: auto;
	height: 58px;
	margin-bottom: 0;
	color: white;
	padding: 5px 0;
}
.menu_last ul li {
	list-style-position: inside;
	list-style-type: none;
}
.menu_last li button {
	color: white;
	font-size: 14px;
}
.v-menu-cls {
	height: 58px;
	max-height: 58px;
	width: 100%;
	background-color: #222c36;
}
.main-page-cls {
	cursor: pointer;
}
.header-actions {
	padding-left: 15px;
}
.catalog-extension {
	display: flex;
	align-items: center;
}
.catalog-title {
	text-transform: none;
	font-weight: normal;
}
.title-icon {
	margin-left: 12px;
	margin-top: 2px;
	text-transform: capitalize;
	font-size: 14px;
	color: #222222;
	transition: 0.4s all;
	display: flex;
	align-self: center;
}
.t-icon {
	transition: 0.4s all;
}
.menu-item:hover .title-icon {
	color: #f58e15;
	transition: 0.4s all;
}
.menu-item:hover .t-icon {
	stroke: #f58e15;
	transition: 0.4s all;
}
.control__button {
	font-size: 14px;
	color: #222222;
	font-weight: 500;
	border-radius: 0px;
}
.control__button1 {
	font-size: 14px;
	color: #fff;
	font-weight: 500;
	border-radius: 0px;
}
.badge {
	width: 100%;
	background: transparent !important;
}
.menu-btn.teaching {
	color: #f58e15 !important;
	transition: 0.4s all;
	padding-right: 10px;
	margin-right: 20px;
}
.menu-btn.teaching:hover {
	background-color: #f58e15;
	transition: 0.4s all;
	color: #fff !important;
}
.menu-btn.blog {
	padding-right: 55px;
}
/deep/.el-input__inner {
	background: none;
	border: none;
	color: #fff;
	height: 58px;
	padding-left: 40px;
	font-size: 18px;
}
/deep/.el-input__suffix {
	color: #fff;
	right: 18px;
}
/deep/.el-input__inner::placeholder {
	color: #fff;
}
/deep/.el-cascader-menu {
	font-weight: 500;
}
/deep/.el-cascader-menu:hover {
	color: #f58e15;
}
svg.bi-justify.menuIcon.b-icon.bi {
	width: 24px;
	height: 24px;
	color: #fff;
	position: absolute;
	z-index: 3;
	top: 17px;
	left: 20px;
}
.row.menu_first > div {
	padding-top: 10px;
	padding-bottom: 10px;
}

.search_input_container .search_button:not(:disabled):not(.disabled):active,
.search_button:not(:disabled):not(.disabled).active,
.show > .search_button.dropdown-toggle {
	color: #fff;
	background-color: transparent;
	border-color: transparent;
	box-shadow: unset;
}
.search_input_container .search_button:focus,
.search_button.focus {
	box-shadow: none;
}
</style>