import BlogDetail from "@/views/BlogDetail.vue";

export default [
    {
        path: '/blog/:id',
        name: 'BlogDetail',
        // 动态路由
        component: () => import('../views/BlogDetail.vue')
    },
// ...其他博客相关路由...
];