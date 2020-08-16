<template>
  <div id="step2">
    <b-container>
      <v-form
        v-model="valid"
        ref="form"
        lazy-validation
      >
        <b-row>

          <b-col cols="12">
            <header>Описание</header>
            <span style="font-size: 12px;">*расскажите про ваш продукт, описание будет отображаться на страница продукта</span>
            <v-textarea
              outlined
              v-model="newProduct.description"
              label="Описание"
              :rules="[
                (v) => !!v || 'Введите описание',
                (v) => v && v.length >= 20 || 'Описание не может быть меньше 20 символов'
              ]"
              required
            ></v-textarea>
          </b-col>

          <b-col cols="12">
            <header>Краткое описание</header>
            <span style="font-size: 12px;">*отображается при наведении на ваш продукт в каталоге</span>
            <v-textarea
              outlined
              v-model="newProduct.previewDescription"
              label="Краткое описание"
              :value="newProduct.previewDescription"
              :rules="[
                (v) => !!v || 'Введите краткое описание',
                (v) => v && v.length >= 20 || 'Краткое описание не может быть меньше 20 символов',
                (v) => v && v.length <= 120 || 'Краткое описание не может быть больше 120 символов'
              ]"
              counter="120"
              required
            ></v-textarea>
          </b-col>

          <b-col cols="12">
            <b-col cols="12">
              <header>Ключевые навыки</header>
              <span style="font-size: 12px;">*напишите, основные навыки, которые получат ваши студенты, каждый из навыков должен состоять не больше, чем из 3 слов</span>
            </b-col>

            <el-autocomplete
              class="block-input"
              v-for="n in 5"
              :key="n-1"
              v-model="newProduct.skills[n-1]"
              value-key="description"
              :fetch-suggestions="querySearch"
              placeholder="Введите навык"
            ></el-autocomplete>

          </b-col>

          <b-col cols="12">
              <header>Количество личных консультаций (необязательное поле)</header>
              <span style="font-size: 12px;">*количество индивидуальных консультаций или других форм взаимодействия, включенных в стоимость продукта</span>
            <v-text-field
              v-model="newProduct.konsultationCount"
              type="number"
            ></v-text-field>
          </b-col>

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
import { Autocomplete } from 'element-ui';
export default {
  name: 'step2',
  props: [
    'newProduct'
  ],
  components: {
    elAutocomplete: Autocomplete
  },
  data() {
    return {
      valid: true,
      isLoading: false,
    };
  },
  methods: {
    querySearch(query, cb) {
      if (this.isLoading) return;
      this.isLoading = true;
      this.$http.get(`/api/skills?search=${query}`)
      .then(res => {
        cb(res.data.skills);
      })
      .finally(() => (this.isLoading = false));
    },
    submit () {
      if (this.$refs.form.validate()) {
        this.newProduct.step = 'Page3';
      }
    },
    back () {
      this.newProduct.step = 'Page1';
    },
  }
}
</script>

<style>
  .el-autocomplete {
    width: 100%;
    padding-top: 7px;
    padding-bottom: 7px;
  }
</style>