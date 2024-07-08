<template>
  <div class="user-management">
    <h1>用户管理</h1>
    <input type="text" v-model="search" placeholder="搜索用户名..." class="search-input"/>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>用户名</th>
        <th>邮箱</th>
        <th>状态</th>
        <th>性别</th>
        <th>用户类型</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in filteredUsers" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.uname }}</td>
        <td>{{ user.uemail }}</td>
        <td>{{ getTextForValue(user.status, {'0': '正常', '1': '停用'}) }}</td>
        <td>{{ getTextForValue(user.sex, {'0': '女', '1': '男'}) }}</td>
        <td>{{ getTextForValue(user.utype, {'0': '普通用户', '1': '管理员'}) }}</td>
        <td>
          <button @click="viewUser(user.id)">查看</button>
          <button @click="viewUser(user.id)">修改</button>
          <button @click="viewUser(user.id)">删除</button>
          <!-- 其他操作按钮 -->
        </td>
      </tr>
      </tbody>
    </table>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <!--   尝试了几种方式，这种方式是最行的，其他直接出Bug。比如写成几个不同的方法，不用模板     -->
        <span class="close" @click="closeModal">×</span>
        <h2>用户详情</h2>
        <p>用户头像: {{ userDetails.avatar }}</p>
        <p>ID: {{ userDetails.id }}</p>
        <p>用户名: {{ userDetails.uname }}</p>
        <p>用户状态: {{ getTextForValue(userDetails.status, {'0': '正常', '1': '停用'}) }}</p>
        <p>用户性别: {{ getTextForValue(userDetails.sex, {'0': '女', '1': '男'}) }}</p>
        <p>用户身份: {{ getTextForValue(userDetails.utype, {'0': '普通用户', '1': '管理员'}) }}</p>
        <p>创建时间: {{ userDetails.create_time }}</p>
        <p>更新时间: {{ userDetails.update_time }}</p>
        <p>是否被删除： {{ getTextForValue(userDetails.del_flag, {'0': '有效', '1': '已删除'}) }}</p>
        <!-- 添加更多详细信息 -->
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import {ref, computed, onMounted} from 'vue';

const users = ref([]);
const search = ref('');
const showModal = ref(false);
const userDetails = ref({});

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8004/user/getAllUser');
    users.value = response.data;
  } catch (error) {
    console.error('获取用户列表失败:', error);
  }
});

// 创建一个方法来根据值返回对应的文本
const getTextForValue = (value, options) => {
  return options[value] || '未知';
};

const filteredUsers = computed(() => {
  return users.value.filter(user => user.uname.includes(search.value));
});

const viewUser = (userId) => {
  const user = users.value.find(u => u.id === userId);
  if (user) {
    // 直接将user对象赋值给userDetails
    userDetails.value = user;
    showModal.value = true;
  }
};

const closeModal = () => {
  showModal.value = false;
};
</script>

<style scoped>
.user-management {
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 20px;
}

.search-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

button {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.modal {
  display: block; /* 默认不显示 */
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
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
</style>