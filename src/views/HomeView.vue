<template>
  <div class="welcome-page" id="reveal-top">
    <h1>欢迎来到CodeMist</h1>
    <div class="vuetyped">
      <vuetyped :strings="['亲爱的朋友你好呀', '我叫张和俊', '来自重庆大学','欢迎光临我的博客']" :loop="true" :smart-backspace="true">
        <div class="typing" />
      </vuetyped>
    </div>
    <button @click="showThankYouMessage">点一下我嘛</button>
    <transition name="fade">
      <div class="message-box" v-if="showMessage">谢谢你！</div>
    </transition>
    <div class="content">
      <section class="about-me">
        <h2>关于我</h2>
        <p>我是张和俊，一名热爱技术的开发者，这是我的技术博客，分享我的学习和工作经验。</p>
      </section>
      <section class="latest-posts">
        <h2>最新文章</h2>
        <ul>
          <li><a href="#">如何使用Vue.js构建SPA</a></li>
          <li><a href="#">JavaScript异步编程的艺术</a></li>
          <li><a href="#">探索CSS Grid布局</a></li>
        </ul>
      </section>
      <section class="categories">
        <h2>文章分类</h2>
        <ul>
          <li><a href="#">前端开发</a></li>
          <li><a href="#">后端技术</a></li>
          <li><a href="#">编程语言</a></li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
import scrollReveal from 'scrollreveal';
import { reactive, onMounted, ref} from 'vue';

const data = reactive({
  scrollReveal: scrollReveal()
});

const retScroll = () => {
  data.scrollReveal.reveal('#reveal-top', {
    duration: 600,
    delay: 500,
    origin: 'bottom',
    reset: false,
    mobile: true,
    distance: '10px',
    opacity: 0.001,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    scale: 0.9,
    beforeReveal: function (ele) {
      console.log('Animation started for:', ele);
    }
  });
};

onMounted(() => {
  retScroll();
});

const showMessage = ref(false);

const showThankYouMessage = () => {
  showMessage.value = true;
  setTimeout(() => {
    showMessage.value = false;
  }, 3000);
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.vuetyped {
  font-size: 1.2rem; /* 调整字体大小 */
  color: #4CAF50; /* 调整字体颜色 */
  margin-bottom: 2rem; /* 增加底部间距 */
}

.welcome-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
  color: #333;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

h1 {
  margin-bottom: 2rem;
  color: #4CAF50;
  text-transform: uppercase;
  letter-spacing: 2px;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

button:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

.message-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  padding: 1rem;
  border: 1px solid #333;
  border-radius: 5px;
  background-color: #e7f4e4;
  font-size: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.25);
}

/* 新增样式 */
.content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}

.about-me, .latest-posts, .categories {
  padding: 1rem;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.about-me:hover, .latest-posts:hover, .categories:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

h2 {
  color: #4CAF50;
  margin-bottom: 1rem;
}

ul {
  list-style: none;
  padding: 0;
}

ul li a {
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}

ul li a:hover {
  color: #4CAF50;
}
</style>