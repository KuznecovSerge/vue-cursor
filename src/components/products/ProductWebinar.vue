<template>
    <div class="course" id="webinar">

        <h1 class="mb-8">Создание вебинара</h1>

        <div class="course-subtitle course-block course--radius my-1 px-5 py-3">
            <span>Добавьте ссылку для вебинара</span>
            <v-text-field
                required
                class="mt-0"
            ></v-text-field>
        </div>

    </div>
</template>
<script>
    export default {
        name: 'webinar',
        props: [
            'newProduct'
        ],
    }
</script>