<!--根据-->
<template>
  <div class="blog-detail">
    <h1>{{ blog.title }}</h1>
    <!-- 使用v-html指令渲染Markdown格式的博客内容 -->
    <div class="markdown-preview" v-html="markdownToHtml"></div>
    <!-- 点赞按钮和显示点赞次数的容器 -->
    <div class="likes-section">
      <button @click="incrementLikes">喜欢</button>
      <span class="likes-count">喜欢数：{{ likes }}</span>
    </div>
  </div>
</template>

<script>
// 导入Markdown文件
import helloMarked from '../assets/blog1.md?raw'
import { marked } from "marked";
import 'md-editor-v3/lib/style.css';

export default {
  name: "BlogDetail",
  components: {
    helloMarked,
  },
  created() {
    this.fetchBlogDetail();
  },
  data() {
    return {
      blog: {
        title: '',
        content: '',
      },
      likes: 0, // 添加点赞次数属性
    }
  },
  methods: {
    fetchBlogDetail() {
      // 获取路由参数中的id
      const blogId = this.$route.params.id;
      // 插入图片有问题
      const markdownContent = helloMarked;
      // 根据id从后端API获取博客详情
      // 这里是模拟的API调用
      // 实际应用中，您需要替换为真实的HTTP请求
      // 例如使用axios.get('/api/blog/' + blogId)...
      this.blog = {
        title: '博客标题：' + blogId,
        content: markdownContent
      };
    },
    incrementLikes() {
      this.likes++; // 增加点赞次数
    }
  },
  computed: {
    markdownToHtml() {
      return marked(this.blog.content);
    }
  },
}
</script>

<style scoped>
/* 主题颜色 */
:root {
  --theme-color: #f9a9d4; /* 柔和的粉色 */
  --text-color: #333; /* 深色文字，以保证可读性 */
  --background-color: #fff7f8; /* 温暖的背景色 */
  --accent-color: #5b8bf7; /* 浅蓝色调 */
}

/* 使用变量 */
.blog-detail {
  font-family: 'Comic Sans MS', 'Arial Rounded MT Bold', sans-serif;
  color: var(--text-color);
  display: flex;
  background: linear-gradient(to right, #00ff9d, #5b8bf7);
  justify-content: center;
}

.markdown-preview {
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #f9a9d4;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(252, 143, 203, 0.2);
}

/* 标题颜色 */
h1 {
  color: var(--theme-color);
  margin-bottom: 16px;
}

/* 按钮和链接颜色 */
button, a {
  background-color: var(--accent-color);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  text-decoration: none;
  transition: background-color 0.2s;
}

button:hover, a:hover {
  background-color: rgba(91, 139, 247, 0.8);
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background: var(--theme-color);
  border-radius: 10px;
}

::-webkit-scrollbar-track {
  background: var(--background-color);
}

/* 点赞部分的布局 */
.likes-section {
  position: absolute; /* 绝对定位 */
  bottom: 20px; /* 距离底部20px */
  right: 20px; /* 距离右侧20px */
  display: flex;
  align-items: center;
}

/* 点赞按钮样式 */
button {
  background-color: var(--theme-color); /* 使用主题颜色 */
  color: #fff;
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

/* 点赞次数显示样式 */
.likes-count {
  font-size: 1.2em;
  margin-left: 10px;
  color: var(--text-color);
  font-style: italic;
  margin-right: 1em;
}
</style>