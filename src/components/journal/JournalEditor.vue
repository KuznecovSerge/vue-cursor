<template>
	<div>
		<div class="m-3">
			<div>
				<b-form @submit.stop.prevent>
					<label for="title-note">Заголовок:</label>
					<b-input v-model="title" id="title-note"></b-input>
				</b-form>
			</div>

			<div class="mt-3">
				Картинка:
				<b-form-file v-model="image" ref="file-input" class="mb-2"></b-form-file>

				<b-button @click="image = undefined">Убрать картинку</b-button>
			</div>

			<div class="mt-3">
				Теги:
				<multiselect
					v-model="selectTags"
					tag-placeholder="Добавить новый тег"
					placeholder="Поиск по тегам"
					label="name"
					track-by="name"
					:options="tags"
					:multiple="true"
					:taggable="true"
					@tag="addTag"
				/>
			</div>

			<div class="mt-3">
				Описание:
				<TinyEditor v-model="content" />
			</div>

			<b-button class="mt-3" @click="save" variant="success">Сохранить</b-button>
		</div>
	</div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import TinyEditor from '@/components/common/TinyEditor';

export default {
	name: 'JournalEditor',

	components: { TinyEditor, Multiselect },

	props: ['value', 'title', 'tags'],

	data: () => ({
		image: null,
		selectTags: [],
		msgAlert: '',
		showAlert: false,
		variant: 'success'
	}),

	beforeCreate() {
		this.$http.get('/api/tags').then(({ data }) => {
			data.tags.forEach(tag => this.tags.push(tag));
		});
	},

	methods: {
		addTag(newTag) {
			const tag = {
				name: newTag,
				code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000)
			};
			if (!this.tags.find(t => t.name === tag.name)) {
				this.tags.push(tag);
			}

			this.selectTags.push(tag);
		},

		async save() {
			const { image, title, selectTags, value } = this;

			this.$emit('save', { image, title, selectTags, content })
			if (this.onSave) {
				
				this.onSave({
					image,
					title_o,
					selectTags,
					content_o
				});
			}
		}
	}
};
</script>

<style scoped>
</style>