//Cargamos la librería de Discord.js
const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const fs = require('fs');
const request = require('request');

//Este será el bot en sí.
const client = new Discord.Client();

var dice = {
  sides: 100,
  roll: function () {
    var randomNumber = Math.floor(Math.random() * this.sides) + 1;
    return randomNumber;
  }
}


client.on("ready", () => {
  console.log("I am ready!");
  client.user.setPresence({
		status: "online",
		game: {
			name: "las apuestas ¡NO ESTOY ENFERMO, KUPÓ!",
			streaming: false,
			type: 1,
		}
	})
});

//El bot recibe un mensaje
client.on("message", message => {
  //Solo hacemos caso a los que empiecen con !
  if (message.content.startsWith("!")) {
    
    if(message.content.startsWith("!play")){
      console.log("Recibido " + message.content);
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

    else if(message.content === "!stop"){
      const voiceChannel = message.member.voiceChannel;
			if (!voiceChannel) {
				message.reply("ni siquiera estoy y ya me quieres echar, kupopo... :(");
			} else {
				message.reply("adiós..., kupopo...");
				voiceChannel.leave();
			}
    }

    else if(message.content === "!dice"){
      var number = dice.roll();
      var respuesta = "";
      if(number === 0) {
        respuesta = "¡Fallo crítico! ¡No quisiera estar bajo tu pompón, kupó";
      }
      else if((number > 0 )&& (number <= 10)){
        respuesta = "¡Qué mala suerte, Kupó!";
      }
      else if((number > 10) && (number <= 50)){
        respuesta = "¡No ha sido tu mejor tirada, kupó!";
      }

      else if((number > 50) && (number <= 90)){
        respuesta = "¡Buena tirada, kupó!";
      }

      else if((number > 90) && (number < 100)){
        respuesta = "¡Genial! ¡Mis guiles estabán por tí, <@" + message.author.id + ">";
      }

      else if (number === 100){
        respuesta = "¡Crítico, kupó! ¡Ani te debe unas galletas!"
      }
      
      message.channel.send("**" + number.toString() + "/100**");
      message.channel.send(respuesta);

    }
}
});

client.login(process.env.TOKEN_BOT);

