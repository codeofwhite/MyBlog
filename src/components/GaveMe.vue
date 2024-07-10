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
    <!-- 显示从后端获取的图片和内容 -->
    <div v-for="gaveMeItem in gaveMeList" :key="gaveMeItem.id" class="gave-me-item">
      <img :src="gaveMeItem.url" alt="GaveMe Image" class="gave-me-image">
      <div class="gave-me-content">{{ gaveMeItem.content }}</div>
      <div class="gave-me-content">{{ gaveMeItem.userEmail || '匿名' }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {Minio} from "minio-js";

export default {
  name: "GaveMe",
  data() {
    return {
      newMessage: {
        userEmail: this.userEmail,
        content: '', // 内容
        image: null // 存储图片的数据
      },
      folderPath: 'images/gaveMeImg/', // minio文件夹路径
      gaveMeList: [] // 用于存储从接口获取的gaveMe内容
    };
  },
  computed: {
    userEmail() {
      return this.$store.state.uemail;
    },
  },
  created() {
    this.fetchAllGaveMe();
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
    async handleMessageSubmit() {
      try {
        const formData = new FormData();
        formData.append('gaveMe', new Blob([JSON.stringify({
          userEmail: this.userEmail, // 用户的email
          content: this.newMessage.content // 文字内容
          // 其他需要的数据...
        })], {type: 'application/json'}));
        formData.append('fileImg', this.newMessage.image);
        formData.append('folderPath', this.folderPath);

        const response = await axios.post('http://localhost:8005/gaveme/insertGaveMe', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.data === 'success') {
          console.log('留言提交成功');
          // 清空表单或进行其他操作...
          location.reload()
        } else {
          console.error('留言提交失败');
        }
      } catch (error) {
        console.error('提交留言时发生错误:', error);
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
// 将文件添加到newMessage对象中，而不是转换为DataURL
        this.newMessage.image = file;
      }
    },
    async fetchAllGaveMe() {
      try {
        const response = await axios.get('http://localhost:8005/gaveme/getAllGaveMe');
        if (response.status === 200) {
          this.gaveMeList = response.data; // 将获取到的gaveMe内容赋值给gaveMeList
          // 为每个照片对象添加URL
          for (let gaveMe of this.gaveMeList) {
            gaveMe.url = await this.fetchPhotoFromMinio(gaveMe.imgSrc);
            console.log(gaveMe.url);
          }
        } else {
          throw new Error('Failed to fetch gaveMe content');
        }
      } catch (error) {
        console.error('Error fetching gaveMe content:', error);
      }
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

.image-preview img,
.gave-me-item .gave-me-image {
  width: 100%; /* Image takes full width of its container */
  max-width: 200px; /* Maximum width of the image */
  height: auto; /* Height is adjusted automatically */
  border-radius: 10px; /* Slightly rounded corners for the images */
  margin-top: 20px;
}

.gave-me-item {
  display: flex;
  flex-direction: column; /* Stack items vertically */
  align-items: center; /* Center items horizontally */
  margin-top: 20px;
  background-color: #fff;
  padding: 15px;
  border-radius: 15px; /* More rounded corners for the item */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.gave-me-content {
  width: 100%; /* Content takes full width */
  text-align: center; /* Center the text */
  margin-top: 10px;
}
</style>