# 个人博客系统的前台

采用vite + vue3作为框架搭建

views 放置了主要页面的vue文件
components 放置了一些会重复使用到的组件

- `/src`：包含所有前台源代码文件。
    - `/api`：提供api
    - `/assets`：静态组件如一些HTML、图片、音乐等
        - `/gifs`：gif图片
        - `/images`：图片
        - `/markdowns`：markdown文件
        - `/songs`：歌曲
    - `/components`：会重复使用到的组件
        - `home`：是一些比较通用的组件，还有一些主页面用的多的组件
    - `/router`：路由
    - `/stores`：状态管理，记录在session
    - `/styles`：一些通用样式
    - `/utils`：一些工具
    - `/views`：页面
        - `/blog`: 博客组件
        - `/test`: 一些测试样例
        - `/user`：用户登录和注册