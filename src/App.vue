<template>
  <div id="app">
    <div class="app-header">
      <!-- 信息栏 -->
      <div class="user-login">
        <!-- 圆形的登录图标 -->
        <router-link to="/login">
          <img src="@/assets/images/logo.png" alt="User Login"/>
        </router-link>
      </div>
    </div>
    <div class="app-container">
      <NavigationManager/> <!-- 使用导航栏组件 -->
      <div class="main-content">
        <!-- 主内容区域，通过router-view来展示各个页面 -->
        <router-view/>
        <!-- 页面底部的感谢语和技术栈信息 -->
      </div>
    </div>
    <footer class="app-footer">
      <p>感谢访问CodeMist后台管理！</p>
      <p>本站使用Vue.js, Vuex, Vue Router, 和 Vuetify 构建。</p>
    </footer>
  </div>
</template>

<script>
import NavigationManager from "@/components/NavigationManager.vue";

export default {
  name: 'App',
  components: {
    NavigationManager
  },
  created() {
    document.body.removeChild(document.getElementById('Loading')) // 加载页面完后移除加载动画
  }
}
</script>

<style>
/* 添加信息栏和用户登录样式 */
.app-header {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  background-color: #333;
  color: #fff;
}

.user-login img {
  width: 40px; /* 调整为所需大小 */
  height: 40px; /* 调整为所需大小 */
  border-radius: 50%; /* 使图片变成圆形 */
  border: 2px solid #fff; /* 可选的白色边框 */
}

.app-container {
  display: flex;
  height: 100vh;
}

.navigation-manager {
  width: 250px;
  background: linear-gradient(145deg, #6d5dfc, #b224ef);
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
}

.app-footer {
  text-align: center;
  padding: 10px;
  background-color: #6d5dfc; /* 底部栏的背景色 */
  color: #fff; /* 底部栏的文字颜色 */
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.main-content {
  flex-grow: 1;
  background-color: #fff;
  padding: 20px;
  overflow-y: auto;
  margin-bottom: 50px; /* 确保底部栏不会遮挡内容 */
}

</style>