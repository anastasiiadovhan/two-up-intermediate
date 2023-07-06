-- MySQL dump 10.13  Distrib 8.0.33, for Linux (aarch64)
--
-- Host: localhost    Database: twoupgame
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `game_sessions`
--

DROP TABLE IF EXISTS `game_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_sessions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `score` int NOT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `game_sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_sessions`
--

LOCK TABLES `game_sessions` WRITE;
/*!40000 ALTER TABLE `game_sessions` DISABLE KEYS */;
INSERT INTO `game_sessions` VALUES (1,9,2,'2023-06-26 04:31:14'),(2,9,0,'2023-06-26 05:13:27'),(3,9,4,'2023-06-26 05:27:58'),(4,9,0,'2023-06-26 05:32:40'),(5,9,0,'2023-06-26 06:34:50'),(6,11,1,'2023-06-26 06:36:03'),(7,13,0,'2023-06-26 06:36:12'),(8,13,2,'2023-06-26 07:00:30'),(9,9,0,'2023-06-26 07:00:44'),(10,9,0,'2023-06-26 07:12:47'),(11,14,8,'2023-06-26 07:14:53'),(12,14,1,'2023-06-26 07:15:30'),(13,12,4,'2023-06-26 07:15:56'),(14,14,0,'2023-06-26 07:16:00'),(15,12,5,'2023-06-26 07:17:11'),(16,14,1,'2023-06-27 02:20:43'),(17,14,0,'2023-06-27 03:33:30'),(18,15,9,'2023-06-27 03:34:56'),(19,14,0,'2023-06-27 03:38:28'),(20,16,4,'2023-06-27 03:39:05'),(21,14,0,'2023-06-27 03:51:20'),(22,14,2,'2023-06-27 05:12:30'),(23,17,1,'2023-06-27 06:13:38'),(24,14,0,'2023-06-27 06:16:50'),(25,18,2,'2023-06-27 06:39:41'),(26,14,0,'2023-06-27 06:40:00'),(27,19,2,'2023-06-27 06:40:39'),(28,14,1,'2023-06-27 07:36:25'),(29,20,5,'2023-06-27 07:37:52'),(30,14,0,'2023-06-27 07:38:27'),(31,14,0,'2023-06-27 07:39:26'),(32,14,0,'2023-06-28 01:41:44'),(33,14,0,'2023-06-28 01:41:54'),(34,14,1,'2023-06-28 04:22:01'),(35,14,0,'2023-06-29 04:18:30'),(36,14,3,'2023-06-29 04:20:12');
/*!40000 ALTER TABLE `game_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(64) DEFAULT NULL,
  `preferred_color` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'testuser','testpassword','#ffffff'),(2,'testMe','$2b$10$Kxehg2fKH44Ww0v6UwlmO.WDgSzyayw8w.xMOHK0LdWdNRMMD1uYC','#FFD075'),(3,'test1','$2b$10$1Sh2lyrA8R/YOsWZL34SIugK1.SI7/ZJOTJZ74D5.2bI6qlW5JDEy','#FFD075'),(7,'123','$2b$10$YfqjnxPp3JPipsbksFARvuHx86CJQ.2SQ1QD24A/kmREdqaVPD5uO','#FFD075'),(8,'testuser1','$2b$10$mqzwx4xr9zNRWb.iDOjTpeho3Ktcafhxq6yYMzhzxSG6N2c1jiAKy','#FFD075'),(9,'anastasiia','$2b$10$swdicuBePHvKTLIt./JL9Omv3vnhIxVDYuiqK1KnNf59MnmrtfMm2','#FF758E'),(11,'testuser2','$2b$10$QUAsScXw5Rmh0ml8HClWa.JF3gs7CXiYeK9tCMmuoyFVJV7yn/Yai',NULL),(12,'testuser3','$2b$10$CIJaOrL6zcFq/AQJvBGhkOj3ROrz1xPTbSvcYfSnfNcngYCfvfBuK',NULL),(13,'testuser4','$2b$10$db17CHWDPGSw.BDP8npL7.uiGsD3hnPUj/Pj9w6YryXjxdbd69EFu','#FF9675'),(14,'testuser6','$2b$10$wKJKig1OGugVDCcbwjMMbumKV2UgzLSLFxmTKT1MPzxA8GuvnKwI6','#8875FF'),(15,'testuser7','$2b$10$OlcNSzdlOxTVZzZZrD/Qzu1tjTszuOVPEGvUMl9wtqE2/uYlj4wzC','#FF9675'),(16,'testuser8','$2b$10$CopdhkkkFAvA0qVfwo.11Oy6/7WoSK1xwyJqqEvM5VXR8Hxak5gMK',NULL),(17,'michael','$2b$10$orwyvP19e/gOWasx0lgn6e/aEtK.U/LvMeRvElHbWdoByf2smVnUm','#ffd075'),(18,'daniel','$2b$10$DnyeNcORf8wcka9ZkUWcAOIoGT.OElZaFDGnOP/r8BLCMKPg9ShZC',NULL),(19,'frank','$2b$10$ET0KNBKOhiFrK7YhOqyMheL0H3KFQ9y75C/xcNXdVGYqfsKOc0ghm',NULL),(20,'john','$2b$10$w3If6k865zfDveCBH5YdSubEaoVvanH.3siNcbPmBL77MgDnlxmW2','#FF758E');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-04  2:28:55
