<template>
	<v-card class="mr-4">
		<v-card-text>
			<div>Статистика продаж</div>
			<p class="display-1 text--primary">Баланс</p>
			<div class="d-flex flex-column" v-if="stat">
				<div class="d-flex justify-space-between">
					<span>Колличество продуктов</span>
					<span>{{ stat.productsCount }}</span>
				</div>
				<div class="d-flex justify-space-between">
					<span>Колличество продаж</span>
					<span>{{ stat.productsSold }}</span>
				</div>
				<div class="d-flex justify-space-between">
					<span>Колличество просмотров</span>
					<span>{{ stat.seenCount }}</span>
				</div>
				<div class="d-flex justify-space-between font-weight-bold title">
					<span>Выручка:</span>
					<span>{{ stat.revenue }}p</span>
				</div>
			</div>
		</v-card-text>
		<div class="d-flex justify-end pr-2 pb-2">
			<v-btn small color="primary" @click="onCashOut">Вывод</v-btn>
		</div>
	</v-card>
</template>

<script>
export default {
	name: 'Balance',

	data: () => ({
		stat: new Object()
	}),

	beforeCreate() {
		this.$http
			.get('/api/users/stat')
			.then(res => {
				this.stat = res.data.stat;
			})
			.catch(err => {
				console.log(err);
			});
	},

	methods: {
		onCashOut() {
			window.alert('Позже сделаем вывод средств!:)');
		}
	}
};
</script>

<style scoped>
</style>