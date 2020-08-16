<template>
	<form :name="name" method="post" action="https://sci.interkassa.com/" enctype="utf-8" ref="ikform">
		<input type="hidden" name="ik_co_id" value="5e2867131ae1bdb5008b4568" />
		<input type="hidden" name="ik_pm_no" :value="saleId" />
		<input type="hidden" name="ik_am" :value="amount" />
		<input type="hidden" name="ik_cur" :value="currency" />
		<input type="hidden" name="ik_desc" :value="description" />
		<input type="hidden" name="ik_cli" :value="email" />
		<input type="hidden" name="ik_ia_u" :value="backendUri" />
		<input type="hidden" name="ik_ia_m" value="POST" />
		<input type="hidden" name="ik_suc_u" :value="interactionUrl" />
		<input type="hidden" name="ik_suc_m" value="GET" />
		<input type="hidden" name="ik_pnd_u" :value="interactionUrl" />
		<input type="hidden" name="ik_pnd_m" value="GET" />
		<input type="hidden" name="ik_fal_u" :value="interactionUrl" />
		<input type="hidden" name="ik_fal_m" value="GET" />
		<b-btn value="Отправить" variant="success" @click="onClick">{{ buttonPayName }}</b-btn>
	</form>
</template>

<script>
export default {
	name: 'InterCassa',

	props: {
		/**
		 * * Наименование платежа
		 */
		name: {
			type: String,
			default: ''
		},

		email: {
			type: String,
			default: ''
		},

		/**
		 * * Номер заказа
		 * ? example: 14533; ID_4233
		 */
		saleId: {
			type: String,
			default: ''
		},

		/**
		 * * Стоимость
		 * ? example: 1.43; 43
		 */
		amount: {
			type: String,
			default: ''
		},

		/**
		 * * Валюта
		 * ? example: USD; EUR; UAH
		 */
		currency: {
			type: String,
			default: 'RUB'
		},

		/**
		 * * Описание заказа
		 * ? example: Тестовая продажа
		 */
		description: {
			type: String,
			default: ''
		},

		/**
		 * * Текст перехода кнопки оплаты
		 * ? example: Оплатить
		 */
		buttonPayName: {
			type: String,
			default: 'Оплатить'
		},

		/**
		 * * Async hook перед операцией
		 */
		beforeSaleAsync: {
			type: Function,
			default: async () => {}
		},

		/**
		 * * Hook предотвращяющий редирект на Shopping cart interfce
		 */
		shouldSale: {
			type: Function,
			default: () => true
		}
	},

	data: () => ({
		form: null
	}),

	computed: {
		interactionUrl() {
			return `${window.location.origin}/cart`;
		},

		backendUri() {
			const url = `${window.monecle.apiUrl}/api/sale/process?v=ik`;
			return url;
		}
	},

	methods: {
		async onClick() {
			const self = this;
			if (this.beforeSaleAsync) {
				await this.beforeSaleAsync();
			}

			if (self.$refs.ikform) {
				self.$refs.ikform.submit();
			}
		},

		hrefUrl(postfix) {
			return `${window.monecle.apiUrl}${postfix}`;
		}
	}
};
</script>

<style scoped>
</style>