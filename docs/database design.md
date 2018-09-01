# 数据库设计

数据库名称 linkertop_web，表编码使用utf8mb4（支持emoji）    

### 表设计

> 最开始并不打算设计用户表的，因为感觉只有一个后台用户，但后来想想还是设计一个表    

* 用户表 (User)     
	* id (primary key int)
	* username (varchar)
	* password (varchar)
	* nickname (varchar)
	* last_login_time (datetime)
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
	`nickname` VARCHAR(128) NOT NULL,
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

INSERT INTO `user` (username, password, nickname) VALUES ('linkertop', 'linkertop', 'Linktop小编');

INSERT INTO `post` 
	(type, title, intro, intro_img, content, create_time, update_time, author) VALUES
	('activity', 'Linker月度读书会', '国内外区块链的发展趋势研究', 'tech_activity1.jpg', 'Matryx是一个基于区块链技术、人工智能算法和VR实现技术的科研协作平台，其利用区块链去中心化分布式、不可篡改、智能合约、开放性和共享性等特点，设计出一套“智能合约”系统，使分布于世界各地的科研机构和人员可以通过该平台共同解决某一科研项目，并获得相应的代币报酬。该合作模式具有省时、节约、高效、公平等特点。\r\nMatryx平台由一个智能合同系统和传统系统支持框架组成。智能合同系统提供公开项目的公共分类账及其相关支付(“赏金”) 和提出的解决方案 (“意见书”)。该系统的赏金和意见书是Matryx平台的核心。\r\nMatryx将为合作者创造一个共同的领域，共同分享投稿，并留下一个数字指纹以证明他们曾经参与。个人或组织将能够定义他们数字作品的奖励机制，创建他们自己的许可条款，并通过公共分类账证明作品真实性和所有权。奖励将由贡献大小分配，这将激励广泛的合作创造和研究，而不鼓励封闭式样组织或小团队。\r\n在科研工具方面，Matryx提供了VR三维可视环境下的科研环境，使科研人员能够在纳米级精准度下进行操作、协作和模拟。其母公司Nanome已研发出两款专利虚拟现实软件帮助呈现，包括人类历史上第一款3D数学绘图应用软件Calcflow，还有一款通过虚拟现实去实现构造细胞的软件Nano-one。\r\n应用场景：\r\n任何需要团队协作解决问题的场景，原则上都可以通过该平台建立合作关系。', NOW(), NOW(), 1);
```
	
### 使用技术

使用node的mysql模块    

