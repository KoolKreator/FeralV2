const {SlashCommandBuilder} = require('discord.js');

const limit_max = 320 // e621 max, should prob be lower

module.exports = {
    data: new SlashCommandBuilder()
	.setName('e621')
	.setDescription('Get posts from e621 or e926.')
	.addStringOption(option => option.setName('tags').setDescription('Tags to search with').setRequired(true))
    // .addNumberOption(option => option.setName('limit').setDescription('Amount of posts to return'))
    .addBooleanOption(option => option.setName('adult').setDescription('Show adult rated post')),
	// .addBooleanOption(option => option.setName('randomize').setDescription('randomize the search result')),
	async execute(interaction) {
		const tags = interaction.options.getString('tags')
		// let limit = interaction.options.getNumber('limit')
		const nsfw = interaction.options.getBoolean('adult')

		function getRandomResponse(max){
			return Math.floor(Math.random() * (max - 0) + 0);
		}

		if (nsfw){
			eurl = "https://e621.net/posts"
			rate = 'e'
		} else {
			eurl = "https://e926.net/posts"
			rate = 's'
		}

		// if (limit === null){
		// 	limit = 5
		// } else if (limit > limit_max){
		// 	limit = limit_max
		// }

        const url = `${eurl}.json?tags=${encodeURIComponent(tags)}&rating=${rate}`;

		let response = await fetch(url, {
					method: "GET",
					headers: {
					"User-Agent": "FeralBot/2.0 (by Kr8tiveKanine on e621)"
					}
				})

		let result = await response.json();
		let postnum = getRandomResponse(result.posts.length)

		if (result.posts.length > -1){
			let post = result.posts[postnum]
			await interaction.reply(`link: \`${url}/posts/${post.id}\`\nrating: \`${post.rating}\`\nscore: \`${post.score.total}\`\n${post.file.url}`)
			// for (const [key, value] of Object.entries(result['posts'])) {
			// 	await interaction.reply(`link: \`${url}/posts/${value.id}\`\nrating: \`${value.rating}\`\nscore: \`${value.score.total}\`\n${value.file.url}`)
			// }
		}else{
			await interaction.reply({ content: `Sorry no results found for your query \`${tags}\``})
		}
	},
}
