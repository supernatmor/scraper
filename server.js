const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const request = require("request");

const app = express();
const PORT = 3000;

app.use(express.static("public"));

mongoose.Promise = Promise:
    mongoose.connect("mongodb://localhost/")

//GET route for loading main page - does nothing at this time
app.get("/", (req, res) => {
    //do nothing special, just load the page
})

//GET route for pulling news from Washington Post
app.get("/search", (req, res) => {
    request("https://www.washingtonpost.com/", (err, resp, html) => {
        //loads html of page into cheerio then saves to $ for access later    
        const $ = cheerio.load(html);

        $("div.no-skin").each((i, element) => {

            let result = {};
            //console.log($(element).children().attr("html"));
            result.title = $(this).children(".headline").text();

            result.link = $(this).find("a").attr("href");

            result.summary = $(this).children(".blurb").text();

            db.Article.create(result);

        })
    })
})

//GET route to retrieve all the articles
app.get("/articles"), (req,res)=>{
    db.Article.find({})
    .then((articles)=>{
        res.json(articles)
    })
}