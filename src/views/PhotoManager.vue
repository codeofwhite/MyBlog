<template>
  <div class="photo-manager-container">
    <div class="header">图片管理器（点击可选择删除图片）</div>
    <div class="main-content">
      <input type="file" @change="handleFileUpload"/>
      <button @click="submitUpload">上传到服务器</button>
      <div class="image-list">
        <div v-for="photo in photos" :key="photo.id" class="image-item">
          <img :src="photo.url" :alt="photo.alt" @click="confirmDelete(photo.id)"/>
          <!-- 添加描述的div -->
          <div class="photo-description" v-if="photo.alt.length <= 10">{{ photo.alt }}</div>
          <div class="photo-description" v-else>{{ photo.alt.substring(0, 10) + '...' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {ElMessage, ElMessageBox} from 'element-plus';
import {Minio} from "minio-js";

export default {
  name: 'PhotoManager',
  data() {
    return {
      selectedFile: null,
      photos: []
    };
  },
  created() {
    this.initMinioClient();
  },
  methods: {
    // 初始化minio客户端
    initMinioClient() {
      this.minioClient = new Minio.Client({
        endPoint: 'localhost', // MinIO服务器地址
        port: 9000, // MinIO服务器端口
        useSSL: false, // 是否使用SSL
        accessKey: 'gAjYSAJDImJP9ZvqgJB6', // MinIO的accessKey
        secretKey: 'cb8SkANxDCm90kdLz2puij4U7J8ZmlTBWAHYInT3' // MinIO的secretKey
      });
    },
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    submitUpload() {
      const formData = new FormData();
      formData.append('fileImg', this.selectedFile);
      formData.append('folderPath', 'your_folder_path_here'); // 替换为实际的文件夹路径

      axios.post('http://localhost:8005/img/uploadImg', formData)
          .then(response => {
            if (response.data === 'success') {
              ElMessage.success('图片上传成功！');
              this.fetchPhotos(); // 上传成功后获取最新的图片列表
            }
          })
          .catch(error => {
            console.error('上传失败:', error);
            ElMessage.error('图片上传失败！');
          });
    },
    fetchPhotos() {
      axios.get('http://localhost:8005/photos/getAllPhotos')
          .then(async response => {
            this.photos = response.data;
            // 为每个照片对象添加URL
            for (let photo of this.photos) {
              photo.url = await this.fetchPhotoFromMinio(photo.src);
              // console.log(photo.url);
            }
          })
          .catch(error => {
            console.error('获取图片列表失败:', error);
          });
    },
    confirmDelete(photoId) {
      ElMessageBox.confirm('确定要删除这张图片吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deletePhoto(photoId);
      }).catch(() => {
        // 取消删除操作
      });
    },
    deletePhoto(photoId) {
      // 这里添加删除图片的逻辑
      axios.post(`http://localhost:8005/photos/delete/${photoId}`)
          .then(response => {
            if (response.data === 'success') {
              ElMessage.success('图片删除成功！');
              this.fetchPhotos(); // 删除成功后重新获取图片列表
            }
          })
          .catch(error => {
            console.error('删除失败:', error);
            ElMessage.error('图片删除失败！');
          });
    },
    async fetchPhotoFromMinio(photoPath) {
      try {
        // 从MinIO存储桶中获取照片流，用getObject方法
        // 获取指定photoPath的照片流。
        const stream = await this.minioClient.getObject('myblogbucket', photoPath);
        let photoData = [];
        // 当有数据块(chunk)可读时，将其添加到photoData数组中。
        stream.on('data', (chunk) => {
          photoData.push(chunk);
        });
        return new Promise((resolve, reject) => {
          stream.on('end', () => {
            // 将照片数据转换为Blob对象
            const blob = new Blob(photoData);
            // 创建一个URL，可以用于<img>标签的src属性或下载链接
            const photoURL = URL.createObjectURL(blob);
            // resolve函数调用并传递这个URL
            resolve(photoURL);
          });
          stream.on('error', reject);
        });
      } catch (error) {
        console.error('Error fetching photo from MinIO:', error);
      }
    },
  },
  mounted() {
    this.fetchPhotos(); // 组件加载完成后获取图片列表
  }
}
</script>

<style scoped>
.photo-manager-container {
  width: 100%;
  height: 100vh;
  background-color: #f0f2f5;
}

.header {
  background-color: #409eff;
  color: white;
  text-align: center;
  line-height: 60px;
  font-size: 20px;
}

.main-content {
  padding: 20px;
  text-align: center;
}

.image-list {
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  overflow: hidden;
  display: flex;
  position: relative;
}

.image-item {
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 200px;
  position: relative;
  border: 2px solid #00fff7; /* 使用主题颜色 */
  border-radius: 5px;
}

.image-item img {
  width: 100%; /* 宽度设置为100%，以匹配父元素的宽度 */
  height: auto; /* 高度设置为auto，保持图片的纵横比 */
  object-fit: cover;
}

.photo-description {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  text-align: center;
  padding: 5px 0;
}
</style>