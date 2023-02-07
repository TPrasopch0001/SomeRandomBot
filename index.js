require('dotenv').config(); //initialize dotenv
const Discord = require('discord.js'); //import discord.js

const talkedRecently = new Set();

const roleName = "Horny-Jail ;}";

const { Client, GatewayIntentBits, ActivityType } = require('discord.js');

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
    {name:'invite' , desc:'sends you the link to invite me to other servers'},
    {name: '8ball', desc: 'ask a question, get a magic 8 ball answer'},
    {name: 'cry', desc: ' pokemon cry'},
]

//to round to n decimal places
function round(num, places) {
  var multiplier = Math.pow(10, places);
  return Math.round(num * multiplier) / multiplier;
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    activities: [{ name: `with your mom`, type: ActivityType.Playing}],
    status: `online`
  });
});

client.on('messageCreate', message => {
    let role = message.guild.roles.cache.find(role => role.name === roleName);
    let target = message.mentions.members.first();
    text = message.content.toLowerCase().split(" ");
    function sentToShadowRealm(t){
      var time = 30000; //30 seconds
            try{
              if(Boolean(t)){
                time = parseInt(t)*1000; // x seconds
              }
            }
            catch (error) {
                console.log("error with time");
            }
            if(!target.roles.cache.find( r => r.name === roleName)){
            target.roles.add(role);
            if(time > 60000){
              message.channel.send({"embeds": [
                {
                  "type": "rich",
                  "title": `Horny Jail`,
                  "description": `${target}` + " has been sent to horny jail for "+`${round(time/60000,2)}` +" minutes",
                  "color": 0x00FFFF,
                  "image": {
                    "url":"https://i.kym-cdn.com/entries/icons/mobile/000/033/758/Screen_Shot_2020-04-28_at_12.21.48_PM.jpg"
                  }
                }
                ]
            }
            );
            } else{
              message.channel.send({"embeds": [
                {
                  "type": "rich",
                  "title": `Horny Jail`,
                  "description": `${target}` + " has been sent to horny jail for "+`${time/1000}` +" seconds",
                  "color": 0x00FFFF,
                  "image": {
                    "url":"https://i.kym-cdn.com/entries/icons/mobile/000/033/758/Screen_Shot_2020-04-28_at_12.21.48_PM.jpg"
                  }
                }
                ]
            }
            );
            }
            setTimeout(() => freeFromShadowRealm(), time);
    } else{
      message.channel.send(`${target}` + " is already in horny jail");
    }
  }
    function freeFromShadowRealm(){
      if(target.roles.cache.find( r => r.name === roleName)){
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
      }

    //commands
    if(message.content.startsWith("!")){
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
          if(talkedRecently.has(message.author.id)){
            message.channel.send("You have recently used hornyjail, please wait 2 minutes before using it again.");
          }
          else{
            talkedRecently.add(message.author.id);
            sentToShadowRealm(text[2]);
            setTimeout(()=> talkedRecently.delete(message.author.id),120000);
          }
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
          })
    }
}
var bonkTime = 0;
  for(let i = 0; i < BlackListedWords.length;i++){
    if(text.includes(BlackListedWords[i])){
      bonkTime+=10;
      
    }
  }
  if(bonkTime > 0){
    target = message.member;
    sentToShadowRealm(bonkTime);
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
