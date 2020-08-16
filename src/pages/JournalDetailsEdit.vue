<template>
	<div v-if="details != null">
		<JournalEditor
			:content="details.content"
			:title="details.title"
			:tags="details.tags"
			:onSave="handleSave"
		/>
	</div>
</template>

<script>
import JournalEditor from '@/components/journal/JournalEditor';

export default {
	name: 'JournalDetailsEdit',

	components: {
		JournalEditor
	},

	data: () => ({
		details: null
	}),

	beforeCreate() {
		let { $http, $route } = this;
		const { id } = $route.params;
		$http.get(`/api/journalv2/details/${id}`).then(({ data }) => {
			this.details = data.details;
		});
	},

	computed: {
		userId() {
			return this.currentUser.id;
		}
	},

	methods: {
		handleSave(model) {
			const { image, title_o, selectTags, content_o } = model;
			const { id } = this.$route.params;
			let formData = new FormData();
			formData.append('title', title_o);
			formData.append('file', image);
			formData.append(
				'tags',
				JSON.stringify(selectTags.map(i => i.name))
			);
			formData.append('content', content_o);
			formData.append('userId', this.userId);
			this.$http
				.put(`/api/journalv2/${id}`, formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				})
				.then(({ data }) => {
					if (data.success) {
						this.$router.push({
							name: 'journalDetails',
							params: { id }
						});
					}
				});
		}
	}
};
</script>

<style scoped>
</style>