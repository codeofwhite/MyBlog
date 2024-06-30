<!--登录界面-->
<template>
  <div class="login-body">
    <div class="login-panel">
      <div class="login-title">用户登录</div>
      <el-form :model="formData" ref="loginForm">
        <!-- 账号输入框 -->
        <el-form-item label="" prop="account"
                      :rules="[
          { required: true, message: '请输入账号', trigger: 'blur' },
          /*email格式检查*/
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]">
          <el-input placeholder="请输入账号" v-model="formData.account"></el-input>
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item label="" prop="password"
                      :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <el-input placeholder="请输入密码" type="password" v-model="formData.password"></el-input>
        </el-form-item>
        <!-- 记住我复选框 -->
        <el-form-item label="">
          <el-checkbox v-model="formData.rememberMe">记住登录状态</el-checkbox>
        </el-form-item>
        <!-- 验证码按钮 -->
        <el-form-item label="">
          <el-button type="primary" @click="onShow">开始验证</el-button>
          <Vcode :show="isShow" @success="onSuccess" @close="onClose" />
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item label="">
          <el-button type="primary" style="width:100%" @click="onLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<!--这个不加setup，上面的找不到formData-->
<script setup>
import {reactive, ref} from "vue"
import Vcode from "vue3-puzzle-vcode";
import axios from 'axios'; // 引入axios
import { useStore } from 'vuex';

const formData = reactive({
  account: '',
  password: '',
  rememberMe: false
});

const isShow = ref(false);
const isVerified = ref(false); // 验证码验证状态

const loginForm = ref(null);

const onShow = () => {
  isShow.value = true;
};

const onClose = () => {
  isShow.value = false;
};

const onSuccess = () => {
  isVerified.value = true; // 设置验证码验证状态为成功
  onClose(); // 验证成功，需要手动关闭模态框
};

const store = useStore();

const onLogin = async () => {
  loginForm.value.validate(async (valid) => {
    if (valid && isVerified.value) {
// 构建登录请求的数据
      const loginData = {
        username: formData.account,
        password: formData.password,
      };

      try {
        // 发送登录请求到后端
        const response = await axios({
          method: 'post',
          url: 'http://localhost:8004/login',
          data: loginData,
          headers: { 'Content-Type': 'application/json' }
        });
        // 检查后端返回的是否成功标识
        if (response.data.success) {
          // 登录成功，存储用户邮箱
          localStorage.setItem('uemail', response.data.uemail);
          store.commit('setUserEmail', response.data.uemail);
          store.commit('setLoggedIn', response.data.success);
          console.log('uemail:', store.state.uemail);
          console.log('isLoggedIn:', store.state.isLoggedIn);
          // console.log(response.data.uemail)
          // 更新前端的登录状态
          // this.isLoggedIn = true; // 你可能需要在Vue实例中定义这个变量
          // 登录成功后的操作，比如页面跳转
          console.log('登录成功', response);
          // 重定向到主页或其他页面
          // this.$router.push('/home');
        } else {
          // 登录失败处理
          alert('登录失败，请检查账号密码是否正确');
        }
      } catch (error) {
        // 网络错误处理
        if (!error.response) {
          // 网络错误（服务宕机或无法连接到服务器）
          alert('无法连接到服务器，请稍后再试');
        } else {
          // 登录失败处理
          console.error('登录失败', error);
          alert('登录失败，请检查账号密码是否正确');
        }
      }
    } else {
// 验证失败处理
      if (!isVerified.value) {
        alert('请先完成验证码验证');
      }
    }
  });
};
</script>

<style lang="scss">
.login-body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, #83a4d4, #b6fbff);
}

.login-panel {
  padding: 40px;
  width: 400px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-in-out;
}

.login-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-button {
  transition: background-color 0.3s, transform 0.3s;
}

.el-button:hover {
  transform: translateY(-2px);
  background-color: #5c6bc0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>