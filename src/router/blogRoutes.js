import BlogDetail from "@/views/blog/BlogDetail.vue";

export default [
    {
        // 这边传多少参数要改变一下
        path: '/blog/:id&:title',
        name: 'BlogDetail',
        // 动态路由
        component: () => import('@/views/blog/BlogDetail.vue'),
        props: true,
    },
// ...其他博客相关路由...
];