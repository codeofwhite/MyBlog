<template>
  <div class="user-info-body" v-if="isLoggedIn">
    <div class="user-info-panel">
      <div class="user-avatar">
        <img :src="userProfile.url" alt="User Avatar">
      </div>
      <div class="user-info-title">用户信息</div>
      <el-form :model="userProfile" :rules="rules">
        <!-- 用户邮箱显示 -->
        <el-form-item label="邮箱">
          <span>{{ userEmail }}</span>
        </el-form-item>
        <!-- 添加个人资料编辑 -->
        <el-form-item label="昵称">
          <el-input v-model="userProfile.uname" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <span class="user-sex">{{ getTextForValue(userProfile.sex, {'0': '女', '1': '男'}) }}</span>
          <el-radio-group v-model="userProfile.sex">
            <el-radio :label="0">女</el-radio>
            <el-radio :label="1">男</el-radio>
          </el-radio-group>
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
import {computed, onMounted, reactive} from 'vue';
import axios from 'axios';
import {useStore} from 'vuex';
import {Minio} from "minio-js";

export default {
  name: 'UserProfile',
  data() {
    return {
      // ...其他数据...
      rules: {
        sex: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ]
        // ...其他验证规则...
      }
    }
  },
  created() {
  },
  setup() {
    const store = useStore();
    const isLoggedIn = computed(() => store.state.isLoggedIn);
    const userEmail = computed(() => store.state.uemail);
    const userProfile = reactive({
      // 初始化用户资料的属性
      uname: '',
      sex: '',
      avatar: '',
      // ...其他属性...
    });

    // 创建一个方法来根据值返回对应的文本
    const getTextForValue = (value, options) => {
      return options[value] || '未知';
    };

    onMounted(async () => {
      if (isLoggedIn.value) {
        await fetchUserProfile();
      }
      await fetchPhotos();
    });

    // 获取用户资料的方法
    const fetchUserProfile = async () => {
      try {
        const response = await axios.post('http://localhost:9527/user/findByEmail', {
          uemail: userEmail.value
        });
        if (response.data) {
          // 假设返回的数据结构与userProfile的结构相匹配
          Object.assign(userProfile, response.data);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    // 更新用户资料
    const updateProfile = async () => {
      // 构建请求体，包含要更新的用户信息
      const updateData = {
        uemail: userEmail.value,
        username: userProfile.uname,
        password: userProfile.password, // 确保您已经在userProfile中添加了password字段
        sex: userProfile.sex
      };
      try {
        // 发送更新请求到后端
        const response = await axios.post('http://localhost:9527/user/updateUserInformation', updateData);
        if (response.data === 'success') {
          // 更新成功后的操作，例如提示用户或更新本地状态
          console.log('Profile updated successfully');
          // 可能还需要重新获取用户资料来更新界面
          await fetchUserProfile();
        } else {
          // 处理错误情况
          console.error('Failed to update profile');
        }
      } catch (error) {
        // 处理请求错误
        console.error('Error updating profile:', error);
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
      userProfile.url = await fetchPhotoFromMinio(userProfile.avatar);
    };

    // 从minio获取用户头像
    const fetchPhotoFromMinio = async (photoPath) => {
      try {
        const stream = await minioClient.getObject('myblogbucket', photoPath);
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
      onLogout,
      getTextForValue
    };
  },
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

.user-sex {
  margin-right: 50px;
}

/* 其他样式... */
</style>
