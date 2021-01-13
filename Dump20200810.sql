CREATE DATABASE  IF NOT EXISTS `nodesql` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `nodesql`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: nodesql
-- ------------------------------------------------------
-- Server version	5.1.73-community

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `annual_leave`
--

DROP TABLE IF EXISTS `annual_leave`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `annual_leave` (
  `pf` int(11) NOT NULL,
  `balance` int(3) DEFAULT NULL,
  `dateapplied` date DEFAULT NULL,
  `daysapplied` int(3) DEFAULT NULL,
  `address` varchar(20) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `leavestarts` date NOT NULL,
  `endsOn` date NOT NULL,
  PRIMARY KEY (`pf`),
  CONSTRAINT `annual_leave_ibfk_1` FOREIGN KEY (`pf`) REFERENCES `staff_leave` (`pf`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `annual_leave`
--

LOCK TABLES `annual_leave` WRITE;
/*!40000 ALTER TABLE `annual_leave` DISABLE KEYS */;
INSERT INTO `annual_leave` VALUES (2000,25,'2020-08-03',5,'755',0,'2020-08-06','2020-08-10');
/*!40000 ALTER TABLE `annual_leave` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loggers`
--

DROP TABLE IF EXISTS `loggers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loggers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loggers`
--

LOCK TABLES `loggers` WRITE;
/*!40000 ALTER TABLE `loggers` DISABLE KEYS */;
INSERT INTO `loggers` VALUES (1,'Makonde','makonde@gmail.com','$2a$10$3/vLevNq58BVfpzct2VySuo3IUpCQFNZFkArGesphHwPhTtkw8Jn.','2020-08-04 11:29:34'),(2,'brute sane','brute@sane.com','$2a$10$ZZaKpfu2oA/qiSOOfb7WWOg.S.MoZCziVgK2BJn1goe8SkRkReerG','2020-08-05 14:48:33'),(3,'mukamo','mukamo@yahoo.com','$2a$10$FSnS9uz877o/ByUuUDObfuoFIjgB6lkwRBW/y7gpD22OavxpR0c/u','2020-08-06 11:38:31');
/*!40000 ALTER TABLE `loggers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maternity_leave`
--

DROP TABLE IF EXISTS `maternity_leave`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maternity_leave` (
  `pf` int(11) NOT NULL,
  `daysApplied` int(3) NOT NULL,
  `dateapplied` date NOT NULL,
  `status` varchar(20) NOT NULL,
  `address` varchar(20) NOT NULL,
  `balance` int(3) DEFAULT NULL,
  `leavestarts` date NOT NULL,
  `endsOn` date NOT NULL,
  PRIMARY KEY (`pf`),
  CONSTRAINT `maternity_leave_ibfk_1` FOREIGN KEY (`pf`) REFERENCES `staff_leave` (`pf`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maternity_leave`
--

LOCK TABLES `maternity_leave` WRITE;
/*!40000 ALTER TABLE `maternity_leave` DISABLE KEYS */;
/*!40000 ALTER TABLE `maternity_leave` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paternity_leave`
--

DROP TABLE IF EXISTS `paternity_leave`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paternity_leave` (
  `pf` int(11) NOT NULL,
  `daysApplied` int(3) NOT NULL,
  `dateapplied` date NOT NULL,
  `address` varchar(20) NOT NULL,
  `balance` int(3) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `leavestarts` date NOT NULL,
  `endsOn` date NOT NULL,
  PRIMARY KEY (`pf`),
  CONSTRAINT `paternity_leave_ibfk_1` FOREIGN KEY (`pf`) REFERENCES `staff_leave` (`pf`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paternity_leave`
--

LOCK TABLES `paternity_leave` WRITE;
/*!40000 ALTER TABLE `paternity_leave` DISABLE KEYS */;
/*!40000 ALTER TABLE `paternity_leave` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sick_leave`
--

DROP TABLE IF EXISTS `sick_leave`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sick_leave` (
  `pf` int(11) NOT NULL,
  `daysApplied` int(3) NOT NULL,
  `dateapplied` date NOT NULL,
  `status` varchar(20) NOT NULL,
  `address` varchar(20) NOT NULL,
  `balance` int(3) DEFAULT NULL,
  `leavestarts` date NOT NULL,
  `endsOn` date NOT NULL,
  PRIMARY KEY (`pf`),
  CONSTRAINT `sick_leave_ibfk_1` FOREIGN KEY (`pf`) REFERENCES `staff_leave` (`pf`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sick_leave`
--

LOCK TABLES `sick_leave` WRITE;
/*!40000 ALTER TABLE `sick_leave` DISABLE KEYS */;
/*!40000 ALTER TABLE `sick_leave` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff` (
  `sid` int(11) NOT NULL AUTO_INCREMENT,
  `pf` int(11) NOT NULL,
  `sname` varchar(50) NOT NULL,
  `desig` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `station` varchar(50) NOT NULL,
  `balance` int(3) DEFAULT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,2000,'HENRY SCOTT','ICTO','henryscott@scot.com','SPAIN',45),(2,3000,'DAVID MOB','HRM','davidmob@mob.com','BEIRUT',45),(3,3004,'LINDA COCK','TECH EDITOR','linda@cock.com','ALGERIA',37);
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff_leave`
--

DROP TABLE IF EXISTS `staff_leave`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff_leave` (
  `pf` int(11) NOT NULL,
  `sname` varchar(255) NOT NULL,
  `desig` varchar(255) NOT NULL,
  `datemodified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `email` varchar(50) NOT NULL,
  `station` varchar(50) NOT NULL,
  `modifiedby` varchar(50) NOT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`pf`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff_leave`
--

LOCK TABLES `staff_leave` WRITE;
/*!40000 ALTER TABLE `staff_leave` DISABLE KEYS */;
INSERT INTO `staff_leave` VALUES (2000,'HENRY SCOTT','ICTO','2020-08-08 08:36:34','henryscott@scot.com','SPAIN','makonde@gmail.com','male',1),(2222,'MAKOBOKI','DGG','2020-08-08 08:34:23','makombo@gmail.com','BEIRUT','makonde@gmail.com','male',0),(3000,'GAKUNGU','GODER','2020-08-08 08:34:39','kairascode@gmail.com','ALGERIA','makonde@gmail.com','male',0),(3004,'LINDA COCK','TECH EDITOR','2020-08-08 08:33:19','linda@cock.com','MADRID','mukamo@yahoo.com','female',0);
/*!40000 ALTER TABLE `staff_leave` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `terminal_leave`
--

DROP TABLE IF EXISTS `terminal_leave`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `terminal_leave` (
  `pf` int(11) NOT NULL,
  `daysApplied` int(3) NOT NULL,
  `dateapplied` date NOT NULL,
  `status` varchar(20) NOT NULL,
  `address` varchar(20) NOT NULL,
  `balance` int(3) DEFAULT NULL,
  `leavstarts` date NOT NULL,
  `endsOn` date NOT NULL,
  PRIMARY KEY (`pf`),
  CONSTRAINT `terminal_leave_ibfk_1` FOREIGN KEY (`pf`) REFERENCES `staff_leave` (`pf`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `terminal_leave`
--

LOCK TABLES `terminal_leave` WRITE;
/*!40000 ALTER TABLE `terminal_leave` DISABLE KEYS */;
/*!40000 ALTER TABLE `terminal_leave` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'nodesql'
--
/*!50106 SET @save_time_zone= @@TIME_ZONE */ ;
/*!50106 DROP EVENT IF EXISTS `e_status` */;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = latin1 */ ;;
/*!50003 SET character_set_results = latin1 */ ;;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE EVENT `e_status` ON SCHEDULE AT '2020-08-10 14:49:09' ON COMPLETION PRESERVE DISABLE DO update annual_leave set status=0
where endsOn=curdate() */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
DELIMITER ;
/*!50106 SET TIME_ZONE= @save_time_zone */ ;

--
-- Dumping routines for database 'nodesql'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-10 15:20:36
