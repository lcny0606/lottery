/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50709
Source Host           : localhost:3306
Source Database       : lottery

Target Server Type    : MYSQL
Target Server Version : 50709
File Encoding         : 65001

*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `lucky_member`
-- ----------------------------
DROP TABLE IF EXISTS `lucky_member`;
CREATE TABLE `lucky_member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8 DEFAULT NULL COMMENT '姓名',
  `pic` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '照片',
  `prize` varchar(10) DEFAULT '0' COMMENT '奖项',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;


