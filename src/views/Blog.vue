<template>
  <Waterfall :list="list" :gap="20">
    <template #item="{ item, index }">
      <div class="card" @click="goToBlogDetail(index)">
        <LazyImg :url="item.src" />
        <p class="text">{{ item.content }}</p>
      </div>
    </template>
  </Waterfall>
</template>

<script>
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next';
import 'vue-waterfall-plugin-next/dist/style.css';

export default {
  components: { LazyImg, Waterfall },
  data() {
    return {
      list: [
        {
          id: 1,
          src: "src/assets/images/codeofwhite.jpg",
          content: "博客文章内容1"
        },
        {
          id: 2,
          src: "src/assets/images/codeofwhite.jpg",
          content: "博客文章内容2"
        },
        {
          id: 3,
          src: "src/assets/images/codeofwhite.jpg",
          content: "博客文章内容3"
        },
        {
          id: 4,
          src: "src/assets/images/codeofwhite.jpg",
          content: "博客文章内容4"
        },
        // 更多博客文章对象...
      ]
    }
  },
  methods:{
    goToBlogDetail(index){
      this.$router.push({name:'BlogDetail',params:{id:index}});
    }
  }
}
</script>

<style scoped>
.card {
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.text {
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #eee;
  text-align: center;
}
</style>