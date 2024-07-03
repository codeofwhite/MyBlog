<template>
  <div class="category-container">
    <div v-for="(items, category) in categorizedList" :key="category" class="category">
      <button class="category-title" @click="toggleCategory(category)">
        {{ category }}
        <span class="arrow" :class="{ 'arrow-up': activeCategories.includes(category) }">▼</span>
      </button>
      <div v-show="activeCategories.includes(category)" class="category-content">
        <Waterfall :list="items" :gap="20">
          <template #item="{ item }">
            <div class="card" @click="goToBlogDetail(item)">
              <LazyImg :url="item.src"/>
              <p class="text">{{ item.content }}</p>
            </div>
          </template>
        </Waterfall>
      </div>
    </div>
  </div>
</template>

<script>
import {LazyImg, Waterfall} from 'vue-waterfall-plugin-next';
import 'vue-waterfall-plugin-next/dist/style.css';
import matter from 'gray-matter';

export default {
  created() {
    this.fetchBlogList();
  },
  components: {LazyImg, Waterfall},
  data() {
    return {
      list: [
        // 存放博客文章对象
      ],
      activeCategories: [] // 用于跟踪展开的类别
    }
  },
  methods: {
    goToBlogDetail(item) {
      // 使用文章的id作为路由参数
      this.$router.push({name: 'BlogDetail', params: {id: item.id}});
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
        const response = await fetch('src/assets/blogs.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.list = await response.json();
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    },
  },
  computed: {
    categorizedList() {
      const categories = {};
      // 遍历所有文章
      for (const item of this.list) {
        // 获取文章的分类
        const category = item.category;
        console.log(category);
        // 如果该分类尚未创建，则初始化一个数组
        if (!categories[category]) {
          categories[category] = [];
        }
        // 将文章添加到对应分类的数组中
        categories[category].push(item);
      }
      return categories;
    }
  },
}
</script>

<style scoped>
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
</style>