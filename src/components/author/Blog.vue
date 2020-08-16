<template>
	<div class="blog-items">
		<template v-if="blogs.length">
			<div class="blog-items col-3">
				<div class="header d-flex flex-row justify-content-between align-items-center">
					<h5>Блог</h5>
					<button>Смотреть все</button>
				</div>
				<div class="blog-item" v-for="(item, idx) in blogs" :key="idx">
					<h6>{{item.title}}</h6>
					<span>{{item.date}}</span>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
export default {
	props: ['blogs']
};
</script>

<style scoped>
.blog {
	border: 1px solid #e7e7e7;
	max-width: 290px;
	padding: 0;
}
.header {
	padding: 15px 24px;
	border-bottom: 1px solid #e7e7e7;
}
.header h5 {
	font-size: 20px;
	margin-bottom: 0;
}
.header .button {
	font-size: 12px;
}
.blog-item {
	padding: 24px;
	border-bottom: 1px solid #e7e7e7;
	background: none;
	cursor: pointer;
}
.blog-item h6 {
	font-size: 16px;
}
.blog-item:last-child {
	border: none;
}
span {
	font-size: 12px;
	color: #808d99;
}
</style>