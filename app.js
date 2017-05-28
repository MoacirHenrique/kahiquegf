const Discord = require("discord.js");
const bot = new Discord.Client();

const config = require("./config.json");

bot.on("ready", () => {
  console.log(`Em funcionamento!!!! total de ${bot.channels.size} Canais, em ${bot.guilds.size} servers, um total de ${bot.users.size} usuarios.`);
});

bot.on('message', message => {
    const {
        content,
        author,
        channel: userChannel
    } = message;

    const arg = content.split(' ');

    const sugestaoChannel = bot.channels.get("310619886688927745");

    if(content.startsWith("@sugestao")) {
        let cmd = arg.shift();
        let sugestao = arg.join();

        userChannel.send(author.username + ", obrigado pela sugestão, irei analizar assim que possível!");
        sugestaoChannel.send("A sugestão foi enviada por: " + author.username + ".\n" + sugestao);
        message.delete("@sugestao");
    }
});

bot.on('message', message => {
    const {
        content,
        author,
        channel: userChannel
    } = message;

    const arg = content.split(' ');

    const denunciaChannel = bot.channels.get("310619886688927745");

    if(content.startsWith("@denuncia")) {
        let cmd = arg.shift();
        let denuncia = arg.join();

        userChannel.send(author.username + ", obrigado, irei analizar assim que possível!");
        denunciaChannel.send("A denuncia foi enviada por: " + author.username + ".\n" + denuncia);
        message.delete("@denuncia");
    }
});

bot.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command === "+") {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) =>p+c);

    message.channel.sendMessage(total);
  }

  if (command === "fl") {
    message.channel.sendMessage(args.join(" "));
  }

  if (command === "teste") {
    message.channel.send("Ok!");
  }

  if (command === "help") {
   message.channel.send("**Olá!** Eu sou KaHique-GF, criador por Henrique_MB, veja alguns comandos com @comandos , @cmds (Moderadores e Admins).");
  }

  if (command === "comandos") {
    message.channel.send("```Alguns comandos \n@sugestao [sua sugestao]  - Para dar uma sugestão\n@denuncia [nick a ser denunciado] [sua denuncia] [print (obrigatório)] - Para denunciar um player```");
  }

  if (command === "cmds") {
    let ModeradorRole = message.guild.roles.find("name", "Moderador");
    if(message.member.roles.has(ModeradorRole.id)) {
      message.channel.sendMessage("```Alguns comandos \n@kick [Nick] - Para kickar um player```");
    } else {
      message.reply("Você não tem permissão para usar esse comando.");
    }
  }

  if (command === "kick") {
    let ModeradorRole = message.guild.roles.find("name", "Moderadores");
    if(!message.member.roles.has(ModeradorRole.id)) {
      return message.reply("Você não tem permissão para usar esse comando.");
    }
    if(message.mentions.users.size === 0) {
      return message.reply("Por favor mencione um usuário para kickar!");
    }
    let kickMember = message.guild.member(message.mentions.users.first());
    if(!kickMember) {
      return message.reply("Esse usuário não é válido");
    }
    if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
      return message.reply("Você não tem permissão!!!.");
    }
    kickMember.kick().then(member => {
      message.reply(`${member.user.username} Foi kickado com sucesso.`).catch(console.error);
    }).catch(console.error)
    }

    if (command === "rept") {
      if(message.author.id !== "160839723743444992") return;
      try {
        var code = args.join(" ");
        var evaled = eval(code);

        if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

        message.channel.sendCode("x1", clean(evaled));
      } catch(err) {
        message.channel.sendMessage(`\`ERROR\` \`\`\`x1\n${clean(err)}\n\`\`\``);
      }
    }

}); // MANIPULADOR DE MENSSAGEM DE FIM

function clean(text) {
  if(typeof(text) === "string")
  return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

bot.login(config.token);
