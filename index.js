import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ]
});

client.on("ready", () => {
  console.log(`🤖 Bot online als ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  // --- /aha ---
  if (interaction.commandName === "aha") {
    const bericht = interaction.options.getString("bericht");

    // PRIVÉ REPLY (niemand ziet dat jij /aha hebt gedaan)
    await interaction.reply({
      content: "Ik stuur het 10 keer… (alleen jij ziet dit)",
      ephemeral: true
    });

    for (let i = 0; i < 10; i++) {
      await interaction.channel.send(bericht);
    }
  }

  // --- /blame ---
  if (interaction.commandName === "blame") {
    const user = interaction.options.getUser("persoon");

    // PRIVÉ REPLY
    await interaction.reply({
      content: "Blame verstuurd! (onzichtbaar voor anderen)",
      ephemeral: true
    });

    await interaction.channel.send(`${user} je raid is geslaagd.`);
  }
});

client.login(process.env.TOKEN);
