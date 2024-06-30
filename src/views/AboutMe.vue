<template>
  <div class="author-container" :class="{ 'is-visible': showProfile }">
    <div class="author-profile">
      <h2>关于作者</h2>
      <p>CodeMist的创作者，热爱编程，致力于分享技术知识和创意。</p>
      <p>你们好呀，我是来自重庆大学22级的数据科学与大数据技术的張和俊</p>
      <p>我来自澳门</p>
      <!-- 更多关于作者的信息 -->
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';

// 测试是否能够正常打印

// const store = useStore();
// // 打印全局状态
// console.log('uemail:', store.state.uemail);
// console.log('isLoggedIn:', store.state.isLoggedIn);

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
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 50px auto;
  text-align: center;
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