const { owners, prefix } = require("../config");

module.exports = (client, message) => {
  // ignore bots
  if (message.author.bot) return;

  const args = message.content.split(/ +/g);
  const command = args.shift().slice(client.prefix.length).toLowerCase();
  const cmd = client.commands.get(command);

  //Check for prefix and if the command exists
  if (!message.content.toLowerCase.startsWith(client.prefix) || !cmd);
  // Check if the bot is allowed to send messages
  if (message.guild && !message.guild.me.permissions.has("SEND_MESSAGES"))
    return;

  if (cmd.requirements.ownerOnly && !owners.includes(message.author.id)) {
    return message.reply("This command is reserved for my owners");
  }

  if (
    cmd.requirements.userPerms &&
    !message.members.permissions.has(cmd.requirements.userPerms)
  ) {
    return message.reply(
      `You are lacking following permissions \n\n${formatPermissions(
        message.member,
        cmd.requirements.userPerms
      )}`
    );
  }

  if (
    cmd.requirements.clientPerms &&
    !message.guild.me.permissions.has(cmd.requirements.clientPerms)
  ) {
    return message.reply(
      `I lack following permissions \n\n${formatPermissions(
        message.guild.me,
        cmd.requirements.clientPerms
      )}`
    );
  }

  cmd.run(client, message, args);

  const formatPermissions = (member, perms) => {
    const missing = member.permissions.missing(perms).map(
      (str) =>
        `${str
          .replace(/_/g, " ")
          .toLowerCase()
          .replace(/\b(\w)/g, (char) => char.toUpperCase())}`
    );

    return missing.length > 1
      ? `${missing.slice(0, -1).join(", ")} and ${missing.slice(-(1)[0])}`
      : missing[0];
  };
};
