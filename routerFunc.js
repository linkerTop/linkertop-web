const { query } = require('./db_query.js');
const { htmlSpecialChar } = require('./util.js');

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
				} else if (name === 'promotion') {
					await ctx.render('service_promotion');
				} else if (name === 'train') {
					await ctx.render('service_train');
				} else if (name === 'media') {
					await ctx.render('service_media');
				}
			},
			act: async function (ctx) {
				let name = ctx.params.actname;
				if (name === 'community') {
					await ctx.render('activity_community');
				} else if (name === 'train') {
					await ctx.render('activity_train');
				} else if (name === 'brand') {
					await ctx.render('activity_brand');
				} else if (name === 'block') {
					await ctx.render('activity_block');
				} 
			},
			admin: async function (ctx) {
				if (ctx.request.method === 'GET') {
					if (ctx.session.login === true) {
						await ctx.render('admin', {
							layout: 'simple',
							title: '欢迎',
							username: ctx.session.username,
							last_login: ctx.session.last_login,
						});
					} else {
						await ctx.render('login', {
							layout: 'simple',
							title: '登录',
						});
					}
				} else if (ctx.request.method === 'POST') {
					let postData = ctx.request.body;
					
					let data = await query('SELECT `password`, `last_login_time` FROM user WHERE `username` = ?', [postData.username]);
					
					if (data.length === 0 || data[0].password !== postData.password) {
						ctx.body = '用户名或密码错误';
						return;
					} else {
						query('UPDATE `user` SET `last_login_time` = ?', [new Date().toLocaleString()]);
						ctx.session.login = true;
						ctx.session.username = postData.username;
						ctx.session.last_login = data[0].last_login_time;
						ctx.redirect('/admin');
					}
					//console.log(username, password);	
				}
			},
			edit: async function (ctx) {
				if (ctx.session.login !== true) {
					ctx.redirect('/admin');
				}
				
				if (ctx.request.method === 'GET') {
					let page = ctx.params.page;
					if (page === 'activity') {
						
						let data = await query('SELECT post.id, post.title, user.nickname, post.update_time FROM `post`,`user` WHERE post.type = "activity" AND post.author = user.id');
						
						if (data.length !== 0) {
							console.log(page === 'activity');
							await ctx.render('edit_list', {
								layout: 'simple',
								data: data,
								title: '活动列表'
							});
						}
					} else if (page === 'report'){
						
					} else if (page === 'topic') {
						
					} else if (page === 'news') {
						
					} else {
						let id = Number(page);
						if (id === NaN) {
							await ctx.render('404', {
								layout: 'simple',
								title: '没有这篇文章',
							});
						}
						
						let data = await query('SELECT `id`, `type`, `title`, `intro`, `intro_img`, `content` FROM `post` WHERE `id` = ?', [id]);
						
						await ctx.render('edit_page', {
							layout: 'simple',
							title: '编辑',
							data: data[0],
						});
						
					}
				} else if (ctx.request.method === 'POST') {
					let postData = ctx.request.body;
					
					let page = ctx.params.page;
					let id = Number(page);
					if (id === NaN) {
						await ctx.render('404', {
							layout: 'simple',
							title: '错误提交',
						});
					}
					
					let title = postData.title;
					let type = postData.type;
					let intro = postData.intro;
					let intro_img = postData.intro_img;
					let content = postData.content;
					await query('UPDATE `post` SET `title` = ?, `intro` = ?, `intro_img` = ?, `content` = ? WHERE `id` = ?', 
						[title, intro, intro_img, content, id]);
						
					ctx.redirect('/edit/' + type);
				}
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
							layout: 'simple', 
							title: '该页面已走失',
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
					let post_list = require('./data/topic_list.json');
					let template = {
						layout: 'techpost_template'
					}
					let final_temp = Object.assign(post_list, template);
					
					await ctx.render('topic/list', final_temp);
				} else {
					let post = require('./data/topic_post.json');
					
					if (post[id - 1] === undefined) {
						await ctx.render('404', {
							layout: 'simple',
							title: '该页面已走失',
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
					let post_list = await query('SELECT `id`, `title`, `intro_img` FROM `post` WHERE `type` = "activity"');
					let past_post_list = await query('SELECT `id`, `title`, `intro_img` FROM `post` WHERE `type` = "activity"');

					let template = {
						layout: 'techpost_template',
						list: post_list, 
						past_list: past_post_list,
					}
					await ctx.render('activity/list', template);
				} else {
					let post = await query('SELECT post.title, post.intro, post.intro_img, post.content, post.update_time, post.author FROM post, user WHERE post.id = ? AND post.author = user.id', [id]);
					if (post.length === 0) {
						await ctx.render('404', {
							layout: 'simple',
							title: '该页面已走失',
						});
						return;
					}
					
					let template = {
						layout: 'techpost_template',
						type: 'activity-page',
						post: post[0],
					};
				
					await ctx.render('techpost_post', template);
				}
			},
			session: async function (ctx) {
				ctx.body = ctx.session;
			}
			
		};
	return that;
}

module.exports = routeFunc(); 