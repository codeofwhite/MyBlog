<!-- PhotoPage.vue -->
<template>
  <h1 class="photo-wall-title item">这是junjun的照片墙，欢迎浏览(/∇＼*)｡o○♡</h1>
  <div class="photo-wall">
    <!-- 添加标题 -->
    <div class="photo" v-for="(photo, index) in photos" :key="index" @click="openModal(photo)">
      <!--懒加载图片-->
      <img v-img-lazy="photo.src" :alt="photo.alt">
      <!-- 添加描述的div -->
      <div class="photo-description" v-if="photo.alt.length <= 10">{{ photo.alt }}</div>
      <div class="photo-description" v-else>{{ photo.alt.substring(0, 10) + '...' }}</div>
    </div>
    <!-- 当selectedPhoto不为null时，显示模态框 -->
    <PhotoModal v-if="selectedPhoto" :photo="selectedPhoto" @close="closeModal"/>
  </div>
</template>

<script>
import PhotoModal from "@/components/PhotoModal.vue";
import ScrollReveal from 'scrollreveal'
import {onMounted} from "vue";

export default {
  name: "PhotoPage",
  setup() {
    onMounted(() => {
      ScrollReveal().reveal('.item', {
        reset: true,
        distance: '100px', // 增加移动距离
        origin: 'bottom', // 改变起始方向
        interval: 100, // 增加间隔时间
        opacity: 0, // 开始时完全透明
        rotate: {
          x: 60, // 增加X轴旋转角度
          y: 10, // 新增Y轴旋转角度
          z: 60  // 增加Z轴旋转角度
        },
        scale: 0.85, // 增加初始缩放比例
        duration: 2000, // 增加动画持续时间
        easing: 'cubic-bezier(0.5, 0, 0, 1)' // 调整缓动函数
      })
    })
  },
  created() {
    this.fetchPhotoList();
  },
  data() {
    return {
      photos: [
        // 图片
      ],
      selectedPhoto: null, // 用于存储被选中的照片
    }
  },
  components: {
    PhotoModal
  },
  methods: {
    openModal(photo) {
      this.selectedPhoto = photo; // 设置选中的照片
    },
    closeModal() {
      this.selectedPhoto = null; // 清除选中的照片
    },
    async fetchPhotoList() {
      try {
        const response = await fetch('src/assets/photos.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.photos = await response.json();
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    },
  }
}
</script>

<style scoped>
/* 主题颜色 */
:root {
  --theme-color: #f9a9d4; /* 柔和的粉色 */
  --text-color: #333; /* 深色文字，以保证可读性 */
  --background-color: #fff7f8; /* 温暖的背景色 */
  --accent-color: #5b8bf7; /* 浅蓝色调 */
  --button-hover-color: rgba(91, 139, 247, 0.8); /* 按钮悬停颜色 */
  --comment-border-color: #5b8bf7; /* 评论边框颜色 */
  --button-background-color: #1bffc4; /* 按钮背景颜色 */
}

.photo-wall-title {
  text-align: center;
  margin-top: 20px;
  font-size: 2em;
  color: var(--theme-color); /* 使用主题颜色 */
  background-color: var(--background-color); /* 使用背景颜色 */
  font-family: '幼圆', sans-serif;
}

.photo-wall {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: var(--background-color); /* 整个照片墙的背景颜色 */
}

.photo {
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 200px;
  position: relative;
  border: 5px solid #abd3ff; /* 使用主题颜色 */
  border-radius: 10px;
}

.photo:hover {
  transform: translateY(-10px);
}

.photo img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.photo-description {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  text-align: center;
  padding: 5px 0;
}
</style>