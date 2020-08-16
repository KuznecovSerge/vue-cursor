<template>
	<div class="comments">
		<comment-input @create="addComment" />
		<div class="comments__header" v-if="rootItems.length">
			<slot name="header"></slot>
		</div>
		<v-list v-if="comments.length" class="comments__list">
			<comment-item v-for="(item, index) in rootItems" 
										:item="item" 
										:index="index" 
										:key="index" 
										:id="item.id" 
										@comment-added="$emit('create', $event)"
			/>
		</v-list>
	</div>
</template>

<script>
import CommentItem from './comments/comment';
import CommentInput from './comments/input';
const VList = () => import(/* webpackChunkName: "vuetify" */'@/plugins/v-list');

export default {
	components: {
		CommentItem,
		CommentInput,
		VList
	},

	props: ['entityId', 'referenceId'],

	data: () => {
		return {
			comments: []
		};
	},

	computed: {
		rootItems() {
			return this.comments
				? this.comments
						.filter(comment => !comment.parent)
						.sort((a, b) => a.createdAt - b.createdAt)
						.reverse()
			: [];
		}
	},

	created() {
		const request = {
			entityId: this.entityId,
			referenceId: this.referenceId
		};

		if (!request.entityId || !request.referenceId) {
			console.error(
				`Компоненту <Comments/> требуется передать entityId и referenceId`
			);
			return;
		}

		this.$http.get('/api/comments', {
				params: request
		}).then(({ data }) => {
				const { items } = data;

				if (items) {
					this.comments = items;
				}
		});
	},

	methods: {
		addComment(comment) {
			const { entityId, referenceId } = this;
			const _comment = {
				entityId,
				referenceId,
				comment
			};
			this.$http.post('/api/comments', _comment).then(({ data }) => {
				const { comment } = data;

				this.comments.push(comment);
				this.$emit('create', comment);
			});
		}
	}
};
</script>

<style lang="less">
.comments {
	width: 100%;

	.comments__count {
		font-weight: 500;
		font-size: 18px;
		line-height: 23px;
		color: @black;
		margin-bottom: 40px;
	}

	.author-button {
		font-size: 14px;
		color: @gray-300;
		cursor: pointer;
		font-weight: 500;

		&:hover {
			color: @hoverElement;

			svg path {
				fill: @hoverElement;
			}
		}

		&:active {
			color: @pressElement;

			svg path {
				fill: @pressElement;
			}
		}
	}
}
</style>