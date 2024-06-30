<template>
  <div class="app-container">
    <!-- 头部和导航 -->
    <header class="header">
      <div class="container">
        <h1>CodeMist</h1>
        <Navigation/> <!-- 使用导航栏组件 -->
      </div>
    </header>
    <!-- 主内容区域 -->
    <router-view/> <!-- 这里会根据路由显示不同的页面 -->
    <!-- 底部栏 -->
    <footer class="footer">
      <div class="footer-content">
        <p>感谢您的访问，希望您喜欢我们的网站！</p>
        <p>Powered by Vue.js, Vuetify, and a sprinkle of love </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import Navigation from "@/components/Navigation.vue";
</script>

<style scoped>
.header {
  background-color: #f8f9fa; /* 背景色 */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* 阴影效果 */
  padding: 1rem 0; /* 上下内边距 */
}

.container {
  max-width: 1200px; /* 最大宽度 */
  margin: 0 auto; /* 水平居中 */
  padding: 0 2rem; /* 左右内边距 */
  display: flex; /* 使用flex布局 */
  align-items: center; /* 垂直居中 */
  justify-content: space-between; /* 元素间隔开 */
}

h1 {
  font-size: 2rem; /* 字体大小 */
  color: #333; /* 字体颜色 */
  margin: 0; /* 去除默认外边距 */
  font-weight: 300; /* 字体粗细 */
}


.footer {
  background-color: #fce4ec; /* 淡粉色背景 */
  color: #f06292; /* 粉红色文字 */
  text-align: center;
  padding: 1rem 0;
  font-size: 0.875rem;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.footer-content p {
  margin: 0.5rem 0;
}

/* 响应式设计：小屏幕时底部栏的样式 */
@media (max-width: 768px) {
  .footer {
    padding: 0.5rem 0;
  }

  .footer-content p {
    font-size: 0.75rem;
  }
}
</style>
