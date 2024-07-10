<template>
  <div v-if="show" class="modal-overlay" @click.self="closeModal">
    <transition name="modal">
      <div class="modal-content" @click.stop>
        <button class="close-button" @click="closeModal">返回</button>
        <div class="modal-header">
          <h2>编辑用户信息</h2>
          <form @submit.prevent="submitUpdate">
            <div class="user-form">
              <label for="uname">用户名:</label>
              <input type="text" id="uname" v-model="editableUser.uname" required>
            </div>
            <!-- 添加其他字段的表单元素 -->
            <div class="form-group">
              <label for="uemail">邮箱:</label>
              <input type="email" id="uemail" v-model="editableUser.uemail" required>
            </div>
            <div class="form-group">
              <label for="upwd">密码:</label>
              <input type="password" id="upwd" v-model="editableUser.upwd" required>
            </div>
            <!-- ... -->
            <div class="form-group">
              <label>是否为管理员:</label>
              <div class="radio-group">
                <input type="radio" id="admin" value="1" v-model="editableUser.utype" required>
                <label for="admin">是</label>
                <input type="radio" id="notAdmin" value="0" v-model="editableUser.utype" required>
                <label for="notAdmin">否</label>
              </div>
            </div>
            <div class="form-group">
              <label>是否被删除:</label>
              <div class="radio-group">
                <input type="radio" id="deleted" value="1" v-model="editableUser.del_flag" required>
                <label for="deleted">是</label>
                <input type="radio" id="notDeleted" value="0" v-model="editableUser.del_flag" required>
                <label for="notDeleted">否</label>
              </div>
            </div>
            <div class="form-group">
              <label>用户状态:</label>
              <div class="radio-group">
                <input type="radio" id="active" value="0" v-model="editableUser.status" required>
                <label for="active">正常</label>
                <input type="radio" id="inactive" value="1" v-model="editableUser.status" required>
                <label for="inactive">停用</label>
              </div>
            </div>
            <button type="submit" :disabled="isSubmitting" class="submit-button">提交修改</button>
          </form>
        </div>
        <p v-if="message" class="message">{{ message }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';
import {ref, watchEffect} from 'vue';

export default {
  props: ['selectedUser', 'show'],
  emits: ['update:show', 'user-updated'],
  setup(props, {emit}) {
    const editableUser = ref({});
    const isSubmitting = ref(false);
    const message = ref('');

    // 直接从props中解构属性到一个响应式引用中，这个引用不会随着props的变化而更新。
    // 监听props.selectedUser的变化，并更新editableUser
    // 不加这个就更新不了会显示null
    watchEffect(() => {
      editableUser.value = {...props.selectedUser};
    });

    const closeModal = () => {
      emit('update:show', false);
    };

    const submitUpdate = async () => {
      isSubmitting.value = true;
      message.value = '';
      try {
        const response = await axios.put('http://localhost:8004/user/adminUpdate', editableUser.value);
        if (response.data === 'success') {
          message.value = '用户信息更新成功';
          emit('user-updated', editableUser.value);
          setTimeout(closeModal, 2000); // Close modal after 2 seconds
        } else {
          message.value = '用户信息更新失败';
        }
      } catch (error) {
        message.value = '更新用户信息时发生错误';
        console.error(error);
      } finally {
        isSubmitting.value = false;
      }
    };

    return {
      editableUser,
      isSubmitting,
      message,
      closeModal,
      submitUpdate
    };
  }
};
</script>

<style scoped>
.modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* 更深的背景色增加对比 */
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter, .modal-leave-to {
  opacity: 0;
}

.modal-content {
  background-color: #e1f9ff; /* 温馨的粉色背景 */
  color: #333; /* 柔和的文字颜色 */
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 500px;
  border-radius: 15px; /* 更大的圆角 */
  transition: all 0.3s ease; /* 平滑过渡效果 */
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-family: 'Patrick Hand', 'Comic Sans MS', cursive; /* 手写风格的字体 */
  color: #00a6be; /* 温馨的标题颜色 */
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s ease; /* 按钮旋转效果 */
  color: #ff88aa; /* 按钮颜色与标题一致 */
}

.user-form input[type="text"],
.user-form input[type="email"],
.user-form input[type="password"] {
  /* ...其他样式保持不变 */
  border: 2px solid #ffaaee; /* 边框颜色 */
  background-color: #fff0ff; /* 输入框背景色 */
}

.radio-group label {
  color: #555; /* 单选按钮标签颜色 */
}

.close-button:hover {
  transform: rotate(90deg); /* 鼠标悬停时旋转 */
}

.user-form {
  display: grid;
  grid-gap: 10px;
  max-width: 400px; /* 限制最大宽度 */
  margin: auto; /* 居中显示 */
}

.form-group {
  margin-bottom: 1rem;
  padding: 10px; /* 增加内边距 */
}

.radio-group {
  display: flex;
  align-items: center;
  justify-content: space-around; /* 间距均匀分布 */
}

.radio-group input[type="radio"] {
  margin-right: 5px;
}

.submit-button {
  background-color: #ff88cc; /* 提交按钮颜色 */
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 20px; /* 更圆润的按钮 */
  cursor: pointer;
  transition: background-color 0.3s;
  box-shadow: 0 5px 15px rgba(255, 136, 204, 0.4); /* 柔和的阴影 */
  font-weight: bold;
}

.submit-button:hover {
  background-color: #ff66bb; /* 鼠标悬停时的按钮颜色 */
  animation: bounce 0.2s; /* 弹跳动画 */
}

.message {
  color: #e74c3c;
  margin-top: 15px;
  text-align: center; /* 居中文本 */
  font-family: 'Comic Sans MS', cursive; /* 信息文字的手写风格字体 */
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
</style>