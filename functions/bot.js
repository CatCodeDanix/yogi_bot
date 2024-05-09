"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const express_1 = __importDefault(require("express"));
const serverless = require("serverless-http");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const bot = new grammy_1.Bot(process.env.BOT_TOKEN);
app.use((0, grammy_1.webhookCallback)(bot, "express"));
bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
bot.on("message", (ctx) => ctx.reply("Got another message!"));
exports.handler = serverless(app);
