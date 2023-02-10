const {SlashCommandBuilder} = require('discord.js');

const cmdList = [
    {name:'help', desc:'sends you to this page'},
    {name:'ping', desc:'pong!'},
    {name:'hornyjail', desc:' [mention] {duration in seconds} someone to horny jail for a variable amount of minutes'},
    {name:'setfree' , desc:' [mention] free someone from horny jail' },
    {name:'invite' , desc:'sends you the link to invite me to other servers'},
    {name: '8ball', desc: 'ask a question, get a magic 8 ball answer'},
    {name: 'cry', desc: ' pokemon cry'},
]

function helpList(){
    message = "```List Of Commands: ";
    cmdList.forEach(elem => message+="\n    "+elem.name + " - " + elem.desc);
    message+= "```";
    return message;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Replies with a list of commands'),
    async execute(interaction){
        await interaction.reply(helpList());
    }
}


