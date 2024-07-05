<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="submitBlog">
              <div class="form-group">
                <label for="blogTitle">博客标题</label>
                <input type="text" class="form-control" id="blogTitle" v-model="blog.title" placeholder="输入博客标题">
              </div>
              <div class="form-group">
                <label for="blogCategory">博客类别</label>
                <input type="text" class="form-control" id="blogCategory" v-model="blog.category" placeholder="输入博客类别">
              </div>
              <div class="form-group">
                <label for="blogFile">博客文件</label>
                <div class="custom-file">
                  <input type="file" class="custom-file-input" id="blogFile" @change="handleFileUpload">
                  <label class="custom-file-label" for="blogFile">选择文件</label>
                </div>
              </div>
              <button type="submit" class="btn btn-primary btn-block">提交博客</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      blog: {
        imgSrc:'src/assets/images/photoPage-img/codeofwhite.jpg',
        title: '',
        category: '',
        // 其他博客数据...
      },
      file: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    submitBlog() {
      const formData = new FormData();
      formData.append('blogs', new Blob([JSON.stringify(this.blog)], { type: 'application/json' }));
      formData.append('file', this.file);

      axios.post('http://localhost:8005/blogs/insertBlog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
          .then(response => {
            // 处理响应
            console.log(response.data);
          })
          .catch(error => {
            // 处理错误
            console.error(error);
          });
    }
  }
};
</script>

<style>
/* 添加一些基本的样式 */
.card {
  margin-top: 20px;
}

.custom-file-input {
  cursor: pointer;
}

.custom-file-label::after {
  content: "浏览";
}

.btn-block {
  padding: 10px;
  font-size: 16px;
}
</style>