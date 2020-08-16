<template>
	<div>
		<v-chip class="ma-2" color="primary" label text-color="white">{{ course.name }}</v-chip>
	</div>
</template>

<script>
export default {
	name: 'Course',

	data: () => ({
		course: null,
		success: false
	}),

	beforeCreate() {
		const query = this.$route.query;
		if (query.id) {
			this.$http
				.get(`/api/product/details/course/${query.id}`)
				.then(res => {
					this.success = res.data.success;
					this.course = res.data.course;
				});
		}
	}
};
</script>

<style scoped>
</style>