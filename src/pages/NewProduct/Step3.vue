<template>
  <div id="step3">
    <b-container>
      <v-form
        v-model="valid"
        ref="form"
        lazy-validation
      >
        <b-row>

          <component :is="newProduct.type" :newProduct="this.newProduct" />

          <v-btn
            v-if="newProduct.step !== 'ShowCourse'"
            @click="back"
            text
            >Назад</v-btn>

          <v-btn
            v-if="newProduct.step !== 'ShowCourse'"
            @click="submit"
            :disabled="!valid"
            text
            >Далее</v-btn>

        </b-row>
        
      </v-form>
    </b-container>
  </div>
</template>

<script>
import lesson from './Step3/Lesson.vue';
import webinar from './Step3/Webinar.vue';
import course from './Step3/Course.vue';
import consultation from './Step3/Consultation.vue';
import book from './Step3/Book.vue';

export default {
  name: 'step3',
  components: {
      lesson,
      webinar,
      course,
      consultation,
      book
  },
  props: [
    'newProduct'
  ],
  data() {
    return {
      valid: true,
    };
  },
  watch: {
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.newProduct.step = 'Page4';
      }
    },
    back () {
      this.newProduct.step = 'Page2';
    },
  }
}
</script>
