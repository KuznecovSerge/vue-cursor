<template>
  <div id="PostProduct">
    <b-container>
      <v-btn block large color="primary"  @click="submit()">
        РАЗМЕСТИТЬ ПРОДУКТ
      </v-btn>

      <div class="d-inline-flex align-center mb-4">
        <v-checkbox
          class="m-0 p-3 pl-0 pr-0"
          color="primary"
          value="primary"
          v-model="checked"
          hide-details
        ></v-checkbox>
        <span>Заказать консультацию по продукту</span>
      </div>
      <div>
        <span class="caption font-italic font-weight-light">
            *Наши специалисты, имеющие высокую экспертизу в области онлайн-образования,
            дадут вам комментарии по вашему продукту, создадут продающие описания, создадут обложку,
            отсмотрят структуру курса и его видео и дадут свои комментарии,
            которые помогут вам повысить качество продукта и его продажи.
        </span>
      </div>
    </b-container>
  </div>
</template>

<script>
  export default {
    name: 'PostProduct',
    props: {
      newProduct: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        checked: false,
      };
    },
    methods: {
      submit() {
          // переводим индексы массивов в ключи key - для учёта сортировки
          if (this.newProduct.type == 'course') {
              let course = this.newProduct.materials.course;
              for (let indexUnit = 0; indexUnit < course.units.length; indexUnit++) {
                  course.units[indexUnit].key = indexUnit + 1;
                  for (let indexTask = 0; indexTask < course.units[indexUnit].tasks.length; indexTask++) {
                      course.units[indexUnit].tasks[indexTask].key = indexTask + 1;
                  }
              };
          }
          this.$http.post(`/api/product/`, {product: this.newProduct})
          .then(res => {
              let product = res.data.product;
              console.log('product=', product);
              localStorage.removeItem('course');
              this.$swal("Продукт успешно создан", undefined, "success")
              .then((res) => {
                  this.$router.push(`/catalog/${product.id}`);
              });
          })
          .catch(error => {
              console.log('error', error);
              this.$swal("Ошибка", undefined, "error");
          });
      },
    },
  }
</script>
