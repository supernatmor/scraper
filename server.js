const cheerio = require("cheerio");
const request = require("request");

let results = [];//empty results array to start
request("https://www.washingtonpost.com/", (err, resp, html) => {
//loads html of page into cheerio then saves to $ for access later    
const $ = cheerio.load(html);



    $("div.no-skin").each((i,element) => {

        //console.log($(element).children().attr("html"));
        const title =$(element).children(".headline").text();

        const link = $(element).find("a").attr("href");

        const summary = $(element).children(".blurb").text();

        results.push({
            title:title,
            link:link,
            summary: summary
        })

    })




    console.log(results);
})