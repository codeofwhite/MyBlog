<!--写作页面-->
<template>
  <div class="editor-container">
    <MdEditor v-model="text"/>
    <!-- 将按钮放置在编辑器下方，并使其宽度与编辑器一致 -->
    <button class="submit-button" @click="showModal = true">上传博客</button>
  </div>
  <SubmitArticle v-if="showModal" :text="text" @close="showModal = false"/>
  <UploadMarkDown class=".upload-markdown"/>
</template>

<script setup>
import {ref} from 'vue';
import {MdEditor} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import SubmitArticle from "@/components/SubmitArticle.vue";
import UploadMarkDown from "@/components/UploadMarkDown.vue";

const text = ref('# Hello Editor');
const showModal = ref(false);
</script>

<style scoped>
.editor-container {
  padding: 20px;
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

.upload-markdown {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ffffff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}
</style>