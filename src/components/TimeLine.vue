<template>
  <!-- 新增时间轴样式的图片展示区域 -->
  <div class="timeline">
    <h2>我的时间轴</h2>
    <!-- 时间轴的左上角动画 -->
    <div class="corner-animation top-left-animation">
      <img src="../assets/gifs/jujuyeah.gif" class="floating">
      <img src="../assets/gifs/jujunomoney.gif">
    </div>
    <!-- 时间轴的右上角动画 -->
    <div class="corner-animation top-right-animation">
      <img src="../assets/gifs/jujuhead.gif">
      <img src="../assets/gifs/jujujumping.gif" class="spinning">
    </div>
    <div class="timeline-item" v-for="(item, index) in timelineItems" :key="index">
      <img :src="item.image" :alt="item.description">
      <p>{{ item.date }} - {{ item.description }}</p>
    </div>
    <!-- 时间轴的左下角动画 -->
    <div class="corner-animation bottom-left-animation">
      <img src="../assets/gifs/jujufigting.gif">
    </div>
    <!-- 时间轴的右下角动画 -->
    <div class="corner-animation bottom-right-animation">
      <img src="../assets/gifs/jujudance.gif">
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import ScrollReveal from "scrollreveal";

onMounted(() => {
  // 对'.timeline-item'类的元素应用另一种动画效果
  ScrollReveal().reveal('.timeline-item', {
    reset: true,
    distance: '60px',
    origin: window.innerWidth > 768 ? 'left' : 'bottom',
    interval: 120,
    opacity: 0,
    rotate: {x: 0, y: 0, z: 30},
    scale: 0.95,
    duration: 1800,
    easing: 'ease-in-out'
  });
})

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
  animation-direction: reverse;
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
  width: 5px;
  z-index: 0;
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

.timeline-item:active p {
  display: block; /* 显示更多信息 */
  background-color: #F5F5DC; /* 信息背景色 */
}

.timeline-item:hover img {
  animation: shake 0.5s infinite; /* 摇晃动画 */
}

@keyframes shake {
  0%, 100% {
    transform: rotate(-3deg);
  }
  50% {
    transform: rotate(3deg);
  }
}

/* 动画元素的基本样式 */
.corner-animation {
  position: absolute;
  background-repeat: no-repeat;
  background-size: contain;
  animation: bounceAnimation 1.5s ease-in-out infinite;
}

/* 动画元素的基本样式 */
.corner-animation img {
  width: 200px; /* 根据需要调整宽度 */
  height: 200px; /* 根据需要调整高度 */
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

/* 浮动动画 */
.floating {
  animation-name: floating;
}

/* 旋转动画 */
.spinning {
  animation-name: spinning;
}

/* 调整左上角动画元素的位置和大小 */
.top-left-animation {
  top: calc(2% + 10px);
  left: calc(5% + 15px);
  width: calc(80px + 5%);
  height: calc(80px + 5%);
}

/* 调整右上角动画元素的位置和大小 */
.top-right-animation {
  top: calc(3% + 20px);
  right: calc(2% + 10px);
  width: calc(90px + 3%);
  height: calc(90px + 3%);
}

/* 调整左下角动画元素的位置和大小 */
.bottom-left-animation {
  bottom: calc(4% + 30px);
  left: calc(1% + 5px);
  width: calc(100px + 2%);
  height: calc(100px + 2%);
}

/* 调整右下角动画元素的位置和大小 */
.bottom-right-animation {
  bottom: calc(5% + 40px);
  right: calc(4% + 20px);
  width: calc(110px + 4%);
  height: calc(110px + 4%);
}

/* 弹跳动画关键帧 */
@keyframes bounceAnimation {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px); /* 调整弹跳距离 */
  }
}

/* 浮动动画关键帧 */
@keyframes floating {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* 旋转动画关键帧 */
@keyframes spinning {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>