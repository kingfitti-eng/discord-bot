const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

client.on('voiceStateUpdate', (oldState, newState) => {
  if (!oldState.channel && newState.channel) {

    const connection = joinVoiceChannel({
      channelId: newState.channel.id,
      guildId: newState.guild.id,
      adapterCreator: newState.guild.voiceAdapterCreator,
    });

    const player = createAudioPlayer();
    const resource = createAudioResource('./sound.mp3');

    player.play(resource);
    connection.subscribe(player);

    setTimeout(() => connection.destroy(), 5000);
  }
});

client.login('MTQ4NTQ0MDQzOTAzNjI4MTAxMg.G4p-sZ.ba1_2bFl0yKGZCns4ZW29Yo2Zbw1a924goAJZk');