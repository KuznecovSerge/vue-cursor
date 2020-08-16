<template>
    <div class="mc-fileupload" ref="fileform">
        <div class="mc-fileupload__label_wrap"><span class="mc-fileupload__label">{{label || 'Дополнительный файл'}}</span></div>
		<Upload
			class="mc-fileupload__input"
			drag
			action="https://jsonplaceholder.typicode.com/posts/"
			:file-list="files"
			:auto-upload="false"
  			multiple
			:on-change="fileSelected"
		>
			<div class="el-upload__text">Перетащите дополнительные файлы или <em>загрузите их</em></div>
		</Upload>
    </div>
</template>

<script>
import { Upload } from 'element-ui';
export default {
  model: {
    prop: 'files',
    event: 'selected'
  },
  props: ['files', 'label'],

  components: {
	  Upload
  },

  data() {
	  return {
	  }
  },

  methods: {
	  fileSelected(file, fileList) {
		  this.$emit('selected', fileList);
	  }
  }

};
</script>

<style lang="less">
.mc-fileupload {
    margin-top: 10px;

    &__label_wrap {
        position: absolute;
    }
    &__label {
        position: relative;
        left: 16px; /* 24-8 */
        top: -14px;
        padding: 2px 8px;
        background-color: @white;
        z-index: 1;
	}
	&__input {
		.el-upload {
			width: 100%;
		}

		.el-upload-dragger {
			width: 100%;
			height: 99px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 16px;
			border: none;
			--border-color: @border-color;
			--border-weight: 2px;
			--dash-size: 8px;
			--gap-size: 8px;

			&:after {
				transition: all .6s ease;
				content:'';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: 
					linear-gradient(90deg, var(--border-color) 100%, transparent 100%) top left no-repeat,
					linear-gradient(90deg, transparent calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2 + var(--dash-size)), transparent calc(var(--gap-size) / 2 + var(--dash-size))) top center repeat-x,
					linear-gradient(90deg, var(--border-color) 100%, transparent 100%) top right no-repeat,
					
					linear-gradient(0deg, var(--border-color) 100%, transparent 100%) top left no-repeat,
					linear-gradient(0deg, transparent calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2 + var(--dash-size)), transparent calc(var(--gap-size) / 2 + var(--dash-size))) center left repeat-y,
					linear-gradient(0deg, var(--border-color) 100%, transparent 100%) bottom left no-repeat,
					
					linear-gradient(90deg, var(--border-color) 100%, transparent 100%) bottom left no-repeat,
					linear-gradient(90deg, transparent calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2 + var(--dash-size)), transparent calc(var(--gap-size) / 2 + var(--dash-size))) bottom center repeat-x,
					linear-gradient(90deg, var(--border-color) 100%, transparent 100%) bottom right no-repeat,
					
					linear-gradient(0deg, var(--border-color) 100%, transparent 100%) top right no-repeat,
					linear-gradient(0deg, transparent calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2 + var(--dash-size)), transparent calc(var(--gap-size) / 2 + var(--dash-size))) center right repeat-y,
					linear-gradient(0deg, var(--border-color) 100%, transparent 100%) bottom right no-repeat;
				background-size: var(--dash-size) var(--border-weight), calc(var(--dash-size) + var(--gap-size)) var(--border-weight), var(--dash-size) var(--border-weight), var(--border-weight) var(--dash-size), var(--border-weight) calc(var(--dash-size) + var(--gap-size)), var(--border-weight) var(--dash-size);
			}
		}

		.el-upload-list {
			display: inline-flex;
		}
		.el-upload-list__item {
			margin-top: 10px;
		}
	}
    

}
</style>