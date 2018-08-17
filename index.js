'use strict';

const Koa = require('koa');
const render = require('koa-ejs');
const serve = require('koa-static');
const Router = require('koa-router');
const path = require('path');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const route = new Router({
	prefix: ''
});

let routerFunc = require('./routerFunc.js');

render(app, {
	root: path.join(__dirname, 'view'),
	layout: 'template',
	viewExt: 'html',
	cache: false,
	debug: true,
});

app.use(serve(__dirname + '/public'));
app.use(bodyParser());

route.get('/', routerFunc.index)						// 主页
	.get('/jobs/:jobname', routerFunc.jobs)				// 工作机会 
	.get('/academy/more', routerFunc.academy)			// 研究院
	.get('/team', routerFunc.team)						// 我们的团队
	.get('/service/:name', routerFunc.service)	 		// 服务->项目开发
	// .get('/service/investment')								// 服务->投资
	// .get('/service/linkeracademy')							// 服务->链客学院
	// .get('/service/mediapost')								// 媒体报道
	// .get('/activity/:actname')								// 活动
	// .get('/academy/more')									
	.get('/techpost/news/:id', routerFunc.news)			// 科技报道->快讯
	.get('/techpost/topic/:id', routerFunc.topic)		// 科技报道->专题
	.get('/techpost/activity/:id', routerFunc.activity)	// 科技报道->活动
	.get('/admin', routerFunc.admin)					// 管理员
	.post('/admin', routerFunc.admin)					// 管理员
	.get('/edit/:page', routerFunc.edit);				// 编辑页面
app.use(route.routes());

if (process.env.NODE_ENV === 'test') {
	module.exports = app.callback();
} else {
	app.listen(3000);
	console.log('open http://localhost:3000');
}

app.on('error', function (err) {
	console.log(err.stack);
});