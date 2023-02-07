require('dotenv').config(); //initialize dotenv
const Discord = require('discord.js'); //import discord.js

const roleName = "Horny-Jail ;}";

const { Client, GatewayIntentBits } = require('discord.js');

const BlackListedWords = [
  'sex',
  'blow',
  'choke',
  'suck'
];

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

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions
	],
});

const cmdList = [
    {name:'help', desc:'sends you to this page'},
    {name:'ping', desc:'pong!'},
    {name:'hornyjail', desc:' [mention] {duration in seconds} someone to horny jail for a variable amount of minutes'},
    {name:'setfree' , desc:' [mention] free someone from horny jail' },
    {name:'invite' , desc:'sends you the link to invite me to other servers'}
]

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({activities:[{
    "type":4,
    "name": "Just Vibing"
  }],
    "status" : 'online',
  })
});

client.on('messageCreate', message => {
    let role = message.guild.roles.cache.find(role => role.name === roleName);
    let target = message.mentions.members.first();
    text = message.content.toLowerCase().split(" ");
    function sentToShadowRealm(t){
      var time = 30000; //5 minutes
            try{
                time = parseInt(t)*1000; // x seconds
            }
            catch (error) {
                console.log("error with time");
            }
            target.roles.add(role);
            message.channel.send({"embeds": [
                {
                  "type": "rich",
                  "title": `Horny Jail`,
                  "description": `${target}` + " has been sent to horny jail",
                  "color": 0x00FFFF,
                  "image": {
                    "url":"https://i.kym-cdn.com/entries/icons/mobile/000/033/758/Screen_Shot_2020-04-28_at_12.21.48_PM.jpg"
                  }
                }
                ]
            }
            );
            setTimeout(() => freeFromShadowRealm(), time);
    }
    function freeFromShadowRealm(){
        target.roles.remove(role);
        message.channel.send({
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

    //commands
    if(message.content[0] === '!'){
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
            sentToShadowRealm(text[2]);
            break;
        case "!setfree":
            freeFromShadowRealm();
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
        case "!8ball":
          question = text.slice(1).join(' ');
          ans = Math.floor(Math.random() * ballAns.length);
          message.channel.send({
            "embeds": [
              {
                "type": "rich",
                "title": `Magic 8 Ball`,
                "description": "'"+`${question}`+"' "+`${ballAns[ans]}`,
                "color": 0x00FFFF,
              }
            ]
          })
    }
}
  for(let i = 0; i < BlackListedWords.length;i++){
    if(text.includes(BlackListedWords[i])){
      target = message.member;
      sentToShadowRealm(5);
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
