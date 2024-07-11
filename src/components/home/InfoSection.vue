<template>
  <div class="info-sections">
    <div class="info-main">
      <!-- 新增网站资讯 -->
      <div class="info-section">
        <h2>网站资讯</h2>
        <p>这里是网站的最新资讯，包括更新、活动等。</p>
        <img src="../../assets/images/photoPage-img/codeofwhite.jpg">
      </div>
    </div>
    <!-- 新增交流群显示 -->
    <div class="info-side">
      <div class="info-section">
        <h2>与作者交流</h2>
        <p>WX:</p>
        <p>QQ:</p>
      </div>
      <!-- 新增公告栏 -->
      <div class="info-section">
        <h2>公告栏</h2>
        <p>重要公告：网站将于2024年5月1日进行维护。</p>
      </div>
    </div>
  </div>
</template>

<script>
import ScrollReveal from "scrollreveal";
import {onMounted} from "vue";

export default {
  name: "InfoSection",
  setup() {
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
    })
  }
}
</script>

<style scoped>
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
</style>