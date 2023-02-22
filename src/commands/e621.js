const {SlashCommandBuilder} = require('discord.js');

const limit_max = 320 // e621 max, should prob be lower

module.exports = {
    data: new SlashCommandBuilder()
	.setName('e621')
	.setDescription('Get posts from e621 or e926.')
	.addStringOption(option => option.setName('tags').setDescription('Tags to search with').setRequired(true))
    .addNumberOption(option => option.setName('limit').setDescription('Amount of posts to return'))
    .addBooleanOption(option => option.setName('adult').setDescription('Show adult rated post'))
	.addBooleanOption(option => option.setName('randomize').setDescription('randomize the search result')),
	async execute(interaction) {
		const tags = interaction.options.getString('tags')
		let limit = interaction.options.getNumber('limit')
		const nsfw = interaction.options.getBoolean('adult')
		let site_url, rate

		if (nsfw){
			site_url = "https://e621.net/posts"
			rate = 'e'
		} else {
			site_url = "https://e926.net/posts"
			rate = 's'
		}

		if (limit === null){
			limit = 5
		} else if (limit > limit_max){
			limit = limit_max
		}

        const url = `${site_url}.json?tags=${encodeURIComponent(tags)}&rating=${rate}&limit=${limit}`;
		let response = await fetch(url, {
		    method: "GET",
		    headers: {
				"User-Agent": "FeralBot/1.0",
				"Username": "Kr8tiveKanine"
		    }
		})

		let result = await response.json();

		if (result['posts'].length > 0){
			for (const [, value] of Object.entries(result['posts'])) {
				await interaction.reply(`Link: \`${site_url}/${value.id}\`\nRating: \`${value.rating}\`\nScore: \`${value.score.total}\`\n${value.file.url}`)
			}
		}else{
			await interaction.reply({ content: `Sorry no results found for your query \`${tags}\``})
		}
	},
}
