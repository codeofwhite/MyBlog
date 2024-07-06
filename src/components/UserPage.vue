<template>
  <div class="user-info-body" v-if="isLoggedIn">
    <div class="user-info-panel">
      <div class="user-avatar">
        <img :src="userProfile.avatar" alt="User Avatar">
      </div>
      <div class="user-info-title">用户信息</div>
      <el-form>
        <!-- 用户邮箱显示 -->
        <el-form-item label="邮箱">
          <span>{{ userEmail }}</span>
        </el-form-item>
        <!-- 添加个人资料编辑 -->
        <el-form-item label="昵称">
          <el-input v-model="userProfile.nickname" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="userProfile.phone" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <!-- ...其他个人信息字段... -->
        <!-- 更新个人资料按钮 -->
        <el-form-item>
          <el-button type="primary" @click="updateProfile">更新资料</el-button>
        </el-form-item>
        <!-- 登出按钮 -->
        <el-form-item>
          <el-button type="primary" @click="onLogout">登出</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {computed, reactive} from 'vue';
import axios from 'axios';
import {useStore} from 'vuex';

export default {
  name: 'UserProfile',
  setup() {
    const store = useStore();
    const isLoggedIn = computed(() => store.state.isLoggedIn);
    const userEmail = computed(() => store.state.uemail);
    const userProfile = reactive({
      nickname: '',
      phone: '',
      avatar: 'src/assets/images/photoPage-img/codeofwhite.jpg',
      // ...其他个人信息字段...
    });

    const updateProfile = async () => {
      // ...更新个人资料的方法...
    };

    // 登出操作
    const onLogout = () => {
      // 清除 localStorage 或 sessionStorage 中的登录信息
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('uemail');
      sessionStorage.removeItem('isLoggedIn');
      sessionStorage.removeItem('uemail');

      // 更新 Vuex 状态
      store.commit('setLoggedIn', false);
      store.commit('setUserEmail', null);

      // 可以重定向到登录页面或其他操作
    };

    return {
      isLoggedIn,
      userEmail,
      userProfile,
      updateProfile,
      onLogout
    };
  }
};
</script>

<style scoped>
.user-info-body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5; /* 轻柔的背景色 */
}

.user-info-panel {
  padding: 1rem;
  max-width: 600px;
  width: 100%;
  background: #fff; /* 白色背景 */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 轻微的阴影 */
  margin: 1rem;
}

.user-avatar {
  display: flex;
  justify-content: center; /* 头像居中 */
  margin-bottom: 1rem; /* 头像与信息区域间距 */
}

.user-avatar img {
  border-radius: 50%; /* 圆形头像 */
  width: 100px; /* 头像宽度 */
  height: 100px; /* 头像高度 */
  object-fit: cover; /* 裁剪头像以适应容器 */
}

.user-info-title {
  font-size: 1.5rem;
  color: #333; /* 深色文字 */
  margin-top: 0; /* 移除标题上方的间距 */
  margin-bottom: 1rem;
  text-align: center;
}

.el-form-item {
  margin-bottom: 1rem;
}

.el-input {
  border: 1px solid #ccc; /* 边框颜色 */
  border-radius: 4px; /* 轻微的圆角 */
}

.el-button {
  width: 100%;
  background-color: #333; /* 按钮颜色 */
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.el-button:hover {
  background-color: #555; /* 按钮悬停颜色 */
}

/* 其他样式... */
</style>
