const Guild = require('../../mongooseModels/guildModel');
const User = require('../../mongooseModels/userModel');
const hasUserStarted = require('../../utils/hasUserStarted');

module.exports = {
    name: 'work',
    description: '💸 You will get to work. 💸',

    callback: async (client, interaction) => {
        try {
            if(!await hasUserStarted(interaction, true)){
                return;
            }

            const guildData = await Guild.findOne( { guildID: interaction.guild.id });
            const userData = await User.findOne({ userID: interaction.user.id });

            const randomAmount = Math.floor(Math.random() * (guildData.workMax - guildData.workMin)) + guildData.workMin;

            await User.findOneAndUpdate({ userID: interaction.user.id }, { moneyAmount: userData.moneyAmount +  randomAmount });
            await interaction.reply(`You made ${randomAmount}${guildData.currencySymbol}`);


        } catch (error) {
            console.log(`ERROR (work.js): ${error}`);
        }
    }
}