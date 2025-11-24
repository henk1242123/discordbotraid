import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import http from "http";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ]
});

client.on("ready", () => {
  console.log(`🤖 Bot online als ${client.user.tag}`);
});

// Slash commands handler
client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  // --- /aha ---
  if (interaction.commandName === "aha") {
    const bericht = interaction.options.getString("bericht");

    // Privé reply → niemand ziet dat jij /aha deed
    await interaction.reply({
      content: "Ik stuur het 10 keer…",
      ephemeral: true
    });

    for (let i = 0; i < 10; i++) {
      await interaction.channel.send(bericht);
    }
  }

  // --- /blame ---
  if (interaction.commandName === "blame") {
    const user = interaction.options.getUser("persoon");

    await interaction.reply({
      content: "Blame verstuurd!",
      ephemeral: true
    });

    await interaction.channel.send(`${user} je raid is geslaagd.`);
  }
});

client.login(process.env.TOKEN);

// --- Render Alive Server (BELANGRIJK!) ---
http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Bot is running!");
}).listen(process.env.PORT || 3000);
