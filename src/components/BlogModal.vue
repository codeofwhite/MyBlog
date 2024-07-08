<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>{{ blog.title }}</h3>
        <button class="close-button" @click="closeModal">×</button>
      </div>
      <div class="modal-body">
        <img :src="blog.url" alt="Blog Image" class="blog-image">
        <p><strong>分类:</strong> {{ blog.category }}</p>
        <p><strong>创建日期:</strong> {{ new Date(blog.createDate).toLocaleDateString() }}</p>
        <p><strong>更新日期:</strong> {{ new Date(blog.updateDate).toLocaleDateString() }}</p>
        <p><strong>点赞数:</strong> {{ blog.likesCount }}</p>
      </div>
      <div class="modal-footer">
        <button class="edit-button" @click="editBlog">修改</button>
        <button class="delete-button" @click="deleteBlog">删除</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router';
import axios from "axios";

const router = useRouter();

// eslint-disable-next-line no-undef
const props = defineProps({
  blog: Object
});

// eslint-disable-next-line no-undef
const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};

const editBlog = () => {
  // 使用router.push方法导航到博文的修改页面
  router.push({name: 'EditSingleBlog', params: {id: props.blog.id}});
  console.log('修改博客', props.blog.id);
};

const deleteBlog = async () => {
  try {
    // 发送DELETE请求到后端
    const response = await axios.delete(`http://localhost:8005/blogs/delete/${props.blog.id}`);
    // 请求成功后的操作
    alert('删除成功'); // 显示一个简单的成功通知
    console.log(response.data); // 打印成功消息
    closeModal(); // 关闭模态框
    emit('blogDeleted', props.blog.id); // 通知父组件博客已被删除
    // 可能还需要更新视图或通知用户

  } catch (error) {
    // 错误处理
    console.error('删除博客失败:', error);
    alert('删除失败'); // 显示一个简单的错误通知
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.51);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.modal-content {
  /* ... */
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e5e5;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-body {
  padding: 1rem 0;
}

.blog-image {
  max-width: 70%;
  height: auto;
  margin-bottom: 1rem;
}

.modal-footer {
  padding-top: 1rem;
  border-top: 1px solid #e5e5e5;
  text-align: right;
}

.edit-button, .delete-button {
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-button {
  background-color: #ffc107;
  color: #fff;
}

.edit-button:hover {
  background-color: #e0a800;
}

.delete-button {
  background-color: #dc3545;
  color: #fff;
}

.delete-button:hover {
  background-color: #c82333;
}
</style>