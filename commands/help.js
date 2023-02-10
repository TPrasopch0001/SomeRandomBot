const {SlashCommandBuilder} = require('discord.js');

const cmdList = [
    {name:'help', desc:'sends you to this page'},
    {name:'hornyjail', desc:' [user] {duration} {units of duration} Sends someone horny jail for some time'},
    {name:'setfree' , desc:' [target] {user} Choose to free someone or everyone from horny jail' },
    {name:'invite' , desc:'Sends you the link to invite me to other servers'},
    {name: '8ball', desc: 'Ask a question, get a magic 8 ball answer'},
    {name: 'cry', desc: ' Pokemon cry'},
    {name: 'food add', desc: '[name] Add a place to eat to list of places'},
    {name: 'food list', desc: 'Lists all the saved restaurants'},
    {name: 'food choose', desc: 'Randomly chooses a restaurant to eat at'}
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


