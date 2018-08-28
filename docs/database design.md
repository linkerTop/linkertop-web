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
	
### SQL
```sql
CREATE DATABASE IF NOT EXISTS `linkertop_web` DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `linkertop_web`;

CREATE TABLE IF NOT EXISTS `user` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(128) NOT NULL,
	`password` VARCHAR(128) NOT NULL,
	`last_login_time` DATETIME,
	PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `post` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`type` VARCHAR(64) NOT NULL,
	`title` VARCHAR(64) NOT NULL,
	`intro` VARCHAR(64) NOT NULL,
	`intro_img` VARCHAR(256) DEFAULT 'default.jpg',
	`content` TEXT,
	`create_time` DATETIME,
	`update_time` DATETIME,
	`author` INT NOT NULL,
	`view` INT DEFAULT 0,
	PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4;
```
	
### 使用技术

使用node的mysql模块    

