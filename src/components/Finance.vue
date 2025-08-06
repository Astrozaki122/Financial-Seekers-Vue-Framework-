<template>
  <div class="finance-container">
    <h1>Topic: {{ topic.title }}</h1>
    <p v-if="!topic.title">Loading topic details...</p>

    <div v-if="comments.length > 0">
      <h2>Comments</h2>
      <ul>
        <li v-for="comment in comments" :key="comment.id">
          <p><strong>{{ comment.username }}:</strong> {{ comment.comment_text }}</p>
        </li>
      </ul>
    </div>
    <p v-else>No comments yet. Be the first to comment!</p>

    <div class="add-comment">
      <input v-model="newComment" placeholder="Add a comment" />
      <button @click="addComment">Comment</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const topicId = route.params.topicId; // Get the topic ID from the route
const topic = ref({}); // Store topic details
const comments = ref([]); // Store comments for the topic
const newComment = ref(""); // New comment text

// Fetch topic details and comments
const fetchTopicDetails = async () => {
  try {
    const response = await axios.get("http://localhost/finance.php", {
      params: { topic_id: topicId },
    });

    if (response.data.topic) {
      topic.value = response.data.topic;
    } else {
      console.error("Failed to fetch topic details:", response.data.error);
    }

    if (Array.isArray(response.data.comments)) {
      comments.value = response.data.comments;
    } else {
      console.error("Failed to fetch comments:", response.data.error);
    }
  } catch (error) {
    console.error("Error fetching topic details:", error);
  }
};

// Add a comment to the topic
const addComment = async () => {
  if (!newComment.value.trim()) {
    alert("Comment cannot be empty");
    return;
  }

  try {
    const response = await axios.post("http://localhost/finance.php", {
      topic_id: topicId,
      comment_text: newComment.value,
    });

    if (response.data.success) {
      comments.value.push({
        id: response.data.id,
        username: "You", // Replace with the actual username from the session if available
        comment_text: newComment.value,
      });
      newComment.value = ""; // Clear the input field
    } else {
      alert(response.data.error || "Failed to add comment. Please try again.");
    }
  } catch (error) {
    console.error("Error adding comment:", error);
    alert("An error occurred while adding the comment.");
  }
};

// Fetch topic details and comments when the component is mounted
onMounted(() => {
  fetchTopicDetails();
});
</script>

<style scoped>
.finance-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background-color: #f1f1f1;
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  font-size: 1rem;
}

.add-comment {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
