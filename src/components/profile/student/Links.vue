<template>
	<div class="profile-links">
		<router-link
			:to="{ name: 'like-journal' }"
			class="btn btn-primary route-item"
		>Перейти к понравившимся журналам</router-link>
		<router-link :to="{ name: 'new-blog-posts' }" class="btn btn-primary route-item">Новые блоги</router-link>
	</div>
</template>

<script>
export default {
	props: {
		user: Object
	}
};
</script>

<style scoped>
</style>