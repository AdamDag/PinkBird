const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
//Sets our app to use the handlebars engine
/*
app.engine('handlebars', handlebars.engine({
layoutsDir: __dirname + '/views/layouts',
}));
app.set('view engine', 'handlebars');

//Sets handlebars configurations (we will go through them later on)
app.use(express.static('public'))

app.get('/', (req, res) => {
//Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
res.render('main', {layout : 'index'});
});
*/
  
app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.send("Welcome to PinkBird!!!");
});

  
app.get("/joke", (req, res) => {
  res.send("Whats the object-oriented way to become wealthy?");
});

app.get("/punchline", (req, res) => {
  res.send("Inheritance");
});
const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));