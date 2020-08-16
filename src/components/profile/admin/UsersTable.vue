<template>
	<div class="users-container">
		<b-table striped bordered hover fixed :fields="fields" :items="users" responsive="sm">
			<template v-slot:cell(actions)="data">
				<UsersActions :user="data.item" />
			</template>
		</b-table>
		<v-pagination
			total-visible="10"
			class="pagination-catalogs"
			@input="onChangePage"
			v-model="filter.current_page"
			:length="filter.totalPages"
		></v-pagination>
	</div>
</template>

<script>
import UsersActions from '@/components/profile/admin/UsersActions';

export default {
	props: {},

	data: () => ({
		fields: [
			{ key: 'id', label: 'Идентификатор пользователя' },
			{ key: 'email', label: 'Почтовый адрес' },
			{ key: 'actions', label: 'Действия' }
		],

		filter: {
			perPage: 10,
			totalPages: 1,
			totalRows: 0,
			current_page: 1
		},

		users: new Array()
	}),

	async created() {
		const res = await this.$http.get('/api/users/count');
		if (!res || !res.data.count) {
			return;
		}
		this.updateFilter(res.data.count);
		this.fetchData();
	},

	components: {
		UsersActions
	},

	methods: {
		onChangePage(page) {
			this.filter.current_page = page;
			this.fetchData();
		},

		updateFilter(count) {
			this.filter.totalRows = count;
			this.filter.totalPages = Math.ceil(
				this.filter.totalRows / this.filter.perPage
			);
		},

		async fetchData() {
			const model = {
				limit: this.filter.perPage,
				offset: this.filter.current_page * this.filter.perPage
			};

			const res = await this.$http.get('/api/users', {
				params: model
			});
			if (!res || !res.data.items) {
				return;
			}

			this.users = res.data.items;
		}
	}
};
</script>

<style scoped>
.users-container {
	margin: 10px;
}
</style>
