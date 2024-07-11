<template>
  <div class="comments-container">
    <h2>评论区</h2>
    <div v-for="comment in comments" :key="comment.id" class="comment-card">
      <div class="comment-header">
        <span class="user-email">{{ comment.userEmail }}</span>
        <span class="comment-date">{{ formatDate(comment.createDate) }}</span>
      </div>
      <p class="comment-content">{{ comment.comment }}</p>
      <div class="replies-container">
        <div v-for="reply in comment.replies" :key="reply.id" class="reply-card">
          <div class="reply-header">
            <span class="user-email">{{ reply.userEmail }}</span>
            <span class="reply-date">{{ formatDate(reply.createDate) }}</span>
          </div>
          <p class="reply-content">{{ reply.reply }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CommentsManager',
  data() {
    return {
      comments: []
    };
  },
  methods: {
    async fetchComments() {
      try {
        const response = await axios.get(`http://localhost:9527/comments/getAllComments`, {
          params: {blogId: this.$route.params.id}
        });
        this.comments = response.data;
      } catch (error) {
        console.error('获取评论失败:', error);
      }
    },
    formatDate(dateString) {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      };
      return new Date(dateString).toLocaleDateString('zh-CN', options);
    }
  },
  created() {
    this.fetchComments();
  }
};
</script>

<style scoped>
.comments-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.comment-card, .reply-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  padding: 15px;
  transition: box-shadow 0.3s ease;
}

.comment-card:hover, .reply-card:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.comment-header, .reply-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.user-email {
  font-weight: bold;
  color: #333;
}

.comment-date, .reply-date {
  color: #777;
  font-size: 0.9em;
}

.comment-content, .reply-content {
  color: #555;
  line-height: 1.5;
}

.replies-container {
  margin-top: 10px;
  padding-left: 20px;
  border-left: 3px solid #eee;
}

.reply-card {
  background: #f9f9f9;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}
</style>