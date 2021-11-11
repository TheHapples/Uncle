const { readdirSync } = require("fs");
const { join } = require("path");
const cmdFiles = join(__dirname, "..", "commands");

module.exports.run = (client) => {
  // For every .js file in command folder
  for (const cmd of readdirSync(cmdFiles).filter((file) =>
    file.endsWith(".js")
  )) {
    const prop = require(`${cmdFiles}/${cmd}`);
    client.commands.set(prop.help.name, prop);
    console.log(`Loaded Command: ${prop.help.name}`);
  }
};
