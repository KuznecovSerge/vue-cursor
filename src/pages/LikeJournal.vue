<template>
    <div>
        <div class="m-3" v-if="!preload">
            <p>Понравившиеся журналы:</p>

            <ul>
                <li v-for="like in likes" :key="like.id">
                    <router-link class="nav-link" :to="`/journal/${like.journalEntriesId}`">{{ like.journalEntriesId }}</router-link>
                </li>
            </ul>
        </div>

        <div v-if="preload">
            <b-spinner variant="success" label="Spinning"></b-spinner>
        </div>
    </div>
</template>

<script>
    import NotificationNewJournal from "../components/NotificationNewJournal";

    export default {
        name: "LikeJournal",

        components: { NotificationNewJournal },

        data: function () {
            return {
                likes: {},
                preload: true,
            }
        },

        mounted() {
            // получение журналов, которые понравились
            this.$http
            .get('/api/journal/get-likes-journal/' + this.currentUser.id)
            .then(likesJournals => {
                this.likes = likesJournals.data.items;
                this.preload = false;
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
</script>

<style scoped>

</style>