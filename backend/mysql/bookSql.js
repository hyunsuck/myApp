const book = {
  selectList: "SELECT * FROM book",
  selectById: "SELECT * FROM book WHERE id = ?",
  insertInfo: "INSERT INTO book (title, writer, content, isbn, created_date) VALUES (?, ?, ?, ?, ?)",
  updateInfo: "UPDATE book SET title = ?, writer = ?, content = ?, isbn = ?, created_date = ? WHERE id = ?",
  deleteInfo: "DELETE FROM book WHERE id = ?"
};

module.exports = book;
