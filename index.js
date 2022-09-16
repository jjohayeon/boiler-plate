const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/key");

//application/x-www.form-urlencoded타입으로 된걸 분석해서 가져올 수 있게 도와줌
app.use(bodyParser.urlencoded({ extended: true }));

//application/json파일로된걸 분석해서 가져올 수 있게 도와줌
app.use(bodyParser.json());

const { User } = require("./models/User");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World ㅎ2ㅎ2ㅎ2"));

//register
app.post("/register", (req, res) => {
  //회원가입 할 때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

//login
app.post("/login", (req, res) => {
  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOn({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 일치하는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {});
  });

  //비밀번호까지 맞다면 토큰을 생성하기
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
