const { SlashCommandBuilder, CommandInteractionOptionResolver} = require('discord.js');

const usuals = [
    "Burger Point",
    "Popeyes",
    "Nandos",
    "Bonchon",
    "Babas"
  ];

let places = new Set();

for(const u of usuals){
    places.add(u);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('food')
        .setDescription('Chooses a random place to eat')
        .addSubcommand(subcommand => 
            subcommand
            .setName('add')
			.setDescription('add a place to eat ')
            .addStringOption(option => option
                .setName('name')
                .setDescription('Give me a place to eat')
                .setRequired(true))
        )
        .addSubcommand(subcommand => 
            subcommand
            .setName('list')
            .setDescription('Lists all the choices I saved')
            )
        .addSubcommand(subcommand => 
            subcommand
            .setName('choose')
            .setDescription('Chooses a place from all the choices I saved')
            ),
    async execute(interaction){
            if (interaction.options.getSubcommand()==='list'){
                message = "";
                for (const item of places.values()){
                    message += item + "\n";
                }
                await interaction.reply(({
                    "content": `Places to eat`,
                    "embeds": [
                      {
                        "type": "rich",
                        "title": `List of Places I Saved`,
                        "description": message,
                        "color": 0x00FFFF
                      }
                    ]
                  }));
                }
            if (interaction.options.getSubcommand()==='add'){
                newPlace = interaction.options.getString('name');
                places.add(newPlace);
                await interaction.reply("Added "+`${newPlace}`);
            }
            if(interaction.options.getSubcommand() === 'choose'){
                let placesList = Array.from(places);
                ans = Math.floor(Math.random() * (placesList.length) );
                let choice = placesList[ans];
                await interaction.reply(({
                    "content": `Place to Eat`,
                    "embeds": [
                      {
                        "type": "rich",
                        "title": "I chose: ",
                        "description": `${choice}`,
                        "color": 0x00FFFF,
                      }
                    ]
                  }));
            }
    }
}