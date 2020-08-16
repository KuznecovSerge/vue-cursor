<template>
	<div class="popular-wrapper-container mt-5">
		<div>Популярные категории</div>
		<div class="d-flex justify-space-between flex-wrap" v-if="categories">
			<div v-for="category in categories.slice(0, limit)" :key="category.id">
				<v-hover v-slot:default="{ hover }">
					<div>
						<v-card
							@click="onSelectCategory(category)"
							class="mt-4 popular-category"
							:elevation="hover ? 12 : 2"
						>{{category.name}}</v-card>
					</div>
				</v-hover>
			</div>
		</div>
		<v-btn class="mt-5" color="warning" v-if="limit < categories.length" @click="showNext">Ещё</v-btn>
	</div>
</template>

<script>
export default {
	props: {},

	data: () => ({
		categories: [],
		limit: 12
	}),

	beforeCreate() {
		this.$http
			.get('/api/catalog/category', {
				params: {
					topOnly: true
				}
			})
			.then(res => {
				this.categories = res.data.items;
			});
	},

	methods: {
		showNext() {
			const length = this.categories.length;
			if (this.limit < length) {
				const diff = length - this.limit;
				if (diff > 4) {
					this.limit += 4;
				} else {
					this.limit += diff;
				}
			}
		},

		onSelectCategory(category) {
			this.$router.push(`/catalog?categoryId=${category.id}`);
		}
	}
};
</script>

<style scoped>
.popular-category {
	min-height: 40px;
	align-items: center;
	display: flex;
	justify-content: center;
	word-break: break-all;
	width: 350px;
	min-width: 200px;
	cursor: pointer;
}
</style>