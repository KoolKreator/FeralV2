module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		setInterval(() => {
			const statuses = [
					`Watching For Commands`,
					`Chasing My Tail`,
					"Eating Your Shoe"
				]
			const status = statuses[Math.floor(Math.random() * statuses.length)]
			client.user.setActivity(status, { type: "ONLINE" })
		}, 30000)
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
