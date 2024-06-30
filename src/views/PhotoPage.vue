<!-- PhotoPage.vue -->

<template>
  <div class="photo-wall">
    <div class="photo" v-for="(photo, index) in photos" :key="index" @click="openModal(photo)">
      <img :src="photo.src" :alt="photo.alt">
    </div>
    <!-- 当selectedPhoto不为null时，显示模态框 -->
    <PhotoModal v-if="selectedPhoto" :photo="selectedPhoto" @close="closeModal"/>
  </div>
</template>

<script>
import PhotoModal from "@/components/PhotoModal.vue";
export default {
  name: "PhotoPage",
  data() {
    return {
      photos: [
        { src: 'src/assets/images/bg.jpg', alt: '描述1' },
        { src: 'src/assets/images/codeofwhite.jpg', alt: '描述2' },
        { src: 'src/assets/images/nipju.jpg', alt: '描述2' },
        { src: 'src/assets/images/qqcool.png', alt: '描述2' },
        { src: 'src/assets/images/QQX.jpg', alt: '描述2' },
// 更多照片...
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
    }
  }
}
</script>

<style scoped>
.photo-wall {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.photo {
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  overflow: hidden; /* 隐藏超出容器的部分 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px; /* 设置固定高度 */
  width: 200px;  /* 设置固定宽度 */
}
.photo:hover {
  transform: translateY(-10px);
}
.photo img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover; /* 裁剪图片以填充容器 */
}
</style>