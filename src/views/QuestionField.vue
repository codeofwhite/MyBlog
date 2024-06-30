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
        <div class="question-userEmail"><strong>邮箱：</strong>{{ question.userEmail }}</div>
        <div class="question-date"><strong>日期：</strong>{{ formatDate(question.createDate) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "QuestionField",
  data() {
    return {
      newQuestion: {
        userEmail: '99gelanjingling@gmail.com',
        content: ''
      },
      questions: [],
      isLoading: false
    };
  },
  created() {
    this.fetchQuestions();
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
              userEmail: this.newQuestion.userEmail
            }), {
              headers: {
                "Content-Type": "application/json"
              }
            })
            .then(response => {
              this.questions.push(response.data);
              this.newQuestion.content = '';
              this.isLoading = false;
              location.reload();
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
  }
}
</script>

<style scoped>
.question-field {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #1e1e1e;
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
  background-color: #333;
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
  margin-top: 20px;
}

.question {
  background-color: #252525;
  border: 1px solid #333;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 15px;
  color: #ddd;
}

.question-content, .question-userEmail, .question-date {
  margin-bottom: 10px;
}
</style>