<template>
    <nav>
        <router-link to="/" class="Title">Finanical Seekers</router-link>
    
        <div class="nav-links">
            <router-link to ="/signup">Signup</router-link>
            <router-link to ="login">Login</router-link>
        </div>
    </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style>
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background: #007BFF;
    color:white;
}

.logo {
    font-size: 1.5em;
    font-weight: bold;
    color: white;
    text-decoration: none;;
}

.nav-links {
    display: flex;
    gap: 15px;
}

.nav-links a {
    color: white;
    font-size: 1em;
    text-decoration: none;
}

.nav-links a:hover {
    text-decoration: underline;
}
</style>