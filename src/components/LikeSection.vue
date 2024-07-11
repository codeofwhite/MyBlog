<template>
  <!-- 点赞按钮和显示点赞次数的容器 -->
  <div class="likes-section">
    <button @click="toggleLike" :class="{ 'liked': likeState }">
      {{ likeState ? '取消点赞' : '喜欢' }}
    </button>
    <!-- 弹幕开关按钮 -->
    <span class="likes-count">喜欢数：{{ likes }}</span>
  </div>
</template>

<script>
import {marked} from "marked";
import axios from "axios";

export default {
  name: "LikeSection",
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    blogId() {
      return this.$route.params.id;
    },
    userEmail() {
      return this.$store.state.uemail;
    },
  },
  data() {
    return {
      likes: 0, // 添加点赞次数属性
      likeState: false, // 点赞状态
    }
  },
  mounted() {
    this.getLikesCount();
    this.checkLikeStatus(); // 检查点赞状态
  },
  methods: {
    // 检查用户的点赞状态
    async checkLikeStatus() {
      try {
        const response = await axios.post('http://localhost:9527/blogs/checkLikeStatus', {
          blogId: this.blogId,
          userId: this.userEmail
        });
        this.likeState = response.data; // 假设后端返回的是 true/false
      } catch (error) {
        console.error('检查点赞状态失败:', error);
      }
    },
    // 点赞功能
    async likeBlog() {
      try {
        const response = await axios.post('http://localhost:9527/blogs/like', {
          blogId: this.blogId,
          userId: this.userEmail // 假设 userEmail 是用户ID
        });
        if (response.status === 200) {
          this.likes++;
          await this.getLikesCount(); // 重新获取点赞数
        }
      } catch (error) {
        console.error('点赞失败:', error);
      }
    },
    // 取消点赞功能
    async unlikeBlog() {
      try {
        const response = await axios.post('http://localhost:9527/blogs/unlike', {
          blogId: this.blogId,
          userId: this.userEmail // 假设 userEmail 是用户ID
        });
        if (response.status === 200) {
          this.likes--;
          await this.getLikesCount(); // 重新获取点赞数
        }
      } catch (error) {
        console.error('取消点赞失败:', error);
      }
    },
    // 获取点赞数
    async getLikesCount() {
      try {
        const response = await axios.post('http://localhost:9527/blogs/getLikesCount', {
          blogId: this.blogId
        });
        this.likes = response.data;
      } catch (error) {
        console.error('获取点赞数失败:', error);
      }
    },
    // 切换点赞状态
    async toggleLike() {
      if (this.isLoggedIn) {
        if (!this.likeState) {
          await this.likeBlog();
        } else {
          await this.unlikeBlog();
        }
        // 每次切换后重新检查点赞状态
        await this.checkLikeStatus();
      } else {
        alert('请登录后再点赞！');
      }
    },
  }
}
</script>

<style scoped>
/* 点赞部分的布局 */
.likes-section {
  position: fixed; /* 固定定位 */
  bottom: 8px; /* 距离底部px */
  left: 8%; /* 调整横坐标 */
  transform: translateX(-50%); /* 用于确保元素水平居中 */
  display: flex;
  align-items: center;
  z-index: 1000; /* 确保点赞按钮在其他内容之上 */
}

/* 点赞按钮样式 */
button {
  background-color: var(--theme-color); /* 使用主题颜色 */
  color: rgb(255, 255, 255);
  padding: 12px 24px; /* 增加填充以使按钮更大 */
  font-size: 1.2em; /* 增加字体大小 */
  font-weight: bold; /* 字体加粗 */
  border: none;
  border-radius: 25px; /* 更圆的边角 */
  cursor: pointer; /* 鼠标悬停时显示手形图标 */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
  transition: transform 0.3s ease, background-color 0.3s ease;
  margin-right: 10px; /* 与点赞次数保持间距 */
}

button:hover {
  transform: scale(1.05); /* 鼠标悬停时轻微放大 */
  background-color: var(--accent-color); /* 鼠标悬停时改变背景色 */
}

/* 已点赞的按钮样式 */
button.liked {
  background-color: grey; /* 点赞后的按钮颜色 */
}

/* 点赞次数显示样式 */
.likes-count {
  font-size: 1.2em;
  margin-left: 10px;
  color: var(--text-color);
  font-style: italic;
  margin-right: 1em;
}
</style>