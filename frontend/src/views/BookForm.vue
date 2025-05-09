<template>
  <div class="container">
    <h3 class="mb-4">✏️ 도서 수정</h3>
    <form @submit.prevent="saveBook">
      <label for="no">No.</label>
      <input type="text" id="no" v-model="book.id" readonly />

      <label for="title">제목</label>
      <input type="text" id="title" v-model="book.title" />

      <label for="writer">작성자</label>
      <input type="text" id="writer" v-model="book.writer" />

      <label for="content">내용</label>
      <textarea id="content" style="height: 200px" v-model="book.content"></textarea>

      <label for="isbn">ISBN</label>
      <textarea id="isbn" style="height: 80px" v-model="book.isbn"></textarea>

      <label for="regdate">작성일자</label>
      <input type="text" id="regdate" v-model="book.created_date" readonly />

      <button type="submit" class="btn btn-xs btn-info">저장</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

axios.defaults.baseURL = "/api/"

const route = useRoute()
const router = useRouter()

const bookId = ref('')
const book = ref({})

// 도서 불러오기
const loadBook = () => {
  axios.get(`book/${bookId.value}`)
    .then(response => {
      book.value = response.data[0]
    })
    .catch(err => {
      console.error("도서 불러오기 실패:", err)
    })
}

// 도서 저장
const saveBook = () => {
  axios.put(`book/${bookId.value}`, book.value)
    .then(() => {
      router.push({ path: "/bookInfo", query: { id: bookId.value } })
    })
    .catch(err => {
      console.error("도서 저장 실패:", err)
    })
}

// 초기 로딩
onMounted(() => {
  bookId.value = route.query.id
  loadBook()
})

// id 변경 감지
watch(() => route.query.id, (newId) => {
  bookId.value = newId
  loadBook()
})
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

button[type="submit"] {
  background-color: #04aa6d;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #45a049;
}

.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>
