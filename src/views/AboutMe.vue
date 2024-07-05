<template>
  <div class="author-container" :class="{ 'is-visible': showProfile }">
    <div class="author-profile">
      <h2>关于作者</h2>
      <p><i class="fas fa-code"></i> CodeMist的创作者，热爱编程，致力于分享技术知识和创意。</p>
      <p><i class="fas fa-university"></i> 你们好呀，我是来自重庆大学22级的数据科学与大数据技术的張和俊。</p>
      <p><i class="fas fa-globe-asia"></i> 我来自澳门，一个充满活力和多元文化的城市。</p>
      <p><i class="fas fa-briefcase"></i> 我在数据分析和机器学习领域有着浓厚的兴趣，目前正在研究如何利用大数据改善城市生活。
      </p>
      <p><i class="fas fa-futbol"></i> 业余时间，我喜欢篮球和音乐，这让我能够放松心情，同时也拓宽了我的视野。</p>
      <p><i class="fas fa-lightbulb"></i> 我的梦想是成为一名创新者，为世界带来积极的变化。</p>
      <!-- 更多关于作者的信息 -->
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';

const showProfile = ref(false);

onMounted(() => {
  setTimeout(() => {
    showProfile.value = true;
  }, 500); // 页面加载后500毫秒显示介绍文字
});
</script>

<style scoped>
.author-container {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.is-visible {
  opacity: 1;
}

.author-profile {
  padding: 20px;
  background-color: #f3f3f3;
  background-image: url('@/assets/images/photoPage-img/bg.jpg'); /* 添加背景图片 */
  background-size: cover;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 50px auto;
  text-align: center;
  font-family: 'Open Sans', sans-serif; /* 使用Google Fonts */
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

p {
  color: #666;
  line-height: 1.6;
}
</style>