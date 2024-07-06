<!--根据-->
<template>
  <!-- 弹幕组件，使用v-if控制显示状态 -->
  <vue-danmaku v-if="showDanmu" v-model:danmus="danmus" class="danmu"></vue-danmaku>
  <div class="blog-detail">
    <div class="blog-title">
      <h1>{{ blog.title }}</h1>
    </div>
    <!-- 使用v-html指令渲染Markdown格式的博客内容 -->
    <div class="markdown-preview" v-html="markdownToHtml"></div>
    <!-- 点赞按钮和显示点赞次数的容器 -->
    <div class="likes-section">
      <button @click="incrementLikes">喜欢</button>
      <!-- 弹幕开关按钮 -->
      <button class="danmuButton" @click="toggleDanmu">切换弹幕</button>
      <span class="likes-count">喜欢数：{{ likes }}</span>
    </div>
    <!-- 弹幕输入区域 -->
    <div class="danmu-input-section">
      <input v-model="newDanmu" placeholder="写弹幕..."/>
      <button @click="insertDanmu">发送弹幕</button>
    </div>
  </div>
  <!-- 评论区 -->
  <div class="comments-section">
    <h2>评论</h2>
    <div v-for="comment in comments" :key="comment.id" class="comment">
      <p><strong>{{ comment.userEmail }}：</strong>{{ comment.comment }}</p>
    </div>
    <div class="add-comment">
      <input v-model="newComment" placeholder="添加评论..."/>
      <button @click="submitComment">提交</button>
    </div>
  </div>
</template>

<script>
// 导入Markdown文件
import {marked} from "marked";
import 'md-editor-v3/lib/style.css';
import vueDanmaku from 'vue3-danmaku'
import axios from 'axios';
import {Minio} from "minio-js";

export default {
  name: "BlogDetail",
  components: {
    vueDanmaku,
  },
  created() {
    this.initMinioClient()
    this.fetchBlogDetail(); // 在组件创建时获取博客
    this.fetchDanmus(); // 在组件创建时获取弹幕
    this.fetchComments(); // 在组件创建时获取评论
  },
  data() {
    return {
      blog: {
        title: '',
        content: '',
      },
      likes: 0, // 添加点赞次数属性
      likeState: false, // 点赞状态
      comments: [
        {
          userEmail: '',
          comment: ''
        }
      ], // 评论数组
      newComment: '', // 新评论的绑定数据
      danmus: [], // 弹幕
      newDanmu: '', // 用户新输入的弹幕
      showDanmu: true, // 控制弹幕显示的状态，默认为true
    }
  },
  methods: {
    // 初始化minio客户端
    initMinioClient() {
      this.minioClient = new Minio.Client({
        endPoint: 'localhost', // MinIO服务器地址
        port: 9000, // MinIO服务器端口
        useSSL: false, // 是否使用SSL
        accessKey: 'gAjYSAJDImJP9ZvqgJB6', // MinIO的accessKey
        secretKey: 'cb8SkANxDCm90kdLz2puij4U7J8ZmlTBWAHYInT3' // MinIO的secretKey
      });
    },
    // 得到博客的md文件
    async fetchBlogDetail() {
      // 获取路由参数中的id
      const blogId = this.blogId;
      const title = this.title;

      // 尝试使用minio获取文件流
      try {
        const stream = await this.minioClient.getObject('myblogbucket', `markdowns/${blogId}.md`);
        let markdownContent = '';
        stream.on('data', (chunk) => {
          markdownContent += chunk.toString();
        });
        stream.on('end', () => {
          this.blog = {
            title: '博客标题：' + title,
            content: markdownContent
          };
        });
      } catch (error) {
        console.error('Error fetching blog detail:', error);
      }

      // 插入图片有问题=>已经解决，图像需要放上网
    },
    // 插入新的弹幕并且显示
    async insertDanmu() {
      if (!this.userEmail) {
        alert('请登录后再发布弹幕！');
        return; // 如果用户未登录，显示提示并退出函数
      }

      if (this.newDanmu.trim()) {
        try {
          const response = await axios.post('http://localhost:8004/danmu/insertDanmu', {
            danmu: this.newDanmu,
            uemail: this.userEmail, // 假设 userEmail 是用户邮箱
            blogId: this.blogId // 假设 blogId 是博客ID
          });
          if (response.data === 'success') {
            this.danmus.push(this.newDanmu); // 将新弹幕添加到数组中
            this.newDanmu = ''; // 清空输入框
          }
        } catch (error) {
          console.error('插入弹幕失败:', error);
        }
      }
    },
    // 得到后端对应博客的弹幕数据
    async fetchDanmus() {
      try {
        const response = await axios.post('http://localhost:8004/danmu/selectDanmu', {
          blogId: this.blogId // 假设 blogId 是博客ID
        });
        this.danmus = response.data; // 设置弹幕数组
      } catch (error) {
        console.error('获取弹幕失败:', error);
      }
    },
    // 用户点赞的行为
    incrementLikes() {
      if (this.isLoggedIn) {
        if (!this.likeState) {
          this.likes++; // 增加点赞次数
          this.likeState = true;
        } else {
          alert('您已经点过赞了！')
        }
      } else {
        alert('请登录后再点赞！');
      }
    },
    // 提交评论
    async submitComment() {
      // 检查用户是否已登录
      if (!this.userEmail) {
        alert('请先登录再发表评论！');
        return; // 如果用户未登录，显示提示并退出函数
      }
      if (this.newComment.trim()) {
        try {
          const response = await axios.post('http://localhost:8005/comments/insertComment', JSON.stringify({
            userEmail: this.userEmail, // 用户的邮箱
            comment: this.newComment, // 评论内容
            blogId: this.blogId // 博客ID
          }), {
            headers: {
              "Content-Type": "application/json"
            }
          });
          if (response.data === 'success') {
            await this.fetchComments(); // 重新获取评论以更新列表
            this.newComment = ''; // 清空输入框
          }
        } catch (error) {
          console.error('提交评论失败:', error);
        }
      }
    },
    // 得到评论
    async fetchComments() {
      try {
        const response = await axios.get('http://localhost:8005/comments/getAllComments', {
          params: {blogId: this.blogId}
        });
        this.comments = response.data; // 设置评论数组
      } catch (error) {
        console.error('获取评论失败:', error);
      }
    },
    toggleDanmu() {
      this.showDanmu = !this.showDanmu; // 切换弹幕的显示状态
    },
  },
  computed: {
    markdownToHtml() {
      return marked(this.blog.content);
    },
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    blogId() {
      return this.$route.params.id;
    },
    userEmail() {
      return this.$store.state.uemail;
    },
    title() {
      // 检查$route.params.blogContent是否已定义
      if (this.$route.params.title !== undefined) {
        return this.$route.params.title;
      } else {
        console.error('title is undefined');
        // 可以设置一个默认值或返回错误提示
        return 'title加载中...';
      }
    },
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
  --button-hover-color: rgba(91, 139, 247, 0.8); /* 按钮悬停颜色 */
  --comment-border-color: #5b8bf7; /* 评论边框颜色 */
  --button-background-color: #1bffc4; /* 按钮背景颜色 */
}

/* 使用变量 */
.blog-detail {
  padding-top: 30px; /* 根据标题的高度调整 */
  font-family: 'Comic Sans MS', 'Arial Rounded MT Bold', sans-serif;
  color: var(--text-color);
  display: flex;
  flex-direction: column; /* 使用Flexbox进行布局 */
  align-items: center; /* 水平居中 */
  background: linear-gradient(to right, rgba(249, 238, 255, 0.69), #90fff1);
}

/* 新增的博客标题样式 */
.blog-title {
  margin-bottom: 20px; /* 增加与下方内容的间距 */
  padding: 10px 0; /* 增加上下填充 */
  width: 50%; /* 宽度占满整个视口宽度 */
  background-color: #fff; /* 背景颜色 */
  z-index: 1000; /* 确保标题在其他内容之上 */
  text-align: center; /* 标题居中 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 轻微的阴影效果 */
  border-radius: 10px;
}

.markdown-preview {
  width: 100%;
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #f9a9d4;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(252, 143, 203, 0.2);
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

/* 点赞次数显示样式 */
.likes-count {
  font-size: 1.2em;
  margin-left: 10px;
  color: var(--text-color);
  font-style: italic;
  margin-right: 1em;
}

.comments-section {
  margin-top: 20px;
  padding: 20px;
  background-color: var(--background-color);
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.comments-section h2 {
  margin-bottom: 10px;
  cursor: pointer;
}

.comment {
  background-color: #fff;
  border-left: 4px solid var(--accent-color);
  padding: 10px 15px;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;
}

.comment:hover {
  background-color: #f9f9f9;
}

.comment p {
  word-break: break-all; /* 在10个字后换行 */
}

.add-comment input {
  padding: 10px;
  margin-right: 10px;
  width: calc(100% - 120px);
}

.add-comment {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.add-comment input {
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-comment button {
  padding: 10px 20px;
  background-color: var(--theme-color);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-comment button:hover {
  background-color: #1bffc4;
}

/*弹幕*/
.danmu {
  position: fixed;
  top: 150px;
  left: 0;
  right: 0;
  height: 100px;
  z-index: 2000;
}

/*控制弹幕的按钮*/
.danmuButton {
  position: fixed;
  display: flex;
  bottom: 55px; /*距离底部*/
}

/* 弹幕输入区域样式 */
.danmu-input-section {
  position: fixed;
  bottom: 100px; /* 调整为合适的位置 */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  z-index: 2000;
}

.danmu-input-section input {
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
}

.danmu-input-section button {
  padding: 10px 20px;
  background-color: var(--theme-color);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.danmu-input-section button:hover {
  background-color: var(--button-hover-color);
}
</style>