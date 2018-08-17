const userpassConfig = require('./config/userpass.js');
var	routeFunc = function () {
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
			},
			admin: async function (ctx) {
				if (ctx.request.method === 'GET') {
					await ctx.render('login');
				} else if (ctx.request.method === 'POST') {
					let postData = ctx.request.body;
					console.log(postData);
					//console.log(username, password);	
				}
			},
			edit: async function (ctx) {
				
			}
		};
	return that;
}

module.exports = routeFunc(); 