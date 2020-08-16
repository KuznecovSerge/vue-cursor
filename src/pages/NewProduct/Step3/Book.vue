<template>
  <div id="book" class="col-12">
    <b-container>
      <h1>Создание новой книги</h1>
        <b-row>

          <b-col cols="12" sm="12">
            <header>Описание книги</header>
            <v-textarea
              outlined
              v-model="newProduct.materials.book.description"
              :value="newProduct.materials.book.description"
              :rules="[
                (v) => !!v || 'Введите описание книги',
                (v) => v && v.length >= 20 || 'Описание книги не может быть меньше 20 символов',
                (v) => v && v.length <= 250 || 'Описание книги не может быть больше 1000 символов'
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
            <FileLibrary v-model="dialog" v-slot="{file}">
                <v-file
                    v-model="newProduct.materials.book.attachment_ids"
                    :file="file"
                    @click="dialog=true"
                    multiple
                    outputid
                />
            </FileLibrary>
          </b-col>

        </b-row>
    </b-container>
  </div>
</template>

<script>
import FileLibrary from '@/components/common/FileLibrary.vue';
import VFile from '@/components/common/v-file.vue';

export default {
  name: 'book',
  components: {
    FileLibrary,
    VFile
  },
  props: [
    'newProduct'
  ],
  data() {
    return {
      dialog: false,
      valid: true,
    };
  },
  watch: {
  },
  methods: {
  }
}
</script>