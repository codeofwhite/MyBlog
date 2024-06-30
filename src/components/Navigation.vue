<template>
  <nav>
    <ul>
      <li :class="{ active: activeRoute === '/' }"><router-link to="/">Home</router-link></li>
      <li :class="{ active: activeRoute === '/login' }"><router-link to="/login">Login</router-link></li>
      <li :class="{ active: activeRoute === '/blog' }"><router-link to="/blog">Blog</router-link></li>
      <li :class="{ active: activeRoute === '/about' }"><router-link to="/about">About</router-link></li>
      <li :class="{ active: activeRoute === '/questionField' }"><router-link to="/questionField">Question
      </router-link></li>
      <li :class="{ active: activeRoute === '/photopage' }"><router-link to="/photopage">PhotoPage</router-link></li>
      <li :class="{ active: activeRoute === '/test' }"><router-link to="/test">Test</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      activeRoute: null,
    };
  },
  created() {
    this.activeRoute = this.$route.path;
    this.$router.afterEach((to) => {
      this.activeRoute = to.path;
    });
  },
};
</script>

<style scoped>
nav {
  background-color: #fff; /* 使用白色背景 */
  padding: 16px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* 添加轻微的阴影效果 */
  text-align: center; /* 居中导航项 */
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: inline-flex; /* 使用flex布局 */
  align-items: center; /* 垂直居中 */
}

li {
  margin: 0 20px; /* 增加左右间距 */
}

a {
  text-decoration: none;
  color: #333; /* 深灰色文字 */
  padding: 8px 16px;
  border-radius: 4px; /* 添加圆角 */
  transition: color 0.3s, background-color 0.3s; /* 平滑过渡效果 */
}

a:hover {
  color: #fff; /* 鼠标悬停时的文字颜色 */
  background-color: #5c6bc0; /* 鼠标悬停时的背景颜色 */
}

.active a {
  color: #fff; /* 选中时的文字颜色 */
  background-color: #3f51b5; /* 选中时的背景颜色 */
}
</style>
