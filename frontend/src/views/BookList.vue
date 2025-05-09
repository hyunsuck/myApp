<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">📚 도서 목록</h2>
    <div class="table-responsive shadow-sm rounded overflow-hidden">
      <table class="table table-bordered table-striped table-hover align-middle text-center">
        <thead class="table-primary">
          <tr>
            <th>No.</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일자</th>
            <th>ISBN</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book.id" @click="bookDetail(book.id)" style="cursor: pointer;">
            <td>{{ book.id }}</td>
            <td class="text-start">{{ book.title }}</td>
            <td>{{ book.writer }}</td>
            <td>{{ book.created_date }}</td>
            <td>{{ book.isbn }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="text-center mt-4">
      <router-link to="/bookForm" class="btn btn-success px-4">+ 도서 등록</router-link>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

axios.defaults.baseURL = "/api/"

const books = ref([])
const router = useRouter()
const route = useRoute()

const loadBooks = async () => {
  const res = await axios.get('/book')
  books.value = res.data
}

onMounted(loadBooks)

watch(() => route.fullPath, () => {
  loadBooks()
})

const bookDetail = (id) => {
  router.push({ path: '/bookInfo', query: { id:id } })
}
</script>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
  text-align: center;
  font-size: 0.95rem;
}

.table-hover tbody tr:hover {
  background-color: #f1f9ff;
  transition: background-color 0.3s ease;
}

.table td.text-start {
  text-align: left !important;
}

.table-responsive {
  border-radius: 10px;
  overflow: hidden;
}

.table {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

h2 {
  font-weight: bold;
  color: #333;
}
</style>
