<template>
    <div id="lesson">
      <v-form class="course">

        <h1>Создание нового урока</h1>

        <div class="course-subtitle course-block course--radius my-1 px-5 py-3">
          <div class="mt-6">
            <span>Добавить видео</span>
            <v-file-input
              v-model="newProduct.materials.lesson.video"
              show-size
              counter
              required
              label="File input"
            ></v-file-input>
          </div>

          <div class="mt-6">
            <span>Оставить комментарий под видео</span>
            <v-textarea
              v-model="newProduct.materials.lesson.comment"
              solo
              name="input-7-4"
              label="Solo textarea"
              required
            ></v-textarea>
          </div>
          <div class="my-6">
            <span>Добавить дополнительный файл</span>
            <v-file-input
              v-model="newProduct.materials.lesson.files"
              :rules="rulesFile"
              show-size
              counter
              required
              label="File input"
            ></v-file-input>
          </div>
          <div class="d-inline-flex align-center mb-4">
              <v-checkbox
              v-model="newProduct.materials.lesson.video"
                class="m-0 p-0"
                color="primary"
                value="primary"
                hide-details
              ></v-checkbox>
              <span>Урок необходимо закончить, чтобы начать следующий</span>
          </div>
        </div>

      </v-form>
    </div>
</template>
<script>

  export default {
    name: 'lesson',
    props: [
      'newProduct'
    ],

    data: () => ({
      rulesVideo: [
        value => !value || value.size < 30000000 || 'Video cannot exceed 50MB!',
      ],
      rulesFile: [
        value => !value || value.size < 5000000 || 'File cannot exceed 5MB!'
      ],
    }),
  }
</script>