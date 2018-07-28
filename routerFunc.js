var routeFunc = function () {
	var that = {
		index: async function (ctx) {
			await ctx.render('index');
		}
	}
	return that;
}

module.exports = routeFunc(); 