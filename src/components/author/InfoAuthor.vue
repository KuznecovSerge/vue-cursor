<template>
	<div class="short-info col-3 row d-flex flex-column justify-content-between" max-width="290px">
		<b-img
			class="avatar white--text col-5"
			eager
			:src="avatar"
		></b-img>
		<div class>
			<h3 class="b-cards-title">{{ firstName }} {{ lastName}}</h3>
		</div>
		<div class="d-flex flex-row align-items-end">
			<span>{{rating}}.0</span>
			<v-rating v-model="rating"></v-rating>
		</div>
        <p class="about-author">{{aboutAuthor}}</p>
		<div class="quantity d-flex flex-row justify-content-between align-items-baseline">
			<div>
				<img src="/assets/media/comments.svg" alt="comments" />
				<span>24 отзыва</span>
			</div>
			<span>48 продуктов</span>
		</div>
		<b-button class="target_button row-1" type="submit">
			<span class="control__button1">Подписаться</span>
		</b-button>
	</div>
</template>
<script>
export default {
	name: 'InfoAuthor',
	data() {
		return {};
	},
	props: ["firstName", "lastName", "aboutAuthor", "rating", "avatar"]
};
</script>
<style>
.short-info {
	max-width: 290px;
	height: 418px;
    border: 1px solid #e7e7e7;
    padding: 108px 32px 32px;
}
.short-info h3 {
	font-size: 18px;
}
.short-info .avatar{
    padding: 0;
    max-width: 116px;
    max-height: 116px;
    position: absolute;
    top: -32px;
}
.short-info .about-author{
font-size: 12px;
color:#808D99;
}
.target_button,
.partnership-button {
	background: #f58e15;
}
.qunatity img{
    width: 16.5px;
height: 16.5px;
}
.quantity span{
    font-size: 13px;
}
</style>