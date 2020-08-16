<template>
    <div class="course" id="consultation">

        <h1 class="mb-8">Консультация</h1>

        <div class="course-subtitle course-block course--radius px-5 py-3">
            <div class="mt-6">
                <span>Описание</span>
                <v-textarea
                    class="mt-2"
                    solo
                    name="input-7-4"
                    label="Solo textarea"
                    required
                ></v-textarea>
            </div>

            <div class="my-6">
                <span>Добавить дополнительные материалы</span>
                <v-file-input
                    show-size
                    counter
                    required
                    label="File input"
                ></v-file-input>
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        name: 'consultation',
        props: [
            'newProduct'
        ],
    }
</script>