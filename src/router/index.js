import {createMemoryHistory, createRouter} from 'vue-router'
import HomePage from "@/views/HomePage.vue";
import LoginPage from "@/views/user/LoginPage.vue";
import EditArticle from "@/views/blog/EditArticle.vue";
import ArticleAnalysis from "@/views/blog/ArticleAnalysis.vue";
import Write from "@/views/blog/WriteArticle.vue";
import PhotoManager from "@/views/PhotoManager.vue";
import UserManager from "@/views/user/UserManager.vue";
import EditSingleBlog from "@/components/blog/EditSingleBlog.vue";
import RegisterPage from "@/views/user/RegisterPage.vue";
import CommentManager from "@/views/CommentManager.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },
    {path: '/login', component: LoginPage},
    {
        path: '/edit',
        name: 'EditArticle',
        component: EditArticle
    },
    {path: '/analysis', component: ArticleAnalysis},
    {path: '/write', component: Write},
    {path: '/photo', component: PhotoManager},
    {path: '/usermanager', component: UserManager},
    {path: '/eidtSingle/:id', name: 'EditSingleBlog', component: EditSingleBlog},
    {
        path: '/register',
        name: 'register',
        component: RegisterPage
    },
    {
        path: '/commentManager/:id',
        name: 'CommentManager',
        component: CommentManager
    },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router