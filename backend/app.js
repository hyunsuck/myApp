const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const fileStore = require('session-file-store')(session);
require("dotenv").config({ path: "./mysql/.env" });

const app = express();
const port = 3000;
const url = `http://localhost:${port}`;

// session middleware
app.use(session({
  secret: '1234',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 60000
  },
  store: new fileStore()
}));

// cors 설정
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 로그 기록
app.use(morgan('[:date[web]][:method][:remote-addr][:remote-user][:url]'));

// 라우터 연결
app.use('/api/book', require('./routes/book'));

app.get("/", (req, res) => {
  res.send(`안녕하세요. Your IP Address: >> ${req.ip} <<`);
});

app.listen(port, () => {
  console.log(`${url}에서 서버가 실행됨`);
});

module.exports = app;