const { SlashCommandBuilder} = require('discord.js');

const ballAns = [
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes definitely",
    "You may rely on it",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes",
    "Reply hazy, try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful"
  ];

  
module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Replies with an 8 ball answer')
        .addStringOption(option => option
            .setName('question')
            .setDescription('Give me a yes or no question')
            .setRequired(true)),
    async execute(interaction){
            question = interaction.options.getString('question');
            ans = Math.floor(Math.random() * ballAns.length)
            await interaction.reply(({
                    "content": `Magic 8 Ball`,
                    "embeds": [
                      {
                        "type": "rich",
                        "title": `${question}`,
                        "description": `${ballAns[ans]}`,
                        "color": 0x00FFFF,
                        "thumbnail": {
                          "url": `https://www.horoscope.com/images-US/games/game-magic-8-ball-no-text.png`,
                          "height": 0,
                          "width": 0
                        }
                      }
                    ]
                  }));
    }
}