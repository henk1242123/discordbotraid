import { REST, Routes, SlashCommandBuilder } from "discord.js";
import "dotenv/config";

const commands = [
  new SlashCommandBuilder()
    .setName("aha")
    .setDescription("Stuur 10x een bericht")
    .addStringOption(option =>
      option
        .setName("bericht")
        .setDescription("Wat moet de bot sturen?")
        .setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName("blame")
    .setDescription("Geef iemand de schuld (grapje)")
    .addUserOption(option =>
      option
        .setName("persoon")
        .setDescription("Welke gebruiker?")
        .setRequired(true)
    )
].map(cmd => cmd.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("📡 Commands registreren...");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );
    console.log("✅ Commands geregistreerd!");
  } catch (err) {
    console.error(err);
  }
})();
