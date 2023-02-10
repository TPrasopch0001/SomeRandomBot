const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cry')
        .setDescription('Does a pokemon cry'),
    async execute(interaction){
        await interaction.reply({
            "embeds": [
                {
                  "type": "rich",
                  "title": "QUAAAAAAG",
                  "color": 0x00FFFF,
                  "image": {
                    "url": "https://media.tenor.com/qTwpBu_N5SgAAAAC/quagsire-quagy-quagsire.gif",
                    "height": 0,
                    "width": 0
                  },
                }
              ]
            });
    }
}
