<template>
	<div>
		<div>{{ course.name }}</div>
		<v-card v-if="success">
            
        </v-card>
	</div>
</template>

<script>
export default {
	name: 'CourseItem',

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