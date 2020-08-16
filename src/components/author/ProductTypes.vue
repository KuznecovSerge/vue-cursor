<template>
	<div class="author-categories col-12">
		<div class="author-categories__item col-3" 
			:class="author.coursesCount ? 'active': ''"
			@click="author.coursesCount && toCatalog(CONST.Entities.Course)"
		>
			<div class="d-flex align-items-center justify-content-between">
				<h5>Курсы</h5>
				<simple-svg width="24px" height="24px" src="/assets/media/course.svg" />
			</div>
			<div class="author-categories__description">
				{{ author.coursesCount }} {{ sklonenie(author.coursesCount, ['продукт', 'продукта', 'продуктов']) }}
			</div>
		</div>
		<div class="author-categories__item col-3" 
			:class="author.lessonsCount ? 'active': ''"
			@click="author.lessonsCount && toCatalog(CONST.Entities.Lesson)"
		>
			<div class="d-flex align-items-center justify-content-between">
				<h5>Уроки</h5>
				<simple-svg width="24px" height="24px" src="/assets/media/lesson.svg" />
			</div>
			<div class="author-categories__description">
				{{ author.lessonsCount }} {{ sklonenie(author.lessonsCount, ['продукт', 'продукта', 'продуктов']) }}
			</div>
		</div>
		<div class="author-categories__item col-3"
			:class="author.webinarsCount ? 'active': ''"
			@click="author.webinarsCount && toCatalog(CONST.Entities.Webinar)"
		>
			<div class="d-flex align-items-center justify-content-between">
				<h5>Вебинары</h5>
				<simple-svg width="24px" height="24px" src="/assets/media/webinar.svg" />
			</div>
			<div class="author-categories__description">
				{{ author.webinarsCount }} {{ sklonenie(author.lessonsCount, ['продукт', 'продукта', 'продуктов']) }}
			</div>
		</div>
		<div class="author-categories__item col-3"
			:class="author.booksCount ? 'active': ''"
			@click="author.booksCount && toCatalog(CONST.Entities.Book)"
		>
			<div class="d-flex align-items-center justify-content-between">
				<h5>Книги</h5>
				<simple-svg width="24px" height="24px" src="/assets/media/book.svg" />
			</div>
			<div class="author-categories__description">
				{{ author.booksCount }} {{ sklonenie(author.lessonsCount, ['продукт', 'продукта', 'продуктов']) }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['author'],

	methods: {
		toCatalog(productType){
			this.$router.push(`/catalog?findstr=${this.author.firstName}%20${this.author.lastName}&type=${productType}`);
		}
	}

};
</script>

<style lang="less">
.author-categories {
	display: flex;
	justify-content: space-between;
	padding: 0;
	margin-top: 15px;

	.author-categories__item {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100px;
		max-width: 226px;
		font-size: 12px;
		padding: 24px;
		border: 1px solid @border-color;
	
	}

	.active {
		cursor: pointer;
	}


	.author-categories__description {
		font-size: 12px;
		color: @gray-300;
		padding-top: 4px;
	}
}
</style>