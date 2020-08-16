<template>
    <div class="video">
        <iframe v-if="!iframe" :src="data" width="840" height="470"></iframe>
        <div v-else-if="iframe && data !== ''" v-html="data"></div>
        <img v-else class="img-fluid" src="/assets/media/video.png" />
    </div>
</template>

<script>
    export default {
        name: "ProductVideo",
        props: {
            data: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                iframe: false,
            }
        },
        created() {
            if (this.data.indexOf("<iframe") !== -1 ) {
                this.iframe = true;
            }
        }
    }
</script>

<style scoped>
    .video {
        margin: 56px 0;
    }
</style>