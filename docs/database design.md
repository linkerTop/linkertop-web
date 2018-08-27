# 数据库设计

数据库名称 linkertop_web，表编码使用utf8mb4（支持emoji）    

### 表设计

> 最开始并不打算设计用户表的，因为感觉只有一个后台用户，但后来想想还是设计一个表    

* 用户表 (User)     
	* id (primary key int)
	* username (varchar)
	* password (varchar)
* 文章表 (Post)
	* id (primary key int)
	* type (varchar(64))
	* title (varchar(64))
	* intro (varchar(256)
	* intro_img (varchar(256))
	* content (text)
	* create_time (datetime)
	* update_time (datetime)
	* author (int) 同User.id
	* view (int default 0)
	
### 使用技术

使用node的mysql模块    