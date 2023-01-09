
const { ask, generateImg } = require("./ai.js");
require('dotenv').config()
const token = process.env.DISCORD_TOKEN
const { Client, Events, GatewayIntentBits } = require('discord.js')
const client = new Client({
  intents:
  [GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent]
});

client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, async message => {
  if (message.content.substring(0, 5) == "!chat") {
    const prompt = message.content.substring(6); 
    const answer = await ask(prompt); 
    client.channels.fetch(message.channelId).then(channel => channel.send(answer));
  }else if (message.content.substring(0, 6) == "!image") {
    const prompt = message.content.substring(7); 
    const answer = await generateImg(prompt); 
    client.channels.fetch(message.channelId).then(channel => channel.send(answer));
  }
});

client.login(token);
