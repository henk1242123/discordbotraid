const { REST, Routes } = require("discord.js");
require("dotenv").config();


const commands = [
{
name: "raid",
description: "Stuur 10x een bericht in dit kanaal",
options: [
{
name: "bericht",
description: "Wat moet er 10x gestuurd worden?",
type: 3,
required: true
}
]
},
{
name: "blame",
description: "Geef iemand een blame",
options: [
{
name: "user",
description: "Wie wil je blamen?",
type: 6,
required: true
}
]
}
];


const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);


(async () => {
try {
console.log("Global slash commands registreren...");
await rest.put(
Routes.applicationCommands(process.env.CLIENT_ID),
{ body: commands }
);
console.log("KLAAR! Commands worden nu overal uitgerold.");
} catch (e) {
console.error(e);
}
})();
