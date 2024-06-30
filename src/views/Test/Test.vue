<template>
  <div>
    <h1>ScrollReveal 演示demo</h1>
    <div class="item" v-for="item in items" :key="item" :style="{ backgroundColor: item.bgColor }">
      {{ item.id }}
    </div>
    <img class="item" src="@/assets/images/bg.jpg">
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import ScrollReveal from 'scrollreveal'
import { RandomColorGenerator } from 'random-color-creator'

const items = ref<any>([])
for (let i = 1; i <= 100; i++) {
  items.value.push({
    id: i,
    bgColor: RandomColorGenerator({alphaChannel: undefined, colorParts: ["", "", ""], optionsObj: undefined, format: 'HEX' })
  })
}

// 重要的设置
onMounted(() => {
  ScrollReveal().reveal('.item', {
    reset: true,
    distance: '50px',
    origin: 'left',
    interval: 80,
    opacity: 0.1,
    rotate: {
      x: 20,
      z: 20
    },
    scale: 0.6
  })
})
</script>

<style>
.item {
  width: 100%;
  height: 7%;
  line-height: 72px;
  text-align: center;
  /* background-color: lightgreen; */
  border-radius: 8px;
  margin: 10px auto;
  font-size: 28px;
  flex: 1 1 0;
  color: #fff;
}
</style>

