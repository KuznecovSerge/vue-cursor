<template>
    <div>
        <CatalogFilter @search_api="sendFiltersAPI($event)"></CatalogFilter>

        <div class="main-content" v-if="catalogs.length > 0 && !loading">
            <div>
                <p>
                    Кол-во товаров: {{ this.filter.totalRows }}
                </p>
            </div>

            <b-card-group deck>
                <div style="width: 15rem;" v-for="catalog in catalogs" v-bind:key="catalog.id">
                    <b-card
                      :title="catalog.title"
                      :img-src="catalog.img"
                      img-alt="Image"
                      img-top
                      tag="article"
                      class="mb-2"
                      :id="`card-popover-${catalog.good_id}`"
                    >
                        <b-popover
                          :target="`card-popover-${catalog.good_id}`"
                          placement="right"
                          title=""
                          triggers="hover focus"
                        >
                        </b-popover>

                        <b-card-text
                          v-html="catalog.description.substring(0, 100)"
                        ></b-card-text>
                        <b-button @click="setStatusDel(catalog.good_id)" type="submit" variant="success">Восстановить</b-button>
                    </b-card>
                </div>
            </b-card-group>
        </div>

        <div class="errorMsg text-center main-content"  v-else-if="errorMsg !== ''">
            {{ errorMsg }}
        </div>

        <div v-else class="text-center main-content">
            <b-spinner variant="success" label="Spinning"></b-spinner>
        </div>

    </div>
</template>

<script>
    import CatalogFilter from '../components/catalog/CatalogFilter';
    import loadImage from 'image-promise';

    export default {
        name: "DeletedGoods",

        components: { CatalogFilter },

        data: function () {
            return {
                filter: {
                    title: '',
                    category: '',
                    sort: {
                        sortBy: '',
                        sortDesc: false
                    },
                    perPage: 30,
                    totalPages: 1,
                    totalRows: 0,
                    current_page: 1
                },
                catalogs: {},
                errors: {},
                errorMsg: '',
                loading: true
            }
        },

        beforeCreate() {
            // Кол-во стр
            this.$http
            .get('/api/catalog/all?', {
                params: {
                    count_page: 1,
                    del_curses: 1
                }
            })
            .then(res => {
                this.filter.totalRows = res.data.items[0].count;
                this.filter.totalPages = Math.ceil(this.filter.totalRows / this.filter.perPage);
            })
            .catch(err => {
                console.log(err);
                if (err.response.status === 400) {
                    this.$swal('Ошибка', undefined, 'error');
                }
            });
        },

        mounted() {
            this.$http
            .get('/api/catalog/all', {
                params: {
                    limit_count: this.filter.perPage,
                    del_curses: 1
                }
            })
            .then(res => {
                this.loading = false;
                this.catalogs = res.data.items;

                this.catalogs.map(async (catalog) => {
                    if (catalog.new_img !== null) {
                        catalog.img = await this.checkUploadImg(catalog.new_img);
                    } else {
                        catalog.img = await this.checkUploadImg(catalog.img);
                    }

                    return catalog;
                });
            })
            .catch(err => {
                console.log(err);
                if (err.response.status === 400) {
                    this.$swal('Ошибка', undefined, 'error');
                }
            });
        },

        methods: {
            async checkUploadImg (srcImg) {
                try {
                    const img = await loadImage(`https://monecle.com/upload/images/goods/100/${srcImg}`);
                    return img.src;
                } catch (err) {
                    console.log(err);
                    return err.src = this.$config.staticUrl + '/public/upload/images/goods/100/' + srcImg;
                }
            },

            current_page_get_param () {
                this.errorMsg = '';

                this.filter.current_page = this.$route.query.page;

                this.loading = true;

                this.$http
                .get('/api/catalog/all?', {
                    params: {
                        search_title: this.filter.title,
                        thematic: this.filter.category,
                        sort: this.filter.sort.sortBy,
                        current_page: this.filter.current_page,
                        limit_count: this.filter.perPage,
                        sortDesc: this.filter.sort.sortDesc
                    }
                })
                .then(res => {
                    this.loading = false;

                    if (res.data.items.length === 0) {
                        this.errorMsg = 'По вашему запросу ничего не найдено!';
                    }

                    this.catalogs = res.data.items;
                    this.catalogs.map(async (catalog) => {
                        if (catalog.new_img !== null) {
                            catalog.img = await this.checkUploadImg(catalog.new_img);
                        } else {
                            catalog.img = await this.checkUploadImg(catalog.img);
                        }

                        return catalog;
                    });
                })
                .catch(err => {
                    console.log(err);
                    if (err.response.status === 400) {
                        this.$swal('Ошибка', undefined, 'error');
                    }
                });
            },

            setStatusDel(id) {
                this.$http
                .post('/api/catalog/set-status-del/' + id, {
                    del: 0
                })
                .then(() => {
                })
                .catch(err => {
                    console.log(err);
                    if (err.response.status === 400) {
                        this.$swal('Ошибка', undefined, 'error');
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>