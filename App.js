require('dotenv').config()
console.log(process.env) 
require('./db');

const express = require('express');
const path = require('path');
const home = require('./routes/home');
const app = express();
const handlebars = require('express-handlebars');
//Sets our app to use the handlebars engine

app.engine('handlebars', handlebars.engine({
layoutsDir: __dirname + '/views/layouts',
}));
app.set('view engine', 'handlebars');

//Sets handlebars configurations (we will go through them later on)
app.use(express.static('public'))


/*
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
*/
app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.send("Welcome to PinkBird!!!");
});

app.get("/home", (req, res) => {
  console.log("home rendered");
  res.render("home.hbs");
});
  
app.get("/joke", (req, res) => {
  res.send("Whats the object-oriented way to become wealthy?");
});

app.get("/punchline", (req, res) => {
  res.send("Inheritance");
});
app.use('/home', home);
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));