<template>
	<div id="app">
		<Header />
		<b-container fluid>
			<transition name="fade" mode="out-in">
				<router-view :key="$route.name"></router-view>
			</transition>
		</b-container>
		<Footer />
	</div>
</template>

<script>
import Vue from 'vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

import VueSweetAlert from 'vue-sweetalert';
import Notifications from 'vue-notification';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faSearch, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
//import vuetify from '@/plugins/vuetify';
import { VLazyImagePlugin } from 'v-lazy-image';
import { SimpleSVG } from 'vue-simple-svg';

const moment = require('moment');
require('moment/locale/ru');

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(Notifications);
Vue.use(VueSweetAlert);
Vue.use(VLazyImagePlugin);
Vue.use(require('vue-moment'), { moment });
library.add(faCoffee, faSearch, faCartArrowDown);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('simple-svg', SimpleSVG);
Vue.prototype.$vuetify = { rtl: false };

import Header from '@/components/Header.vue';
import { mapGetters } from 'vuex';
import Footer from '@/components/Footer.vue';

export default {
	name: 'app',
	components: {
		Header,
		Footer
	},
	data: () => {
		return {
			initialized: false
		};
	},

	watch: {
		'currentUser.id': {
			handler: function(newUser, oldUser) {
				const { $store } = this;

				if (!newUser) return;

				$store.dispatch('basket/fetch', newUser);
				$store.dispatch('favorite/fetch', newUser);
			}
		}
	}
};
</script>

<style>
body {
	max-width: 1280px;
	margin: 0 auto;
}
html {
	font-size: 14px!important;
}
.v-content {
	min-height: 400px;
}
.row {
    margin-right: -12px!important;
    margin-left: -12px!important;
}
#app {
	/* вытащил с v-app компонента vuetify, чтобы выпилить позже его*/
	font-family: "Roboto", sans-serif;
	line-height: 1.5;
	flex: 1 1 auto;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    max-width: 100%;
    position: relative;
}
</style>