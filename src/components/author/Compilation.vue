<template>
	<div class="reviews col-12">
		<div class="d-flex flex-row justify-content-between align-items-center">
			<div class="col-6 d-flex">
				<h3 class>Подборки курсов</h3>
				<svg
					class="prev"
					width="40"
					height="40"
					viewBox="0 0 40 40"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M17.5698 13.0007C18.2428 13.0008 18.9158 13.0008 19.5887 13.0003C20.3367 13.9667 21.0838 14.9338 21.8309 15.9009C22.8865 17.2673 23.942 18.6336 25 19.9981C24.7371 20.3385 24.4739 20.6788 24.211 21.0191C22.6705 23.0133 21.1302 25.0074 19.5879 26.9999C18.9638 26.9993 18.3396 26.9995 17.7155 26.9998C16.8104 27.0001 15.9054 27.0004 15.0005 26.9981C15.619 26.1973 16.2379 25.3968 16.8568 24.5963C18.0417 23.0638 19.2265 21.5312 20.4087 19.9966C20.4088 19.9966 20.4086 19.9966 20.4087 19.9966C19.545 18.8836 18.6841 17.7685 17.8229 16.6535C16.883 15.4365 15.9431 14.2195 15 13.0053C15.2815 12.9987 15.5632 12.9997 15.8448 13.0007C16.016 13.0013 16.1873 13.0019 16.3585 13.0008C16.7623 13.0007 17.166 13.0007 17.5698 13.0007Z"
						fill="#808D99"
					/>
					<rect
						x="-0.5"
						y="0.5"
						width="39"
						height="39"
						transform="matrix(-1 0 0 1 39 0)"
						stroke="#808D99"
					/>
				</svg>
				<svg
					class="next"
					width="40"
					height="40"
					viewBox="0 0 40 40"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M17.5698 13.0007C18.2428 13.0008 18.9158 13.0008 19.5887 13.0003C20.3367 13.9667 21.0838 14.9338 21.8309 15.9009C22.8865 17.2673 23.942 18.6336 25 19.9981C24.7371 20.3385 24.4739 20.6788 24.211 21.0191C22.6705 23.0133 21.1302 25.0074 19.5879 26.9999C18.9638 26.9993 18.3396 26.9995 17.7155 26.9998C16.8104 27.0001 15.9054 27.0004 15.0005 26.9981C15.619 26.1973 16.2379 25.3968 16.8568 24.5963C18.0417 23.0638 19.2265 21.5312 20.4087 19.9966C20.4088 19.9966 20.4086 19.9966 20.4087 19.9966C19.545 18.8836 18.6841 17.7685 17.8229 16.6535C16.883 15.4365 15.9431 14.2195 15 13.0053C15.2815 12.9987 15.5632 12.9997 15.8448 13.0007C16.016 13.0013 16.1873 13.0019 16.3585 13.0008C16.7623 13.0007 17.166 13.0007 17.5698 13.0007Z"
						fill="#808D99"
					/>
					<rect
						x="-0.5"
						y="0.5"
						width="39"
						height="39"
						transform="matrix(-1 0 0 1 39 0)"
						stroke="#808D99"
					/>
				</svg>
			</div>
			<button class="btn-grey">Перейти ко всем записям</button>
		</div>
		<div class="items d-flex justify-content-between col-12">
			<div class="item col-3" v-for="(item, idx) in coureses" :key="idx">
				<a href="#">
					<img class="col-12" :src="item.img" alt />
					<div class="text d-flex flex-column col-12">
						<h5>{{item.title}}</h5>
						<span>{{item.content}}</span>
					</div>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'compilation',
	data() {
		return {
			coureses: [
				{
					title: 'Первые шаги к запуску онлайн-школы с нуля',
					content:
						'В определенный момент вы понимаете, что накопили достаточно знаний и опыта, чтобы делиться ими с окружающими.',
					img: '/assets/media/background-courses.png'
				},
				{
					title: 'Первые шаги к запуску онлайн-школы с нуля',
					content:
						'В определенный момент вы понимаете, что накопили достаточно знаний и опыта, чтобы делиться ими с окружающими.',
					img: '/assets/media/background-courses.png'
				},
				{
					title: 'Первые шаги к запуску онлайн-школы с нуля',
					content:
						'В определенный момент вы понимаете, что накопили достаточно знаний и опыта, чтобы делиться ими с окружающими.',
					img: '/assets/media/background-courses.png'
				},
				{
					title: 'Первые шаги к запуску онлайн-школы с нуля',
					content:
						'В определенный момент вы понимаете, что накопили достаточно знаний и опыта, чтобы делиться ими с окружающими.',
					img: '/assets/media/background-courses.png'
				}
			]
		};
	}
};
</script>

<style scoped>
.prev {
	transform: rotate(180deg);
	margin-left: 32px;
}
.next {
	margin-left: 16px;
}
.next:hover path,
.prev:hover path {
	fill: #f58e15;
}
.btn-grey:hover{
	color: #f58e15;
	border:1px solid #f58e15;
}
.next:hover rect,
.prev:hover rect {
	stroke: #f58e15;
}
.btn-grey {
	border: 1px solid #808d99;
	font-size: 15px;
	padding: 10px 24px;
}
.items{
	margin-top: 40px;
	padding: 0;
}
.item{
	border: 1px solid #E7E7E7;
	padding: 0;
	max-width: 290px;
}
.item .text{
	padding: 24px;
}
.item h5{
	font-size: 18px;
}
.item img{
	max-height: 110px;
	max-width: 100%;
	padding: 0;
}
.item a{
	color: #222C36;
	width: 100%;
	height: 100%;
}
.item span{
 color: #808D99;
 font-size: 12px;
}
</style>>

