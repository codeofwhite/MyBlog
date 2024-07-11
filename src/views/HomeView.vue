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
          <img src="../assets/gifs/jujuyeah.gif"></img>
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
      <SwiperComponents class="swiper"/>
    </div>
    <InfoSection></InfoSection>
    <TimeLine></TimeLine>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import ScrollReveal from 'scrollreveal'
import SwiperComponents from "@/components/home/SwiperComponents.vue";
import InfoSection from "@/components/home/InfoSection.vue";
import TimeLine from "@/components/home/TimeLine.vue";

const typedStrings = ['亲爱的朋友你好呀', '我叫张和俊', '来自重庆大学', '欢迎光临我的博客'];

// 动画重要的设置
// 重要的设置
onMounted(() => {
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
</script>

<style scoped>
/*用户动态切换背景图片颜色*/
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

/*大父亲组件*/
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

/*打字机效果的自定义*/
.typing {
  border-right: 2px solid #09b46a; /* 打字机光标 */
  white-space: nowrap;
  overflow: hidden;
  animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
}

/*定义typing动画*/
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

h2 {
  color: #4CAF50;
  margin-bottom: 1rem;
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

.about-me, .latest-posts {
  padding: 1rem;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.about-me:hover, .latest-posts:hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
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
</style>