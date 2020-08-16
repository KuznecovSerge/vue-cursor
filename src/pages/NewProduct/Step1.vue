<template>
  <div id="step1">
    <b-container>
      <v-form
        v-model="valid"
        ref="form"
        lazy-validation
      >
        <b-row>

          <b-col
            cols="12"
            sm="12"
          >
            <header>Тип продукта</header>
            <v-radio-group
              v-model="newProduct.type"
              :rules="[v => !!v || 'Выберите тип продукта']"
              row
              required
            >
              <v-radio
                v-for="item in products"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></v-radio>
            </v-radio-group>
          </b-col>

          <b-col
            cols="12"
            sm="12"
          >
            <v-text-field
              label="Название"
              v-model="newProduct.title"
              required
              :rules="[
                (v) => !!v || 'Введите название',
                (v) => v && v.length >= 2 || 'Название не может быть меньше 2 символов'
              ]"
            >
            </v-text-field>
          </b-col>

          <b-col
            cols="12"
            sm="12"
          >
            <v-text-field
              label="Цена"
              v-model="newProduct.price"
              type="number"
              :rules="[v => !!v || 'Введите цену']"
              required
            >
            </v-text-field>
          </b-col>

          <b-col
            cols="12"
            sm="12"
          >
            <v-checkbox
              label="Скидка"
              v-model="newProduct.discount.enabled"
            ></v-checkbox>

              <b-col
                v-if="newProduct.discount.enabled"
                cols="12"
                sm="12"
              >
                <v-text-field
                  label="Размер скидки (%)"
                  v-model="newProduct.discount.percent"
                  type="number"
                  suffix="%"
                  :rules="[
                    v => !!v && newProduct.discount.enabled || 'Введите размер скидки'
                  ]"
                  :required="newProduct.discount.enabled"
                >
                </v-text-field>

                <v-text-field
                  label="Действительна до"
                  v-model="newProduct.discount.dateEnd"
                  type="date"
                  :rules="[
                    v => !!v && newProduct.discount.enabled || 'Введите дату окончания действия скидки'
                  ]"
                  :required="newProduct.discount.enabled"
                >
                </v-text-field>

              </b-col>

            <v-checkbox
              label="Промокод"
              v-model="newProduct.coupon.enabled"
            ></v-checkbox>

              <b-col
                v-if="newProduct.coupon.enabled"
                cols="12"
                sm="12"
              >
                <v-text-field
                  label="Код"
                  v-model="newProduct.coupon.code"
                  :rules="[
                    v => !!v && newProduct.coupon.enabled || 'Введите код купона'
                  ]"
                  :required="newProduct.coupon.enabled"
                >
                </v-text-field>

                <v-text-field
                  label="Размер скидки по промокоду (%)"
                  v-model="newProduct.coupon.percent"
                  type="number"
                  suffix="%"
                  :rules="[
                    v => !!v && newProduct.coupon.enabled || 'Введите размер скидки по промокоду'
                  ]"
                  :required="newProduct.coupon.enabled"
                >
                </v-text-field>

                <v-text-field
                  label="Действителен до"
                  v-model="newProduct.coupon.dateEnd"
                  type="date"
                  :rules="[
                    v => !!v && newProduct.coupon.enabled || 'Введите дату окончания действия промокода'
                  ]"
                  :required="newProduct.coupon.enabled"
                >
                </v-text-field>

              </b-col>

            <v-checkbox
              v-model="newProduct.discountAndCoupon"
              label="Акционная скидка и промокод могут применяться одновременно и будут суммироваться"
            ></v-checkbox>

          </b-col>

          <b-col
            cols="12"
            sm="12"
          >
            <header>Категория</header>
            <v-radio-group
              v-model="newProduct.category"
              :rules="[v => v !== null || 'Выберите категорию']"
              required
              row
            >
              <v-radio
                v-for="(item, key) in categories"
                :key="key"
                :label="item.name"
                :value="item.id"
              ></v-radio>
            </v-radio-group>
          </b-col>
          
          <b-col
            v-if="this.newProduct.category !== false"
            cols="12"
            sm="12"
          >
            <v-checkbox
              v-model="newProduct.subCategory"
              v-for="(item, key) in subCategories"
              :key="key"
              :label="item.name"
              :value="item.id"
              :rules="[
                v => !!v && v.length > 0 || 'Подкатегория обязательна',
                v => !!v && v.length < 4 || 'Можно выбрать только 3 подкатегории',
              ]"
              :hide-details="key !== (subCategories.length - 1)"
            ></v-checkbox>
          </b-col>

          <b-col
            cols="12"
            sm="12"
          >
            <span>Изображение</span>
            <FileLibrary v-model="dialog" v-slot="{file}">
                <v-file
                    v-model="newProduct.image"
                    :file="file"
                    @click="dialog=true"
                />
            </FileLibrary>
          </b-col>

          <b-col
            cols="12"
            sm="12"
          >
            <header>Демо-видео</header>
            <span style="font-size: 12px;">
              *ссылкой видео можно вставлять только для видеохостингов YouTube, Vimeo и Dailymotion, в остальных случаях нужно вставлять iframe
            </span>
            <v-text-field
                    label="Ссылка или iframe"
                    v-model="newProduct.video"
                    required
                    :rules="[
                    (v) => !!v || 'Укажите ссылку на демо-видео',
              ]"
            >
            </v-text-field>
          </b-col>

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
import FileLibrary from '@/components/common/FileLibrary.vue';
import VFile from '@/components/common/v-file.vue';

export default {
  name: 'step1',
  components: {
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
      dialog2: false,
      products: [
        {
          label: 'Курс',
          value: 'course'
        },
        {
          label: 'Урок',
          value: 'lesson'
        },
        {
          label: 'Вебинар',
          value: 'webinar'
        },
        {
          label: 'Консультация',
          value: 'consultation'
        },
        {
          label: 'Книга',
          value: 'book'
        }

      ],
      categories: null,
      subCategories: []
    };
  },
  watch: {
    // эта функция запускается при любом изменении категории
    'newProduct.category': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.newProduct.subCategory = [];
        if (this.newProduct.category && Array.isArray(this.categories))
          this.subCategories = (this.categories.find(item => item.id == newValue)).subCategories;
      }
    }
  },
  beforeCreate() {
    this.$http.get(`/api/categories`).then(res => {
      if (res.data.categories) {
        this.categories = res.data.categories;
        if (this.newProduct.category)
          this.subCategories = (this.categories.find(item => item.id == this.newProduct.category)).subCategories;
      }
    });
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.newProduct.step = 'Page2';
      }
    },
  }
}
</script>

<style>
</style>
