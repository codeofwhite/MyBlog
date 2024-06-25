<!--编辑和显示MarkDown的地方-->
<template>
  <div>
    {{ markdown }}
  </div>
  <!--MarkDown-->
  <textarea v-model="markdown"/>
  <div v-html="markdownToHtml"></div>
</template>
<script>
import {marked} from "marked";

export default {
  name: "App",
  data() {
    return {
      markdown: " # hello world ",
    };
  },
  computed:{
    markdownToHtml(){
      return marked(this.markdown);
    }
  }
};
</script>
<style>
</style>