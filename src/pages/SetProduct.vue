<template>
  <div id="setproduct">
    <b-container>

        <v-radio-group v-model="page" column>
          <v-radio
            label="course"
            color="red"
            value="1"
          ></v-radio>

          <v-radio
            label="lesson"
            color="red"
            value="2"
          ></v-radio>

          <v-radio
            label="webinar"
            color="red"
            value="3"
          ></v-radio>

          <v-radio
            label="consultation"
            color="red"
            value="4"
          ></v-radio>

        </v-radio-group>

        <div v-if="page == 1">
          <ProductCourse />
        </div>

        <div v-if="page == 2">
          <ProductLesson />
        </div>

        <div v-if="page == 3">
          <ProductWebinar />
        </div>

        <div v-if="page == 4">
          <ProductConsultation />
        </div>
    </b-container>
  </div>
</template>
<script>

import ProductCourse from '../components/products/ProductCourse.vue';
import ProductLesson from '../components/products/ProductLesson.vue';
import ProductWebinar from '../components/products/ProductWebinar.vue';
import ProductConsultation from '../components/products/ProductConsultation.vue';

export default {
  name: 'setproduct',

  components: { ProductCourse, ProductLesson, ProductWebinar, ProductConsultation },

  data() {
    return {
      lesson: false,
      webinar: false,
      course: false,
      page: ''
    }
  }
}
</script>