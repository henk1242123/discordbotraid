const { Client, GatewayIntentBits, Partials } = require("discord.js");
const express = require("express");
require("dotenv").config();


// Express keep-alive voor Render
const app = express();
app.get("/", (req, res) => res.send("Bot is online"));
app.listen(3000, () => console.log("Webserver actief op port 3000"));


// Discord client
const client = new Client({
intents: [GatewayIntentBits.Guilds],
partials: [Partials.Channel]
});


client.once("ready", () => {
console.log(`Bot ingelogd als ${client.user.tag}`);
});


client.on("interactionCreate", async interaction => {
if (!interaction.isChatInputCommand()) return;


// /raid
if (interaction.commandName === "raid") {
const bericht = interaction.options.getString("bericht");


await interaction.reply({
content: "Bericht wordt gestuurd...",
ephemeral: true
});


const channel = interaction.channel;
for (let i = 0; i < 10; i++) {
await channel.send(bericht);
}
}


// /blame
if (interaction.commandName === "blame") {
const user = interaction.options.getUser("user");


await interaction.reply({
content: "Blame verzonden!",
ephemeral: true
});


const channel = interaction.channel;
await channel.send(`📢 <@${user.id}> je raid is geslaagd!`);
}
});


client.login(process.env.TOKEN);
