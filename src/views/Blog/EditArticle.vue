<template>
  <div class="edit-article">
    <input type="text" v-model="searchQuery" placeholder="搜索文章标题..." class="search-input"/>
    <!-- 如果搜索结果为空，则直接显示提示信息 -->
    <p class="no-blogs" v-if="noBlogsFound">没有找到相关博客。</p>
    <section v-for="category in blogCategories" :key="category">
      <h2
          @click="toggleCategory(category)">{{ category }}
        <span :class="{'arrow-down': isActiveCategory(category), 'arrow-right': !isActiveCategory(category)}"></span>
      </h2>
      <transition name="expand">
        <div class="blog-grid" v-if="isActiveCategory(category)">
          <div class="blog-card" v-for="blog in filteredBlogs(category)" :key="blog.id" @click="selectBlog(blog)">
            <img :src="blog.url" alt="Blog Image" class="blog-image">
            <h3>{{ blog.title }}</h3>
            <p class="blog-date">创建日期: {{ new Date(blog.createDate).toLocaleDateString() }}</p>
            <p class="blog-date">更新日期: {{ new Date(blog.updateDate).toLocaleDateString() }}</p>
            <p class="blog-likes">点赞数: {{ blog.likesCount }}</p>
          </div>
          <!-- 如果搜索结果为空，则显示提示信息 -->
          <div class="no-blogs" v-if="filteredBlogs(category).length === 0">
            <p>没有找到相关博客。</p>
          </div>
        </div>
      </transition>
    </section>
    <!--  绑定事件处理器  -->
    <blog-modal @blogDeleted="handleBlogDeleted" v-if="selectedBlog" :blog="selectedBlog"
                @close="selectedBlog = null"></blog-modal>
  </div>
</template>

<script setup>
import axios from 'axios';
import {ref, onMounted, computed} from 'vue';
import BlogModal from '@/components/BlogModal.vue';
import {Minio} from "minio-js";

const blogs = ref([]);
const selectedBlog = ref(null);
const searchQuery = ref(''); // 新增搜索查询数据属性
const activeCategories = ref([]); // 新增一个数组来跟踪哪些分类是展开的

const handleBlogDeleted = (deletedBlogId) => {
// 更新博客列表的逻辑
// 例如，从列表中移除已删除的博客
  blogs.value = blogs.value.filter(blog => blog.id !== deletedBlogId);
};

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8005/blogs/getAllBlogs');
    blogs.value = response.data;
  } catch (error) {
    console.error('获取博客列表失败:', error);
  }
  await fetchPhotos();
});

const categorizedBlogs = computed(() => {
  const categories = {};
  blogs.value.forEach(blog => {
    if (!categories[blog.category]) {
      categories[blog.category] = [];
    }
    categories[blog.category].push(blog);
  });
  return categories;
});

const blogCategories = computed(() => Object.keys(categorizedBlogs.value));

const selectBlog = (blog) => {
  selectedBlog.value = blog;
};

// 新增过滤博客的方法
const filteredBlogs = (category) => {
  return categorizedBlogs.value[category].filter(blog =>
      blog.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
};

// 修改isActiveCategory方法，使其在搜索时自动展开对应分类
const isActiveCategory = (category) => {
  return activeCategories.value.includes(category) || searchQuery.value && filteredBlogs(category).length > 0;
};

// 新增一个方法来切换分类的展开/收起状态
const toggleCategory = (category) => {
  const index = activeCategories.value.indexOf(category);
  if (index > -1) {
    activeCategories.value.splice(index, 1); // 如果已经展开，就收起
  } else {
    activeCategories.value.push(category); // 如果已经收起，就展开
  }
};

// 初始化Minio客户端
const minioClient = new Minio.Client({
  endPoint: 'localhost', // MinIO服务器地址
  port: 9000, // MinIO服务器端口
  useSSL: false, // 是否使用SSL
  accessKey: 'gAjYSAJDImJP9ZvqgJB6', // MinIO的accessKey
  secretKey: 'cb8SkANxDCm90kdLz2puij4U7J8ZmlTBWAHYInT3' // MinIO的secretKey
});

const fetchPhotos = async () => {
  for (let blog of blogs.value) {
    blog.url = await fetchPhotoFromMinio(blog.imgSrc);
    // console.log(photo.url);
  }
};

const fetchPhotoFromMinio = async (photoPath) => {
  try {
    // 从MinIO存储桶中获取照片流，用getObject方法
    // 获取指定photoPath的照片流。
    const stream = await minioClient.getObject('myblogbucket', photoPath);
    let photoData = [];
    // 当有数据块(chunk)可读时，将其添加到photoData数组中。
    stream.on('data', (chunk) => {
      photoData.push(chunk);
    });
    return new Promise((resolve, reject) => {
      stream.on('end', async () => {
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
};

// 新增计算属性来判断是否有博客被找到
const noBlogsFound = computed(() => {
  return searchQuery.value && !blogs.value.some(blog =>
      blog.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<style scoped>
.admin-dashboard {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;
  padding: 2rem;
  background-color: #f9f9f9;
}

.welcome-container,
.system-status,
.update-announcements,
.help-center {
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.welcome-container h1,
.system-status h2,
.update-announcements h2,
.help-center h2 {
  color: #333333;
  margin-bottom: 1rem;
}

.welcome-container p,
.system-status ul,
.update-announcements p,
.help-center p {
  color: #555555;
  line-height: 1.5;
  font-size: 1rem;
}

.system-status ul {
  list-style-type: none;
  padding: 0;
}

.system-status li,
.update-announcements p,
.help-center p {
  margin-bottom: 0.5rem;
}

.system-status li strong,
.update-announcements p strong,
.help-center p strong {
  font-weight: 600;
}

.search-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.blog-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.blog-card:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.blog-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.blog-date,
.blog-likes {
  padding: 0.5rem;
  font-size: 0.9rem;
  color: #666;
}

.arrow-right, .arrow-down {
  display: inline-block;
  margin-left: 8px;
  border: solid #333;
  border-width: 0 2px 2px 0;
  padding: 3px;
  transform: rotate(45deg);
  transition: transform 0.3s ease;
}

.arrow-down {
  transform: rotate(-135deg);
}

h2 {
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
}

.expand-enter,
.expand-leave-to {
  transform: scaleY(0);
  transform-origin: top;
  opacity: 0;
}

.expand-enter-to,
.expand-leave {
  transform: scaleY(1);
  opacity: 1;
}

.no-blogs {
  text-align: center;
  padding: 2rem;
  color: #666;
}
</style>