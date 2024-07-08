<template>
  <div class="container">
    <nav class="sidebar">
      <!-- Logo -->
      <div class="logo-container">
        <img src="../assets/images/logo.png" alt="CodeMist Logo"/>
      </div>
      <!-- 导航链接 -->
      <ul>
        <li :class="{ active: activeRoute === '/' }">
          <router-link to="/">Home</router-link>
        </li>
        <li v-for="item in menuItems" :key="item.name">
          <a @click="toggleSubMenu(item.name)">
            {{ item.name }}
            <span v-if="item.children && item.children.length">▼</span>
          </a>
          <ul v-if="item.children && item.children.length" v-show="activeSubMenu === item.name" class="sub-menu">
            <li :class="{ active: activeRoute === child.path}" v-for="child in item.children" :key="child.name">
              <router-link :to="child.path">{{ child.name }}</router-link>
            </li>
          </ul>
        </li>
        <li :class="{ active: activeRoute === '/photo' }">
          <router-link to="/photo">Photo</router-link>
        </li>
        <li :class="{ active: activeRoute === '/usermanager' }">
          <router-link to="/usermanager">UserManager</router-link>
        </li>
      </ul>
    </nav>
    <!-- 主内容区域 -->
    <div class="content">
      <!-- 页面内容 -->
    </div>
  </div>
</template>

<script>
export default {
  name: "NavigationManager",
  data() {
    return {
      activeRoute: null,
      activeSubMenu: null, // 当前激活的子菜单
      menuItems: [
        {
          name: 'Blog',
          path: '/blog',
          children: [
            {name: 'Edit', path: '/edit'},
            {name: 'Analysis', path: '/analysis'},
            {name: 'Write', path: '/write'}
            // 更多子路由...
          ]
        },
        // 更多菜单项...
      ],
    };
  },
  created() {
    this.activeRoute = this.$route.path;
    this.$router.afterEach((to) => {
      this.activeRoute = to.path;
    });
  },
  methods: {
    toggleSubMenu(menuName) {
      this.activeSubMenu = this.activeSubMenu === menuName ? null : menuName;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
}

.sidebar {
  width: 200px; /* 增加侧边栏宽度 */
  background: linear-gradient(145deg, #0078D4, #f9eeff);
  padding: 16px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  transition: transform 0.3s;
}

.content {
  margin-left: 150px; /* 调整内容区域的左边距以匹配侧边栏宽度 */
  padding: 20px; /* 添加内边距 */
  background-color: #fff; /* 内容区域的背景色 */
  overflow-y: auto; /* 如果内容过多，允许滚动 */
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  margin: 18px 0;
  text-align: center;
  border-radius: inherit;
}

a {
  text-decoration: none;
  color: #fff; /* 白色文字 */
  padding: 8px 50px;
  border-radius: 5px;
  transition: color 0.3s, background-color 0.3s;
  display: block; /* 使链接填满li元素 */
}

a:hover {
  color: #ffa8f2; /* 鼠标悬停时的文字颜色 */
  background-color: #59a8ff; /* 鼠标悬停时的背景颜色 */
}

.active a {
  color: #f4caff; /* 激活状态的文字颜色 */
  background-color: #5eb3ff; /* 激活状态的背景颜色 */
}

.logo-container {
  text-align: center;
  padding: 20px;
}

.logo-container img {
  max-width: 100%;
  height: auto;
}

/* 子菜单样式 */
.sub-menu {
  background-color: #e3e4e6; /* 子菜单背景色 */
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05); /* 子菜单内阴影 */
  padding: 10px 0; /* 子菜单内边距 */
}

.sub-menu li {
  margin: 10px 0; /* 子菜单项间距 */
}

.sub-menu a {
  color: #333; /* 子菜单文字颜色 */
  padding: 8px 30px; /* 子菜单项内边距 */
}

.sub-menu a:hover {
  color: #0078D4; /* 子菜单鼠标悬停文字颜色 */
  background-color: #f0f0f0; /* 子菜单鼠标悬停背景色 */
}

.sub-menu .active a {
  color: #fff; /* 子菜单激活状态文字颜色 */
  background-color: #0078D4; /* 子菜单激活状态背景色 */
}
</style>
