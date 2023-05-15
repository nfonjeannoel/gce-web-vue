import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../components/About.vue'
import ResultsView from '../views/ResultsView.vue'
import Contact from '../components/Contact.vue'
import Terms from '../components/Terms.vue'
import Privacy from '../components/Privacy.vue'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),//import.meta.env.BASE_URL
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: AboutView
        },
        {
            path: '/results',
            name: 'results',
            component: ResultsView,
            beforeEnter: (to, from, next) => {
                if (from.name !== 'home') {

                    const searchResults = localStorage.getItem('searchResults');
                    if (searchResults) {
                        // Pass the stored search results as props to the ResultsView component
                        to.params.results = JSON.parse(searchResults);
                        next()
                    } else {
                        next({name: 'home'})
                    }

                } else {
                    next()
                }
            }
        },
        {
            path: '/terms-of-use',
            name: 'terms',
            component: Terms
        },
        {
            path: '/contact',
            name: 'contact',
            component: Contact
        },
        {
            path: '/privacy-policy',
            name: 'privacy',
            component: Privacy
        },
        //    redirect to home if no route matches
        {
            path: '/:pathMatch(.*)*',
            redirect: {name: 'home'}
        }
    ]
})

export default router
