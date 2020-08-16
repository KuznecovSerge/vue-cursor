<template>
	<div class="mc-cascader-wrapper">
		<span class="mc-cascader__icon">
			<slot name="icon"></slot>
		</span>
		<el-cascader
			class="mc-cascader"
			popper-class="menu_dropdown_cascader"
			:options="options"
			:props="props"
			:show-all-levels="true"
			:placeholder="placeholder"
			:clearable="clearable"
			@change="$emit('change', $event)"
			v-model="cascaderValue"
		/>
	</div>
</template>

<script>
export default {
	props: ['value', 'options', 'props', 'placeholder', 'clearable'],

	computed: {
		cascaderValue: {
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

<style lang="less">
.mc-cascader-wrapper {
	position: relative;

	.mc-cascader__icon img {
		position: absolute;
		top: 8px;
		left: 10px;
		z-index: 999;
	}

	.mc-cascader {
		width: 100%;
		
		.el-cascader-node__label {
			font-weight: 500;
			color: #222222;
		}
		.el-cascader-node {
			&:not(.is-disabled) {
				&:focus {
					background: #f58e15;
				}
				&:hover {
					background: #f58e15;
				}
			}
		}
		.el-input--suffix {
			.el-input__inner {
				padding-left: 40px;
				border-radius: unset;
			}
		}
	}
}
</style>