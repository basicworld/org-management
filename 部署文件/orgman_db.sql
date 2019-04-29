insert into config (`key`, `sub_key`, `value`, `note`) values('page_size','','20','分页时每页显示数量');

select * from config;

select * from orgman_db.config where `key`="page_size";

 create table config like test.config;

insert into config (`key`, `sub_key`, `value`, `note`) values('gameMode','1','网页','网页接入');
insert into config (`key`, `sub_key`, `value`, `note`) values('gameModeconfig','2','接口','接口接入');

CREATE TABLE `organization` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键自增',
  `org_name` varchar(100) DEFAULT NULL COMMENT '机构简称',
  `org_fullname` varchar(100) DEFAULT NULL COMMENT '机构全称',
  `orgcode9` char(9) DEFAULT NULL COMMENT '组织机构代码',
  `orgcode18` char(18) DEFAULT NULL COMMENT '统一社会信用代码',
  `game_mode` int(3) DEFAULT NULL COMMENT '接入方式 1-网页 2-接口 3-业务发生机构 仅登记',
  `game_stage` int(3) DEFAULT NULL COMMENT '接入阶段 1-培训 2-联调 3-生产',
  `test_ip` varchar(100) DEFAULT NULL COMMENT '测试ip',
  `test_key` varchar(100) DEFAULT NULL COMMENT '测试key',
  `pro_ip` varchar(100) DEFAULT NULL COMMENT '生产ip',
  `pro_key` varchar(100) DEFAULT NULL COMMENT '生产key',
  `address` varchar(255) DEFAULT NULL COMMENT '快递地址',
  `reg_date` date DEFAULT NULL COMMENT '登记日期',
  `is_delete` tinyint default 0 comment '删除标记 0-未删除  1-删除',
  `note` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_orgcode18` (`orgcode18`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
