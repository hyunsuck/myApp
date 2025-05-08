<template>
  <div class="container" v-if="book">
    <h3 class="my-3">도서 상세 정보</h3>
    <table class="table table-bordered">
      <tbody>
        <tr>
          <th>번호</th>
          <td>{{ book.id }}</td>
          <th>등록일자</th>
          <td>{{ book.created_date }}</td>
        </tr>
        <tr>
          <th>제목</th>
          <td colspan="3">{{ book.title }}</td>
        </tr>
        <tr>
          <th>저자</th>
          <td>{{ book.writer }}</td>
          <th>ISBN</th>
          <td>{{ book.isbn }}</td>
        </tr>
        <tr>
          <th>소개</th>
          <td colspan="3" style="white-space: pre-wrap">{{ book.content }}</td>
        </tr>
      </tbody>
    </table>
    <div class="text-center">
      <button class="btn btn-primary" @click="goEdit">수정</button>
      <button class="btn btn-secondary ms-2" @click="goList">목록</button>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const book = ref({})
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  const id = route.query.id
  const res = await axios.get(`/api/book/${id}`)
  book.value = res.data[0]
})

const goEdit = () => {
  router.push({ path: '/bookForm', query: { id: book.value.id } })
}

const goList = () => {
  router.push('/bookList')
}
</script>

<style scoped>
table * {
  text-align: center;
}
</style>