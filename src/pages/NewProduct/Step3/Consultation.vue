<template>
  <div id="consultation">
    <b-container>
      <h1>Создание новой консультации`</h1>
        <b-row>

          <b-col cols="12">
            <header>Описание консультации</header>
            <v-textarea
              outlined
              v-model="newProduct.materials.consultation.description"
              :value="newProduct.materials.consultation.description"
              :rules="[
                (v) => !!v || 'Введите описание консультации',
                (v) => v && v.length >= 20 || 'Описание консультации не может быть меньше 20 символов',
                (v) => v && v.length <= 250 || 'Описание консультации не может быть больше 1000 символов'
              ]"
              counter="1000"
              required
            ></v-textarea>
          </b-col>

          <b-col
            cols="12"
            sm="12"
          >
            <header>Дополнительные материалы</header>
            <v-file-input
              v-model="newProduct.materials.consultation.files"
              multiple
              counter
              label="Выберите файл"
            ></v-file-input>
          </b-col>

        </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'consultation',
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
  }
}
</script>