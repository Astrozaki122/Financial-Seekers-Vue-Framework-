<script setup>
import { useRouter } from 'vue-router';
import axios from 'axios';
import { ref } from 'vue';

const router = useRouter();
const username = ref("");
const password = ref("");

const loginUser = async () => {
  try {
    const response = await axios.post("http://localhost/login.php", {
      username: username.value,
      password: password.value
    });
    if (response.data.success) {
      sessionStorage.setItem("user_id", response.data.user_id);
      sessionStorage.setItem("username", response.data.username);
      
      alert("Login successful! Redirecting...");
      router.push("/forum");
    } else {
      alert(response.data.error);
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};
</script>

<template>
  <form @submit.prevent="loginUser" class="login-form">
    <div class="container">
      <label for="username"><b>Username</b></label>
      <input type="text" v-model="username" placeholder="Enter Username" required />

      <label for="password"><b>Password</b></label>
      <input type="password" v-model="password" placeholder="Enter Password" required />

      <button type="submit">Login</button>
      <p>Don't have an account? <router-link to="/signup">Sign up</router-link></p>
    </div>
  </form>
</template>

<style scoped>
.login-form {
  border: 2px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  width: 50%;
  margin: auto;
  background: white;
}

.container {
  text-align: center;
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}
</style>