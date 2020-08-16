<template>
	<div class="search_input_container">
		<b-form-input
			class="search_input"
			:placeholder="placeholder"
			v-model="inputValue"
			outlined
			height="44px"
			flat
			dense
			@keyup.enter.native="$emit('search')"
		></b-form-input>
		<div class="magnifier">
			<img src="/assets/media/search.svg" />
		</div>
		<b-button
			class="my-2 my-sm-0 search_button"
			type="submit"
			@click="$emit('search')"
			v-if="hasbutton"
		>Поиск</b-button>
	</div>
</template>

<script>
export default {
	name: 'SearchInput',

	props: ['value', 'hasbutton', 'placeholder'],

	computed: {
		inputValue: {
			get() {
				return this.value;
			},

			set(value) {
				this.$emit('input', value);
			}
		}
	}
};
</script>

<style scoped>
.search_input_container {
	display: flex;
	width: 100%;
	position: relative;
}

.search_input_container input {
	width: 100%;
}

.search_input {
	width: calc(100% - 45px);
	height: 40px;
	margin-left: 0 !important;
	margin-right: 0 !important;
	background: #fff;
	position: relative;
	padding-left: 50px;
}
.magnifier {
	position: absolute;
	left: 10px;
	top: 8px;
}
.search_input:focus {
	box-shadow: none;
	border-color: #e5e3eb;
}

.search_button {
	height: 40px;
	width: 116px;
	background-color: #f58e15;
	border: none;
	position: absolute;
	right: 0;
	clip-path: polygon(15% 0%, 100% 0%, 100% 100%, 15% 100%, 0% 50%);
	transition: 0.4s all;
	border-radius: 0px;
}

.search_button:hover {
	transition: 0.4s all;
	background-color: #ea6200;
}

.search_button:focus {
	box-shadow: none;
}

.search_button:active:focus {
	box-shadow: none !important;
}

>>> .el-input__inner {
	width: calc(100% - 45px);
	height: 40px !important;
	border: 1px solid #ced4da !important;
	border-radius: 0.25rem;
	font-size: 14px !important;
	color: black !important;
}
</style>