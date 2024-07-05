<template>
  <div class="welcome-page">
    <h1>欢迎来到CodeMist(๑ơ ₃ ơ)♥</h1>
    <div class="vuetyped">
      <vuetyped :strings="typedStrings" :loop="true" :smart-backspace="true">
        <div class="typing"/>
      </vuetyped>
    </div>
    <button @click="showThankYouMessage">点一下我嘛(๑•́ ₃ •̀๑)ｴｰ</button>
    <transition name="fade">
      <div class="message-box" v-if="showMessage">
        谢谢你的支持！(灬╹ω╹灬)
        <img src="../assets/images/photoPage-img/jujuyeah.gif"></img>
      </div>
    </transition>
    <div class="content">
      <section class="about-me">
        <h2>关于我😉</h2>
        <p>我是张和俊，一名热爱技术的开发者，这是我的技术博客，分享我的学习和工作经验。</p>
      </section>
      <section class="latest-posts">
        <h2>最新文章😊</h2>
        <ul>
          <li>
            <router-link to="/login">如何利用Windows原生完成远端控制</router-link>
          </li>
          <li>
            <router-link to="/login">2024美赛A题解答</router-link>
          </li>
          <li>
            <router-link to="/login">2024国赛备赛</router-link>
          </li>
        </ul>
      </section>
      <section class="friend-links">
        <h2>友情链接🤩</h2>
        <ul>
          <li><a href="http://mrzym.top/">小张的博客</a></li>
          <li><a href="#">李四的工作室</a></li>
          <li><a href="#">王五的技术分享</a></li>
        </ul>
      </section>
    </div>
    <!-- SwiperComponents 组件作为底部透明显示 -->
    <SwiperComponents class="swiper"></SwiperComponents>
  </div>
  <!-- 新增网站资讯 -->
  <div class=" info-section">
    <h2>网站资讯</h2>
    <p>这里是网站的最新资讯，包括更新、活动等。</p>
  </div>
  <!-- 新增交流群显示 -->
  <div class=" info-section">
    <h2>与作者交流</h2>
    <p>WX:</p>
    <p>QQ:</p>
  </div>
  <!-- 新增公告栏 -->
  <div class=" info-section">
    <h2>公告栏</h2>
    <p>重要公告：网站将于2024年5月1日进行维护。</p>
  </div>
  <!-- 新增时间轴样式的图片展示区域 -->
  <div class=" info-section timeline">
    <h2>我的时间轴</h2>
    <div class="timeline-item" v-for="(item, index) in timelineItems" :key="index">
      <img :src="item.image" :alt="item.description">
      <p>{{ item.date }} - {{ item.description }}</p>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import ScrollReveal from 'scrollreveal'
import SwiperComponents from "@/components/SwiperComponents.vue";

const typedStrings = ['亲爱的朋友你好呀', '我叫张和俊', '来自重庆大学', '欢迎光临我的博客'];

// 动画重要的设置
// 重要的设置
onMounted(() => {
// 对'.info-section'类的元素应用不同的动画效果
  ScrollReveal().reveal('.info-section', {
    reset: true,
    distance: '80px',
    origin: 'right',
    interval: 150,
    opacity: 0,
    rotate: {x: 0, y: 80, z: 0},
    scale: 0.9,
    duration: 1500,
    easing: 'ease-in-out'
  });

// 对'.timeline-item'类的元素应用另一种动画效果
  ScrollReveal().reveal('.timeline-item', {
    reset: true,
    distance: '60px',
    origin: 'left',
    interval: 120,
    opacity: 0,
    rotate: {x: 0, y: 0, z: 30},
    scale: 0.95,
    duration: 1800,
    easing: 'ease-in-out'
  });
})

const showMessage = ref(false);

const showThankYouMessage = () => {
  showMessage.value = true;
  setTimeout(() => {
    showMessage.value = false;
  }, 3000);
};

const timelineItems = ref([
  {date: '2024-01-01', image: 'src/assets/images/photoPage-img/codeofwhite.jpg', description: '新年快乐！'},
  {
    date: '2024-06-30',
    image: 'src/assets/images/photoPage-img/codeofwhite.jpg',
    description: '是倩倩juju回家的日子！呜呜呜呜'
  },
// ...更多时间轴项...
]);
</script>

<style scoped>
.welcome-page {
  position: relative; /* 设置相对定位 */
  height: 100vh; /* 高度为视口高度 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  color: #333;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: -150px;
  z-index: 0;
}

/* 调整 SwiperComponents 的样式 */
.swiper {
  position: absolute; /* 设置绝对定位 */
  bottom: 20vh; /* 定位到底部 */
  width: 100%; /* 宽度占满容器 */
  height: 80vh; /* 高度为视口高度的一半 */
  opacity: 0.75; /* 设置透明度 */
  z-index: -1; /* 在父元素的层叠上下文内部设置为负值 */
}

/*用于点击按钮显示出感谢文字*/
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.vuetyped {
  font-size: 1.8rem; /* 调整字体大小 */
  color: #09b46a; /* 调整字体颜色 */
  font-style: inherit;
  font-weight: bold;
  margin-bottom: 2rem; /* 增加底部间距 */
}

h1 {
  font-size: 2.8rem; /* 调整字体大小 */
  margin-bottom: 2rem;
  color: #00a21b;
  letter-spacing: 2px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
  margin: 10px;
}

/* 改进交互体验 */
button:hover, ul li a:hover {
  color: #ffffff; /* 按钮和链接的悬停颜色 */
  transform: scale(1.05); /* 轻微放大效果 */
}

.message-box {
  color: #09b46a;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  padding: 1rem;
  border: 1px solid #333;
  border-radius: 5px;
  background-color: #e7f4e4;
  font-size: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.25);
  font-family: 幼圆;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.message-box img {
  max-width: 100%; /* 限制图片最大宽度，确保它不会超出消息框 */
  max-height: 300px; /* 限制图片最大高度 */
  margin-top: 1rem; /* 在图片和文字之间添加一些间距 */
}

/* 新增样式 */
.content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: 1.2rem;
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

/* 新增友情链接样式 */
.friend-links {
  padding: 1rem;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.friend-links:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

/* 调整时间轴项样式，使其更加紧凑 */
.timeline-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

/* 调整图片大小，使其更适合页面布局 */
.timeline-item img {
  width: 60px; /* 减小图片宽度 */
  height: 60px; /* 减小图片高度 */
  object-fit: cover;
  border-radius: 50%;
}

/* 新增info-section样式，以区分不同的部分 */
/* 调整info-section样式，减少留白 */
/* 优化空间利用 */
.info-section {
  padding: 0.5rem; /* 减少内边距 */
  margin: 1rem 0; /* 减少上下外边距 */
  border-radius: 5px;
  background-color: #e7f4e4;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

/* 增强视觉层次感 */
.info-section:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

/* 调整时间轴样式，使其与其他info-section有所区别 */
.timeline {
  background-color: #f5f5f5;
}

/* 调整section样式，使其更加统一和协调 */
section {
  padding: 1rem;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
}

section:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}
</style>