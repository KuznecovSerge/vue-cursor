<template>
	<div class="w-100 my-5">
		<h2>Кнопки</h2>
		<div class="row">
			<div class="col-6">
				<span class="mc-button">.mc-button</span>
			</div>
			<div class="col-6">
				<code class="w-100">&lt;span class=&quot;mc-button&quot;&gt;.mc-button&lt;/span&gt;</code>
			</div>
		</div>
		<div class="row">
			<div class="col-6">
				<span class="mc-btn-orange l">Регистрация</span>
			</div>
			<div class="col-6">
				<code class="w-100">&lt;span class=&quot;mc-btn-orange l&quot;&gt;Регистрация&lt;/span&gt;</code>
			</div>
		</div>
		<div class="row">
			<div class="col-6">
				<span class="mc-btn-orange l outline">Подробнее</span>
			</div>
			<div class="col-6">
				.mc-btn-orange l outline
			</div>
		</div>
		<div class="row">
			<div class="col-6">
				<span class="mc-btn-white xl">Показать больше курсов</span>
			</div>
			<div class="col-6">
				.mc-btn-white xl
			</div>
		</div>
		<div class="row">
			<div class="col-6">
				<span class="mc-btn-radio">Программирование</span>
				<span class="mc-btn-radio activ">Программирование</span>
			</div>
			<div class="col-6">
				.mc-btn-radio | .mc-btn-radio active
			</div>
		</div>
		<div class="row">
			<div class="col-6">
				<span class="mc-btn-orange">Ответить</span>
				<span class="mc-btn-orange disable">Ответить</span>
			</div>
			<div class="col-6">
				.mc-btn-orange | .mc-btn-orange disable
			</div>
		</div>
		<div class="row">
			<div class="col-6">
				<span class="mc-btn-white strange">Отменить</span>
				<span class="mc-btn-white strange disable">Отменить</span>
			</div>
			<div class="col-6">
				.mc-btn-white strange | mc-btn-white strange disable
			</div>
		</div>
		<hr/>
		<h2>Пагинация</h2>
		<div class="row">
			<div class="col-6">
				<div class="mc-pagination row justify-content-center">
					<b-pagination
						v-model="current_page"
						:total-rows="60"
						:per-page="20"
						align="center"
						page-class="page"
						prev-class="prev"
						next-class="next"
						first-number
						last-number
						prev-text="Предыдущая"
						next-text="Следующая"
					></b-pagination>
				</div>
			</div>
			<div class="col-6">
				<code class="w-100">
		&lt;div class=&quot;mc-pagination&quot;&gt;
			&lt;b-pagination
				v-model=&quot;current_page&quot;
				:total-rows=&quot;100&quot;
				:per-page=&quot;20&quot;
				align=&quot;center&quot;
				page-class=&quot;page&quot;
				prev-class=&quot;prev&quot;
				next-class=&quot;next&quot;
				first-number
				last-number
				prev-text=&quot;Предыдущая&quot;
				next-text=&quot;Следующая&quot;
				@change=&quot;changePage&quot;
			&gt;&lt;/b-pagination&gt;
		&lt;/div&gt;
				</code>
			</div>
		</div>
		<hr/>
		<h2>Каскадер</h2>
		<div class="row">
			<div class="col-6">
				<mc-cascader
					:options="items"
					placeholder="По типу продукта"
					:clearable="true"
				/>
			</div>	
			<div class="col-6">
				<code class="w-100">
		&lt;mc-cascader
			:options=&quot;items&quot;
			placeholder=&quot;По типу продукта&quot;
			:clearable=&quot;true&quot;
		/&gt;

		items: [
			{
				label: 'по дате',
				value: 'date',
			}, {
				label: 'по кол-ву',
				value: 'count',
			}
		]
				</code>
			</div>
		</div>
		<hr/>
		<h2>Рейтинг</h2>
		<div class="row">
			<div class="col-6">
				Проставленный рейтинг (балл>0) блокируются: <br/>
				<mc-rate
					v-model="myRating"
				/>
				<a @click="myRating=0">сбросить</a>
				<br/>
				<br/> 
				readonly:<br/>
				<mc-rate
					:value="4"
				/>
			</div>	
			<div class="col-6">
				<code class="w-100">
		&lt;mc-rate
			v-model=&quot;author.myRating&quot;
			@change=&quot;putRate&quot;
		/&gt;
		&lt;mc-rate
			v-model=&quot;author.myRating&quot;
			:readonly=&quot;true&quot;
		/&gt;
				</code>
			</div>
		</div>
		<hr/>
		<h2>Шаринг</h2>
		<div class="row">
			<div class="col-6">
				<mc-socialshare/>
			</div>	
			<div class="col-6">
				<code class="w-100">&quot;mc-socialshare/&quot;</code>
			</div>
		</div>
		<hr/>
		<h2>следующий хороший элемент...</h2>
		<div class="row">
			<div class="col-6">
			</div>	
			<div class="col-6">
				<code class="w-100"></code>
			</div>
		</div>
	</div>
</template>

<script>
import McCascader from '@/components/common/mc-cascader';
import McRate from '@/components/common/mc-rate';
import McSocialshare from '@/components/common/mc-socialshare';

export default {
	components: {
		McCascader,
		McRate,
		McSocialshare
	},
	data() {
		return {
			current_page: 1,
			items: [{
				label: 'по дате',
				value: 'date',
			}, {
				label: 'по кол-ву',
				value: 'count',
			}],
			myRating: 0
			
		};
	}
};
</script>

