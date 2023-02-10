const { SlashCommandBuilder} = require('discord.js');

//to round to n decimal places


const roleName = "Horny-Jail ;}";

cooldowns = new Set();
COOLDOWN_SECONDS = 60; // replace with desired cooldown time in seconds

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hornyjail')
        .setDescription('Send a person to horny jail')
        .addUserOption(option => 
            option
                .setName('user')
                .setDescription('The user you want to jail')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option
            .setName('time')
            .setDescription('how long should the person stay in jail')
            .setRequired(false)
        )
        .addStringOption(option => option
            .setName('units')
            .setDescription('unit of time for duration')
            .setRequired(false)
            .addChoices(
                {name: "Seconds", value: "s"},
                {name: "Minutes", value: "min"}
            )
        ),

    async execute(interaction) {
        console.log(cooldowns);
        const guild = interaction.guild;
        let msgchannel = guild.channels.cache.find(c => c.name === "bot-commands-time");
        const bot = guild.members.cache.get('1071525361365553243');
        const role = guild.roles.cache.find(role => role.name === roleName)
        const targetID = interaction.options.getUser('user').id;
        const target = guild.members.cache.get(targetID);
        const time = interaction.options.getInteger('time') ?? 10;
        const unit = interaction.options.getString('units') ?? "s";
        const sender = interaction.user.id;

        function freeFromShadowRealm(target){
            if(target.roles.cache.find( r => r.name === roleName)){
              target.roles.remove(role);
              return msgchannel.send({
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
                return msgchannel.send(`${target}` + " isn't in horny jail");
              }
            }

        let setTime = 0;
        if(target.id !== bot.id){
            if(!cooldowns.has(sender)){
                if(!target.roles.cache.find( r => r.name === roleName)){
                    target.roles.add(role);
                    switch(unit){
                        case "s": 
                        setTime = time * 1000;
                        setTimeout(()=>freeFromShadowRealm(target),setTime);
                        interaction.reply( {"embeds": [
                            {
                            "type": "rich",
                            "title": `Horny Jail`,
                            "description": `${target}` + " has been sent to horny jail for "+`${time}` +" seconds",
                            "color": 0x00FFFF,
                            "image": {
                                "url":"https://i.kym-cdn.com/entries/icons/mobile/000/033/758/Screen_Shot_2020-04-28_at_12.21.48_PM.jpg"
                            }
                            }
                            ]
                        })
                        break;
                        case "min":
                        setTime = time * 60000;
                        setTimeout(()=>freeFromShadowRealm(target),setTime);
                        interaction.reply( {"embeds": [
                            {
                            "type": "rich",
                            "title": `Horny Jail`,
                            "description": `${target}` + " has been sent to horny jail for "+`${time}` +" minutes",
                            "color": 0x00FFFF,
                            "image": {
                                "url":"https://i.kym-cdn.com/entries/icons/mobile/000/033/758/Screen_Shot_2020-04-28_at_12.21.48_PM.jpg"
                            }
                            }
                            ]
                        })
                        break;
                    }
                }
                else{
                    interaction.reply(`${target}` + " is already in horny jail");
                }
                cooldowns.add(sender,true);
                setTimeout(() => 
                cooldowns.delete(sender),( COOLDOWN_SECONDS * 1000));
          }

                else{
                    interaction.reply({content: "Please wait for cooldown to end", ephemeral: true});
        }
    }
        else{
        interaction.reply("I cannot be put into horny jail");
    }
    }

};