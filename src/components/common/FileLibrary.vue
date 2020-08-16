<template>
  <div>
    <slot :file="selectedFile">

    </slot>

    <v-dialog
      :value="modelValue"
      @input="showDialog"
      max-width="600"

    >
      <v-card>
        <v-card-title class="headline">Мои файлы</v-card-title>
        <v-card-text>
            <v-file-input
              v-model="newFile"
              show-size
              dense
              outlined
              hide-details="auto"
              label="Загрузить новый файл"
              :loading="loading"
              @change="uploadFile"
            ></v-file-input>
            <v-divider></v-divider>
            Выбрать файл из библиотеки
            <v-list dense>
              <v-list-item-group v-model="item" color="primary">
                <v-list-item
                  v-for="(file, i) in files"
                  :key="i"
                  @click="selectFile(i)"
                >
                  <v-list-item-icon v-if="false">
                    <v-icon v-if="!file.icon" v-text="'mdi-file'"></v-icon>
                  </v-list-item-icon>

                  <div class="align-self-center mr-3" style="width: 66px; height: 55px">
                  <v-img
                        max-width="66"
                        max-height="50"
                        aspect-ratio="1.32"
                        :src="`/public/assets/media/preview/${file.fileName}`"
                        lazy-src="/public/assets/media/nopreview.png"
                        @error=""
                  ></v-img>
                  </div>

                  <v-list-item-content>
                    <v-list-item-title v-text="file.originalFileName"></v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                  <v-btn icon @click="deleteFile(i, $event)">
                    <v-icon color="grey lighten-1">mdi-close</v-icon>
                  </v-btn>
                </v-list-item-action>

                </v-list-item>
              </v-list-item-group>
            </v-list>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          Выберите файл из вашей библиотеки или загрузите новый.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="control.showDialog = false"
          >
            Выбрать
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="control.showDialog = false"
          >
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  name: "FileLibrary",
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
      modelValue: {
          default: false
      },
  },
  data: () => {
    return {
      files: [],
      item: null,
      newFile: null,
      loading: false,
      selectedFile: null,   // для использования со слотами
    };
  },
  watch: {
      "modelValue": function (newVisible, oldVisible) {
          if (!oldVisible && newVisible) {      // только при открытии
              this.refreshFiles();              // обновлять список файлов
          }
      }
  },
  methods: {
      showDialog(val){
          this.$emit('change', val);
      },
      refreshFiles() {
          this.files.splice( 0, this.files.lenght-1 );
          this.$http.get(`/api/files`).then(res => {
              this.files = res.data.files;
          });
      },
      selectFile(index) {
          this.$emit('selected', this.files[index]);
          this.selectedFile = this.files[index];
          this.showDialog(false);
      },
      uploadFile(){
          if (this.newFile) {
              this.loading = true;
              let formData = new FormData();
              formData.append("file", this.newFile);

              this.$http.post(`/api/files`, formData, {
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              })
              .then(res => {
                  this.newFile = null;
                  this.refreshFiles();
                  this.loading = false;
              })
              .catch(error => {
                  console.log('error', error);
                  this.$swal("Ошибка", undefined, "error");
                  this.loading = false;
              });
          }
      },
      deleteFile(index, evt) {
          evt.stopPropagation();
          this.$http.delete(`/api/files/${this.files[index].id}`)
          .then(res => {
              this.refreshFiles();
          })
          .catch(error => {
              console.log('error', error);
              this.$swal("Ошибка", undefined, "error");
          });
      }
  }

};



/*
Примеры использования компонента:

1) отдельный компонент выбора - событие selected:

<template>
    <div>
        <FileLibrary v-model="dialog" @selected="onSelected" />
        <button @click="dialog=true">
    </div>
</template>

data() {
  return {
    dialog: false,
    video: '',
  };
},
methods: {
    onSelected(file) {
        console.log( 'selectedFile', file.fileName );
        this.video = file.fileName;
    }
}


2) использование со слотом - тогда в слот можно передать выбранный файл

<FileLibrary v-model="dialog" v-slot="{file}">
    <v-file
        v-model="newProduct.materials.course.video"
        :file="file"
        @click="dialog=true"
        :rules="[(v) => !!v || 'Промовидео обязательно']"
    />
</FileLibrary>

data() {
  return {
    dialog: false,
  };
},
*/
</script>
