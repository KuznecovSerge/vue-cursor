<template>
    <div>
        <notifications group="notification-new-journal"
                       position="bottom right">
            <template slot="body" slot-scope="props">
                <div>
                    <router-link class="nav-link" :to="`/journal/${props.item.data.newJournalId}`" target="_blank">{{ props.item.title }} {{ props.item.data.newJournalId }}</router-link>
<!--                    <a :href="`/journal/${props.item.data.newJournalId}`" class="title">-->
<!--                        {{ props.item.title }} {{ props.item.data.newJournalId }}-->
<!--                    </a>-->
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
        name: "NotificationNewJournal",

        data: function () {
            return {
                newJournal: {},
            }
        } ,

        async created() {
            // получаем новые товары и записываем в бд
            await this.$http
            .get('/api/journal/get-new-journal/' + this.currentUser.id)
            .then()
            .catch(error => {
                console.log(error);
            });

            // получаем не прочитанные уведомления
            await this.$http
            .get('/api/journal/get-notification-new-journal/' + this.currentUser.id)
            .then(res => {
                this.newJournal = res.data.items;
                this.newJournal.map(newJournal => {
                    this.show(newJournal);
                });
            })
            .catch(error => {
                console.log(error);
            });
        },

        methods: {
            show(newJournal) {
                console.log(newJournal);
                this.$notify({
                    group: 'notification-new-journal',
                    title: 'Новый журнал ',
                    duration: 1000000,
                    close: this.close(newJournal.newJournalId),
                    data: { newJournalId: newJournal.newJournalId }
                });
            },

            close (closeJournalId) {
                this.$http
                .post('/api/journal/set-read-status/', {
                    journalId: closeJournalId,
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