const {SlashCommandBuilder} = require('discord.js');

const limit_max = 320 // e621 max, should prob be lower

module.exports = {
    data: new SlashCommandBuilder()
	.setName('e621')
	.setDescription('Get posts from e621 or e926.')
	.addUserOption(option => option.setName('tags').setDescription('Tags to search with'))
	.addUserOption(option => option.setName('limit').setDescription('Amount of posts to return'))
        .addUserOption(option => option.setName('nsfw').setDescription('whether to have NSFW ')),
		.setName('e621')
		.setDescription('Get posts from e621 or e926.')
		.addStringOption(option => option.setName('tags').setDescription('Tags to search with').setRequired(true))
        .addNumberOption(option => option.setName('limit').setDescription('Amount of posts to return'))
        .addBooleanOption(option => option.setName('adult').setDescription('Show adult rated post')),
	async execute(interaction) {
		const tags = interaction.options.getString('tags')
		let limit = interaction.options.getInt('limit')
		const nsfw = interaction.options.getBool('NSFW')

		if (nsfw){
		    const url = "https://e621.net/"
		} else {
		    const url = "https://e926.net/"
		}

		if (limit === null){
		    limit = 5
		} else if (limit > limit_max){
			limit = limit_max
		}

		const response = await fetch(`${eurl}/post.json?tags=${encodeURIComponent(tags)}&limit=${limit}`, {
		    method: "GET",
		    headers: {
			"User-Agent": "FeralBot/1.0 (by Kr8tiveKanine on e621)"
		    }
		})

		for (const [key, value] of Object.entries(response.json()["posts"])) {
		    interaction.reply(`link: \`${url}/posts/${value.id}\`\nrating: \`${value.rating}\`\nscore: \`${value.score.total}\`\n${value.file.url}`)
		}
	},
}
