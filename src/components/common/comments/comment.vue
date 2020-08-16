<template>
	<div class="comment-container">
		<v-list-item
			v-bind:key="item.id"
			class="comment-item"
			v-bind:class="{ 'comment-item__child': !!commentElement.parent, 'comment-item__owner': isOwner }"
		>
			<div class="comment-item__body">
				<div class="comment-item__profile profile">
					<b-img class="profile__avatar" :src="avatar"></b-img>
				</div>
				<div class="comment-item__content content">
					<div class="content__info">
						<span class="content__name">{{ this.currentUser.firstName + ' ' + this.currentUser.lastName }}</span>
						<span
							class="content__date"
							v-if="commentElement.createdAt"
						>{{commentElement.createdAt | moment("from", "now")}}</span>
						<div class="content__rate" v-if="!item.parent && item.rate">
							<mc-rate :value="item.rate" />
						</div>
					</div>
					<div class="content__payload payload" :class="{'payload_exceeded': lengthExceeded }">
						<span
							class="payload__text"
						>{{ lengthExceeded ? commentElement.comment.slice(0, 400) + '...' : commentElement.comment }}</span>
						<span
							v-if="lengthExceeded"
							class="mc-button payload__exceed"
							@click="lengthExceededEnabled = false"
						>Читать полностью</span>
						<span
							v-if="!lengthExceededEnabled"
							class="mc-button payload__exceed"
							@click="lengthExceededEnabled = true"
						>Скрыть</span>
					</div>
					<div class="content__actions actions">
						<div class="actions mc-button" @click="setLike(true)">
							<simple-svg
								class="mc-button"
								fill-class-name="fill"
								:fill="commentElement.likeStatus ? '#F58E15' : ''"
								width="24px"
								height="24px"
								src="/assets/media/like.svg"
							/>
							<span class="actions__text">{{ commentElement.likes }}</span>
						</div>
						<div class="actions mc-button" @click="setLike(false)">
							<simple-svg
								class="mc-button"
								fill-class-name="fill"
								:fill="commentElement.likeStatus !== null && !commentElement.likeStatus ? '#F58E15' : ''"
								width="24px"
								height="24px"
								src="/assets/media/dislike.svg"
							/>
							<span class="actions__text">{{ commentElement.dislikes }}</span>
						</div>
						<div class="actions actions__reply" v-if="item.deepLevel < 4">
							<span class="mc-button" @click="replyEnabled = !replyEnabled">Ответить</span>
						</div>
					</div>
					<div class="content__reply reply" v-if="replyEnabled">
						<comment-input @cancel="replyEnabled = !replyEnabled" @create="addComment" />
					</div>
					<template v-if="moreThanOneComment">
						<div class="content__additional-comments">
							<span
								v-if="commentExceededEnabled"
								class="mc-button"
								@click="commentExceededEnabled = false"
							>{{ additionalComments }}</span>
							<span v-else class="mc-button" @click="commentExceededEnabled = true">Скрыть комментарии</span>
						</div>
					</template>
					<div
						v-if="commentElement.children.length && (!moreThanOneComment || moreThanOneComment && !commentExceededEnabled)"
						class="content__children"
					>
						<comment-item
							v-for="children in commentElement.children"
							v-bind:key="children.id"
							:item="children"
							:index="children.id"
							:id="children.id"
							@comment-added="$emit('comment-added', $event)"
						/>
					</div>
				</div>
			</div>
		</v-list-item>
	</div>
</template>

<script>
import CommentInput from './input';
import McRate from '@/components/common/mc-rate';
const VListItem = ({}) => import(/* webpackChunkName: "vuetify" */'@/plugins/v-list-item');

export default {
	props: ['item', 'index'],

	data: () => {
		return {
			lengthExceededEnabled: true,
			commentExceededEnabled: false,
			replyEnabled: false,
			commentData: {}
		};
	},

	components: {
		CommentItem: () => import('./comment'),
		CommentInput,
		McRate,
		VListItem
	},

	computed: {
		avatar() {
			return this.item.user.avatar || '/assets/media/avatar_author.png';
		},
		commentElement() {
			const { item, commentData } = this;

			return { ...item, ...commentData };
		},

		isOwner() {
			const { item, currentUser } = this;

			return item.userId === currentUser.id;
		},

		lengthExceeded() {
			const { commentElement, lengthExceededEnabled } = this;

			return (
				commentElement.comment &&
				commentElement.comment.length > 400 &&
				lengthExceededEnabled
			);
		},

		moreThanOneComment() {
			return this.commentElement && this.commentElement.children.length > 1;
		},

		additionalComments() {
			const { commentElement } = this;
			const length = commentElement.children.length;

			return `Показать ${length} ${this.sklonenie(length, [
				'ответ',
				'ответа',
				'ответов'
			])}`;
		}
	},

	methods: {
		addComment(comment) {
			if (!comment) this.replyEnabled = !this.replyEnabled;
			const { entityId, referenceId, id } = this.commentElement;

			const _comment = {
				entityId,
				referenceId,
				comment,
				parent: id
			};

			this.$http.post('/api/comments', _comment).then(({ data }) => {
				const { comment } = data;

				this.item.children.push(comment);
				this.replyEnabled = false;
				if (this.commentExceededEnabled) {
					this.commentExceededEnabled = false;
				}

				this.$emit('comment-added', comment);
			});
		},

		setLike(value) {
			const { currentUser, item, $http } = this;

			$http
				.post(`/api/comments/${item.id}/like`, {
					like: value
				})
				.then(({ data }) => {
					this.commentData = data.comment;
				});
		}
	},

	watch: {
		item: {
			immediate: true,
			handler: function(newItem, oldItem) {
				const children = newItem.children;

				this.commentExceededEnabled = children.length > 1;
			}
		}
	}
};
</script>

<style lang="less">
.comment-container {
	&:not(:last-of-type) {
		padding-bottom: 30px;
	}

	.comment-item {
		min-height: 28px;
		padding-left: 0px;
		padding-right: 0px;

		&__body {
			display: flex;
			flex-direction: row;
			width: 100%;
		}

		&__content {
			display: flex;
			flex-direction: column;
			width: 100%;
			padding-top: 12px;
		}

		&__header {
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		.actions {
			&__text {
				color: @gray-300;
				padding: 0 28px 0 15px;
			}
		}

		.profile {
			&__avatar {
				height: 48px;
				width: 48px;
			}
		}

		.payload {
			display: flex;
			flex-direction: column;

			&__text {
				white-space: normal;
				word-break: break-word;
			}

			&__exceed {
				padding-top: 8px;
			}
		}

		.payload_exceeded {
			max-height: 160px;
			overflow: hidden;
		}

		.content {
			padding-left: 22px;

			&__info {
				display: flex;
			}

			&__name,
			&__date {
				font-size: 14px;
				line-height: 24px;
			}

			&__name {
				font-weight: 500;
			}

			&__rate {
				margin-left: auto;
			}

			&__date {
				margin-left: 24px;
				color: @gray-300;
			}

			&__payload {
				padding-top: 12px;
				font-size: 14px;
				line-height: 20px;
			}

			&__children {
				padding-top: 28px;
			}

			&__additional-comments {
				padding-top: 20px;
			}

			&__actions {
				display: flex;
				align-items: center;
				padding-top: 18px;
			}
		}

		&__content {
			display: flex;
		}
	}
}
</style>