<template>
	<footer>
		<div class="footer_three">
			<b-container fluid>
				<b-row class="justify-content-between">
					<b-col md="5" sm="12" class="f-info offset-md-1">
						<p class="footer_title">Вы автор курсов?</p>
						<p class="footer_text">Если вы создаете качественные информационные продукты, мы рады сотрудничать с Вами.</p>
						<Form />
					</b-col>
					<b-col
						md="6"
						sm="12"
						class="justify-content-end align-items-center d-flex"
						style="padding:0px!important"
					>
						<img class="img-fluid" src="/assets/media/stripes.png" style="opacity:0.1" />
					</b-col>
				</b-row>
			</b-container>
		</div>
		<div class="footer_two">
			<b-container fluid>
				<b-row class="justify-content-between align-items-center">
					<b-col sm="6" md="auto" class="align-self-baseline">
						<ul>
							<b>Каталоги</b>
							<li>
								<a href>{{ menuItems[0] }}</a>
							</li>
							<li>
								<a href>{{ menuItems[1] }}</a>
							</li>
							<li>
								<a href>{{ menuItems[2] }}</a>
							</li>
							<li>
								<a href>{{ menuItems[3] }}</a>
							</li>
						</ul>
					</b-col>
					<b-col sm="6" md="auto" class="align-self-baseline">
						<ul>
							<b>Материалы</b>
							<li>
								<a href>{{ menuItems[4] }}</a>
							</li>
							<li>
								<a href>{{ menuItems[5] }}</a>
							</li>
							<li>
								<a href>{{ menuItems[6] }}</a>
							</li>
							<li>
								<a href>{{ menuItems[7] }}</a>
							</li>
						</ul>
					</b-col>
					<b-col sm="6" md="auto" class="align-self-baseline">
						<ul>
							<b>Информация</b>
							<li>
								<a href>{{ menuItems[8] }}</a>
							</li>
							<li>
								<a href>{{ menuItems[9] }}</a>
							</li>
							<li>
								<a href>{{ menuItems[10] }}</a>
							</li>
							<li>
								<a href>{{ menuItems[11] }}</a>
							</li>
						</ul>
					</b-col>
					<b-col sm="6" md="auto" class="align-self-baseline">
						<ul>
							<b>Информация</b>
							<li>
								<a href>{{ menuItems[12] }}</a>
							</li>
							<li>
								<a href>{{ menuItems[12] }}</a>
							</li>
							<li>
								<a href>{{ menuItems[14] }}</a>
							</li>
							<li>
								<a href>{{ menuItems[15] }}</a>
							</li>
							<li>
								<a href>{{ menuItems[16] }}</a>
							</li>
						</ul>
					</b-col>
					<b-col sm="6" md="auto" class="align-flex-baseline">
						<ul>
							<b>Контакты</b>
							<li class> Партийный пер.1, корпус 57, <br> строение 1, этаж 3 <br> Москва, 115093</li>
							<li class>
								<a :href="`tel:+7 (495) 540-70-10`">Телефон : <br> +7 (495) 540-70-10</a>
							</li>
							<li class>
								<a :href="`mailto:kursor@kursor.com`">Написать: <br> kursor@kursor.com</a>
							</li>
						</ul>
					</b-col>	
				</b-row>
			</b-container>
		</div>
		<div class="footer_one">
			<b-container fluid>
				<b-row class="justify-content-between align-items-center">
					<b-col md="3" sm="12" class="justify-content-start align-items-center">
						<img max-height="40px" max-width="166px" contain src="/assets/media/logo1.png" alt="Kursor" />
					</b-col>
				</b-row>
			</b-container>
		</div>
	</footer>
</template>

<script>
import Form from '@/components/catalog/Form';

export default {
	name: 'Footer',

	components: { Form },

	data: () => ({
		menuItems: [
			'Каталог курсов',
			'Авторы',
			'Пункт меню',
			'Вторая страница',
			'Журнал',
			'Блог KURSOR',
			'Скидки',
			'Контакты',
			'О проекте',
			'Авторам',
			'Партнерская программа',
			'Тест',
			'Facebook',
			'ВКонтакте',
			'Telegram',
			'Instagram',
			'Youtube'
		],
	})
};
</script>

<style lang="less">
ul {
	margin-bottom: 0 !important;
}
.footer_one {
	background-color: #fff;
	padding: 0;
	color: #6A6B6C;
	margin-bottom: 45px;
	.container-fluid {
		padding: 0;
		.row {
			.col {
				display: flex;
				padding: 0;
			}
		}
		.footer_icon {
			background: transparent;
			height: 46px;
			min-width: 46px;
			margin: 0 5px;
			border: 1px solid white;
			&:focus {
				background: #b4be56;
				box-shadow: none;
				outline: none;
			}
			&:befor {
				background: #b4be56;
			}
		}
	}
}
.footer_two {
	background-color: #fff;
	padding: 0;
	color: #6A6B6C;
	font-size: 14px;
	font-weight: 300;
	margin-top: 37px;
	.container-fluid {
		padding: 0;
		.row {
			.col {
				display: flex;
				padding: 0;
			}
		}
		ul {
			padding: 0;
			b {
				font-weight: 600;
				font-size: 16px;
			}
			li {
				list-style-type: none;
				padding: 7px 0px;
				margin: 0;
				color: #6A6B6C;
				a {
					color: #6A6B6C;
					text-decoration: none;
					&:hover {
						color: #f58e15;
					}
				}
				i {
					color: #f58e15;
					position: absolute;
					left: -18px;
					margin-top: 5px;
				}
			}
			li.end {
				margin-bottom: -20px;
			}
		}
		.bold-7 {
			font-weight: 700 !important;
		}
	}
}
.footer_three {
	background-color: #222C36;
	padding: 0;
	color: #ffffff;
	font-size: 14px;
	.container-fluid {
		padding: 0;
		.row {
			.col {
				padding: 0;
			}
			.f-info {
				padding-top: 50px !important;
			}
			.footer_text {
				font-size: 16px;
				p {
					margin: 0;
					max-width: 380px;
					font-weight: 300;
				}
			}
		}
		.footer_title {
			font-size: 40px;
			font-weight: 900 !important;
			margin-bottom: 10px;
			color: #F58E15;
		}
	}
}
</style>