import axios from 'axios';

export default {
	namespaced: true,

	state: {
		favoriteProducts: []
	},

	getters: {
		getFavoriteProducts: state => state.favoriteProducts
	},

	mutations: {
		removeFavoriteProduct: (state, removed) => {
			state.favoriteProducts = state.favoriteProducts.filter(
				product => product.id !== removed.id
			);
		},

		clearFavoriteProducts: state => {
			state.favoriteProducts = [];
		},

		addFavoriteProduct: (state, product) => {
			state.favoriteProducts.push(product);
		},

		setFavoriteProducts: (state, products) => {
			state.favoriteProducts = products;
		}
	},

	actions: {
		fetch: ({ commit, state }, userId) => {
			return axios.get(`/api/catalog/favorites/${userId}`).then(({ data }) => {
				const { products } = data;

				commit('setFavoriteProducts', products);

				return products;
			});
		}
	}
};
