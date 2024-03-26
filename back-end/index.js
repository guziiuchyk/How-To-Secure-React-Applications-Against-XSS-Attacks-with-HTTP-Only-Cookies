const express = require('express');
const cors = require('cors');

const cookieParser = require('cookie-parser')

const app = express();

let corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
}

app.use(cors(corsOptions));
app.use(cookieParser())

app.use('/login', (req, res) => {
    res.cookie("token", "this is a secret token", {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 14, // 14 Day Age,
      domain: "localhost",
      sameSite: 'Lax',
    }).send({
      authenticated: true,
      message: "Authentication Successful."});
});

app.use('/logout', (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 14, // 14 Day Age,
    domain: "localhost",
    sameSite: 'Lax',
  }).send({
    authenticated: false,
    message: "Logout Successful."
  });
});

app.use('/auth-status', (req, res) => {
  console.log(req.cookies)

  if (req.cookies?.token === "this is a secret token") {
    res.send({isAuthenticated: true})
  } else {
    res.send({isAuthenticated: false})
  }
})

app.listen(8080, () => console.log('API active on http://localhost:8080'));