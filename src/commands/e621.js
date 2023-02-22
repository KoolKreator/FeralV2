const {SlashCommandBuilder} = require('discord.js');

const limit_max = 320 // e621 max, should prob be lower

module.exports = {
	data: new SlashCommandBuilder()
		.setName('e621')
		.setDescription('Get posts from e621 or e926.')
		.addUserOption(option => option.setName('tags').setDescription('Tags to search with'))
		.addUserOption(option => option.setName('limit').setDescription('Amount of posts to return'))
		.addUserOption(option => option.setName('nsfw').setDescription('whether to have NSFW ')),
	async execute(interaction) {
		const tags = interaction.options.getString('tags')
		let limit = interaction.options.getNumber('limit')
		const nsfw = interaction.options.getBoolean('nsfw')
		let eurl

		if (nsfw){
			eurl = "https://e621.net/"
		} else {
			eurl = "https://e926.net/"
		}

		if (limit === null){
			limit = 5
		} else if (limit > limit_max){
			limit = limit_max
		}

		const response = await fetch(`${eurl}/post.json?tags=${encodeURIComponent(tags)}&limit=${limit}`, {
			method: "GET",
			headers: {
				"User-Agent": "Feral/1.0.0"
			}
		})

		for (const [, value] of Object.entries(await await response.json()["posts"])) {
			interaction.send(`link: \`${eurl}/posts/${value.id}\`\nrating: \`${value.rating}\`\nscore: \`${value.score.total}\`\n${value.file.url}`)
		}
	},
}
