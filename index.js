'use strict';

require('dotenv').config();

const fs = require('fs');
const path = require('path');
const util = require('util');
const { Client, MessageEmbed }  = require('discord.js');
const client = new Client();
const token = process.env.DISCORD_BOT_SECRET;
const screenshot = require('getScreenshot.js');

client.on('ready', () => {
  console.log("I'm in");
  console.log(client.user.username);
});

client.on('message', msg => {
    //msg.content.split('').reverse().join('')
    //
    var content;
    if (msg.content == '!boss') {
        /* Screenshot pseudocode
        screenshot().then(() => {
            fs.readFileSync(__dirname + '/screenshots/testscreenshot.png', (data) => {
                    msg.channel.send(data);
            });
        }); */

        // Read constructed html file from getData.js and send in channel
        fs.readFile(path.join(__dirname, "bosses.html"), 'utf8', (err, data) => {
            if (err) throw err
            content = util.format(data);
            console.log(content);
            msg.channel.send(content);
        });
    }
});

client.login(token);

