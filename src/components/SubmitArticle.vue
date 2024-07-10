<!-- SubmitArticleModal 组件 -->
<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-container">
      <h2 class="upload-title">提交博客</h2>
      <form @submit.prevent="submitBlog" class="upload-form">
        <!-- ...其他输入组... -->
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
        <!--        <div class="input-group file-input-group">-->
        <!--          <input class="file-input" type="file" id="blogFile" @change="handleFileUpload"/>-->
        <!--          <label for="blogFile" class="file-input-label">选择文件</label>-->
        <!--          <span class="file-name" v-if="fileName">{{ fileName }}</span>-->
        <!--        </div>-->
        <button type="submit" class="submit-btn">提交博客</button>
      </form>
      <button class="close-button" @click="closeModal">关闭</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {useStore} from "vuex";
import {computed} from "vue";
import {ElMessage} from "element-plus";

export default {
  props: ['text'],
  emits: ['close'],
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
        if (this.image) {
          formData.append('blogImg', this.image);
        }
        const textBlob = new Blob([this.text], {type: 'text/markdown'});
        formData.append('file', textBlob, 'blog.md');
        formData.append('blogs', new Blob([JSON.stringify(this.blog)], {type: 'application/json'}));
        // formData.append('file', this.file);

        axios.post('http://localhost:8005/blogs/insertBlog', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
            .then(response => {
              // 处理响应
              console.log(response.data);
              this.$emit('close');
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
    closeModal() {
      this.$emit('close');
    }
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

.file-input-group {
  margin-bottom: 1rem;
}

.file-input {
  display: none; /* 隐藏原生文件输入 */
}

.file-input-label {
  display: block;
  background-color: #f9a825;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

.file-name {
  display: block;
  margin-top: 10px;
}
</style>