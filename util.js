/**
* 替换掉html字符
*/
let htmlSpecialChar = function (text) {
	text = text.replace(/\&/, "&amp;");
	text = text.replace(/\"/, "&quot;");	
	text = text.replace(/\'/, "&#039;");	
	text = text.replace(/</, "&lt;");	
	text = text.replace(/>/, "&gt;");	
	return text;
}

module.exports = { htmlSpecialChar };