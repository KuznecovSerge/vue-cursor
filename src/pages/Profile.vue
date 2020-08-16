<template>
	<div>
		<div class="row justify-content-end">
			<div class="cabinet-change">
				<button 
					:class="['btn', ($route.name == 'studentSection') ? 'active' : '']"
					@click="$router.push('/profile/')"
				>
					Кабинет ученика
				</button><button 
					:class="['btn', ($route.name == 'teacherSection') ? 'active' : '']"
					@click="$router.push('/profile/teacher')"
				>
					Кабинет преподавателя
				</button><button class="btn">
					Блог
				</button>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'Profile'
};
</script>

<style>
.hovered {
	cursor: pointer;
}
.profile-links {
	display: flex;
	align-items: center;
}
.route-item {
	margin-right: 5px;
	color: #fff !important;
}

.profile-about {
	margin: 10px 0;
}

.save-form-button {
	margin-top: 5px;
}

.cabinet-change {
	position: relative;
	top: -36px;
}
@media (max-width: 768px) {
	.cabinet-change {
		position: relative;
		top: -10px;
	}
}
@media (max-width: 576px) {
	.cabinet-change-wraper {
		height: 60px;
	}
}

.cabinet-change button {
	border-radius: 0;
	border: 1px solid #E7E7E7;
}

.cabinet-change button:hover {
	background-color: rgb(235, 235, 235);
    transition: 0.4s all;
}

.cabinet-change button.active {
	background-color: #f58e15;
	border: 1px solid #f58e15;
	color: #fff;
}

.cabinet-change button.active:hover {
	background-color: #EA6200;;
    transition: 0.4s all;
}
.cabinet-change button.active:active {
	background-color: #DA5B00;;
}



</style>