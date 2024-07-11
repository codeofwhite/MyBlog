<template>
  <AudioPlay></AudioPlay>
  <div id="app">
    <div class="app-container">
      <!-- 头部和导航 -->
      <header class="header">
        <div class="container">
          <router-link to="/">
            <h1>CodeMist</h1>
          </router-link>
          <Navigation/> <!-- 使用导航栏组件 -->
        </div>
      </header>
      <!-- 主内容区域 -->
      <!-- 这里会根据路由显示不同的页面 -->
      <!--      <router-view v-slot="{ Component }">-->
      <!--        路由切换动画-->
      <!--        <transition name="anime">-->
      <!--          <component :is="Component" />-->
      <!--        </transition>-->
      <!--      </router-view>-->
      <router-view>
      </router-view>
      <!-- 底部栏 -->
      <footer class="footer">
        <div class="footer-content">
          <p>感谢您的访问，希望您喜欢我们的网站！</p>
          <p>Powered by Vue.js, Vuetify, and a sprinkle of love </p>
        </div>
      </footer>
    </div>
  </div>
  <div class="popup-box">
    <!-- 弹窗1 -->
    <transition name="fade" @after-enter="hidePopup1">
      <div class="popup" v-if="showPopup1">
        点右下角的音符可以播放音乐！(๑¯ω¯๑)
      </div>
    </transition>
    <!-- 弹窗2 -->
    <transition name="fade" @after-enter="hidePopup2">
      <div class="popup" v-if="showPopup2">
        登录后可发布问题和点赞博客哟！( つ•̀ω•́)つ
      </div>
    </transition>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import {RouterView} from 'vue-router';
import Navigation from "@/components/Navigation.vue";
import AudioPlay from "@/components/home/AudioPlay.vue";
import router from "@/router/index.js"; // 路由跳转
import {L2Dwidget} from 'live2d-widget'


// 显示弹窗
const showPopup1 = ref(true);
const showPopup2 = ref(true);

// 使用setTimeout来控制弹窗显示时间
setTimeout(() => {
  showPopup1.value = false;
  showPopup2.value = false;
}, 2000);

// onMounted代替created， 用于杀死动画
onMounted(() => {
  document.body.removeChild(document.getElementById('Loading')) // 加载页面完后移除加载动画
  L2Dwidget
      //此处是对点击人物时触发事件的监听
      .on('*', (name) => {

        console.log('%c 你点击了 ' + '%c -> ' + name, 'background: #222; color: yellow',
            'background: #fff; color: #000')
      })
      .init({
        model: {
          jsonPath: 'https://cdn.jsdelivr.net/gh/wangsrGit119/wangsr-image-bucket/L2Dwidget/live2d-widget-model-wanko/assets/wanko.model.json'
        },
        display: {
          //人物的属性配置
          position: 'right',
        },
        mobile: {
          show: true, // 移动端是否展示
          scale: 0.5, // 缩放比例
        },
      })
})
</script>

<style scoped>
#app {
  z-index: 1000;
}

.header {
  background-color: #f8f9fa; /* 背景色 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影效果 */
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
  animation: colorChange 10s infinite; /* 应用动态颜色动画 */
  margin: 0; /* 去除默认外边距 */
  font-weight: bold; /* 字体粗细 */
}

@keyframes colorChange {
  0% {
    color: #6affbe;
  }
  /* 深蓝色 */
  25% {
    color: #90fff1;
  }
  /* 柔和的绿色 */
  50% {
    color: #1bffc4;
  }
  /* 淡粉色 */
  75% {
    color: #1bddff;
  }
  /* 金色 */
  100% {
    color: #00fff7;
  }
  /* 深蓝色 */
}

.footer {
  background-color: #00a6be; /* 淡粉色背景 */
  color: #ffffff; /* 粉红色文字 */
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

/* 弹窗外部 */
.popup-box {
  position: fixed;
  top: 1rem; /* 距离顶部1rem */
  right: 1rem; /* 距离右侧1rem */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 80px;
}

.popup {
  background-color: #FFC0CB; /* 浅粉色背景 */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem; /* 弹窗之间的间距 */
  transition: opacity 0.5s, visibility 0.5s;
  visibility: visible; /* 默认可见 */
}

/* 第二个弹窗的样式 */
.popup:nth-child(2) {
  background-color: #ADD8E6; /* 浅蓝色背景 */
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/*路由切换动画*/
/*这个路由切换要调整的东西有点多，暂时不用*/
</style>
