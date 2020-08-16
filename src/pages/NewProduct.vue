<template>
  <div>
    <b-container>
    <v-stepper v-model="currentStep">
        <v-stepper-header>

            <template v-for="(step, index) in steps">
                <v-stepper-step
                    :step="index+1"
                    :complete="index+1 < currentStep"
                    @click = "toStep(index)"
                >{{ step.label }}</v-stepper-step>
                <v-divider></v-divider>
            </template>

        </v-stepper-header>

    </v-stepper>
    </b-container>

    <component :is="course.step" :newProduct="course" />
  </div>
</template>

<script>
import Page1 from './NewProduct/Step1.vue';
import Page2 from './NewProduct/Step2.vue';
import Page3 from './NewProduct/Step3.vue';
import Page4 from './NewProduct/Step4.vue';
import CheckAuthor from './NewProduct/CheckAuthor.vue';
//import ShowCourse from './NewProduct/ShowCourse.vue'; // удалить потом
import PostProduct from './NewProduct/PostProduct.vue';

export default {
  name: 'newproduct',
  components: {
      Page1,
      Page2,
      Page3,
      Page4,
      CheckAuthor,
//      ShowCourse,
      PostProduct,
  },
  data() {
    return {
      currentStep: 1,
      steps: [
          {
              label: 'Шаг 1',
              componentName: 'Page1',
              comleted: false
          },
          {
              label: 'Шаг 2',
              componentName: 'Page2',
              comleted: false
          },
          {
              label: 'Шаг 3',
              componentName: 'Page3',
              comleted: false
          },
          // {
          //     label: 'Шаг 4',
          //     componentName: 'CheckAuthor',
          //     comleted: false
          // },
          {
              label: 'Шаг 4',
              componentName: 'Page4',
              comleted: false
          },
          // {
          //     label: 'Шаг 6',
          //     componentName: 'ShowCourse',
          //     comleted: false
          // },
          {
              label: 'Шаг 5',
              componentName: 'PostProduct',
              comleted: false
          }
      ],
      course: {
        step: 'Page1',
        type: '',
        title: '',
        price: 0,
        discount: {
          enabled: false,
          percent: 0,
          dateEnd: null
        },
        coupon: {
          enabled: false,
          code: '',
          percent: 0,
          dateEnd: null
        },
        discountAndCoupon: false,
        category: null,
        subCategory: [],
        image: null,
        video: null,
        description: '',
        previewDescription: '',
        skills: [
          '',
          '',
          '',
          '',
          ''
        ],
        konsultationCount: 0,
        materials: {
          lesson: {
            video: '',
            comment: '',
            files: [],
            homework: '',
            homeworkEmail: '',
          },
          webinar: {
            link: '',
            comment: '',
            files: [],
            homework: '',
            homeworkEmail: '',
          },
          consultation: {
            description: '',
            files: []
          },
          book: {
            description: '',
            attachment_ids: []
          },
          course: {
            video: '',
            units: [],
            homeworkEmail: '',
          },
        },
        authorId: 0
      },
    };
  },
  mounted() {
      if (localStorage.getItem('course')) {
          try {
            this.course = JSON.parse(localStorage.getItem('course'));
          } catch(e) {
            localStorage.removeItem('course');
          }
      };
  },
  methods: {
      toStep( index ) {
          this.currentStep = index + 1;
          this.course.step = this.steps[index].componentName;
      }
  },
  watch: {
      'course.step': function (newStep, oldStep) {
          const parsed = JSON.stringify(this.course);
          localStorage.setItem(`course`, parsed);
          if (newStep == 'CheckAuthor') this.currentStep = 4
          else this.currentStep = this.steps.findIndex(step => step.componentName === newStep) + 1;
      }
  }
}
</script>

<style>
</style>
