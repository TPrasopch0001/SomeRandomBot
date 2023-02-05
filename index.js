require('dotenv').config(); //initialize dotenv
const Discord = require('discord.js'); //import discord.js

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions
	],
});

var cmdList = [
    {name:'help', desc:'sends you to this page'},
    {name:'ping', desc:'pong!'},
    {name:'hornyjail', desc:'send someone to horny jail for a variable amount of minutes'},
    {name:'setfree' , desc:'free someone from horny jail' },
    {name:'invite' , desc:'sends you the link to invite me to other servers'}
]

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', message => {
    let role;
    let target = message.mentions.members.first();
    function shadowRealm(){
        role = message.guild.roles.cache.find(role => role.name === "horny jail");
        target = message.mentions.members.first();
        target.roles.remove(role);
        message.channel.send(`${target}` + " has been set free from horny jail");
    }


    if(message.content[0] === '!'){
    text = message.content.toLowerCase().split(" ");
    console.log(text);
    switch(text[0]){
        case "!ping":
            message.reply("pong");
            break;
        case "!cry":
            message.reply("QUAAAAAAG");
            message.channel.send("https://media.tenor.com/qTwpBu_N5SgAAAAC/quagsire-quagy-quagsire.gif");
            break;
        case "!hornyjail":
            var time;

            try{
                time = parseInt(text[2])*60000;
            }
            catch (error) {
                console.log("error with time");
                time = 30000;
            }

            role = message.guild.roles.cache.find(role => role.name === "horny jail");
            target.roles.add(role);

            message.channel.send(`${target}` + " has been sent to horny jail");

            setTimeout(() => shadowRealm(), time);

            break;
        case "!setfree":
            shadowRealm();
            break;
        case "!help":
            message.channel.send(helpList());
            break;
        case "!invite":
            message.channel.send({
                "embeds": [
                    {
                      "type": "rich",
                      "title": `SomeRandomBot Invite Link`,
                      "description": `Invite me to your servers!`,
                      "color": 0x00FFFF,
                      "image": {
                        "url": `https://cdn.discordapp.com/attachments/207598903078551552/1071525692354863154/demonicpokemonfromhell.png`,
                        "height": 0,
                        "width": 0
                      },
                      "url": `https://discord.com/oauth2/authorize?client_id=1071525361365553243&permissions=2415986752&scope=bot`
                    }
                  ]
              });
    }
}
  });

function helpList(){
    message = "```List Of Commands: ";
    cmdList.forEach(elem => message+="\n    "+elem.name + " - " + elem.desc);
    message+= "```";
    return message;
}












//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token
