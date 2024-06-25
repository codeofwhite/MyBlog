<!--登录界面-->
<template>
  <div class="login-body">
    <div class="login-panel">
      <div class="login-title">用户登录</div>
      <el-form :model="formData">
        <el-form-item label="">
          <el-input placeholder="请输入账号"
                    v-model="formData.account"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input placeholder="请输入密码"
                    v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input placeholder="请输入验证码"
                    v-model="formData.checkCode"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-checkbox
                    v-model="formData.rememberMe" label="true"></el-checkbox>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<!--这个不加setup，上面的找不到formData-->
<script setup>
import {reactive, ref} from "vue"
const formData = reactive({});
</script>

<style lang="scss">
.login-body{
  width: 100%;
  height: calc(100vh);
  background-image: url(../assets/images/bg.jpg);
  background-size: cover;
  background-position: center;
}

.login-panel{
  margin-top:100px;
  padding: 20px;
  margin-right: 100px;
  float: right;
  width: 350px;
  background:#ffffff;
  border-radius: 10px;
}
.login-title{
  font-size:20px;
  text-align: center;
  margin-bottom: 10px;
}

</style>