<template>
	<v-card>
		<v-tabs>
			<v-tab>Информация</v-tab>
			<v-tab>Список постов</v-tab>
			<v-tab>Пользователи</v-tab>
			<v-tab>Жалобы</v-tab>
			<v-tab-item>
				<b-btn @click="$router.push({ name: 'createJournal'})">Создать журнал</b-btn>
				<router-link :to="{ name: 'createJournal' }" class="btn btn-primary route-item">Создать журнал</router-link>
			</v-tab-item>
			<v-tab-item>
				<UsersPosts />
			</v-tab-item>
			<v-tab-item>
				<UsersTable />
			</v-tab-item>
			<v-tab-item>
				<UsersReports />
			</v-tab-item>
		</v-tabs>
	</v-card>
</template>

<script>
import UsersTable from './admin/UsersTable';
import UsersReports from './admin/UsersReports';
import UsersPosts from './admin/UsersPosts';

export default {
	name: 'AdminSection',

	components: {
		UsersTable,
		UsersReports,
		UsersPosts
	},

	data: () => ({
		users: new Array()
	}),

	beforeCreate() {}
};
</script>

<style scoped>
</style>