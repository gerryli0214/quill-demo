import Vue from 'vue';
import App from '../App.vue';
import 'normalize.css';
import '../styles/public.css';
import router from '../router/index';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'amfe-flexible/index';

Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
	next();
});

new Vue({
	el: '#app',
	// @ts-ignore
	router,
	render: (h) => h(App),
});
