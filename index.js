'use strict';

require('dotenv').config();

const fs = require('fs');
const path = require('path');
const util = require('util');
const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.DISCORD_BOT_SECRET;

client.on('ready', () => {
  console.log("I'm in");
  console.log(client.user.username);
});

client.on('message', msg => {
    //msg.content.split('').reverse().join('')
    var content;
    if (msg.content == '!boss') {
        fs.readFile(path.join(__dirname, "bosses.html"), 'utf8', (err, data) => {
            if (err) throw err
            content = util.format(data);
            console.log(content);
            msg.channel.send(content);
        });
    }
});

client.login(token);

