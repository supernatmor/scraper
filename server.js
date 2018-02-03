const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const request = require("request");

const app = express();
const PORT = 3000;

app.use(express.static("public"));

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/news", {
    useMongoClient: true
});


const db = require("./models");


const Article = require("./models/Article.js");



//GET route for loading main page - does nothing at this time
app.get("/", (req, res) => {
    //do nothing special, just load the page
})

//GET route for pulling news from Washington Post
app.get("/search", (req, res) => {
    request("https://www.washingtonpost.com/", (err, resp, html) => {
        //loads html of page into cheerio then saves to $ for access later    
        const $ = cheerio.load(html);

        $("div.headline").each((i, element) => {

            let result = {};
            //console.log($(element).children().attr("html"));
            result.title = $(element).text();

            result.link = $(element).find("a").attr("href");

            // result.summary = $(element).children(".blurb").text();

            //console.log(result);
            if (result.title && result.link) {
                console.log("ding");//dings when properly scraped
                db.Article
                    .create(result)
                    .then(function (dbArticle) {
                        // If we were able to successfully scrape and save an Article, send a message to the client
                        console.log("Scrape Complete");
                        res.json(result);
                    })
                .catch(function(err) {
                    // If an error occurred, send it to the client
                    console.log(err);
                })
            } else {
                console.log("buzzer");//buzzer when not properly scraped
            }

        })

    })
})

//GET route to retrieve all the articles
app.get("/articles"), (req, res) => {
    db.Article.find({})
        .then((articles) => {
            res.json(articles)
        })
}

app.listen(PORT);