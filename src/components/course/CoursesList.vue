<template>
	<v-list two-line>
		<v-subheader>Доступные курсы</v-subheader>
		<v-list-item-group :v-model="1" color="primary">
			<v-list-item v-for="(item, i) in courses" :key="i" @click="$router.push(`details/course?id=${item.id}`)">
				<v-list-item-avatar>
					<v-img :src="item.image || 'https://cdn1.iconfinder.com/data/icons/6-1/48/20-512.png'"></v-img>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title v-text="item.name"></v-list-item-title>
					<v-list-item-subtitle v-html="item.description"></v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
		</v-list-item-group>
	</v-list>
</template>

<script>
export default {
	name: 'CoursesList',

	props: {
		courses: {
			type: Array,
			default: []
		}
	}
};
</script>

<style scoped>
</style>