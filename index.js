'use strict';

require('dotenv').config();

const { Client, MessageAttachment }  = require('discord.js');
const client = new Client();
const token = process.env.DISCORD_BOT_SECRET;
const getScreenshot = require('./getScreenshot.js');

client.on('ready', () => {
    console.log('Discord Bot Ready: ' + client.user.username);
});

client.on('message', message => {
    if (message.content == '!boss') {
        /* Screenshot pseudocode
        screenshot().then(() => {
            fs.readFileSync(__dirname + '/screenshots/testscreenshot.png', (data) => {
                    msg.channel.send(data);
            });
        }); */
        getScreenshot('https://bdobosstimer.com/?&server=na').then(() => {
            const attachment = new MessageAttachment('./screenshots/boss.png');
            // Send the attachment in the message channel with a content
            message.channel.send(`${message.author},`, attachment);
        });
    };
});

client.login(token);

