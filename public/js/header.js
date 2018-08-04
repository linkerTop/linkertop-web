var index = document.getElementById('index'),
	service = document.getElementById('service'),
	tech = document.getElementById('tech'),
	service_items = document.getElementById('service-items'),
	tech_items = document.getElementById('tech-items'),
	totop = document.getElementById('totop');
	
// 服务
service.addEventListener('click', function (e) {
	service_items.style.display = 'block';
});

service_items.addEventListener('click', function (e) {
	service_items.style.display = 'none';
});

// 活动
tech.addEventListener('click', function (e) {
	tech_items.style.display = 'block';
});

tech_items.addEventListener('click', function (e) {
	tech_items.style.display = 'none';
});

// 向下滚即出现按钮
window.addEventListener('scroll', function () {
	if (window.scrollY > 0) {
		totop.style.display = 'block';
	} else {
		totop.style.display = 'none';
	}
});

// 返回页首
totop.addEventListener('click', function (e) {
	scroll(0, 0);
	totop.style.display = 'none';
});