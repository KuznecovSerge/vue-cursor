<template>
  <div id="webinar">
    <b-container>
    <h1>Создание нового вебинара</h1>
        <b-row>

          <b-col cols="12">
              <header>Ссылка на вебинар</header>
            <v-text-field
              v-model="newProduct.materials.webinar.link"
              :rules="[
                (v) => !!v || 'Ссылка на вебинар обязательна',
              ]"
              required
            ></v-text-field>
          </b-col>

          <b-col cols="12">
            <header>Комментарий к видео</header>
            <v-textarea
              outlined
              v-model="newProduct.materials.webinar.comment"
              :value="newProduct.materials.webinar.comment"
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
              v-model="newProduct.materials.webinar.files"
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
              v-model="newProduct.materials.webinar.homework"
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
              v-model="newProduct.materials.webinar.homeworkEmail"

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
  name: 'webinar',
  props: [
    'newProduct'
  ],
  data() {
    return {
      valid: true,
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
