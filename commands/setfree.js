const { SlashCommandBuilder} = require('discord.js');

//to round to n decimal places


const roleName = "Horny-Jail ;}";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setfree')
        .setDescription('Sets free all users or a specific user')
        .addStringOption(option =>
            option
                .setName('who')
                .setDescription('If you want to free everyone or a specific user')
                .setRequired(true)
                .addChoices(
                    {name: "Everyone", value: "all"},
                    {name: "One user", value: "one"}
                ))
        .addUserOption(option => 
            option
                .setName('user')
                .setDescription('The user you want to set free')
        ),

    async execute(interaction) {
        const guild = interaction.guild;
        const bot = guild.members.cache.get('1071525361365553243');
        const role = guild.roles.cache.find(role => role.name === roleName);
        const choice = interaction.options.getString('who');
        if(choice === "one"){
            const targetID = interaction.options.getUser('user').id;
            target = guild.members.cache.get(targetID);
            if(target.roles.cache.find( r => r.name === roleName)){
                target.roles.remove(role);
                interaction.reply({
                    "embeds": [
                        {
                        "type": "rich",
                        "title": `Horny Jail`,
                        "description": `${target}` + " has been set free from horny jail",
                        "color": 0x00FFFF,
                        "image":{
                            "url": "https://i.ytimg.com/vi/aSzyI93e_zY/maxresdefault.jpg"
                        }
                        }
                        ]
                    }
                )
                }
                else{
                    interaction.reply(`${target}` + " isn't in horny jail");
                }
        }
        else{
                guild.members.fetch();
                list = guild.roles.cache.get(role.id).members.map(m=>m.roles.remove(role));
                interaction.reply({
                    "embeds": [
                        {
                        "type": "rich",
                        "title": `Horny Jail`,
                        "description": "Everyone has been released from horny jail",
                        "color": 0x00FFFF,
                        "image":{
                            "url": "https://i.ytimg.com/vi/aSzyI93e_zY/maxresdefault.jpg"
                        }
                        }
                        ]
                    }
                )
        }

}
}
