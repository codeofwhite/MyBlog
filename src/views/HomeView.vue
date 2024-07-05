<template>
  <div class="home-page">
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
    <div class="info-sections">
      <div class="info-main">
        <!-- 新增网站资讯 -->
        <div class=" info-section">
          <h2>网站资讯</h2>
          <p>这里是网站的最新资讯，包括更新、活动等。</p>
          <img src="@/assets/images/photoPage-img/codeofwhite.jpg">
        </div>
      </div>
      <!-- 新增交流群显示 -->
      <div class="info-side">
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
      </div>
      <!-- 新增时间轴样式的图片展示区域 -->
    </div>
    <div class=" info-section timeline">
      <h2>我的时间轴</h2>
      <div class="timeline-item" v-for="(item, index) in timelineItems" :key="index">
        <img :src="item.image" :alt="item.description">
        <p>{{ item.date }} - {{ item.description }}</p>
      </div>
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

  ScrollReveal().reveal('.about-me, .latest-posts, .friend-links', {
    distance: '50px',
    origin: 'bottom',
    opacity: 0,
    duration: 1000,
    delay: 500
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
  {
    date: '2024-07-01',
    image: 'src/assets/images/photoPage-img/codeofwhite.jpg',
    description: '努力搬砖'
  },
  {
    date: '2024-07-10',
    image: 'src/assets/images/photoPage-img/codeofwhite.jpg',
    description: '验收啦'
  },
// ...更多时间轴项...
]);
</script>

<style scoped>
@keyframes backgroundAnimation {
  0% {
    background-color: #f9eeff;
  }
  50% {
    background-color: rgba(255, 239, 249, 0.97);
  }
  100% {
    background-color: #f9eeff;
  }
}

.home-page {
  animation: backgroundAnimation 1s infinite;
}

.welcome-page {
  position: relative; /* 设置相对定位 */
  height: 100vh; /* 高度为视口高度 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f9eeff;
  color: #333;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: -120px;
  z-index: 0;
}

/* 调整 SwiperComponents 的样式 */
.swiper {
  position: absolute; /* 设置绝对定位 */
  bottom: 15vh; /* 定位到底部 */
  width: 100%; /* 宽度占满容器 */
  height: 85vh; /* 高度为视口高度的一半 */
  opacity: 0.75; /* 设置透明度 */
  z-index: -1; /* 在父元素的层叠上下文内部设置为负值 */
  border-radius: 20px;;
}

/*用于点击按钮显示出感谢文字*/
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/*打字机效果*/
.typing {
  border-right: 2px solid #09b46a; /* 打字机光标 */
  white-space: nowrap;
  overflow: hidden;
  animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
}

@keyframes typing {
  from {
    width: 0
  }
  to {
    width: 100%
  }
}

@keyframes blink-caret {
  from, to {
    border-color: transparent
  }
  50% {
    border-color: #09b46a;
  }
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
button:hover {
  background-color: #1bffc4; /* 按钮悬停时的背景颜色 */
  transform: translateY(-2px); /* 轻微上移 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); /* 增加阴影 */
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

/* 新增info-sections布局 */
.info-sections {
  display: grid;
  grid-template-columns: 2fr 1fr; /* 左边区块宽度是右边的两倍 */
  gap: 2rem; /* 区块之间的间隙 */
  margin: 1rem;
}

.info-main {
  /* 主要信息区块 */
}

.info-side {
  display: grid;
  grid-template-rows: 1fr 1fr; /* 两个小区块等高 */
  gap: 2rem; /* 区块之间的间隙 */
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

/* 调整section样式，使其更加统一和协调 */
section {
  background: linear-gradient(to right, #afffdd, #90fff1, #6affbe); /* 添加渐变背景 */
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
  opacity: 0.95;
}

section:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

/* 调整时间轴样式，使其与其他info-section有所区别 */
/* 时间轴的样式 */
.timeline {
  position: relative;
  width: 98%;
  display: flex;
  flex-direction: column;
  align-items: center; /* 调整对齐方式，确保时间轴和内容分开 */
  padding: 0 10px; /* 增加左右内边距 */
  max-width: 1800px; /* 限制最大宽度 */
  margin: 0 auto; /* 居中显示 */
  margin-bottom: 5px;
}

/* 时间轴项的样式 */
.timeline-item {
  position: relative;
  display: block;
  align-items: center;
  margin-bottom: 3rem;
  padding: 0 100px; /* 添加左侧内边距，为时间轴线留出空间 */
}

/* 时间轴项的偶数项样式 */
.timeline-item:nth-child(even) {
  flex-direction: row-reverse;
}

/* 时间轴线的样式 */
.timeline::before {
  background-color: #4CAF50; /* 时间轴线的颜色 */
  top: 60px;
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 86%;
  width: 3px;
  z-index: -1;
}

/* 时间轴项中图片的样式 */
.timeline-item img {
  width: 80px; /* 图片大小 */
  height: 80px; /* 图片大小 */
  border-radius: 50%; /* 圆形图片 */
  object-fit: cover;
  flex-shrink: 0; /* 防止图片缩放 */
  margin: 0 15px; /* 添加图片的外边距 */
}

/* 时间轴项中文本的样式 */
.timeline-item p {
  background-color: #fff; /* 背景色 */
  border-radius: 10px; /* 圆角 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影 */
  padding: 15px; /* 内边距 */
  position: relative; /* 设置相对定位 */
  z-index: 1; /* 提高层级 */
}

/* 时间轴项的鼠标悬停效果 */
.timeline-item:hover p {
  transform: scale(1.03); /* 轻微放大 */
}

@keyframes shake {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}

.timeline-item:hover img {
  animation: shake 0.5s infinite; /* 摇晃动画 */
}

.timeline-item:active p {
  display: block; /* 显示更多信息 */
  background-color: #F5F5DC; /* 信息背景色 */
}
</style>