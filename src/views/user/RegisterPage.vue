<template>
  <div class="register-body">
    <div class="register-panel">
      <div class="register-title">用户注册</div>
      <el-form :model="registerData" ref="registerForm">
        <!-- 用户名输入框 -->
        <el-form-item label="用户名" prop="username"
                      :rules="[
{ required: true, message: '请输入用户名', trigger: 'blur' }
]">
          <el-input placeholder="请输入用户名" v-model="registerData.username"></el-input>
        </el-form-item>
        <!-- 邮箱输入框 -->
        <el-form-item label="邮箱" prop="email"
                      :rules="[
{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
]">
          <el-input placeholder="请输入邮箱地址" v-model="registerData.email"></el-input>
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item label="密码" prop="password"
                      :rules="[
{ required: true, message: '请输入密码', trigger: 'blur' },
{ min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
]">
          <el-input placeholder="请输入密码" type="password" v-model="registerData.password"></el-input>
        </el-form-item>
        <!-- 确认密码输入框 -->
        <el-form-item label="确认密码" prop="confirmPassword"
                      :rules="[
{ required: true, message: '请再次输入密码', trigger: 'blur' },
{ validator: validatePass, trigger: 'blur' }
]">
          <el-input placeholder="请再次输入密码" type="password" v-model="registerData.confirmPassword"></el-input>
        </el-form-item>
        <!-- 注册按钮 -->
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="onRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterPage",
  data() {
    return {
      registerData: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    };
  },
  methods: {
    validatePass(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerData.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    },
    onRegister() {
      this.$refs.registerForm.validate(async (valid) => {
        if (valid) {
          // 构建注册请求的数据
          const registerData = {
            username: this.registerData.username,
            uemail: this.registerData.email,
            password: this.registerData.password,
          };
          // 发送注册数据到后端...
          try {
            // 发送登录请求到后端
            const response = await axios({
              method: 'post',
              url: 'http://localhost:9527/user/register',
              data: registerData,
              headers: {'Content-Type': 'application/json'}
            });
            // 检查后端返回的是否成功标识
            if (response.data.success) {
              // 注册成功提示
              this.$message({
                message: '注册成功！',
                type: 'success'
              });
              this.$router.push('/login');
            } else {
              // 注册失败处理
              alert('注册失败，用户可能已存在');
            }
          } catch (error) {
            // 网络错误处理
            if (!error.response) {
              // 网络错误（服务宕机或无法连接到服务器）
              alert('无法连接到服务器，请稍后再试');
            }
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.register-body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to left, #83a4d4, #b6fbff);
}

.register-panel {
  padding: 40px;
  width: 400px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-in-out;
}

.register-title {
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