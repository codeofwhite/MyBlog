<template>
  <div class="admin-dashboard">
    <div class="welcome-container">
      <h1>{{ welcomeMessage }}</h1>
      <p>这里是您的个人创作管理空间，开始探索吧！</p>
    </div>
    <div class="system-status">
      <!-- 系统状态信息 -->
      <div class="system-status">
        <h2>系统状态信息</h2>
        <ul>
          <li><strong>服务器状态：</strong>运行正常</li>
          <li><strong>性能指标：</strong>CPU使用率 35%，内存使用率 65%</li>
          <li><strong>当前在线用户：</strong>42</li>
          <li><strong>今日登录用户：</strong>389</li>
          <li><strong>最近注册用户：</strong>58</li>
          <li><strong>访问量统计：</strong>页面浏览量 1,204，独立访客数 860</li>
          <li><strong>系统日志：</strong>最近无错误报告</li>
          <li><strong>数据备份：</strong>最后一次备份于3天前，状态成功</li>
        </ul>
      </div>
    </div>
    <div class="update-announcements">
      <h2>系统更新</h2>
      <p>最新版本v2.1已发布，带来了许多新功能...</p>
    </div>
    <div class="help-center">
      <h2>帮助中心</h2>
      <p>遇到问题？请查看下面的常见问题解答或联系我们的支持团队。</p>
      <div class="faq-container">
        <h3>常见问题</h3>
        <ul>
          <li v-for="faq in faqs" :key="faq.id">
            <details>
              <summary>{{ faq.question }}</summary>
              <p>{{ faq.answer }}</p>
            </details>
          </li>
        </ul>
      </div>
      <div class="support-form">
        <h3>联系支持</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const welcomeMessage = ref('欢迎来到CodeMist的后台管理空间!');

const faqs = ref([
  { id: 1, question: '如何重置我的密码？', answer: '您可以通过点击登录页面的“忘记密码”链接来重置密码。' },
  { id: 2, question: '如何更改我的邮箱地址？', answer: '您可以在账户设置中更新您的邮箱地址。' },
// ...更多问题...
]);
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background-color: #ecf0f1;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.welcome-container {
  margin-top: 50px;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 600px;
}

.system-status, .update-announcements, .help-center {
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 600px;
}

h1 {
  color: #34495e;
  margin-bottom: 10px;
}

h2 {
  color: #16a085;
  margin-bottom: 5px;
}

p {
  color: #7f8c8d;
  line-height: 1.6;
}

a {
  color: #3498db;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.faq-container {
  margin-top: 20px;
}

.faq-container details {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.faq-container summary {
  font-weight: bold;
  cursor: pointer;
}
</style>