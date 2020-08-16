<template>
    <div>
        <div v-if="goods.length > 0">

            <div class="row mb-5 ml-3 mr-3" v-for="(good, index) in goods">
                <b-card class="col" :header="good.title">
                    <div>
                        <div class="mb-2">
                            <b>Картинка:</b>
                            <img :src="good.img" alt="">
                        </div>
                        <div class="mb-2">
                            <b>Описание:</b>
                            <b-card-text
                                    v-html="good.description"
                            >
                            </b-card-text>
                        </div>

                        <div class="mb-2">
                            <b>Рейтинг:</b>
                            <span v-for="ball in Math.round(good.ball)">
                    <i class="text-warning fa fa-star"></i>
                    </span>
                            <div class="clearfix"></div>
                        </div>

                        <div class="mb-2">
                            <b>Автор: </b> <a href="#">{{ good.name }} {{ good.fename }}</a>
                        </div>

                        <div class="mb-2">
                            <b>Категория: </b> {{ good.categoryName }}
                        </div>

                        <div class="mb-2">
                            <b>Стоимость: </b> {{ good.price }}
                        </div>
                    </div>

                    <b-form class="ml-3" :id="good.good_id" :key="good.good_id"
                            @submit.prevent="saveChangeGoods($event, index)">
                        <b-form-group
                                :label-for="`photo-group-${good.good_id}`"
                                label="Картинка:"
                        >
                            <b-form-file
                                    accept="image/*"
                                    :name="`photo-group-${good.good_id}`"
                                    :id="`photo-group-${good.good_id}`"
                                    placeholder="Выберите файл"
                                    drop-placeholder="Drop file here..."
                            ></b-form-file>
                        </b-form-group>

                        <b-form-group
                                label="Категория:"
                                :label-for="`category-group-id-${good.good_id}`">
                            <treeselect
                                    :max-height="200"
                                    v-model="good.newCategory"
                                    :options="categories"
                            />
                        </b-form-group>
                        <b-button type="submit" variant="primary">Сохранить</b-button>
                    </b-form>
                    <b-button @click="setStatusDel(good.good_id, index)" type="submit" variant="danger">Удалить</b-button>
                </b-card>
            </div>
        </div>
        <div v-else-if="preload">
            <b-spinner variant="success" label="Spinning"></b-spinner>
        </div>
        <b-button @click="show_goods" type="submit" variant="primary">Показать еще товары</b-button>
    </div>
</template>

<script>
    import Treeselect from '@riophae/vue-treeselect'
    // import the styles
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'

    import loadImage from 'image-promise';

    export default {
        name: "EditGoods",

        components: { Treeselect},

        data () {
          return {
              preload: true,
              goods: {},
              categories: [
                  { value: null, text: 'Выберите категорию' }
              ],
          }
        },

        beforeCreate() {
            // Получаем продукты
            this.$http
            .get('/api/catalog/all', {
                params: {
                    edit: 1
                }
            })
            .then(res => {
                this.preload = false;

                this.goods = res.data.items;

                this.goods = Object.assign(this.goods, ...res.data.items);

                this.goods.map(async (good) => {
                    if (good.new_img !== null && good.new_img !== '') {
                        good.img = await this.checkUploadImg(good.new_img);
                    } else {
                        good.img = await this.checkUploadImg(good.img);
                    }

                    return good;
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

            saveChangeGoods (evt, index) {
                let formData = new FormData();

                formData.append('file', evt.target[0].files[0]);
                formData.append('subcategory', this.goods[index].newCategory);

                this.$http
                .put(
                  `/api/catalog/update_goods/${evt.target.id}`,
                  formData,
                  {
                      headers: {
                          'Content-Type': 'multipart/form-data'
                      }
                  }
                )
                .then(res => {
                    this.goods.splice(index,1)
                })
                .catch(err => {
                    console.log(err);
                });
            },

            show_goods() {
                this.preload = true;
                this.$http
                .get('/api/catalog/all')
                .then(res => {
                    this.preload = false;
                    this.goods = Object.assign(this.goods, ...res.data.items);
                    this.goods.map(async (good) => {
                        if (good.new_img !== null) {
                            good.img = await this.checkUploadImg(good.new_img);
                        } else {
                            good.img = await this.checkUploadImg(good.img);
                        }

                        return good;
                    });
                })
                .catch(err => {
                    console.log(err);
                    if (err.response.status === 400) {
                        this.$swal('Ошибка', undefined, 'error');
                    }
                });
            },

            setStatusDel(id, index) {
                this.$http
                .post('/api/catalog/set-status-del/' + id, {
                    del: 1
                })
                .then(() => {
                    this.goods.splice(index,1)
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