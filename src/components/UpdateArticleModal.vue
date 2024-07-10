<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-container">
      <h2 class="upload-title">更新博文</h2>
      <form @submit.prevent="updateBlog" class="upload-form">
        <!-- ...其他输入组... -->
        <div class="input-group">
          <input type="text" id="blogTitle" v-model="blog.title" placeholder="请输入博文标题"/>
          <label for="blogTitle">博文标题</label>
        </div>
        <div class="input-group">
          <input type="text" id="blogCategory" v-model="blog.category" placeholder="请选择博文类别"/>
          <label for="blogCategory">博文类别</label>
        </div>
        <!-- 新增图片上传输入组 -->
        <div class="input-group">
          <input type="file" id="blogImage" @change="handleFileUpload" placeholder="上传图片"/>
          <label for="blogImage">上传图片</label>
        </div>
        <button type="submit" class="submit-btn">更新博文</button>
      </form>
      <button class="close-button" @click="closeModal">关闭</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['text', 'blogId'],
  emits: ['close'],
  data() {
    return {
      blog: {
        id: this.blogId,
        imgSrc: 'images/photoPage-img/codeofwhite.jpg',
        title: '',
        category: '',
        // 其他博客数据...
      },
      file: null,
      fileName: '', // 用于存储文件名的数据属性
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.file = file;
      this.fileName = file.name;
    },
    updateBlog() {
      // 之前傻了，命名搞错了
      // console.log(this.blog.blogId)
      this.blog.imgSrc = 'images/photoPage-img/' + this.fileName
      const formData = new FormData();
      const textBlob = new Blob([this.text], {type: 'text/markdown'});
      formData.append('markDownFile', textBlob, 'blog.md');
      formData.append('blogs', new Blob([JSON.stringify(this.blog)], {type: 'application/json'}));
      this.submitUpload();
      axios.post('http://localhost:8005/blogs/updateBlog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
          .then(response => {
            // 处理响应
            console.log(response.data);
            this.$emit('close');
          })
          .catch(error => {
            // 处理错误
            console.error(error);
          });
    },
    closeModal() {
      this.$emit('close');
    },
    submitUpload() {
      const formData = new FormData();
      formData.append('fileImg', this.file); // 选中的文件
      formData.append('folderPath', 'images/photoPage-img/'); // 实际的文件夹路径
      // 这样发送才是正确的
      formData.append('photo', new Blob([JSON.stringify({
        alt: '测试', // 图片描述
        // 其他需要的数据...
      })], {type: 'application/json'})); // 图片描述

      // 发送POST请求到后端的/uploadPhoto端点
      axios.post('http://localhost:8005/photos/uploadPhoto', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
          .then(response => {
            if (response.data === 'success') {
              this.$message.success('图片上传成功！');
            }
          })
          .catch(error => {
            console.error('上传失败:', error);
            this.$message.error('图片上传失败！');
          });
    },
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  background: #fef4e6; /* 温暖的背景色 */
  padding: 2rem;
  border-radius: 15px; /* 更圆润的边角 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

.upload-title {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.upload-form {
  display: flex;
  flex-direction: column;
}

.input-group {
  margin-bottom: 1rem;
  position: relative;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 5px; /* 圆润的输入框 */
  transition: border-color 0.3s;
}

.input-group input:focus {
  outline: none;
  border-color: #f9a825; /* 焦点时的边框颜色 */
}

.input-group label {
  position: absolute;
  left: 12px;
  top: -8px;
  background: #fef4e6; /* 与背景色相同 */
  padding: 0 5px;
  color: #999;
  font-size: 14px;
  transition: all 0.3s;
}

.input-group input:focus + label {
  color: #f9a825;
}

.submit-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px; /* 圆润的按钮 */
  background-color: #f9a825; /* 温暖的按钮颜色 */
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #dd8f00; /* 按钮悬停颜色 */
}

.close-button {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #c1c1c1;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;
}

.close-button:hover {
  background-color: #9e9e9e;
}
</style>