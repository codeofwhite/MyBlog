<template>
  <div class="editor-container">
    <!-- 新增的返回按钮 -->
    <div class="back-button-container">
      <button class="back-button" @click="goBack">返回</button>
    </div>
    <MdEditor v-model="text"/>
    <!-- 将按钮放置在编辑器下方，并使其宽度与编辑器一致 -->
    <button class="submit-button" @click="showModal = true">更新博客</button>
  </div>
  <UpdateArticleModal v-if="showModal" :text="text" :blogId="blogId" @close="showModal = false"/>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {MdEditor} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {Minio} from 'minio-js';
import {useRoute, useRouter} from 'vue-router';
import UpdateArticleModal from "@/components/UpdateArticleModal.vue";

// 使用useRoute来获取当前路由实例
const route = useRoute();
// 使用useRouter来获取router实例以编程方式导航
const router = useRouter();

const text = ref('');
const showModal = ref(false);

// 定义响应式数据
const blogId = ref(''); // 假设这是从路由参数中获取的
const title = ref(''); // 假设这是从路由参数中获取的
const blog = ref({});

// 初始化minio客户端
const minioClient = new Minio.Client({
  endPoint: 'localhost', // MinIO服务器地址
  port: 9000, // MinIO服务器端口
  useSSL: false, // 是否使用SSL
  accessKey: 'gAjYSAJDImJP9ZvqgJB6', // MinIO的accessKey
  secretKey: 'cb8SkANxDCm90kdLz2puij4U7J8ZmlTBWAHYInT3' // MinIO的secretKey
});

// 新增的返回编辑文章页面的方法
const goBack = () => {
  router.push({name: 'EditArticle', params: {id: blogId.value}});
};

// 得到博客的md文件
const fetchBlogDetail = async () => {
  // 尝试使用minio获取文件流
  try {
    const stream = await minioClient.getObject('myblogbucket', `markdowns/${blogId.value}.md`);
    let markdownContent = '';
    stream.on('data', (chunk) => {
      markdownContent += chunk.toString();
    });
    stream.on('end', () => {
      blog.value = {
        title: '博客标题：' + title.value,
        content: markdownContent
      };
      // 要放在这里才能赋值到，异步的，需要等待所有数据被接收完毕后才能将其赋值给text
      console.log(markdownContent);
      text.value = markdownContent;
    });
  } catch (error) {
    console.error('Error fetching blog detail:', error);
  }
};

onMounted(async () => {
  // 假设这里是获取路由参数并赋值给blogId和title的逻辑
  blogId.value = route.params.id;
  // console.log(blogId.value);
  // 变成异步的就可以避免一些缓存的问题，就是更新后minio数据的问题
  await fetchBlogDetail();
});
</script>

<style scoped>
.editor-container {
  position: relative; /* 相对定位 */
  padding-top: 80px; /* 增加顶部的内边距 */
  background: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.md-editor {
  border: 1px solid #dcdcdc;
  min-height: 500px;
  width: 100%; /* 使编辑器宽度填满容器 */
}

/* 调整编辑器内部的工具栏样式 */
.md-editor .md-editor-toolbar {
  background-color: #fff;
  border-bottom: 1px solid #eaecef;
}

/* 调整编辑器内部的预览区域样式 */
.md-editor .md-editor-preview {
  padding: 20px;
  background-color: #fbfbfb;
  border-left: 1px solid #eaecef;
}

/* 当编辑器获得焦点时，改变边框颜色 */
.md-editor.md-editor-focus {
  border-color: #5c6bc0;
}

/* 自定义编辑器内部的滚动条样式 */
.md-editor ::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.md-editor ::-webkit-scrollbar-thumb {
  background: #c0c0c0;
  border-radius: 4px;
}

.md-editor ::-webkit-scrollbar-track {
  background: #f5f5f5;
  border-radius: 4px;
}

/* 新增按钮容器的样式 */
.button-container {
  width: 100%; /* 使按钮容器的宽度与编辑器一致 */
  display: flex;
  justify-content: center; /* 水平居中 */
  margin-top: 20px; /* 与编辑器的间距 */
}

.submit-button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #409EFF; /* 按钮背景颜色 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  width: 100%; /* 使按钮宽度填满容器 */
  max-width: 200px; /* 最大宽度限制 */
}

.submit-button:hover {
  background-color: #367BEC; /* 鼠标悬停时的背景颜色 */
}

/* 新增返回按钮容器的样式 */
.back-button-container {
  position: absolute; /* 绝对定位 */
  top: 20px; /* 距离顶部20px */
  left: 20px; /* 距离左侧20px */
}

/* 新增返回按钮的样式 */
.back-button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #67C23A; /* 按钮背景颜色 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  width: 100%; /* 使按钮宽度填满容器 */
  max-width: 200px; /* 最大宽度限制 */
}

.back-button:hover {
  background-color: #5DAE28; /* 鼠标悬停时的背景颜色 */
}
</style>