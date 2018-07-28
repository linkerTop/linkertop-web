'use strict';

const Koa = require('koa');
const render = require('koa-ejs');
const serve = require('koa-static');
const Router = require('koa-router');
const path = require('path');

const app = new Koa();
const route = new Router();

let routerFunc = require('./routerFunc.js');

render(app, {
	root: path.join(__dirname, 'view'),
	layout: 'template',
	viewExt: 'html',
	cache: false,
	debug: true,
});

app.use(serve(__dirname + '/public'));

route.get('/', routerFunc.index) 			// 主页
	.get('/service/project') 				// 服务->项目开发
	.get('/service/investment')				// 服务->投资
	.get('/service/linkeracademy')			// 服务->链客学院
	.get('/service/mediapost')				// 媒体报道
	.get('/activity')						// 活动
	.get('/team')							// 团队
	.get('/research')						// 研究院
	.get('/techpost/news')					// 科技报道->快讯
	.get('/techpost/topic')					// 科技报道->专题
	.get('/techpost/activity')				// 科技报道->活动
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