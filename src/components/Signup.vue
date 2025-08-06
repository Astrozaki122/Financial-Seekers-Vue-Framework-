<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import axios from "axios";

const router = useRouter();
const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const registerUser = async () => {
    if (!username.value.trim() || !email.value.trim() || !password.value.trim() || !confirmPassword.value.trim()) {
        alert("All fields are required!");
        return;
    }

    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const response = await axios.post("http://localhost/signup.php", {
            username: username.value,
            email: email.value,
            password: password.value
        });

        console.log("Response:", response.data); // Debugging line

        if (response.data.success) {
            alert("Signup successful! You can now log in.");
            router.push("/login");
        } else {
            alert(response.data.error);
        }
    } catch (error) {
        console.error("Signup error:", error);
        alert("An error occurred during signup. Please try again.");
    }
};
</script>
<template>
    <form @submit.prevent="registerUser" class="signup-form">
        <div class="container">
            <h1>Sign Up</h1>
            <p>Create an account.</p>
            <hr>

            <label for="username"><b>Username</b></label>
            <input type="text" v-model="username" placeholder="Enter Username" required />

            <label for="email"><b>Email</b></label>
            <input type="email" v-model="email" placeholder="Enter Email" required />

            <label for="password"><b>Password</b></label>
            <input type="password" v-model="password" placeholder="Enter Password" required />

            <label for="confirmPassword"><b>Repeat Password</b></label>
            <input type="password" v-model="confirmPassword" placeholder="Repeat Password" required />

            <button type="submit">Signup</button>
            <p>Already have an account? <router-link to="/login">Login</router-link></p>
        </div>
    </form>
</template>

<style scoped>
.signup-form {
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