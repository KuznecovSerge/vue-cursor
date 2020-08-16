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

			<b-button class="mt-3" @click="handleSave" variant="success">Сохранить</b-button>
		</div>
	</div>
</template>

<script>
import JournalEditor from '@/components/journal/JournalEditor';
import Multiselect from 'vue-multiselect';
import TinyEditor from '@/components/common/TinyEditor';

export default {
	data: () => {
		return {
			tags: [],
			content: '',
			title: '',
			image: null,
			selectTags: []
		};
	},

	components: {
		JournalEditor,
		TinyEditor,
		Multiselect
	},

	beforeCreate() {
		this.$http.get('/api/tags').then(({ data }) => {
			this.tags = data.tags;
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

		handleSave(model) {
			const { title, image, selectTags, content, userId, $router, currentUser } = this;

			let formData = new FormData();
			formData.append('title', title);
			formData.append('file', image);
			formData.append('tags', JSON.stringify(selectTags.map(i => i.name)));
			formData.append('content', content);
			formData.append('userId', currentUser.id);
			this.$http
				.post(`/api/journalv2`, formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				})
				.then(({ data }) => {
					if (data.success) {
						$router.push(`/journal/${data.journalId}`);
					}
				});
		}
	}
};
</script>