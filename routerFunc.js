var routeFunc = function () {
	var that = {
		index: async function (ctx) {
			await ctx.render('index');
		},
		jobs: async function (ctx) {
			let jobname = ctx.params.jobname;
			if (jobname === 'list') {
				await ctx.render('jobs');
			} else {
				ctx.response.body = 'bububu';
			}
			
		},
		academy: async function (ctx) {
			await ctx.render('academy');
		},
		team: async function (ctx) {
			await ctx.render('team');
		},
		service: async function (ctx) {
			let name = ctx.params.name;
			if (name === 'project') {
				await ctx.render('service_project');
			}
		}
	}
	return that;
}

module.exports = routeFunc(); 