<template>
	<v-layout class="d-flex flex-column">
		<Carousel bcolor="#f9f9f9" v-bind:items="first" :nameGetter="(v) => v" key="__idk" />
		<v-card class="mx-auto mt-5">
			<v-card-text>
				<div class="text--primary">
					<p>“Kursor - уникальный проект, это не просто сайт, где продаются онлайн-курсы, это платформа, которая помогает людям в их саморазвитии. Мы становимся надежным партнером на пути самосовершенствования. В личном кабинете человек получает актуальные для него статьи на тему саморазвития, информацию о новых курсах, по интересующим его тематикам, публикации и курсы его любимых авторов.</p>
					<p>Подборки и обзоры курсов, которые делает наша редакция, помогают выбрать качественный курс. А блоги авторов позволяют узнать больше и пообщаться с преподавателями.”</p>
					<div class="d-flex justify-end">
						<p>Дмитрий Романов, директор по развитию платформы</p>
					</div>
				</div>
			</v-card-text>
		</v-card>
		<PopularCategory />
		<v-card class="mx-auto mt-5">
			<v-card-text>
				<div class="text--primary">
					<p>Зарегистрируйте личный кабинет и получите доступ ко всем возможностям платформы. В личном кабинете вы будете видеть персонализированную под вас информацию: ваши покупки, новые статьи на интересующие вас темы, посты любимых авторов, новые курсы и их обзоры и многое другое”</p>
					<div class="d-flex justify-end">
						<v-btn @click="$router.push('/signup')">Зарегистрировать личный кабинет</v-btn>
					</div>
				</div>
			</v-card-text>
		</v-card>
		<Carousel
			bcolor="#f9f9f9"
			:onClickItem="(v) => $router.push(`/catalog/${v.productId}`)"
			v-bind:items="products"
			:nameGetter="(v) => v.product ? v.product.title : ''"
			key="__popular"
		/>
		<v-card class="mt-5">
			<v-card-text>
				<div class="text--primary">
					<p>Стань партнером</p>
				</div>
			</v-card-text>
		</v-card>
	</v-layout>
</template>

<script>
import Carousel from '@/components/Carousel';
import PopularCategory from '@/components/home/PopularCategory';

export default {
	name: 'Home',

	components: {
		Carousel,
		PopularCategory
	},

	data: () => ({
		first: [1, 2, 3, 4, 5],
		products: []
	}),

	beforeCreate() {
		this.$http.get('/api/catalog/popular').then(res => {
			this.products = res.data.items;
		});
	}
};
</script>

<style >
.subtitle-1 {
	color: black;
}
</style>