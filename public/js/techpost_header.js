var totop = document.getElementById('totop');

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