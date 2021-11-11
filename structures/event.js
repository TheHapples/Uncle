const { readdirSync } = require("fs");
const { join } = require("path");
const eventFiles = join(__dirname, "..", "events");

module.exports.run = (client) => {
  // For every .js file in event folder
  for (const event of readdirSync(eventFiles).filter((file) =>
    file.endsWith(".js")
  )) {
    const prop = require(`${eventFiles}/${event}`);
    const eventName = event.split(".").shift();
    console.log(`Loaded Event: ${eventName}`);
    client.on(eventName, prop.bind(null, client));
  }
};
