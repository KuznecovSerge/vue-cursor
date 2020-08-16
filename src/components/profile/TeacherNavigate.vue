<template>
    <div class="border navigate-card mb-5">
		<div class="pl-5">
			<img class="teacher-photo" :src="this.avatar"/>
		</div>
		<h5 class="pl-5">{{this.currentUser.firstName}} {{this.currentUser.lastName}}</h5>
		<hr/>
		<ul class="list-group pl-0">
			<template v-for="(item, index) in navigateList">
				<li :key="index"
					 class="list-group-item navigate-item"
					 @click="navigate(index)"
				>
					<simple-svg
						width="24px"
						height="24px"
  						:src="`/assets/media/${item.icon}.svg`"
						stroke-class-name="stroke"
						:stroke="(index == selectedItem) ? '#F58E15' : '#C9C9C9'"
					/>
					<span class="pl-2">{{item.name}}</span>
				</li>
				<hr v-if="index==5"/>
			</template>
		</ul>
		<div class="navigate-card__addcourse">
			<button 
				class="mc-btn-orange l"
				@click="$router.push('/newproduct')"
			>
				Добавить новый курс
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'TeacherNavigate',
	computed: {
		avatar() {
			return this.currentUser.avatar ? this.currentUser.avatar : '/assets/media/avatar_author.png';
		}
	},
	data() {
		return {
			selectedItem: 1,
			navigateList: [
				{
					name: 'Панель управления',
					icon: 'control',
					component: 'AdminSection'
				},
				{
					name: 'Мои продукты',
					icon: 'products',
					component: 'TeacherProducts'
				},
				{
					name: 'Статистика',
					icon: 'pulse',
					component: 'TeacherProducts'
				},
				{
					name: 'Сообщения',
					icon: 'message',
					component: 'TeacherProducts'
				},
				{
					name: 'История транзакций',
					icon: 'money',
					component: 'TeacherProducts'
				},
				{
					name: 'Настройки',
					icon: 'settings',
					component: 'PartnerSection'
				},
				{
					name: 'Поддержка',
					icon: 'support',
					component: 'TeacherProducts'
				},
			]

		}
	},
	methods: {
		navigate(index) {
			this.selectedItem = index;
			this.$emit('input', this.navigateList[index].component);
		}
	}
};
</script>

<style lang="less">
.navigate-card {
	width: 290px;
	height: 100%;

	&__addcourse {
		width: 100%;
		padding: 32px;
		button {
			width: 100%;
		}
	}
}
.teacher-photo {
	position: relative;
	top: -20px;
	width: 116px;
}
.navigate-item{
	border: 0px;
	cursor: pointer;
}
.navigate-item :hover{
	color: #F58E15;
}
.navigate-card button {
	background-color: #f58e15;
	border-color: #f58e15;
	color: #fff;
	border-radius: 0;
}

</style>