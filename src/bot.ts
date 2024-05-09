import { Bot, webhookCallback } from "grammy";
import express from "express";

const serverless = require("serverless-http");
const app = express(); // or whatever you're using
app.use(express.json()); // parse the JSON request body

/* We should set the webhook the make the telegram send updats to this endpoint. I prefer Webhook approach over Long Pooling. I am not sure if Grammy allows setting webhook via its library; but, since this is usually a one time process I set it via seding a Get request to a URL to set the webhook. We can simply use the browser to go this URL as well:
https://api.telegram.org/bot6462618345:AAFjOLsj5MMRcmgknxVDm60MCmgocw6Vwnw/setWebhook?url=https://iumsmealmate.netlify.app/.netlify/functions/bot
*/

// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new Bot(process.env.BOT_TOKEN as string); // <-- put your bot token between the ""

// "express" is also used as default if no argument is given.
app.use(webhookCallback(bot, "express"));

// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.

// Handle the /start command.
bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
// Handle other messages.
bot.on("message", (ctx) => ctx.reply("Got another message!"));

// Now that you specified how to handle messages, you can start your bot.
// This will connect to the Telegram servers and wait for messages.

exports.handler = serverless(app);
