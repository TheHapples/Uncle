module.exports = {
  help: {
    name: "ping",
    description: "Ping",
  },
  requirements: {
    ownerOnly: true,
    uerPerms: [""],
    clientPerms: [""],
  },
  run(client, message) {
    return message.reply(`${client.ws.ping}ms`);
  },
};
