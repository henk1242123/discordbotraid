import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from "discord.js";
import "dotenv/config";
import http from "http";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

// --- COMMANDS DEFINITIE ---
const commandsData = [
  new SlashCommandBuilder()
    .setName("raid")
    .setDescription("Stuur een bericht 10 keer")
    .addStringOption(option =>
      option.setName("bericht")
        .setDescription("Het bericht dat 10x gestuurd wordt")
        .setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName("blame")
    .setDescription("Blame een gebruiker (bericht verschijnt publiek)")
    .addUserOption(option =>
      option.setName("persoon")
        .setDescription("Welke gebruiker wil je blame'en?")
        .setRequired(true)
    )
].map(cmd => cmd.toJSON());

// --- FUNCTION: REGISTREER COMMANDS BIJ START ---
async function registerCommands() {
  const rest = new REST({ version: "100" }).setToken(process.env.TOKEN);
  try {
    console.log("📡 Uploading slash commands...");
    const data = await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commandsData }
    );
    console.log(`✅ ${data.length} commands geregistreerd!`);
  } catch (error) {
    console.error("❌ Fout bij registreren commands:", error);
  }
}

// --- BOT EVENT: READY ---
client.on("ready", async () => {
  console.log(`🤖 Bot online als ${client.user.tag}`);
  await registerCommands();
});

// --- BOT EVENT: INTERACTION ---
client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  // /raid command
  if (interaction.commandName === "raid") {
    const bericht = interaction.options.getString("bericht");

    // PRIVÉ reply zodat niemand ziet dat jij het command gebruikt
    await interaction.reply({ content: "Bericht wordt verstuurd…", ephemeral: true });

    for (let i = 0; i < 10; i++) {
      await interaction.channel.send(bericht);
    }
  }

  // /blame command
  if (interaction.commandName === "blame") {
    const user = interaction.options.getUser("persoon");

    // PRIVÉ reply
    await interaction.reply({ content: `Blame verstuurd naar ${user.username}`, ephemeral: true });

    // Publiek bericht
    await interaction.channel.send(`${user} je raid is geslaagd.`);
  }
});

// --- LOGIN BOT ---
client.login(process.env.TOKEN);

// --- RENDER KEEP-ALIVE SERVER ---
http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Bot is running!");
}).listen(process.env.PORT || 3000);
