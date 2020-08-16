<template>
  <div>
    <b-container>

      <h1>Все поля курса</h1>

          <Page1 :newProduct="newProduct" />
          <Page2 :newProduct="newProduct" />
          <Page3 :newProduct="newProduct" />
          <Page4 :newProduct="newProduct" />

          <v-btn
            @click="back"
            text
            >Назад</v-btn>

          <v-btn
            @click="submit"
            text
          >Далее</v-btn>

    </b-container>
  </div>
</template>

<script>
import Page1 from './Step1.vue';
import Page2 from './Step2.vue';
import Page3 from './Step3.vue';
import Page4 from './Step4.vue';

export default {
  name: 'ShowCourse',
  components: {
      Page1,
      Page2,
      Page3,
      Page4,
      PostProduct,
  },
  props: [
    'newProduct'
  ],
  data() {
    return {
      valid: true,
    };
  },
  methods: {
    submit () {
      this.newProduct.step = 'PostProduct';
    },
    back () {
      this.newProduct.step = 'Page4';
    },
  }
}

</script>
