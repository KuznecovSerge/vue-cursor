import Vue from 'vue';
import Vuex from 'vuex';
import reports from './modules/reports';
import sockets from './modules/sockets';
import basket from './modules/basket';
import favorite from './modules/favorite';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		reports,
		sockets,
		basket,
		favorite
	}
});
