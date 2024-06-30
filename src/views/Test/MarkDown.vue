<template>
  <div class="editor-container">
    <MdEditor v-model="text" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('# Hello Editor');

</script>

<style>
.editor-container {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 40px auto;
}

.md-editor {
  border: 1px solid #dcdcdc;
  min-height: 500px;
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
</style>