<template>
  <div class="forum-container">
    <h1>Financial Topics</h1>
    <h2 v-if="financialTopics">You are in the <span>{{ financialTopics }}</span> group</h2>
    <p v-else>Please select a category to view topics.</p>

    <ul v-if="topics.length > 0">
      <li v-for="topic in topics" :key="topic.id">
        <p><strong>{{ topic.title }}</strong></p>

        <div v-if="comments[topic.id]?.length > 0">
          <h3>Comments</h3>
          <ul>
            <li v-for="comment in comments[topic.id]" :key="comment.id">
              <p><strong>{{ comment.username }}:</strong> {{ comment.comment_text }}</p> <!-- Fixed -->

              <!-- Reply Section -->
              <div class="reply-section">
                <input v-model="newReplies[comment.id]" placeholder="Reply..." @keyup.enter="addReply(topic.id, comment.id)" />
                <button @click="addReply(topic.id, comment.id)">Reply</button>
              </div>

              <!-- Display Replies -->
              <ul v-if="comment.replies?.length > 0">
                <li v-for="reply in comment.replies" :key="reply.id">
                  <p><strong>{{ reply.username }}:</strong> {{ reply.comment_text }}</p> <!-- Fixed -->
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <p v-else> NO comments yet. Be the first to comment!</p>

        <div class="add-comment">
          <input v-model="newComments[topic.id]" placeholder="Add a comment" @keyup.enter="addComment(topic.id)" />
          <button @click="addComment(topic.id)">Comment</button>
        </div>
      </li>
    </ul>

    <p v-else>No topics found for this category.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

axios.defaults.withCredentials = true;

const route = useRoute();
const categoryId = route.params.categoryId;
const financialTopics = ref("");
const topics = ref([]);
const comments = ref({});
const newComments = ref({});
const newReplies = ref({}); // New state for replies

const categoryMap = {
  insurance: "Managing Car & Home Insurance",
  bills: "Housing Bills",
  taxes: "Property Tax & Fees",
  rent: "Rent Payment",
  mortgages: "Mortgages",
};

financialTopics.value = categoryMap[categoryId] || "Unknown Category";

const fetchTopicsAndComments = async () => {
  if (!categoryId) {
    console.error("Category ID is missing");
    topics.value = [];
    return;
  }

  try {
    const response = await axios.get("http://localhost/forum.php", {
      params: { category_id: categoryId }
    });

    if (Array.isArray(response.data)) {
      topics.value = response.data;

      for (const topic of topics.value) {
        await fetchComments(topic.id);
      }
    } else {
      console.error("Invalid API response:", response.data);
      topics.value = [];
    }
  } catch (error) {
    console.error("Error fetching topics:", error);
    topics.value = [];
  }
};

const fetchComments = async (topicId) => {
  try {
    const response = await axios.get("http://localhost/finance.php", {
      params: { topic_id: topicId }
    });

    if (Array.isArray(response.data.comments)) {
      comments.value[topicId] = response.data.comments.map(comment => ({
        ...comment,
        replies: []
      }));
    } else {
      comments.value[topicId] = [];
    }
  } catch (error) {
    console.error(`Error fetching comments for topic ${topicId}:`, error);
    comments.value[topicId] = [];
  }
};

const addComment = async (topicId) => {
  const commentText = newComments.value[topicId]?.trim();
  if (!commentText) {
    alert("Comment cannot be empty");
    return;
  }

  try {
    const response = await axios.post("http://localhost/finance.php", {
      topic_id: topicId,
      comment_text: commentText
    });

    if (response.data.success) {
      if (!comments.value[topicId]) {
        comments.value[topicId] = [];
      }

      comments.value[topicId].push({
        id: response.data.id,
        username: "You",
        comment_text: commentText,  // Fixed
        replies: [] 
      });

      newComments.value[topicId] = "";
    } else {
      alert(response.data.error || "Failed to add comment. Try again.");
    }
  } catch (error) {
    console.error("Error adding comment:", error);
    alert("An error occurred while adding the comment.");
  }
};

// **Reply Functionality**
const addReply = async (topicId, parentId) => {
  const replyText = newReplies.value[parentId]?.trim();
  if (!replyText) {
    alert("Reply cannot be empty");
    return;
  }

  try {
    const response = await axios.post("http://localhost/finance.php", {
      topic_id: topicId,
      comment_text: replyText,
      parent_id: parentId
    });

    if (response.data.success) {
      const parentComment = comments.value[topicId].find(c => c.id === parentId);
      if (!parentComment.replies) {
        parentComment.replies = [];
      }

      parentComment.replies.push({
        id: response.data.id,
        username: "You",
        comment_text: replyText  // Fixed
      });

      newReplies.value[parentId] = "";
    } else {
      alert(response.data.error || "Failed to add reply.");
    }
  } catch (error) {
    console.error("Error adding reply:", error);
    alert("An error occurred while adding the reply.");
  }
};

onMounted(() => {
  fetchTopicsAndComments();
});
</script>

<style scoped>
.reply-section {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

input {
  flex: 1;
  padding: 8px;
  border-radius: 4px;
}

button {
  padding: 8px 12px;
  background-color: #007BFF;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
</style>
