<template>
	<div class="mc-product-item">
		<b-col cols="12 pl-0">
			<b-card class="product-card">
				<b-card-img :src="product.image" class="product-card__avatar" />
				<span
					class="product-card__sale-count"
					v-if="product.sales"
				>Этот товар купили {{ product.sales.count }} раз</span>
				<b-card-text class="product-card__body">
					<div class="product-card__title">{{product.title}}</div>
					<div
						class="product-card__categories"
						v-for="category in product.categories"
						v-bind:key="category.id"
					>
						<div class="d-flex justify-center">
							<b-button
								class="product-card__category"
								@click="handleCategory(category)"
							>{{ category.name }}</b-button>
						</div>
					</div>
				</b-card-text>
			</b-card>
			<b-card outlined class="author-card" :hover="clickable">
				<div class="author-card__name" @click="$router.push(`/authors/${product.author.id}`)">
					<img class="author-card__avatar" src="/assets/media/author-big.png" />
					<div class="author-card__title">
						{{product.author.firstName + " " + product.author.lastName}}
						<div class="author-card__ask" @click.stop="askVisible = true">
							<simple-svg width="24px" height="24px" :src="`/assets/media/question.svg`" />
							<span class="mc-button">Задать вопрос</span>
							<author-ask v-model="askVisible" :authorId="author.id" />
						</div>
					</div>
				</div>
				<div class="author-skills" v-if="skills.length">
					<div class="author-skills__title">Чему вы научитесь?</div>
					<ul class="author-skills__skills" v-for="(skill,index) in skills" :key="skill.id">
						<li class="author-skills__item">
							<img src="/assets/media/backDigits.png" />
							<span class="author-skills__index">{{index+1}}</span>
							<span class="author-skills__name">{{skill}}</span>
						</li>
					</ul>
				</div>
				<div class="author-video">
					<product-video :data="product.video" />
				</div>
				<div class="author-description" v-if="product.description">
					<span class="author-description__title">О курсе</span>
					<div class="author-description__text">
						<tiny-editor :content="product.description" :inline="true" :disabled="true"/>
					</div>
				</div>
			</b-card>
			<slot name="comments"></slot>
		</b-col>
	</div>
</template>

<script>
import AuthorAsk from '@/components/author/AuthorAsk';
import TinyEditor from '@/components/common/TinyEditor';
import ProductVideo from "./Video/ProductVideo";

export default {
	components: {
		AuthorAsk,
		TinyEditor,
		ProductVideo
	},
	props: ['product', 'skills', 'clickable', 'favorite'],

	data: () => {
		return {
			askVisible: false,
			author: {}
		};
	},

	methods: {
		handleCategory(category) {
			const { id, parent } = category;
			const { entityId } = this.product;

			let url = `/catalog?categoryId=${parent ?? id}&type=${entityId}`;
			if (parent) {
				url += `&subCategoryId=${id}`;
			}

			this.$router.push(url);
		}
	}
};
</script>

<style lang="less">
.mc-product-item {
	.product-card {
		border: 1px solid #e7e7e7;
		transition: 0.4s all;
		margin-top: 50px;
		color: #222222;

		.product-card__avatar {
			width: 200px;
			height: 200px;
			overflow: auto;
			position: absolute;
			top: -47px;
			left: -12px;
			margin-left: 40px;
		}

		.product-card__body {
			padding-left: 32%;
		}

		.product-card__sale-count {
			position: absolute;
			top: -40px;
			right: 0;
			font-weight: 500;
			font-size: 12px;
			line-height: 24px;
			color: @gray-300;
		}

		.product-card__title {
			font-weight: 500;
			font-size: 26px;
			line-height: 36px;
			display: flex;
			justify-content: flex-end;
			margin-top: 10px;
		}

		.product-card__categories {
			display: flex;
			justify-content: flex-start;
			align-self: center;
		}

		.product-card__category {
			font-size: 12px;
			line-height: 16px;
			text-align: center;
			color: @black;
			background: #f3f3f3;
			border: none;
			padding: 6px 12px;
			margin: 60px 0 0 0;
			transition: 0.4s all;

			&:hover {
				background: #a6a6a6;
				transition: 0.4s all;
			}
		}
	}

	.author-card {
		border: none;
		margin: 30px 0 57px;

		.card-body {
			padding: 10px 0 0 0;
		}

		&:hover {
			box-shadow: none;
		}

		.author-card__name {
			font-weight: 500;
			font-size: 18px;
			line-height: 23px;
			display: flex;
			justify-content: flex-start;
		}

		.author-card__title {
			display: flex;
			flex-direction: row;
			margin-left: 32px;

			.author-card__ask {
				margin-left: 25px;
			}
		}
	}

	.author-skills {
		.author-skills__title {
			font-weight: bold;
			font-size: 28px;
			line-height: 36px;
			margin-top: 40px;
			margin-bottom: 30px;
		}

		.author-skills__skills {
			list-style-type: none;
			padding-left: 0;
		}

		.author-skills__item {
			position: relative;
			margin-bottom: 24px;
		}

		.author-skills__index {
			position: absolute;
			top: 5px;
			left: 10px;
			color: #fff;
			font-weight: 600;
		}

		.author-skills__name {
			margin-left: 23px;
			font-size: 17px;
			line-height: 26px;
		}
	}

	.author-video {
		margin: 56px 0;
	}

	.author-description {
		padding-bottom: 40px;
		border-bottom: 1px solid #E7E7E7;

		.author-description__title {
			font-weight: bold;
			font-size: 28px;
		}

		.author-description__text {
			padding-top: 24px;
			font-size: 16px;
			line-height: 26px;
		}
	}
}
</style>