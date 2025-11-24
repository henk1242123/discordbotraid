import { REST, Routes, SlashCommandBuilder } from "discord.js";
import "dotenv/config";

const commands = [
  new SlashCommandBuilder()
    .setName("aha")
    .setDescription("Stuur 10x een bericht")
    .addStringOption(option =>
      option
        .setName("bericht")
        .setDescription("Het bericht dat 10x gestuurd wordt")
        .setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName("blame")
    .setDescription("Geef iemand de schuld (lol)")
    .addUserOption(option =>
      option
        .setName("persoon")
        .setDescription("Welke user?")
        .setRequired(true)
    )
].map(cmd => cmd.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Uploading slash commands…");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );
    console.log("Commands uploaded!");
  } catch (err) {
    console.error(err);
  }
})();
