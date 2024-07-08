import {createMemoryHistory, createRouter} from 'vue-router'
import HomePage from "@/views/HomePage.vue";
import LoginPage from "@/views/LoginPage.vue";
import EditArticle from "@/views/Blog/EditArticle.vue";
import ArticleAnalysis from "@/views/Blog/ArticleAnalysis.vue";
import Write from "@/views/Blog/WriteArticle.vue";
import PhotoManager from "@/views/PhotoManager.vue";
import UserManager from "@/views/UserManager.vue";
import EditSingleBlog from "@/components/EditSingleBlog.vue";

const routes = [
    {path: '/', component: HomePage},
    {path: '/login', component: LoginPage},
    {path: '/edit', component: EditArticle},
    {path: '/analysis', component: ArticleAnalysis},
    {path: '/write', component: Write},
    {path: '/photo', component: PhotoManager},
    {path: '/usermanager', component: UserManager},
    {path: '/eidtSingle/:id', name: 'EditSingleBlog', component: EditSingleBlog},
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router