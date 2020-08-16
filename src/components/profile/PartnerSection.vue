<template>
	<v-card flat>
		<b-row>
			<b-col md="8">
				<b-row class="mb-2" no-gutters>
					<b-col class="pr-2">
						<PartnerInfo></PartnerInfo>
					</b-col>
				</b-row>
				<b-row class="mb-6" no-gutters>
					<b-col class="pr-2">
						<div>
							<Carousel
								title="Опубликованные продукты"
								placeholder="Тут будут опубликованные продукты"
								v-bind:items="products"
								:onClickItem="(p) => $router.push(`/catalog/${p.id}`)"
								nameProperty="title"
								key="__partner$published"
							/>
						</div>
					</b-col>
					<b-col class="pr-2">
						<div>
							<Carousel
								title="Новые комментарии"
								placeholder="Новых комментариев пока что нет"
								v-bind:items="comments"
								:onClickItem="handleSwitchToComment"
								nameProperty="comment"
								key="__partner$comments"
							/>
						</div>
					</b-col>
					<b-col class="pr-2"></b-col>
				</b-row>
			</b-col>
			<b-col>
				<Balance />
			</b-col>
		</b-row>
		<v-btn
			large
			color="primary"
			@click="$router.push('/newproduct')"
		>{{ this.products.length ? "Создать продукт" : "Создай свой продукт и возьми курс на успех" }}</v-btn>
		<v-btn large color="primary" @click="$router.push('/my-blog')">Блог</v-btn>
		<SaleHistory v-if="saleItems.length" :saleItems="saleItems" />
	</v-card>
</template>

<script>
import PartnerInfo from '@/components/profile/partner/PartnerInfo';
import Carousel from '@/components/Carousel';
import SaleHistory from '@/components/profile/partner/SaleHistory';
import Balance from '@/components/profile/partner/Balance';

export default {
	data: () => ({
		load: true,
		error: '',
		saleItems: new Array(),
		products: new Array(),
		comments: new Array()
	}),
	components: {
		Carousel,
		SaleHistory,
		PartnerInfo,
		Balance
	},

	beforeCreate() {
		this.$http.get(`/api/users/section/partner`).then(res => {
			const model = res.data.viewmodel;
			if (!!model) {
				if (model.sales.length) {
					this.saleItems = model.sales;
					this.products = model.products;
					this.comments = model.comments;
				}
			}
		});
	},

	methods: {
		handleSwitchToComment(comment) {
			let url = '';

			const entities = this.CONST.Entities;
			const ids = this.comments
				.filter(
					c =>
						c.entityId === comment.entityId &&
						c.referenceId === comment.referenceId
				)
				.reduce((acc, cc) => {
					acc.push(cc.id);
					return acc;
				}, new Array())
				.join(',');
			switch (comment.entityId) {
				case entities.Product: {
					url = `/catalog/${comment.referenceId}?c=${ids}`;
					break;
				}
				case entities.Author: {
					url = `/authors/${comment.referenceId}?c=${ids}`;
					break;
				}
			}
			if (!url) {
				console.error('Неустановленный тип сущности для перехода!');
				return;
			}

			this.$router.push(url);
		}
	}
};
</script>

<style scoped>
</style>
