import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import http from "http";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.on("ready", () => {
  console.log(`🤖 Bot online als ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  // --- /raid ---
  if (interaction.commandName === "raid") {
    const bericht = interaction.options.getString("bericht");

    // PRIVÉ reply zodat niemand ziet dat jij /raid deed
    await interaction.reply({
      content: "Bericht wordt verstuurd…",
      ephemeral: true
    });

    for (let i = 0; i < 10; i++) {
      await interaction.channel.send(bericht);
    }
  }

  // --- /blame ---
  if (interaction.commandName === "blame") {
    const user = interaction.options.getUser("persoon");

    // PRIVÉ reply zodat niemand ziet dat jij /blame deed
    await interaction.reply({
      content: `Blame verstuurd naar ${user.username}`,
      ephemeral: true
    });

    // Stuur het bericht publiek
    await interaction.channel.send(`${user} je raid is geslaagd.`);
  }
});

client.login(process.env.TOKEN);

// --- Render webservice keep-alive ---
http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Bot is running!");
}).listen(process.env.PORT || 3000);
