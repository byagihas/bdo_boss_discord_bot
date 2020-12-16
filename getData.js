const fs = require('fs');
const request = require('request');
const rp = require('request-promise');
const cheerio = require('cheerio');
const screenshot = require('getScreenshot.js');

let bossObject = {};

const headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language' : 'en-US, en;q=0.5',
    'DNT' : '1',
    'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:76.0) Gecko/20100101 Firefox/76.0'
};

rp('https://bdobosstimer.com/?&server=na', { headers: headers}, (error, html) => {
    if (error) { console.log('Error requesting page'); }
    //console.log(html.body)
    // Load page with cheerio
    const $ = cheerio.load(html.body);
    //console.log(html.body)
    // Get actions
    let bossname = $(this).find('#bossimage0', () => {
        return $(this).attr("src");
    }).get().join();

    let timer = $('#timer').filter(function() {
        return $(this).text();
    }).text();

    let bossnameafter = $('#bossimageafter1').filter(function() {
        return $(this).attr("src");
    }).get().join();

    let timerafter =  $('#timerafter').filter(function() {
        return $(this).text();
    }).text();

    bossObject = {
        bossname: bossname,
        bossnameafter: bossnameafter,
        timer: timer,
        timerafter: timerafter
    };
    console.log(bossObject);
}).then(() => {
    // Write JSON file
    //if(bossParsed.length === 0) { console.log('actionsHolder array empty') }
    //let bossfile = JSON.parse(bossObject);
    /*fs.writeFile('./bosses.json', bossfile, (err) => {
        if (err) throw err
        console.log('JSON file saved:' + __dirname + './bosses.html')
    })*/
});