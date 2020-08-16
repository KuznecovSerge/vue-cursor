import axios from 'axios';

export default {
	namespaced: true,

	state: {
		products: []
	},

	getters: {
		getProducts: state => state.products
	},

	mutations: {
		remove: (state, id) => {
			state.products = state.products.filter(product => product.id !== id);
		},

		clear: state => {
			state.products = [];
		},

		addProduct: (state, product) => {
			state.products.push(product);
		},

		setProducts: (state, products) => {
			state.products = products;
		}
	},

	actions: {
		fetch: ({ commit, state }, userId) => {
			return axios.get(`/api/basket/${userId}`).then(({ data }) => {
				const { products } = data;

				commit('setProducts', products);

				return products;
			});
		}
	}
};
