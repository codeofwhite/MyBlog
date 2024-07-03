<template>
  <!-- 送给作者的话 -->
  <div class="message-to-author">
    <h2>送给作者的话</h2>
    <el-form @submit.prevent="handleMessageSubmit" class="message-form">
      <el-form-item label="您想说的话">
        <el-input type="textarea" v-model="newMessage.content" placeholder="请在这里输入您想对作者说的话..."></el-input>
      </el-form-item>
      <el-form-item label="上传图片">
        <input type="file" @change="handleImageUpload">
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交留言</el-button>
      </el-form-item>
    </el-form>
    <!-- 显示上传的图片 -->
    <div v-if="newMessage.image" class="image-preview">
      <img :src="newMessage.image" alt="Image preview">
    </div>
  </div>
</template>

<script>
export default {
  name: "GaveMe",
  data() {
    return {
      newMessage: {
        content: '',
        image: null // 存储图片的数据
      }
    };
  },
  methods: {
    handleMessageSubmit() {
      // 这里添加处理提交留言的逻辑
      console.log('留言内容:', this.newMessage.content);
      // 可以在这里添加发送留言和图片到服务器的代码
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newMessage.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  },
}
</script>

<style scoped>
/* 送给作者的话的样式 */
.message-to-author {
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
  background-color: #e0f7fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.message-form {
  background-color: #b2ebf2;
  padding: 20px;
  border-radius: 8px;
}

.image-preview img {
  max-width: 100%;
  height: auto;
  margin-top: 20px;
}
</style>