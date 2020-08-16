import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { Constants } from './constants';
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

import App from '@/pages/login/App';
import Login from '@/pages/login/Login';
import SignUp from '@/pages/login/SignUp';
import EmailConfirm from '@/pages/login/EmailConfirm';
import EmailVerify from '@/pages/login/EmailVerify';
import Restore from '@/pages/login/Restore';
import ChangePassword from '@/pages/login/ChangePassword';

Vue.use(VueMask);

// element-ui
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);

Vue.config.productionTip = false;
Vue.use(vueConfig, config);

// set up axios as http requests tool (this.$http)
Vue.use(VueAxios, axios);
if (!process.env.NODE_ENV || process.env.NODE_ENV != 'production') {
	Vue.axios.defaults.baseURL = config.backendUrl;
}

// store and router

// Для исправления ошибки в консоли при переходе на тот же маршрут
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err);
};

const routes = [
	// login and register
	{
		path: '/login',
		name: 'login',
		meta: {
			auth: false
		},
		component: Login
	},
	{
		path: '/signup',
		name: 'signup',
		component: SignUp
	},
	{
		path: '/signup/confirm',
		name: 'confirm',
		component: EmailConfirm
	},
	{
		path: '/signup/verify',
		name: 'verify',
		component: EmailVerify
	},
	{
		path: '/restore',
		name: 'restore',
		component: Restore
	},
	{
		path: '/restore/password',
		name: 'changepassword',
		component: ChangePassword
	}
];

Vue.use(Router);
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
		fetchUser: true
	},
	loginData: {
		url: '/api/users/login',
		method: 'POST',
		redirect: '/login',
		fetchUser: true
	},
	logoutData: {
		url: '/api/users/logout',
		method: 'POST',
		redirect: '/login',
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

});

Vue.component('debug', {
	template: '<!-- debug -->',
	props: ['item'],
	created: function() {
		console.log('debug', this.item.name);
	}
});


new Vue({
	router,
	render: h => h(App)
}).$mount('#app');

