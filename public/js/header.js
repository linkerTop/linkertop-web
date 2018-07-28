var service = document.getElementById('service'),
	tech = document.getElementById('tech'),
	service_items = document.getElementById('service-items'),
	tech_items = document.getElementById('tech-items');

service.addEventListener('click', function (e) {
	service_items.style.display = 'block';
});

service_items.addEventListener('click', function (e) {
	service_items.style.display = 'none';
	e.preventDefault();
});

tech.addEventListener('click', function (e) {
	tech_items.style.display = 'block';
});

tech_items.addEventListener('click', function (e) {
	tech_items.style.display = 'none';
	e.preventDefault();
});