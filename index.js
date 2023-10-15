const express = require("express");
const mongoose = require("mongoose");

const app = express();

const Article = require("./models/Article");

// mongodb+srv://ZainAdel:<password>@cluster0.nbscssm.mongodb.net/?retryWrites=true&w=majority
mongoose
  .connect(
    "mongodb+srv://ZainAdel:192002@cluster0.nbscssm.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected Successfully");
  })
  .catch((error) => {
    console.log("Error with connecting with DB", error);
  });

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.get("/numbers", (req, res) => {
  let numbers = "";
  for (let i = 0; i <= 100; i++) {
    numbers += i + " - ";
  }
  //   res.send(`The numbers are: ${numbers}`);
  //   res.sendFile(__dirname + "/views/numbers.html");
  res.render("numbers.ejs", {
    name: "Zain",
    numbers: numbers,
  });
});

app.get("/findSummation/:n1/:n2", (req, res) => {
  const num1 = req.params.n1;
  const num2 = req.params.n2;
  const total = Number(num1) + Number(num2);
  res.send(`the total is: ${total}`);
});

app.get("/sayHello", (req, res) => {
  //   console.log(req.query);
  //   res.send(`Hello ${req.body.name}, Age is: ${req.query.age}`);
  res.json({
    name: req.body.name,
    age: req.query.age,
    lang: "Arabic",
  });
});

app.put("/test", (req, res) => {
  res.send("Test Page");
});

app.post("/addComment", (req, res) => {
  res.send("Welcome");
});

app.delete("/testingDelete", (req, res) => {
  res.send("Delete");
});

app.post("/articles", async (req, res) => {
  const newArticle = new Article();

  const artTitle = req.body.articleTitle;
  const artBody = req.body.articleBody;

  newArticle.title = artTitle;
  newArticle.body = artBody;
  newArticle.numberOfLike = 100;
  await newArticle.save();
  res.json(newArticle);
});

app.get("/articles", async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

app.get("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId;
  try {
    const article = await Article.findById(id);
    res.json(article);
    return;
  } catch (error) {
    console.log("Error while reading article of id", id);
    return res.send("Error");
  }
});

app.delete("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId;
  try {
    const article = await Article.findByIdAndDelete(id);
    res.json(article);
    return;
  } catch (error) {
    console.log("Error while reading article of id", id);
    return res.json(error);
  }
});

app.get("/showArticles", async (req, res) => {
  const articles = await Article.find();
  res.render("articles.ejs", {
    allArticles: articles,
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
