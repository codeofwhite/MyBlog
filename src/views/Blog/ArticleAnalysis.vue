<template>
  <div class="article-analysis">
    <div id="lineChart" class="chart"></div>
    <div id="pieChart" class="chart"></div>
    <div id="radarChart" class="chart"></div>
    <div id="heatMap" class="chart"></div> <!-- 新增热力图 -->
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import {onMounted} from "vue";

onMounted(() => {
  // 折线图
  const lineChart = echarts.init(document.getElementById('lineChart'));
  lineChart.setOption({
    title: {
      text: '访问趋势'
    },
    tooltip: {},
    xAxis: {
      data: ['一月', '二月', '三月', '四月', '五月', '六月']
    },
    yAxis: {},
    series: [{
      name: '访问量',
      type: 'line',
      data: [820, 932, 901, 934, 1290, 1330]
    }]
  });

  // 饼图
  const pieChart = echarts.init(document.getElementById('pieChart'));
  pieChart.setOption({
    title: {
      text: '用户访问来源'
    },
    tooltip: {},
    series: [{
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      data: [
        {value: 235, name: '直接访问'},
        {value: 274, name: '邮件营销'},
        {value: 310, name: '联盟广告'},
        {value: 335, name: '视频广告'}
      ]
    }]
  });

  // 雷达图
  const radarChart = echarts.init(document.getElementById('radarChart'));
  radarChart.setOption({
    title: {
      text: '博客内容分析'
    },
    tooltip: {},
    radar: {
      // 雷达图的指标
      indicator: [
        {name: '创意', max: 100},
        {name: '实用', max: 100},
        {name: '写作', max: 100},
        {name: '设计', max: 100},
        {name: '推广', max: 100}
      ]
    },
    series: [{
      name: '博客分析',
      type: 'radar',
      data: [
        {
          value: [60, 73, 85, 40, 60],
          name: '博客1'
        }
      ]
    }]
  });

  // 热力图
  const heatMap = echarts.init(document.getElementById('heatMap'));
  heatMap.setOption({
    title: {
      text: '页面热点分布'
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['首页', '文章', '列表', '关于']
    },
    yAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五']
    },
    visualMap: {
      min: 0,
      max: 10,
      type: 'piecewise',
      orient: 'horizontal',
      left: 'center',
      top: 'top'
    },
    series: [{
      name: '热度',
      type: 'heatmap',
      data: [
        [0, 0, 5], [0, 1, 9], [0, 2, 6], [0, 3, 5], [0, 4, 7],
        [1, 0, 4], [1, 1, 7], [1, 2, 2], [1, 3, 6], [1, 4, 8],
        [2, 0, 8], [2, 1, 6], [2, 2, 4], [2, 3, 3], [2, 4, 7],
        [3, 0, 3], [3, 1, 2], [3, 2, 6], [3, 3, 5], [3, 4, 9]
      ],
      label: {
        show: true
      }
    }]
  });
});
</script>

<style scoped>
.article-analysis {
  display: grid;
  grid-template-columns: repeat(2, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.chart {
  width: 100%;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* 添加一些过渡效果 */
.chart:hover {
  transform: scale(1.05);
  transition: transform .3s ease-in-out;
}
</style>