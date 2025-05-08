<template>
  <div class="container">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>No.</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일자</th>
          <th>ISBN</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id" @click="bookDetail(book.id)">
          <td>{{ book.id }}</td>
          <td>{{ book.title }}</td>
          <td>{{ book.writer }}</td>
          <td>{{ book.created_date }}</td>
          <td>{{ book.isbn }}</td>
        </tr>
      </tbody>
    </table>
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
  router.push({ path: '/bookInfo', query: { id } })
}
</script>

<style scoped>
table * {
  text-align: center;
}
</style>

<style scoped>
table * {
  text-align: center;
}
</style>
