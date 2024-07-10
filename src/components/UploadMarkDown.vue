<template>
  <div class="upload-container">
    <div class="upload-card">
      <h2 class="upload-title">提交博客</h2>
      <form @submit.prevent="submitBlog" class="upload-form">
        <div class="input-group">
          <input type="text" id="blogTitle" v-model="blog.title" placeholder="博客标题"/>
          <label for="blogTitle">博客标题</label>
        </div>
        <div class="input-group">
          <input type="text" id="blogCategory" v-model="blog.category" placeholder="博客类别"/>
          <label for="blogCategory">博客类别</label>
        </div>
        <div class="input-group file-input-group">
          <input class="file-input" type="file" id="blogImage" @change="handleImageUpload"/>
          <label for="blogImage" class="file-input-label">选择图片</label>
          <span class="file-name" v-if="imageName">{{ imageName }}</span>
        </div>
        <div class="input-group file-input-group">
          <input class="file-input" type="file" id="blogFile" @change="handleFileUpload"/>
          <label for="blogFile" class="file-input-label">选择文件</label>
          <span class="file-name" v-if="fileName">{{ fileName }}</span>
        </div>
        <button type="submit" class="submit-btn">提交博客</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {useStore} from "vuex";
import {computed} from "vue";
import {ElMessage} from "element-plus";

export default {
  data() {
    return {
      blog: {
        imgSrc: 'src/assets/images/photoPage-img/codeofwhite.jpg',
        title: '',
        category: '',
        // 其他博客数据...
      },
      file: null,
      fileName: '', // 用于存储文件名的数据属性
      image: null,
      imageName: '', // 用于存储图片文件名的数据属性
    };
  },
  setup() {
    // 状态管理
    const store = useStore();

    // 从 Vuex 获取用户类型
    const userType = computed(() => store.state.user_type);

    return {
      userType
    }
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
      const file = event.target.files[0];
      this.fileName = file ? file.name : ''; // 更新文件名
    },
    // 图片的input
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.image = file;
        this.imageName = file.name;
      }
    },
    submitBlog() {
      if (this.userType == 1) {
        const formData = new FormData();
        formData.append('blogs', new Blob([JSON.stringify(this.blog)], {type: 'application/json'}));
        if (this.image) {
          formData.append('blogImg', this.image);
        }
        formData.append('file', this.file);

        axios.post('http://localhost:8005/blogs/insertBlog', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
            .then(response => {
              // 处理响应
              console.log(response.data);
              ElMessage.success('提交成功');
            })
            .catch(error => {
              // 处理错误
              console.error(error);
            });
      } else {
        ElMessage.error('权限不足，无法提交博客');
      }
    },
  }
};
</script>

<style scoped>

.upload-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f7f6;
  min-height: 100vh; /* 容器至少与视口一样高 */
}

.upload-card {
  background: white;
  padding: 5rem;
  border-radius: 10px;
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
  border-radius: 5px;
  transition: border-color 0.3s;
}

.input-group input:focus {
  outline: none;
  border-color: #7fdbda;
}

.input-group label {
  position: absolute;
  left: 12px;
  top: -8px;
  background: white;
  padding: 0 5px;
  color: #999;
  font-size: 14px;
  transition: all 0.3s;
}

.input-group input:focus + label {
  color: #7fdbda;
}

.file-input-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.file-name {
  margin-top: 15px;
  margin-left: 10px;
  color: #333;
  font-size: 14px;
}

.file-input-label {
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
  background-color: #409EFF;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s;
}

.file-input-label:hover {
  background-color: #367BEC;
}

.submit-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #7fdbda;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #5fcbd8;
}

.file-input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
</style>