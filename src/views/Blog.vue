<template>
  <div class="category-container">
    <input type="text" v-model="searchQuery" placeholder="搜索文章标题..." class="search-input"/>
    <div v-if="noResults" class="no-results">没有找到相关博客。</div>
    <div v-for="(items, category) in filteredCategorizedList" :key="category" class="category">
      <button class="category-title" @click="toggleCategory(category)">
        {{ category }}
        <span class="arrow" :class="{ 'arrow-up': activeCategories.includes(category) }">▼</span>
      </button>
      <div v-show="activeCategories.includes(category)" class="category-content">
        <Waterfall :list="items" :gap="20">
          <template #item="{ item }">
            <div class="card" @click="goToBlogDetail(item)">
              <img :src="item.url" alt="Blog Image" class="blog-image">
              <p class="text">{{ item.title }}</p>
            </div>
          </template>
        </Waterfall>
      </div>
    </div>
  </div>
</template>

<script>
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next';
import 'vue-waterfall-plugin-next/dist/style.css';
import axios from "axios";
import {Minio} from "minio-js";

export default {
  props: ['id', 'title'],
  created() {
    this.fetchBlogList();
  },
  components: { LazyImg, Waterfall },
  data() {
    return {
      list: [],
      activeCategories: [],
      searchQuery: '',
      noResults: false, // 新增数据属性来跟踪是否有搜索结果
      // 初始化minio
      minioClient: new Minio.Client({
        endPoint: 'localhost', // MinIO服务器地址
        port: 9000, // MinIO服务器端口
        useSSL: false, // 是否使用SSL
        accessKey: 'gAjYSAJDImJP9ZvqgJB6', // MinIO的accessKey
        secretKey: 'cb8SkANxDCm90kdLz2puij4U7J8ZmlTBWAHYInT3' // MinIO的secretKey
      }),
    }
  },
  methods: {
    goToBlogDetail(item) {
      this.$router.push({ name: 'BlogDetail', params: { id: item.id, title: item.title } });
    },
    toggleCategory(category) {
      const index = this.activeCategories.indexOf(category);
      if (index === -1) {
        this.activeCategories.push(category);
      } else {
        this.activeCategories.splice(index, 1);
      }
    },
    async fetchBlogList() {
      try {
        const response = await axios.get('http://localhost:8005/blogs/getAllBlogs');
        if (response.status === 200) {
          this.list = response.data;
          // 直接嵌在一起，这样调用就可以避免一些问题
          await this.fetchPhotos(); // 确保在列表加载后调用fetchPhotos
        } else {
          throw new Error('Response status was not 200');
        }
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    },
    async fetchPhotos() {
      for (let blog of this.list) {
        blog.url = await this.fetchPhotoFromMinio(blog.imgSrc);
        // console.log(blog.url);
      }
    },
    async fetchPhotoFromMinio(photoPath) {
      try {
        const stream = await this.minioClient.getObject('myblogbucket', photoPath);
        let photoData = [];
        stream.on('data', (chunk) => {
          photoData.push(chunk);
        });
        return new Promise((resolve, reject) => {
          stream.on('end', () => {
            const blob = new Blob(photoData);
            const photoURL = URL.createObjectURL(blob);
            resolve(photoURL);
          });
          stream.on('error', reject);
        });
      } catch (error) {
        console.error('Error fetching photo from MinIO:', error);
      }
    },
  },
  computed: {
    filteredCategorizedList() {
      const categories = {};
      let found = false; // 用于跟踪是否找到匹配的博客
      for (const item of this.list) {
        const category = item.category;
        if (!categories[category]) {
          categories[category] = [];
        }
        if (this.searchQuery) {
          if (item.title.toLowerCase().includes(this.searchQuery.toLowerCase())) {
            categories[category].push(item);
            found = true;
            if (!this.activeCategories.includes(category)) {
              this.activeCategories.push(category); // 自动展开找到博客的类别
            }
          }
        } else {
          categories[category].push(item);
        }
      }
      this.noResults = !found && this.searchQuery; // 如果没有找到匹配的博客且搜索查询不为空，则显示没有结果的提示
      return categories;
    }
  }
}
</script>

<style scoped>
.search-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.no-results {
  color: red;
  text-align: center;
  margin-top: 20px;
}

/* 容器样式 */
.category-container {
  margin: 10px auto;
  max-width: 1300px; /* 限制最大宽度以提供更简约的布局 */
}

.category {
  /* 类别样式 */
  margin-bottom: 10px;
}

/* 类别标题样式 */
.category-title {
  background-color: #e0e0e0; /* 更中性的背景色 */
  font-size: 1.2rem;
  color: #333; /* 更深的字体颜色以提高可读性 */
  padding: 10px;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.3s;
  font-family: 'Arial', sans-serif; /* 使用更常见的字体 */
  border-radius: 5px;
}

.category-title:hover {
  background-color: #d0d0d0; /* 悬停时的背景色 */
}

/* 箭头样式 */
.arrow {
  border: solid #333; /* 箭头颜色与标题字体颜色一致 */
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
  transition: transform 0.3s;
  float: right;
  margin-left: 10px;
}

.arrow-up {
  transform: rotate(225deg); /* 调整箭头旋转角度 */
}

/* 类别内容样式 */
.category-content {
  padding: 10px;
  background-color: #f5f5f5; /* 更轻的背景色 */
  border-top: 1px solid #ddd; /* 边框颜色与背景色协调 */
  border-radius: 5px;
}

/* 卡片样式 */
.card {
  background-color: #ffffff;
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* 更轻的阴影效果 */
}

/* 文本样式 */
.text {
  padding: 15px;
  text-align: center;
  background-color: #fff;
  border-top: 1px solid #ddd; /* 边框颜色与背景色协调 */
}

/*博客图片格式*/
.blog-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
</style>