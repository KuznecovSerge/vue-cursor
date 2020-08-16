<template>
	<div class="mc-journal-card" :class="
  [
    type ? 'mc-journal-card--' + type : ''
  ]">
		<div
			:style="{'background-image': `url('/public/assets/media/${journal.image}')`}"
			class="mc-journal-card__icon"
		>
			<div class="mc-journal-card__icon--overlay"></div>
		</div>
		<div class="mc-journal-card-body">
			<div class="mc-journal-card__header">
				<span class="mc-journal-card-body__date">{{ journal.createdAt | moment('Do MMM YYYY') }}</span>
				<div class="mc-journal-card-body__events">
					<div class="mc-journal-card-body__comments">
						<simple-svg
							stroke-class-name="stroke"
							stroke="white"
							width="18px"
							height="18px"
							:src="`/assets/media/comments.svg`"
						/>
						{{ journal.commentsCount }}
					</div>
					<div class="mc-journal-card-body__likes">
						{{ journal.likesCount }}
						<span>
							<simple-svg
								fill-class-name="fill"
								fill="white"
								width="18px"
								height="18px"
								src="/assets/media/like.svg"
							/>
						</span>
					</div>
				</div>
			</div>
			<span class="mc-journal-card-body__title" @click="$router.push(`/journal/${journal.id}`)">{{ journal.title }}</span>
			<span class="mc-journal-card-body__content">
        <tiny-editor :value="journal.content" :inline="true" :readonly="true" :disabled="true"/>
			</span>
			<div class="mc-journal-card-body__footer">
				<div class="mc-journal-card-body__tags tags">
					<div
						class="tags__item"
						:class="{'tags__item--small': !type}"
						v-for="(item, index) in journal.tags"
						:key="index"
					>
						<span>{{ item.name }}</span>
					</div>
				</div>
				<div class="mc-journal-card-body__events">
					<div class="mc-journal-card-body__comments">
						<simple-svg width="18px" height="18px" :src="`/assets/media/comments.svg`" />
						{{ journal.commentsCount }}
					</div>
					<div class="mc-journal-card-body__likes">
						{{ journal.likesCount }}
						<simple-svg class="mc-button" width="18px" height="18px" src="/assets/media/like.svg" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import moment from 'moment';
import TinyEditor from '@/components/common/TinyEditor';

export default {
	props: ['journal', 'type'],

	components: { TinyEditor }
};
</script>

<style lang="less">
.mc-journal-card {
	display: flex;
	flex-direction: column;

	&__icon {
		flex: 0 0 290px;
		max-height: 194px;
		border: 1px solid rgba(0, 0, 0, 0.1);
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
	}

	.mc-journal-card-body {
		display: flex;
    flex-direction: column;
    flex-grow: 1;

		.mc-journal-card__header {
			margin-top: 18px;

			.mc-journal-card-body__events {
				display: none;
			}
		}

		&__date {
			font-size: 12px;
			line-height: 144%;
			color: @gray-300;
		}

		&__title {
			font-size: 16px;
			line-height: 150%;
			color: @black;
			margin-top: 17px;
      font-weight: 500;
      cursor: pointer;
		}

		&__content {
			display: none;
		}

		&__footer {
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap;
			margin-top: 16px;

			.mc-journal-card-body__events {
				display: flex;
				width: 100%;
				flex-direction: row;
				justify-content: space-between;
				margin-top: 10px;
			}

			.mc-journal-card-body__comments,
			.mc-journal-card-body__likes {
				font-weight: 500;
				display: flex;
				align-items: center;
			}

			.mc-journal-card-body__comments svg {
				margin-right: 10px;
			}

			.mc-journal-card-body__likes svg {
				margin-left: 10px;
			}
		}

		&__tags {
			max-width: 100%;
		}
	}
}

.mc-journal-card.mc-journal-card--flat {
	flex-direction: row;
	max-width: 100%;

	.mc-journal-card-body {
		margin-left: 32px;

		.mc-journal-card__header {
			margin-top: 0;
		}

		&__content {
			display: block;
			font-size: 14px;
			line-height: 20px;
			color: @gray-300;
			margin-top: 8px;
			word-break: break-word;
      white-space: normal;
      max-height: 38px;
      overflow: hidden;
		}

		&__footer {
			margin-top: 27px;

			.mc-journal-card-body__tags {
				.tags__item {
					margin-bottom: 0;
				}
			}

			.mc-journal-card-body__events {
				width: 40%;
				justify-content: flex-end;

				> div:first-child {
					margin-right: 24px;
				}
			}
		}

		&__tags {
			max-width: 60%;
		}
	}
}

.mc-journal-card.mc-journal-card--full {
	position: relative;
	height: 396px;
	max-width: 100%;

	.mc-journal-card__icon--overlay {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background-color: rgba(0, 0, 0, 0.4) !important;
	}

	.mc-journal-card__header {
		display: flex;
		justify-content: space-between;
		margin-top: 28px;

		.mc-journal-card-body__events {
			display: flex;
			color: white;

			> div:first-child {
				margin-right: 32px;
			}

			.mc-journal-card-body__comments svg {
				margin-right: 11px;
			}

			.mc-journal-card-body__likes span {
				background: rgba(0, 0, 0, 0.2);
				border: 1px solid #ffffff;
				padding: 10px;
				margin-left: 17px;
			}
		}
	}

	.mc-journal-card__icon {
		max-height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.mc-journal-card-body {
		flex-direction: column-reverse;
		position: absolute;
		bottom: 0;
		padding: 40px;

		&__date {
			font-size: 12px;
			line-height: 144%;
			color: @white;
		}

		&__title {
			font-size: 32px;
			line-height: 130%;
			color: @white;
			max-width: 540px;
		}

		&__content {
			display: none;
		}

		&__footer {
			.mc-journal-card-body__tags {
				margin-top: 18px;

				.tags__item {
					background-color: transparent;
					color: white;
					border: 1px solid white;
				}
			}

			.mc-journal-card-body__events {
				display: none;
			}
		}
	}
}
</style>