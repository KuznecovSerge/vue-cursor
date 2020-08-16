<template>
  <div id="lesson">
    <b-container>
    <h1>Создание нового урока</h1>
        <b-row>

          <b-col
            cols="12"
            sm="12"
          >
            <header>Ссылка на видео с YouTube</header>
            <v-text-field
              label="Ссылка"
              v-model="newProduct.materials.lesson.video"
              :rules="[
                v => !!v || 'Видео обязательно'
              ]"
              required
            >
            </v-text-field>

            <div v-if="newProduct.materials.lesson.video.indexOf('https://youtu.be/') !== -1">
              <iframe width="560" height="315" :src="iframeLink + newProduct.materials.lesson.video.slice(16)" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>

          </b-col>

          <b-col cols="12">
            <header>Комментарий к видео</header>
            <v-textarea
              outlined
              v-model="newProduct.materials.lesson.comment"
              :value="newProduct.materials.lesson.comment"
              :rules="[
                (v) => !!v || 'Введите комментарий к видео',
                (v) => v && v.length >= 20 || 'Комментарий к видео не может быть меньше 20 символов',
                (v) => v && v.length <= 250 || 'Комментарий к видео не может быть больше 250 символов'
              ]"
              counter="250"
              required
            ></v-textarea>
          </b-col>

          <b-col
            cols="12"
            sm="12"
          >
            <header>Дополнительные материалы</header>
            <v-file-input
              v-model="newProduct.materials.lesson.files"
              multiple
              counter
              label="Выберите файл"
            ></v-file-input>
          </b-col>

          <b-col
            cols="12"
            sm="12"
          >
            <header>Домашнее задание</header>
            <span style="font-size: 12px;">
              *описать, в каком виде необходимо выполнить домашнее задание
            </span>
            <v-text-field
              v-model="newProduct.materials.lesson.homework"
              required
              :rules="[
                (v) => !!v || 'Введите, в каком виде необходимо предоставить домашнее задание'
              ]"
            >
            </v-text-field>
          </b-col>

          <b-col
            cols="12"
            sm="12"
          >
            <header>Email</header>
            <span style="font-size: 12px;">
              *на какой email отправлять выполненное домашнее задание
            </span>
            <v-text-field
              v-model="newProduct.materials.lesson.homeworkEmail"

              required
              :rules="[
                (v) => !!v || 'Введите email',
                rules.email
              ]"
            >
            </v-text-field>
          </b-col>

        </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'lesson',
  props: [
    'newProduct'
  ],
  data() {
    return {
      valid: true,
      iframeLink: 'https://www.youtube.com/embed/',
      rules: {
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Неверный e-mail.'
        },
      },
    };
  },
  watch: {
  },
  methods: {
  }
}
</script>
