<template>
  <div class="markdown-editor">
    <textarea v-model="markdown" placeholder="请输入Markdown内容..."></textarea>
    <div class="markdown-preview" v-html="markdownToHtml"></div>
  </div>
</template>

<script>
import {marked} from "marked";
import 'md-editor-v3/lib/style.css';

export default {
  name: "EditMarkDown",
  data() {
    return {
      markdown: "# hello world",
    };
  },
  computed: {
    markdownToHtml() {
      return marked(this.markdown);
    }
  }
};
</script>

<style>
.markdown-editor {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 900px;
  margin-top: 20px;
}

textarea {
  width: 45%;
  height: 300px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 16px;
  margin-right: 10px;
}

.markdown-preview {
  width: 45%;
  height: 300px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f8f8f8;
  overflow-y: auto;
}

/* Markdown 样式调整 */
h1 {
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
}

p {
  line-height: 1.6;
}

code {
  background-color: #f1f1f1;
  padding: 2px 4px;
  border-radius: 4px;
}

/* 添加滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

::-webkit-scrollbar-track {
  background: #efefef;
  border-radius: 10px;
}
</style>