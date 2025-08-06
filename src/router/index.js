import { createRouter, createWebHistory } from 'vue-router';

import Login from '../components/Login.vue';
import Finance from '../components/Finance.vue';
import Forum from '../components/Forum.vue';
import Signup from '../components/Signup.vue';
import Category from '../components/Category.vue';

const routes = [
    { path: '/forum/:categoryId', component: Forum }, // Dynamic route for Forum.vue
    { path: '/forum', redirect: '/category' }, // Redirect /forum to /category
    { path: '/category', component: Category },
    { path: '/finance/:topicId', component: Finance }, // Dynamic route for Finance.vue
    { path: '/finance', component: Finance },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/', redirect: '/login' }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
