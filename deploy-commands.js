import { REST, Routes, SlashCommandBuilder } from "discord.js";
import "dotenv/config";

const commands = [
  new SlashCommandBuilder()
    .setName("raid")
    .setDescription("Stuur een bericht meerdere keren")
    .addStringOption(option =>
      option
        .setName("bericht")
        .setDescription("Het bericht dat gestuurd wordt")
        .setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName("blame")
    .setDescription("Stuur een bericht naar een user (privé)")
    .addUserOption(option =>
      option
        .setName("persoon")
        .setDescription("Welke gebruiker wil je blame'en?")
        .setRequired(true)
    )
].map(cmd => cmd.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("📡 Commands registreren...");
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log("✅ Commands succesvol geregistreerd!");
  } catch (err) {
    console.error(err);
  }
})();
