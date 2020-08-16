<template>
	<div class="monecle-author row">
		<template v-if="!loading">
			<div class="monecle-author__body col-12">
				<div class="row">
					<div class="monecle-author__left sm-4 col-9">
						<div class="monecle-author__about about">
							<b-img class="about__avatar white--text col-2" eager :src="avatar"></b-img>
							<div class="about__info col-10" v-scroll="scrollTop">
								<div class="about__name">
									<h3 class="b-cards-title">{{ author.firstName }} {{ author.lastName}}</h3>
									<b-button class="about__subscribe" @click="subscribe('remove')" v-if="author.subscribe">Отписаться от автора</b-button>
									<b-button class="about__subscribe" @click="subscribe('add')" v-else>Подписаться на автора</b-button>
								</div>
								<div class="about__content">
									<div>
										<mc-rate
											v-model="author.ball"
											:readonly="true"
										/>
									</div>
									<span>{{ author.productsCount}} {{ sklonenie(author.productsCount, ['продукт', 'продукта', 'продуктов']) }}</span>
									<div>
										<simple-svg
											width="24px"
											height="24px"
											:src="`/assets/media/comments.svg`"
										/>
										<span>{{ author.commentsCount }} {{ sklonenie(author.commentsCount, ["отзыв", "отзыва", "отзывов"]) }}</span>
									</div>
									<div>
										<simple-svg
											width="24px"
											height="24px"
											:src="`/assets/media/question.svg`"
										/>
										<span 
											class="mc-button"
											@click="askVisible = true"
										>Задать вопрос автору</span>
										<AuthorAsk v-model="askVisible" :authorId="author.id" />
									</div>
								</div>
								<div class="about__footer">
									<div class="about__footer_tags tags">
										<div class="tags__item" v-for="(item, index) in author.categories" :key="index">
											<span>{{ item.name }}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="monecle-author__categories">
							<template v-if="author">
								<author-product-types :author="author" />
							</template>
						</div>
						<div class="monecle-author__description description">
							<div class="col-12">
								<div class="row">
									<h3>Подробнее об авторе</h3>
								</div>
								<div class="description__text row">
									<p v-if="author.descriptionAuthor">{{ author.descriptionAuthor }}</p>
									<p v-else>Автор пока не указал информацию о себе!</p>
								</div>
							</div>
						</div>
						<div class="monecle-author__putrate">
							<div class="d-flex">
								<span class="pr-8">Оцените автора</span>
								<mc-rate
									v-model="author.myRating"
									@change="putRate"
								/>
							</div>
							<div class="d-flex align-items-center">
								<span class="pr-8">Поделитесь статьей</span>
								<span><mc-socialshare/></span>
							</div>
						</div>
						<div class="monecle-author__comments comments">
							<div class="col-12">
								<div class="row">
									<comments :entityId="authorEntityId" :referenceId="Number($route.params.id)" @create='author.commentsCount++'>
										<template slot="header">
											<span class="comments__header">Отзывы об авторе</span>
										</template>
									</comments>
								</div>
							</div>
						</div>
					</div>
					<div class="monecle-author__right right col-3">
						<template v-if="blogs.length">
							<blog class="col-12" :blogs="blogs" />
						</template>
						<author-social class="right__social col-12" :vk="authorVk" />
						<div class="mt-8 sticky">
							<AuthorMini ref="authormini" :author="author" v-if="showAuthorMini" />
						</div>
					</div>
				</div>
			</div>
		</template>
		<template v-else></template>
	</div>
</template>

<script>
import Comments from '@/components/common/Comments';
import CatalogItem from '../components/catalog/CatalogItem';
import AuthorSocial from '@/components/author/SocialAuthor.vue';
import InfoAuthor from '@/components/author/InfoAuthor.vue';
import Blog from '@/components/author/Blog.vue';
import Compilation from '@/components/author/Compilation.vue';
import AuthorProductTypes from '@/components/author/ProductTypes';
import AuthorAsk from '@/components/author/AuthorAsk';
import AuthorMini from '@/components/author/AuthorMini.vue';
import McRate from '@/components/common/mc-rate';
import McSocialshare from '@/components/common/mc-socialshare';

export default {
	components: {
		CatalogItem,
		AuthorSocial,
		InfoAuthor,
		Blog,
		Compilation,
		Comments,
		AuthorProductTypes,
		AuthorAsk,
		AuthorMini,
		McRate,
		McSocialshare
	},

	directives: {
		scroll: {
			// определение директивы
			inserted: function (el, binding) {
				let f = function (evt) {
					if (binding.value(evt, el)) {
						window.removeEventListener('scroll', f)
					}
				}
				window.addEventListener('scroll', f);
			}
		}
	},

	data: function() {
		return {
			author: {},
			blogs: [],
			loading: true,
			subscribed: false,
			error: {},
			filter: {
				page: 1,
				total: 0,
				perPage: 10,
				rows: 0
			},
			askVisible: false,
			showAuthorMini: false,
		};
	},

	watch: {
		'$route.params.id': function(value) {
			this.loading = true;

			/**
			 * * Информация об авторе
			 */
			this.$http.get(`/api/users/authors/${value}`)
					.then(({ data }) => {
						this.author = data.items;
					}).finally(() => (this.loading = false));
		}
	},

	computed: {
		authorEntityId() {
			return this.CONST.Entities.Author;
		},

		avatar() {
			return this.author.avatar || '/assets/media/avatar_author.png';
		},
		authorVk() {
			const { authorSocial } = this.author;
			if (authorSocial.length > 1) {
				return authorSocial[1];
			}
			return '#';
		}
	},

	created() {
		this.loading = true;

		/**
		 * * Информация об авторе
		 */
		this.$http.get(`/api/users/authors/${this.$route.params.id}`)
			.then(({ data }) => {
				this.author = data.items;
		}).finally(() => (this.loading = false));
	},

	methods: {
		onChangePage(page) {
			this.filter.page = page;
			this.fetch();
		},

		subscribe(action) {
			this.$http.post('/api/users/authors/subscribe', {
				userId: this.currentUser.id,
				authorId: this.$route.params.id,
				action
			}).then(({ data }) => {
				this.author.subscribe = data.subscribe;
			});
		},

		putRate(rate) {
			this.$http.post('/api/users/authors/rate', {
				userId: this.currentUser.id,
				authorId: this.author.id,
				ball: rate
			}).then(({ data }) => {
				this.author.myRating = data.myRating;
				this.author.ball = data.ball;
			});
		},

		scrollTop: function (evt, el) {
			//координата верхнего блока автора (фото/фио/...) относительно окна
			const y = el.getBoundingClientRect().y;
			this.showAuthorMini = (y<1);
			return false;
		},

	}
};
</script>

<style lang="less">
.monecle-author {
	padding: 30px 0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;

	&__comments {
		.comments {
			&__header {
				padding: 28px 0;
				font-size: 28px;
				font-weight: bold;
			}
		}
	}

	&__body {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		.row {
			flex-wrap: nowrap;
		}
	}

	&__left {
		padding-left: 0px;
		margin-right: 16px;
	}

	&__right {
		margin-right: -35px;
		width: 290px;

		.right {
			&__social {
				width: 290px;
			}
		}

		.sticky {
			position: sticky;
			top: 20px;
		}
	}

	&__about {
		display: flex;
		justify-content: flex-start;
		border: 1px solid @border-color;
		min-height: 210px;
		box-sizing: border-box;
		padding: 0 40px;
	}

	.description {
		padding-top: 28px;

		&__text {
			padding-top: 24px;
		}
	}

	&__putrate {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 18px;
		font-weight: 500;
		line-height: 19px;
	}


	.about {
		&__avatar {
			position: relative;
			bottom: 40px;
			padding: 0;
			min-width: 200px;
			height: 200px;
		}

		&__info {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			padding: 0 55px 0 40px;
		}

		&__name {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-top: 33px;

				.b-cards-title {
					font-size: 28px;
					font-weight: bold;
				}
		}

		&__subscribe {
			height: 40px;
			background-color: @orange-100;
			border-color: @orange-100;
			font-size: 14px;
			padding: 8px 24px;
			border: none;
			border-radius: 0;

			&:hover {
				background-color: @orange-200 !important;
				border-color: @orange-300 !important;
			}

			&:focus {
				box-shadow: unset !important;
				border-color: @orange-300 !important;
			}

			&:active {
				background-color: @orange-300 !important;
				border-color: @orange-300 !important;
			}
		}

		&__content {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 15px;
			padding-top: 20px;
		}

		&__footer {
			display: flex;
			flex-wrap: wrap;
			padding-top: 15px;
		}
	}

}
</style>