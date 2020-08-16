<template>
    <div v-if="data.authors && data.authors.length > 0  || data.products && data.products.length > 0"
         class="search-dropdown" ref="dropdown" :class="{ 'show': open }">
        <div class="search-dropdown__group" v-if="data.authors && data.authors.length > 0">
            <h4 class="search-dropdown__group-title">Авторы</h4>
            <div class="search-items" v-for="item in data.authors" @click="open = false">
                <b-avatar :src="item.image && item.image" size="32" class="mr-3"/>
                <router-link :to="{ name: 'author', params: { id: item.id }}" class="search-item__label">{{ item.label
                    }}
                </router-link>
            </div>
            <router-link :to="{ name: 'authors', query: { findstr: this.query }}" @click.native="open = false" class="search-dropdown__get-more">
                Показать еще...
            </router-link>
        </div>
        <div class="search-dropdown__divider" v-if="data.authors && data.authors.length > 0"></div>
        <div class="search-dropdown__group" v-if="data.products && data.products.length > 0">
            <h4 class="search-dropdown__group-title">Продукты</h4>
            <div class="search-items" v-for="item in data.products" @click="open = false">
                <b-img :src="item.image && item.image" width="32" class="mr-3"/>
                <router-link :to="{ name: 'Product', params: { id: item.id }}" class="search-item__label">{{ item.label
                    }}
                </router-link>
            </div>
            <router-link :to="{ name: 'catalog', query: { findstr: this.query }}" @click.native="open = false" class="search-dropdown__get-more">
                Показать еще...
            </router-link>
        </div>
        <router-link class="search-dropdown__get-all" to="/catalog" @click="open = false"><span>Показать все результаты</span></router-link>
    </div>
    <div v-else class="search-dropdown pb-5" ref="dropdown" :class="{ 'show': open }">
        <h5 class="text-center">Ничего не найдено</h5>
    </div>
</template>

<script>
    export default {
        name: "Dropdown",
        props: {
            data: Object,
            default() {
                return {}
            },
            query: '',
        },
        watch: {
            query: function (value) {
                if (value.length < 4) {
                    this.open = false;
                }
            }
        },
        created() {
            window.addEventListener('click', this.close)
        },

        beforeDestroy() {
            window.removeEventListener('click', this.close)
        },

        methods: {
            toggle() {
                this.open = !this.open
            },

            close(e) {
                if (!e.target.classList.contains("search_input") && !this.$refs.dropdown.contains(e.target)) {
                    this.open = false
                }
            },

            show() {
                this.open = true
            }
        },
        data() {
            return {
                open: false
            }
        }
    }
</script>

<style lang="less">
    .search-dropdown {
        z-index: 10;
        position: absolute;
        width: calc(100% - 25px);
        top: calc(100% - 25px);
        padding: 25px 25px 0 25px;
        background: white;
        border: 1px solid @gray-200;
        box-sizing: border-box;
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
        display: none;

        &.show {
            display: block;
        }

        &__group {
            padding-top: 20px;
            padding-bottom: 20px;

            &:first-of-type {
                padding-top: 0;
            }
        }

        &__group-title {
            font-size: 14px;
            color: @gray-300;
            font-style: normal;
            font-weight: normal;
            text-transform: uppercase;
        }

        &__get-more {
            color: @gray-300 !important;
            text-decoration: underline;
        }

        &__divider {
            border-bottom: 1px solid @border-color;
            margin: 0 -25px;
        }

        &__get-all {
            background: @mainBGColor;
            border-top: 1px solid @gray-200;
            box-sizing: border-box;

            display: flex;
            justify-content: center;
            align-items: center;

            text-align: center;
            text-decoration: none;
            text-transform: uppercase;

            height: 50px;
            margin: 0 -25px;

            span {
                color: @black !important;
            }
        }
    }

    .search-items {
        margin: 15px 0;
        display: flex;
        align-items: center;
    }

    .search-item {
        &__label {
            overflow-x: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            letter-spacing: 0.02em;
            color: @black !important;
        }
    }
</style>