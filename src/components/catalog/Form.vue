<template>
	<div class="search_input_container">
		<b-form-input
			class="search_input"
			:placeholder="placeholder"
			v-model="email"
			outlined
			height="48px"
			flat
			dense
			@submit.prevent="sending"
			:rules="[
                (v) => !!v || 'Введите email',
            	rules.email
            ]"
		></b-form-input>
		<b-button class="my-2 my-sm-0 submit_button" type="submit" @click.prevent="sending">Отправить</b-button>
	</div>
</template>

<script>
export default {
	name: 'Form',

	props: {},

	data: () => ({
		placeholder: 'Ваш Email для обратной связи',
		email: '',
		rules: {
			email: v => {
				const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return pattern.test(v) || 'Неверный e-mail';
			}
		}
	}),

	methods: {
		sending() {
			// метода на отправку писем еще нет, решил не реализовывать костылями
			// let formData = new FormData();
			// formData.append("email", this.email);
			// this.$http
			// .post('/api/emails/')
			// .then(res => {
			// })
			// .catch(error => {
			//     console.log(error);
			// });
		}
	}
};
</script>

<style scoped>
.search_input_container {
	display: flex;
	width: 100%;
	position: relative;
	margin-top: 40px;
}
.search_input {
	width: calc(100% - 45px);
	height: 48px;
	margin-left: 0 !important;
	margin-right: 0 !important;
	padding-right: 45px;
	background: #2f3943;
	color: #fff;
}

.search_input:focus {
	box-shadow: none;
	border-color: #e5e3eb;
}

.submit_button {
	height: 48px;
	width: 163px;
	background-color: #f58e15;
	border: none;
	border-radius: 0;
	position: absolute;
	right: 0;
	color: #fff;
	transition: 0.4s all;
}
.submit_button:hover {
	background-color: #ea6200;
	transition: 0.4s all;
}
button:focus {
	outline: 0;
	box-shadow: none;
}
button:active {
	outline: 0;
	box-shadow: none;
}
</style>