<template>
    <div>
    <v-text-field 
        v-for="(f, index) in attachments"
        clearable
        readonly 
        hide-details="auto"
        :key="index"
        :value="f.originalFileName"
        @click:clear="removeFile(index)"
    ></v-text-field>
    <v-text-field
        :value="originalFileName"
        :label="label"
        :prepend-icon="PrependIcon"
        clearable
        :rules="rules"
        :required="required"
        @click="onClick"
        @input="onChange"
    ></v-text-field>
    <slot></slot>
    </div>
</template>

<script>

export default {
  name: "VFile",
  props: {
      file: null,
      label: {
          default: 'Выберите файл'
      },
      PrependIcon: {
          default: 'mdi-paperclip'
      },
      rules: null,
      required: {
          default: false
      },
      multiple: {
          type: Boolean,
          default: false
      },
      outputid: {            // id или имя файла на выходе
          type: Boolean,
          default: false
      },
      value: '',

  },
  data: () => {
    return {
        attachments: [],
    };
  },
  computed: {
      originalFileName: function () {
          const name = (this.file && this.file.originalFileName) ? this.file.originalFileName : this.value;
          return (this.multiple) ? '' : name;
      }
  },
  watch: {
    file: function (newValue, oldValue) {
      if (newValue && newValue.fileName) {
        // id или имя файла на выходе
        const resfile = (this.outputid) ? newValue.id : newValue.fileName; 
        if (this.multiple) {
          // множественный выбор файлов
          if ( Array.isArray( this.value ) ) this.$emit( 'input', this.value.concat([resfile]) )
          else this.$emit( 'input', [resfile] );

          this.attachments.push( newValue );
        } else {
          // только один файл
          this.$emit( 'input', resfile)
        }
      }
    }
  },
  mounted() {
      if ( Array.isArray(this.value) ) {
          for (let id of this.value) {
            this.$http.get(`/api/files/${id}`).then(res => {
                this.attachments.push( res.data.file );
            });
          }
      }
  },
  methods: {
      onClick(val){
          this.$emit('click', val);
      },
      onChange(val){
          if (val == null && !this.multiple) {
              this.$emit('input', "");
          }
      },
      removeFile(index){
          this.value.splice(this.value.indexOf(index), 1);
          this.attachments.splice(index, 1);
      }
  }

};
</script>
