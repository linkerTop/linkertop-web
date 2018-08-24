var index = document.getElementById('index'),
	service = document.getElementById('service'),
	tech = document.getElementById('tech'),
	service_items = document.getElementById('service-items'),
	tech_items = document.getElementById('tech-items'),
	totop = document.getElementById('totop'),
	lang = document.getElementById('lang');
	
// 服务
service.addEventListener('mouseenter', function (e) {
	service_items.style.display = 'block';
});

service_items.addEventListener('mouseleave', function (e) {
	service_items.style.display = 'none';
});

// 活动
tech.addEventListener('mouseenter', function (e) {
	tech_items.style.display = 'block';
});

tech_items.addEventListener('mouseleave', function (e) {
	tech_items.style.display = 'none';
});

// 语言切换
lang.addEventListener('click', function () {
	if (lang.classList.contains('en')) {
		lang.classList.remove('en');
		lang.classList.add('zh');
		localStorage.lang = 'en';
	} else {
		lang.classList.remove('zh');
		lang.classList.add('en');
		localStorage.lang = 'zh';
	}
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
	scrollTo({"behavior": "smooth", "top": 0});
	totop.style.display = 'none';
});