<!-- BookInfo.vue -->
<template>
  <div class="container">
    <h3 class="mb-4">📖 도서 상세 목록</h3>
    <form @submit.prevent="goEdit">
      <label for="id">번호</label>
      <input type="text" id="id" :value="book.id" readonly />

      <label for="created_date">등록일자</label>
      <input type="text" id="created_date" :value="book.created_date" readonly />

      <label for="title">제목</label>
      <input type="text" id="title" :value="book.title" readonly />

      <label for="writer">작성자</label>
      <input type="text" id="writer" :value="book.writer" readonly />

      <label for="isbn">ISBN</label>
      <input type="text" id="isbn" :value="book.isbn" readonly />

      <label for="content">소개</label>
      <textarea id="content" style="height: 200px" :value="book.content" readonly></textarea>

      <div class="button-wrapper">
        <button type="submit" class="btn btn-success">✏️ 수정</button>
        <button type="button" class="btn btn-success" @click="goList">📚 목록</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const book = ref({})

onMounted(async () => {
  const id = route.query.id
  const res = await axios.get(`/book/${id}`)
  book.value = res.data[0]
})

const goEdit = () => {
  router.push({ path: '/bookForm', query: { id: book.value.id } })
}

const goList = () => {
  router.push('/book')
}
</script>

<style scoped>
input[type="text"],
select,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

button[type="submit"],
button[type="button"] {
  background-color: #04aa6d;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"]:hover,
button[type="button"]:hover {
  background-color: #45a049;
}
.button-wrapper {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}
.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  max-width: 700px;
}
</style>