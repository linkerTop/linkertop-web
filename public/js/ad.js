var bg1 = document.getElementById('bg1'),
	bg2 = document.getElementById('bg2'),
	bg3 = document.getElementById('bg3'),
	ad_bg1 = document.getElementById('ad-bg1'),
	ad_bg2 = document.getElementById('ad-bg2'),
	ad_bg3 = document.getElementById('ad-bg3'),
	hide_all = function () {
		ad_bg1.style.display = 'none';
		ad_bg2.style.display = 'none';
		ad_bg3.style.display = 'none';
		bg1.classList.remove("selected");
		bg2.classList.remove("selected");
		bg3.classList.remove("selected");
	};
	
hide_all();
bg2.classList.add("selected");
ad_bg2.style.display = 'flex';
	
bg1.addEventListener('click', function () {
	hide_all();
	bg1.classList.add("selected");
	ad_bg1.style.display = 'flex';
});

bg2.addEventListener('click', function () {
	hide_all();
	bg2.classList.add("selected");
	ad_bg2.style.display = 'flex';
});

bg3.addEventListener('click', function () {
	hide_all();
	bg3.classList.add("selected");
	ad_bg3.style.display = 'flex';
});