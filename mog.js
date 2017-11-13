//Cargamos la librería de Discord.js
const Discord = require("discord.js");

//Este será el bot en sí.
const client = new Discord.Client();

//El array donde se guardarán las planificaciones

var arrPlanes = [];

//El objeto raid
function Plan(id, maxMembers, message){
  this.id = id;
  this.maxMembers = maxMembers;
  this.message = message;
  this.autor = message.author;
  this.lista = [message.author];
}

//Métodos

Plan.prototype.dameLista = function(canal){
  for(var i = 0; i < this.lista.length; i++){
    canal.send("<@" + this.lista[i].id + ">");
  }
}

var mensaje = "";

client.on("ready", () => {
  console.log("I am ready!");
  client.user.setPresence({
		status: "online",
		game: {
			name: "Carreras de Chocobos",
			streaming: false,
			type: 1,
		}
	})
});

//El bot recibe un mensaje
client.on("message", message => {
  //Solo hacemos caso a los que empiecen con !
  if (message.content.startsWith("!")) {
    mensaje = message.content.substring(1);

    if(mensaje === "culo"){

      message.channel.send("Me gustan grandes!");
    }

    else if(mensaje === "play"){
      let videoUrl = message.content.split(" ");
			const voiceChannel = message.member.voiceChannel;
			if (videoUrl[1] == undefined) {
				return message.reply("pon un enlace al menos, kupó!");
			}
			if (!voiceChannel) {
				return message.reply("debes estar en un canal de voz, kupó!");
			} else {
				message.reply("Reproduciendo " + videoUrl[1] + " kupó!");
				message.delete();
			}
			voiceChannel.join()
				.then(connnection => {
					const stream = ytdl(videoUrl[1], {
						filter: 'audioonly'
					});;
					const dispatcher = connnection.playStream(stream);
					dispatcher.on('end', () => voiceChannel.leave());
				});

    }

    else if(mesnaje === "stop"){
      const voiceChannel = message.member.voiceChannel;
			if (!voiceChannel) {
				message.reply("ni siquiera estoy y ya me quieres echar, kupopo... :(");
			} else {
				message.reply("adiós..., kupopo...");
				voiceChannel.leave();
			}
    }
}
});

client.login(process.env.TOKEN_BOT);

