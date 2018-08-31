'use strict';

const Koa = require('koa');
const render = require('koa-ejs');
const serve = require('koa-static');
const Router = require('koa-router');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');

const app = new Koa();
const route = new Router({
	prefix: ''
});

app.keys = ['linkertop'];

const config = require('./config/session_config.json');

let routerFunc = require('./routerFunc.js');

app.use(session(config, app));

render(app, {
	root: path.join(__dirname, 'view'),
	layout: 'template',
	viewExt: 'html',
	cache: false,
	debug: false,
});

app.use(serve(__dirname + '/public'));
app.use(bodyParser());

route.get('/', routerFunc.index)						// 主页
	.get('/jobs/:jobname', routerFunc.jobs)				// 工作机会 
	.get('/academy/more', routerFunc.academy)			// 研究院
	.get('/team', routerFunc.team)						// 我们的团队
	.get('/service/:name', routerFunc.service)	 		// 服务
	.get('/activity/:actname', routerFunc.act)			// 活动
	// .get('/academy/more')
	.get('/techpost', routerFunc.techpost)				// 科技报道	
	.get('/techpost/report/:id', routerFunc.report)		// 科技报道->报道资讯
	.get('/techpost/news/:id', routerFunc.news)			// 科技报道->快讯
	.get('/techpost/topic/:id', routerFunc.topic)		// 科技报道->专题
	.get('/techpost/activity/:id', routerFunc.activity)	// 科技报道->活动
	.get('/admin', routerFunc.admin)					// 管理员
	.post('/admin', routerFunc.admin)					// 管理员
	.get('/edit/:page', routerFunc.edit)				// 编辑页面
	.post('/edit/:page', routerFunc.edit)				// 提交编辑
	.get('/session', routerFunc.session);				// session测试
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