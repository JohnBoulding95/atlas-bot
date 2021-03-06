module.exports = {
    name: 'djstop',
    description: 'A simple ping to the bot to see if it will respond.',
    aliases: ['djstop', 'stop', 'halt', 'endqueue'],
    usage: '+djstop',
    async run (atlas, message, params, guildInfo) {
        let serverQueue = atlas.queue.get(message.guild.id);
        let voiceChannel = message.member.voiceChannel;
        let botChannel = message.guild.me.voiceChannel;

        if (!voiceChannel) {
            message.delete(2000);
            message.reply('You need to be in a voice channel to stop music!').then(msg => msg.delete(5000));
            return ;
        }
        if (!botChannel) {
            message.delete(2000);
            message.reply('I need to be in a voice channel to stop music!').then(msg => msg.delete(5000));
            return ;
        }
        if (voiceChannel !== botChannel) {
            message.delete(2000);
            message.reply('I need to be in the same channel as you to allow usage of this command.').then(msg => msg.delete(5000));
            return ;
        }

        if (!serverQueue) {
            message.delete(2000);
            message.reply('There is no song to stop!').then(msg => msg.delete(5000));
            return ;
        }

        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();

        message.channel.send("**Music is now Stopped!**");
    }
};