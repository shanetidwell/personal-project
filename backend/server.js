const express = require("express");
const bodyParser = require("body-parser");
const massive = require("massive");
const session = require("express-session");
require("dotenv").config();
const LoginController = require("./Controllers/LoginController")
const PostController = require("./Controllers/PostController")


const app = express();
const port = 4000;

massive(process.env.CONNECTION_STRING).then(db => {
    app.set("db", db);
  });

app.use(bodyParser.json());
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      saveUninitialized: true,
      resave: false
    })
  );



app.post('/api/auth/login', LoginController.login );
app.post('/api/auth/register', LoginController.register);
app.get('/api/posts/', PostController.getPosts);
app.get('/api/post/:postid', PostController.getPost);
app.post('/api/posts/', PostController.addPost);
app.post('/api/auth/logout', LoginController.logout);
app.get('/api/auth/me', LoginController.checkLogin);


app.listen(port, ()=>{
    console.log("listening on port", port)
})
