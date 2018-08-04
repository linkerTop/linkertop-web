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
		}
	}
	return that;
}

module.exports = routeFunc(); 