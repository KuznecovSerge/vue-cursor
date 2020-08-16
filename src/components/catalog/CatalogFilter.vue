<template>
    <div id="filters">
        <b-navbar toggleable="lg" type="primary" variant="info">

            <b-collapse id="nav-collapse" is-nav>

                <!-- фильтр поиск по названию -->
                <b-navbar-nav class="ml-auto">
                    <!-- фильтр кол-во товаров на стр -->
                    <b-form-group>
                        <b-form-select
                          @change="search"
                          v-model="filter.count_goods.select_count_goods"
                          :options="filter.count_goods.options_count_goods"></b-form-select>
                    </b-form-group>

                    <!-- таблица сортировки -->
                    <b-form-group>
                        <b-table
                          :fields="filter.sort.fields"
                          :sort-by.sync="filter.sort.sortBy"
                          :sort-desc.sync="filter.sort.sortDesc"
                          responsive="sm"
                          @sort-changed="search"
                        ></b-table>
                    </b-form-group>
                </b-navbar-nav>

            </b-collapse>

        </b-navbar>
    </div>
</template>

<script>
    import Treeselect from '@riophae/vue-treeselect'
    // import the styles
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'

    export default {
        name: "CatalogFilter",

        components: { Treeselect },

        data: function () {
            return {
                filter: {
                    count_goods: {
                        select_count_goods: 20,
                        options_count_goods: [
                            { value: 20, text: '20 товаров' },
                            { value: 40, text: '40 товаров' },
                            { value: 100, text: '100 товаров' },
                        ]
                    },
                    category: null,
                    title: '',
                    sort: {
                        sortBy: 'ball',
                        sortDesc: true,
                        fields: [
                            { key: 'ball', sortable: true, label: "Рейтинг" },
                            { key: 'orders_paid', sortable: true, label: "Продажи" },
                            { key: 'price', sortable: true, label: "Цена" },
                            { key: 'date_lessons', sortable: true, label: "Начало курса" },
                        ],
                    }
                },
                categories: [
                ],
            }
        },

        methods: {
            search () {
                // не успевает обновить данные в this.filter при смене сортировки
                setTimeout(() => {
                      const f = Object.assign({}, this.filter);
                      this.$emit('search_api', f);
                  }
                  , 100);
            }
        }

    }
</script>

<style scoped>
    /*#filters {*/
    /*    width: 100%;*/
    /*    z-index: 9999;*/
    /*    position: fixed;*/
    /*}*/
</style>