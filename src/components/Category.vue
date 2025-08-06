<template>
  <div>
    <h1>Financial Categories</h1>
    <ul>
      <li v-for="category in categories" :key="category.id">
        <button @click="selectCategory(category.id)">{{ category.name }}</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const categories = ref([
  { id: 'insurance', name: 'Managing Car & Home Insurance' },
  { id: 'bills', name: 'Housing Bills' },
  { id: 'taxes', name: 'Property Tax & Fees' },
  { id: 'rent', name: 'Rent Payment' },
  { id: 'mortgages', name: 'Mortgages' },
]);

const selectCategory = (categoryId) => {
  router.push(`/forum/${categoryId}`); // Navigate to the forum page with the category ID
};
</script>
  
  <style scoped>
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin: 10px 0;
    padding: 10px;
    background: #007BFF;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  li:hover {
    background: #0056b3;
  }
  </style>