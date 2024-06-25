<!--显示博客的主要界面-->
<template>
  <Waterfall :list="list">
    <template #item="{ item, url, index }">
      <div class="card">
        <LazyImg :url="url" />
        <p class="text">这是具体内容</p>
      </div>
    </template>
  </Waterfall>
</template>

<script>
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'

export default {
  components: {LazyImg, Waterfall},
  data() {
    return {
      list: [
        {
          src: "src/assets/images/codeofwhite.jpg",
        },
        {
          src: "src/assets/images/codeofwhite.jpg"
        },
        {
          src: "src/assets/images/codeofwhite.jpg"
        },
      ]
    }
  },
}

</script>

<style scoped>

</style>