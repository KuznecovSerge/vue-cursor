<template>
	<div class="comment-input">
		<div class="comment-input__body input-content">
			<div class="input-content__avatar">
				<b-img :src="avatarImg" />
			</div>
			<div class="input-content__payload payload">
				<div class="payload__input">
					<input 
						v-if="!textarea" 
						@focus="focused = true" 
						@keydown.enter="create" 
						class="input-content__input" 
						v-model="message" type="text" 
						placeholder="Напишите ваш ответ" 
					/>
					<textarea 
						v-if="textarea" 
						@focus="focused = true" 
						ref="area" 
						v-model="message" 
						class="input-content__input" 
						placeholder="Напишите ваш ответ" 
					/>
				</div>
				<div class="payload__buttons">
					<template v-if="focused">
						<span class="mc-button" @click="cancel">Отменить</span>
						<span class="mc-button" @click="create">Ответить</span>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {

	props: {
		textarea: {
            default: false
		},
		autofocus: {
			default: false
		}
	},

	data: () => {
		return {
			message: '',
			subComments: [],
			focused: false
		};
	},

	computed: {
		userId() {
			return this.currentUser.id;
		},
		avatarImg() {
			return this.currentUser.avatar ?? 'https://cdn.vuetifyjs.com/images/lists/1.jpg';
		}
	},

	mounted(){
		if (this.autofocus) {
			setTimeout(() => {
				this.$refs.area.focus();
			}, 100)
		}
	},

	methods: {
		create() {
			if (!this.message.trim()) {
				return;
			}

			this.$emit('create', this.message);
			this.message = "";
		},

		cancel() {
			this.$emit('cancel');

			this.message = "";
			this.focused = false;
		}
	}
};
</script>

<style lang="less">
.comment-input {
	padding-top: 24px;

	&__body {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.input-content {
		max-height: 48px;

		&__avatar {
			img {
				width: 48px;
				height: 48px;
			}
		}

		&__payload {
			display: flex;
			flex-direction: column;
			width: 100%;
			margin-left: 22px;
			padding-top: 10px;

			.payload {
				&__input {
					border-bottom: 1px solid @border-color;
				}

				&__buttons {
					display: flex;
					flex-direction: row;
					justify-content: flex-end;
					align-items: center;
					padding-top: 10px;
					min-height: 32px;

					.mc-button {
						padding-left: 10px;
					}
				}
			}
		}

		&__input {
			font-size: 14px;
			line-height: 24px;
			width: 100%;

			&::placeholder {
				color: @gray-300;
			}

			&:focus {
				outline: none;
			}
		}
	}
}
</style>