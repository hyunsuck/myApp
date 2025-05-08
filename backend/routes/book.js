const express = require("express");
const router = express.Router();
const query = require("../mysql");

// 도서 목록
router.get("/", async (req, res) => {
  const result = await query("book", "selectList", null);
  res.send(result);
});

// 도서 등록
router.post("/", async (req, res) => {
  const result = await query("book", "insertInfo", [
    req.body.title,
    req.body.writer,
    req.body.content,
    req.body.isbn,
    req.body.created_date
  ]);
  res.send(result);
});

// 도서 단건 조회
router.get("/:id", async (req, res) => {
  const result = await query("book", "selectById", [req.params.id]);
  res.send(result);
});

// 도서 수정
router.put("/:id", async (req, res) => {
  const result = await query("book", "updateInfo", [
    req.body.title,
    req.body.writer,
    req.body.content,
    req.body.isbn,
    req.body.created_date,
    req.params.id
  ]);
  res.send(result);
});

// 도서 삭제
router.delete("/:id", async (req, res) => {
  const result = await query("book", "deleteInfo", [req.params.id]);
  res.send(result);
});

module.exports = router;
