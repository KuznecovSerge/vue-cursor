<template>
	<tinymce-editor
		:api-key="API_KEY"
		:disabled="disabled"
		v-model="inputValue"
		@onChange="this.$emit('change', $event)"
		@onKeyUp="this.$emit('keyup', $event)"
		:init="initialConfig"
	/>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import tinyConfig from './tiny/config';

export default {
	props: ['value', 'readonly', 'inline', 'disabled'],

	components: {
		'tinymce-editor': Editor
	},

	computed: {
		initialConfig() {
      const { inline, readonly } = this;
      const defaultConfig = tinyConfig.config;

			return { ...defaultConfig, inline, readonly };
		},

		API_KEY() {
			return tinyConfig.API_KEY;
		},

		inputValue: {
			get() {
				return this.value;
			},

			set(value) {
				this.$emit('input', value);
			}
		}
	}
};
</script>