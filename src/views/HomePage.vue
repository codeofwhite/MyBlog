<template>
  <div class="welcome-container">
    <h1>{{ welcomeMessage }}</h1>
    <p>这里是您的个人创作管理空间，开始探索吧！</p>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const welcomeMessage = ref('欢迎来到CodeMist的后台管理空间!');
</script>

<style scoped>
.welcome-container {
  color: #333;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

h1 {
  color: #5b5b5b;
}

p {
  color: #6d6d6d;
  font-size: 1.1em;
}
</style>