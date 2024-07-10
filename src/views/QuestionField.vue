<template>
  <div class="question-field">
    <h2>问题留言区</h2>
    <el-form @submit.prevent="handleSubmit" class="question-form">
      <el-form-item label="您的问题">
        <el-input type="textarea" v-model="newQuestion.content" placeholder="请在这里输入您的问题..."></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交问题</el-button>
      </el-form-item>
    </el-form>
    <div class="question-list">
      <div class="question" v-for="question in questions" :key="question.id">
        <div class="question-content"><strong>问题：</strong>{{ question.question }}</div>
        <div class="question-userEmail"><strong>邮箱：</strong>{{ question.userEmail ? question.userEmail : '匿名' }}
        </div>
        <div class="question-date"><strong>日期：</strong>{{ formatDate(question.createDate) }}</div>
      </div>
    </div>
  </div>
  <GaveMe></GaveMe>
</template>

<script>
import axios from 'axios';
import GaveMe from "@/components/GaveMe.vue";
import {mapState} from "vuex";

export default {
  name: "QuestionField",
  components: {GaveMe},
  data() {
    return {
      newQuestion: {
        userEmail: '',
        content: ''
      },
      questions: [],
      isLoading: false
    };
  },
  created() {
    this.fetchQuestions();
  },
  computed: {
    userEmail() {
      // 这里假设 Vuex store 的状态中有一个名为 'email' 的字段
      return this.$store.state.uemail;
    }
  },
  methods: {
    fetchQuestions() {
      axios.get('http://localhost:8005/questions/getAllQuestions')
          .then(response => {
            this.questions = response.data;
          })
          .catch(error => {
            console.error('There was an error fetching the questions:', error);
          });
    },
    handleSubmit() {
      if (this.newQuestion.content.trim()) {
        this.isLoading = true;
        axios.post('http://localhost:8005/questions/insertQuestion',
            JSON.stringify({
              question: this.newQuestion.content,
              userEmail: this.userEmail
            }), {
              headers: {
                "Content-Type": "application/json"
              }
            })
            .then(response => {
              const newQuestion = {
                question: this.newQuestion.content,
                userEmail: this.userEmail,
                createDate: new Date().toISOString() // 获取当前时间的ISO字符串
              };
              // 直接将新问题添加到questions数组中
              this.questions.unshift(newQuestion);
              this.newQuestion.content = '';
              this.isLoading = false;
            })
            .catch(error => {
              console.error('There was an error posting the question:', error);
              this.isLoading = false;
            });
      } else {
        alert('问题内容不能为空！');
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString();
    }
  },
}
</script>

<style scoped>
.question-field {
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  background-color: #afffdd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h2 {
  text-align: center;
  color: #4caf50;
  margin-bottom: 30px;
}

.question-form {
  background-color: #90fff1;
  padding: 20px;
  border-radius: 8px;
}

.el-button {
  background-color: #4caf50;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.el-button:hover {
  background-color: #66bb6a;
}

.question-list {
  display: flex; /* 使用 Flexbox 布局 */
  flex-wrap: wrap; /* 允许项目换行 */
  margin-top: 20px;
  justify-content: space-between; /* 项目之间保持间隔 */
}

.question {
  flex: 0 0 22%; /* 每个问题占据行宽的22%，留下一些空间作为间隔 */
  background-color: #007541;
  border: 1px solid #333;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 15px;
  color: #ddd;
  box-sizing: border-box; /* 包括内边距和边框在内的总宽度 */
}

/* 调整间隔 */
.question:not(:nth-child(4n)) {
  margin-right: 2%;
}

/* 响应式布局：在小屏幕上每行显示两个问题 */
@media (max-width: 768px) {
  .question {
    flex: 0 0 48%; /* 每个问题占据行宽的48% */
  }

  .question:not(:nth-child(2n)) {
    margin-right: 4%; /* 调整间隔 */
  }
}

/* 更小屏幕上每行显示一个问题 */
@media (max-width: 480px) {
  .question {
    flex: 0 0 100%; /* 每个问题占据整行 */
  }

  .question:not(:nth-child(2n)) {
    margin-right: 0; /* 移除间隔 */
  }
}

.question-content, .question-userEmail, .question-date {
  margin-bottom: 10px;
}
</style>