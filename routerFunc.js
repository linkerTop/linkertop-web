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
					await ctx.render('login', {
						layout: 'simple'
					});
				} else if (ctx.request.method === 'POST') {
					let postData = ctx.request.body;
					console.log(postData);
					//console.log(username, password);	
				}
			},
			edit: async function (ctx) {
				
			},
			techpost: async function (ctx) {
				await ctx.render('techpost', {
					layout: 'techpost_template'
				});
			},
			report: async function (ctx) {
				let id = ctx.params.id;
				let post = require('./data/report_post.json');
				
				if (id === undefined && post[id - 1] === undefined) {
					await ctx.render('404', {
						layout: 'simple' 
					});
					return;
				}
				
				let template = {
					layout: 'techpost_template',
					type: 'report-page'
				};
				let final_temp = Object.assign(post[id - 1], template)
				await ctx.render('techpost_post', final_temp);

			},
			news: async function (ctx) {
				let id = ctx.params.id;
				if (id === 'list') {
					let post_list = require('./data/news_list');
					let template = {
						layout: 'techpost_template'
					}
					let final_temp = Object.assign(post_list, template);
					
					await ctx.render('news/list', final_temp);
				} else {
					let post = require('./data/news_post.json');
					
					if (post[id - 1] === undefined) {
						await ctx.render('404', {
							layout: 'simple' 
						});
						return;
					}
					
					let template = {
						layout: 'techpost_template',
						type: 'news-page'
					};
					let final_temp = Object.assign(post[id - 1], template)
					await ctx.render('techpost_post', final_temp);
				}
			},
			topic: async function (ctx) {
				let id = ctx.params.id;
				if (id === 'list') {
					let post_list = require('./data/topic_list');
					let template = {
						layout: 'techpost_template'
					}
					let final_temp = Object.assign(post_list, template);
					
					await ctx.render('topic/list', final_temp);
				} else {
					let post = require('./data/topic_post.json');
					
					if (post[id - 1] === undefined) {
						await ctx.render('404', {
							layout: 'simple' 
						});
						return;
					}
					
					let template = {
						layout: 'techpost_template',
						type: 'topic-page'
					};
					let final_temp = Object.assign(post[id - 1], template)
					await ctx.render('techpost_post', final_temp);
				}
			},
			activity: async function (ctx) {
				let id = ctx.params.id;
				if (id === 'list') {
					await ctx.render('activity/list', {
						layout: 'techpost_template'
					});
				} else {
					let post = require('./data/activity_post.js');
					if (post[id - 1] === undefined) {
						await ctx.render('404', {
							layout: 'simple' 
						});
						return;
					}
					
					let template = {
						layout: 'techpost_template',
						type: 'activity-page'
					};
					let final_temp = Object.assign(post[id - 1], template)
					await ctx.render('techpost_post', final_temp);
				}
			}
			
		};
	return that;
}

module.exports = routeFunc(); 