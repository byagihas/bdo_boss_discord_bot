const fs = require('fs');
const request = require('request');
const rp = require('request-promise');
const cheerio = require('cheerio');

let prevboss = [];
let prevbosstime = "";

let nextboss = [];
let nextbosstime = "";

rp('https://mmotimer.com/bdo/?server=na', (error, html) => {
    if (error) { console.log('Error requesting page'); }

    // Load page with cheerio
    const $ = cheerio.load(html.body);

    let prevCount = 0;
    let nextCount = 0;
    let followedCount = 0;
    // Get actions
    let prev_index = $('.next-boss').filter(function() {
        if($(this).text().indexOf('Previous boss') > -1){
            return $(this).html();
        }
    }).html();

    let next_index = $('.next-boss').filter(function(count) {
        if($(this).text().indexOf('Next boss') > -1){
            return $(this).html();
        }
        
    }).html();

    let following_index =  $('.next-boss').filter(function() {
        if($(this).text().indexOf('Followed by') > -1){
            return $(this).html();
        }
    }).html();

    const nextboss = JSON.stringify($('.next-boss-title').contents().map(function(count){
        if (count == '0') {
            return;
        } else {
            return $(this).text();
        }
    }).get());

    const bosstimer = JSON.stringify($('.next-boss-timer').contents().map(function(){
        return $(this).text();
    }).get().join("").split(" ").join("").trim());

    bossTimes = JSON.parse(bosstimer.replace('\n',''));
    bossNames = JSON.parse(nextboss);
    bossfile = '<div>' + (prev_index + next_index + following_index).split("\n").join("").split("  ").join("").split("../img/").join("https://mmotimer.com/img/");
    console.log(bossfile)

}).then(() => {
    // Write JSON file
    //if(bossParsed.length === 0) { console.log('actionsHolder array empty') }
    fs.writeFile('./bosses.html', bossfile, (err) => {
        if (err) throw err
        console.log('JSON file saved:' + __dirname + './bosses.html')
    })
});