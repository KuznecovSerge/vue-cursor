<template>
    <div>
        <notifications group="notification-new-good"
                       position="bottom right">
        <template slot="body" slot-scope="props">
            <div>
                <router-link class="nav-link" :to="`/catalog/${props.item.data.idProduct}`" target="_blank">{{ props.item.title }} {{ props.item.data.idProduct }}</router-link>
<!--                <a :href="`/catalog/${props.item.data.idProduct}`" class="title">-->
<!--                    {{ props.item.title }} {{ props.item.data.idProduct }}-->
<!--                </a>-->
                <a class="close" @click="props.close">
                    <font-awesome-icon icon="close" />
                </a>
            </div>
        </template>
        </notifications>
    </div>
</template>

<script>
    export default {
        name: "NotificationNewGoods",

        data: function () {
            return {
                newGoods: {},
            }
        } ,

        async created() {
            // получаем новые товары и записываем в бд
            await this.$http
            .get('/api/author/get-new-goods/' + this.currentUser.id)
            .then()
            .catch(error => {
                console.log(error);
            });

            // получаем не прочитанные уведомления
            await this.$http
            .get('/api/catalog/get-notification-new-goods/' + this.currentUser.id)
            .then(res => {
                this.newGoods = res.data.items;
                this.newGoods.map(newProduct => {
                    this.show(newProduct);
                });
            })
            .catch(error => {
                console.log(error);
            });
        },

        methods: {
            show(newProduct) {
                this.$notify({
                    group: 'notification-new-good',
                    title: 'Новый продукт ',
                    duration: 1000000,
                    close: this.close(newProduct.newProductId),
                    data: { idProduct: newProduct.newProductId }
                });
            },

            close (closeProductId) {
                this.$http
                .post('/api/catalog/set-read-status/', {
                       productId: closeProductId,
                       userId: this.currentUser.id
                })
                .then()
                .catch(error => {
                    console.log(error);
                });
            }
        }
    }
</script>

<style scoped>
    .my-style {
        padding: 10px;
        margin: 0 5px 5px;

        font-size: 12px;

        color: #ffffff;
        background: #44A4FC;
        border-left: 5px solid #187FE7;
    }
</style>