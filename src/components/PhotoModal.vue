<!-- PhotoModal.vue -->
<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">×</span>
      <img :src="photo.src" :alt="photo.alt">
    </div>
  </div>
</template>

<script>
export default {
  name: "PhotoModal",
  props: {
    photo: Object
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  animation-name: animatetop;
  animation-duration: 0.4s
}
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
@keyframes animatetop {
  from {top: -300px; opacity: 0}
  to {top: 0; opacity: 1}
}
.modal-content img {
  max-width: 100%;  /* 使图片最大宽度不超过容器宽度 */
  max-height: 80vh; /* 使图片最大高度不超过视口高度的80% */
  display: block;   /* 防止图片下方有空白 */
  margin: 0 auto;   /* 图片居中显示 */
  object-fit: contain; /* 保持图片的宽高比 */
}
</style>