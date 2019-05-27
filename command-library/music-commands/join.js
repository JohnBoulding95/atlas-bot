const Discord = require("discord.js");
const ytdl = require('ytdl-core');

module.exports.run = async (atlas, message, arguments, prefix, queue) => {
    let voiceChannel = message.member.voiceChannel;
    let botChannel = message.guild.me.voiceChannel;

    if (!message.guild.me.hasPermission('CONNECT')) {
        return message.reply('I need the permissions [Connect] to join a voice channel!');
    }

    if (voiceChannel === botChannel) {
        message.delete(2000);
        message.reply(`I am already in \`${voiceChannel.name}\``).then(msg => msg.delete(5000));
        return ;
    }

    const queueConstruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: false,
    };

    queue.set(message.guild.id, queueConstruct);

    try {
        queueConstruct.connection = await voiceChannel.join();
        message.channel.send(`Joined \`${voiceChannel.name}\`, music commands bound to \`#${message.channel.name}\``);
    } catch (err) {
        console.log(err);
        queue.delete(message.guild.id);
        return message.channel.send(err);
    }
};

module.exports.help = {
    name: "djjoin"
};