import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { routes } from './router';
import { Constants } from './constants';
import { Cascader, Rate } from 'element-ui';
import 'element-ui/lib/theme-chalk/cascader.css';
import 'element-ui/lib/theme-chalk/rate.css';
// minimal element-ui for login-layout
import { Form, FormItem, Input, Button } from 'element-ui';
import 'element-ui/lib/theme-chalk/form.css';
import 'element-ui/lib/theme-chalk/form-item.css';
import 'element-ui/lib/theme-chalk/input.css';
import 'element-ui/lib/theme-chalk/button.css';
import "./styles/index.less";

// set up config file as global frontend config
import vueConfig from 'vue-config';
import config from './config';

import VueMask from 'v-mask';
import store from './store/index';

Vue.use(VueMask);
Vue.config.productionTip = false;
const accessableRoutes = ['/login', '/signup'];
import VueSocketIO from 'vue-socket.io';

const settings = {
	debug: false,
	connection:
		process.env.NODE_ENV === 'development'
			? env.BACKEND_URI
			: process.env.HOST,
	vuex: {
		store,
		actionPrefix: 'SOCKET_',
		mutationPrefix: 'SOCKET_'
	}
};

Vue.use(new VueSocketIO(settings));

Vue.use(vueConfig, config);

// set up axios as http requests tool (this.$http)
Vue.use(VueAxios, axios);
if (!process.env.NODE_ENV || process.env.NODE_ENV != 'production') {
	Vue.axios.defaults.baseURL = config.backendUrl;
}

// events lib for handling global events
import VueEvents from 'vue-events';
Vue.use(VueEvents);
// store and router

// Для исправления ошибки в консоли при переходе на тот же маршрут
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err);
};

Vue.use(Router);
// const store = new Vuex.Store(VuexStore);
const router = new Router({
	routes,
	mode: 'history',
	scrollBehavior(to, from, savedPosition) {
		if (from.name === to.name) {
			return savedPosition;
		}
		if (!savedPosition || to !== from) {
			return { x: 0, y: 0 };
		}
		return savedPosition;
	}
});

Vue.router = router;

// element-ui
Vue.use(Cascader)
Vue.use(Rate);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);

// auth with jwt module
Vue.use(require('@websanova/vue-auth'), {
	auth: require('./auth/authDriver.js'),
	http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
	router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
	rolesVar: 'role',
	authRedirect: { path: '/login' },
	forbiddenRedirect: { path: '/403' },
	notFoundRedirect: { path: '/404' },
	registerData: {
		url: '/api/users',
		method: 'POST',
		redirect: '/catalog',
		fetchUser: true
	},
	loginData: {
		url: '/api/users/login',
		method: 'POST',
		redirect: '/catalog',
		fetchUser: true
	},
	logoutData: {
		url: '/api/users/logout',
		method: 'POST',
		redirect: '/',
		makeRequest: false
	},
	fetchData: { url: '/api/users/me', method: 'GET', enabled: true },
	refreshData: { enabled: false, interval: 60 },
	parseUserData: data => data
});
Vue.mixin({
	data: function() {
		return {
			CONST: Constants
		};
	},

	computed: {
		currentUser() {
			const user = this.$auth.user();
			if (user) {
				return user;
			}

			return null;
		}
	},

	methods: {
		sklonenie(number, txt, cases = [2, 0, 1, 1, 1, 2]) {
			return txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]
		}
	}
});

Vue.component('debug', {
	template: '<!-- debug -->',
	props: ['item'],
	created: function() {
		console.log('debug', this.item.name);
	}
});

new Vue({
	//vuetify,
	router,
	store,
	render: h => h(App)
}).$mount('#app');

