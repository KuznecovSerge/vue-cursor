<template>
    <div class="bg-secondary p-2 rounded" style="min-height: 40vh">
        <p class="text-lg-center text-light border-bottom">
            Топ авторов:
        </p>

        <div v-if="authors !== null">
            <div
              style="height: 60px"
              class="m-3 border-bottom d-flex flex-row align-items-center justify-content-between"
              v-for="author in authors"
            >
                <div>
                    <router-link :to="`/blog/author/${author.id}`">
                        <img style="border-radius: 100px; width: 40px; height: 40px"
                             :src="`/public/assets/media/${author.avatar}`" alt="">
                    </router-link>
                </div>

                <div class="text-light">
                    <router-link class="nav-link text-light" :to="`/blog/authors/${author.id}`">
                        {{ author.email }}
                    </router-link>
                </div>

                <div class="text-success">
                    +{{ author.countLike }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TopAuthor",

        props: {
            authors: null
        }
    }
</script>

<style scoped>

</style>