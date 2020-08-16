<template>
  <div id="course">
    <b-container>
      <h1>Создание нового курса</h1>
        <b-row>

          <b-col
            cols="12"
            sm="12"
          >
            <header>Промовидео</header>
            <span style="font-size: 12px;">
              *добавьте ссылку на короткое видео продолжительностью не более 10-х минут, в котором вы расскажете о целях, задачах
              и основных ценностях вашего курса. Поскольку студенты могут посмотреть промовидео до регистрации на курс,
              это отличный шанс для продвижения вашего курса. Ссылкой видео можно вставлять только для видеохостингов YouTube, Vimeo и Dailymotion, в остальных случаях нужно вставлять iframe
            </span>

            <v-text-field
                    label="Ссылка или iframe"
                    v-model="newProduct.materials.course.video"
                    required
                    :rules="[
                    (v) => !!v || 'Укажите ссылку или iframe на промовидео',
              ]"
            >
            </v-text-field>

          </b-col>

          <b-col
            cols="12"
            sm="12"
          >
            <ProductCourse :newProduct="newProduct"/>
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
              v-model="newProduct.materials.course.homeworkEmail"
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
import ProductCourse from '../../../components/products/ProductCourse.vue';
import FileLibrary from '@/components/common/FileLibrary.vue';
import VFile from '@/components/common/v-file.vue';

export default {
  name: 'course',
  components: {
    ProductCourse,
    FileLibrary,
    VFile
  },
  props: [
    'newProduct'
  ],
  data() {
    return {
      valid: true,
      dialog: false,
      rules: {
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Неверный e-mail.'
        },
      },
    };
  },
}
</script>
