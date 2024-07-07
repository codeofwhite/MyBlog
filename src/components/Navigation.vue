<template>
  <nav>
    <ul>
      <li class="normal" :class="{ active: activeRoute === '/' }">
        <router-link to="/">Home💕</router-link>
      </li>
      <li class="normal" :class="{ active: activeRoute === '/blog' }">
        <router-link to="/blog">Blog🤓</router-link>
      </li>
      <li class="normal" :class="{ active: activeRoute === '/about' }">
        <router-link to="/about">About😚</router-link>
      </li>
      <li class="normal" :class="{ active: activeRoute === '/questionField' }">
        <router-link to="/questionField">Question🤔
        </router-link>
      </li>
      <li class="normal" :class="{ active: activeRoute === '/photopage' }">
        <router-link to="/photopage">PhotoPage😗</router-link>
      </li>
      <li class="normal" :class="{ active: activeRoute === '/test' }">
        <router-link to="/test">Test</router-link>
      </li>
      <!--      <li v-if="!isLoggedIn" :class="{ active: activeRoute === '/login' }"><router-link to="/login">Login</router-link></li>-->
      <!-- 用户登录状态 -->
      <li v-show="!isLoggedIn" class="user-status">
        <router-link to="/login">
          <div class="user-icon">登录</div>
        </router-link>
      </li>
      <li v-show="isLoggedIn" class="user-status">
        <router-link to="/login">
          <div class="user-icon">{{ userInitial }}</div>
        </router-link>
      </li>
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
  computed: {
    isLoggedIn() {
      // 根据实际情况获取登录状态
      return this.$store.state.isLoggedIn;
    },
    userInitial() {
      // 获取用户名称的首字母
      // 确保 user_email 已定义且不为空
      const email = this.$store.state.uemail;
      return email ? email.charAt(0).toUpperCase() : '?';
    }
  },
};
</script>

<style scoped>
nav {
  background-color: #fff; /* 使用白色背景 */
  padding: 16px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加轻微的阴影效果 */
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

.normal {
  text-decoration: none;
  color: #333; /* 深灰色文字 */
  padding: 8px 16px;
  border-radius: 4px; /* 添加圆角 */
  transition: color 0.3s, background-color 0.3s, transform 0.3s; /* 添加 transform 到过渡效果 */
}

.normal:hover {
  color: #fff; /* 鼠标悬停时的文字颜色 */
  background-color: #1bffaf; /* 鼠标悬停时的背景颜色 */
  transform: scale(1.05); /* 添加缩放效果 */
}

.normal.active {
  color: #fff;
  background-color: #10ce9c;
}

/* 用户状态样式 */
.user-status {
  margin-left: auto; /* 将登录状态推到最右边 */
}

.user-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%; /* 创建圆形 */
  background-color: #5c6bc0; /* 背景颜色 */
  color: #fff; /* 文字颜色 */
  font-weight: bold; /* 字体加粗 */
  transition: transform 0.3s, box-shadow 0.3s; /* 添加过渡效果 */
}

/* 用户图标内 a 标签的 hover 样式 */
.user-status a:hover .user-icon {
  color: #fff; /* 您希望的文字颜色 */
  background-color: #b53f3f; /* 您希望的背景颜色 */
  /* 添加其他您希望的 hover 效果 */
  transform: scale(1.1); /* 增加缩放效果 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 添加阴影 */
}
</style>
