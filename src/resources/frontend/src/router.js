import Vue from 'vue';
import VueRouter from 'vue-router';
import lazyPage from "@/lazyPage"
import recipeLayout from "@/layouts/recipe"

Vue.use(VueRouter)

let routes = [
    {
        path: '/',
        component: recipeLayout,
        children: [
            {
                path: '/',
                name: 'recipeList',
                component: lazyPage("recipes/list"),
            },
            {
                path: '/recipe/:id',
                name: 'recipeView',
                component: lazyPage("recipes/view"),
            }
        ]
    }
]


export default new VueRouter({
    mode: "history",
    routes
})