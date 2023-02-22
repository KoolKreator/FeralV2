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
		const randomPost = interaction.options.getBoolean('randomize')

		function getRandom(min, max) {
			const floatRandom = Math.random();
		  
			const difference = max - min;
		  
			// random between 0 and the difference
			const random = Math.round(difference * floatRandom);
		  
			const randomWithinRange = random + min;
		  
			return randomWithinRange;
		}

		if (nsfw){
			let eurl = "https://e621.net/posts"
			let rate = 'e'
		} else {
			let eurl = "https://e926.net/posts"
			let rate = 's'
		}

		if (limit === null){
			limit = 5
		} else if (limit > limit_max){
			limit = limit_max
		}

        const url = `${eurl}.json?tags=${encodeURIComponent(tags)}&rating=${rate}&limit=${limit}`;
		let response = await fetch(url, {
		    method: "GET",
		    headers: {
			"User-Agent": "FeralBot/1.0 (by Kr8tiveKanine on e621)"
		    }
		})

		let result = await response.json();

		if (result['posts'].length > 0){
			if (randomPost){
				let valuenum =  getRandom(0,result['posts'].length)
				let value = result['posts'][valuenum]
			}
			for (const [key, value] of Object.entries(result['posts'])) {
				await interaction.reply(`link: \`${eurl}/${value.id}\`\nrating: \`${value.rating}\`\nscore: \`${value.score.total}\`\n${value.file.url}`)
			}
		}else{
			await interaction.reply({ content: 'Sorry no results found for your query'})
		}
	},
}
