const { config } = require("dotenv");
const { prefix } = require("./config");
const { Client, Collection, Intents, Options } = require("discord.js");

const client = new Client({
  makeCache: Options.cacheEverything(),
  intents: [
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
});

// Cache variables to client.
client.prefix = prefix;
client.commands = new Collection();

require("./structures/command").run(client);
require("./structures/event").run(client);

client.login(process.env.TOKEN);
