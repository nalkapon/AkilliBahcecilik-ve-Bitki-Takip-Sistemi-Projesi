-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: garden_management
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bahce`
--

DROP TABLE IF EXISTS `bahce`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bahce` (
  `bahce_id` int NOT NULL AUTO_INCREMENT,
  `bahce_adi` varchar(100) DEFAULT NULL,
  `konum` varchar(100) DEFAULT NULL,
  `alan_buyuklugu` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`bahce_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bahce`
--

LOCK TABLES `bahce` WRITE;
/*!40000 ALTER TABLE `bahce` DISABLE KEYS */;
INSERT INTO `bahce` VALUES (1,'Merkez Bahçe','Ankara',500.00),(2,'Sahil Bahçesi','İzmir',300.00),(3,'Dağ Bahçesi','Bursa',200.00),(12,'Köy Bahçesi','Ankara',200.00);
/*!40000 ALTER TABLE `bahce` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bahce_bitki`
--

DROP TABLE IF EXISTS `bahce_bitki`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bahce_bitki` (
  `bahce_id` int NOT NULL,
  `bitki_id` int NOT NULL,
  `ekim_tarihi` date DEFAULT NULL,
  `bakım_notları` text,
  PRIMARY KEY (`bahce_id`,`bitki_id`),
  KEY `bitki_id` (`bitki_id`),
  CONSTRAINT `bahce_bitki_ibfk_1` FOREIGN KEY (`bahce_id`) REFERENCES `bahce` (`bahce_id`),
  CONSTRAINT `bahce_bitki_ibfk_2` FOREIGN KEY (`bitki_id`) REFERENCES `bitki` (`bitki_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bahce_bitki`
--

LOCK TABLES `bahce_bitki` WRITE;
/*!40000 ALTER TABLE `bahce_bitki` DISABLE KEYS */;
INSERT INTO `bahce_bitki` VALUES (1,1,'2023-03-15','Düzenli budama gerekli.'),(1,2,'2023-04-20','Bol güneş almalı.'),(2,1,'2023-05-10','Soğuk hava koşullarına dayanıklı.'),(3,3,'2024-04-05','Nem seviyesine dikkat edilmeli.');
/*!40000 ALTER TABLE `bahce_bitki` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bahcivan`
--

DROP TABLE IF EXISTS `bahcivan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bahcivan` (
  `bahcivan_id` int NOT NULL AUTO_INCREMENT,
  `uzmanlik` varchar(100) DEFAULT NULL,
  `ad` varchar(50) DEFAULT NULL,
  `soyad` varchar(50) DEFAULT NULL,
  `dogum_tarihi` date DEFAULT NULL,
  `eposta` varchar(100) DEFAULT NULL,
  `telefon` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`bahcivan_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bahcivan`
--

LOCK TABLES `bahcivan` WRITE;
/*!40000 ALTER TABLE `bahcivan` DISABLE KEYS */;
INSERT INTO `bahcivan` VALUES (1,'Çiçek Bakımı','Ahmet','Yılmaz','1985-05-15','ahmet@example.com','555-1234'),(2,'Sebze Yetiştiriciliği','Ayşe','Kaya','1990-08-20','ayse@example.com','555-5678'),(3,'Ağaç Budama','Mehmet','Demir','1978-12-10','mehmet@example.com','555-9012');
/*!40000 ALTER TABLE `bahcivan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bahcivan_bahce`
--

DROP TABLE IF EXISTS `bahcivan_bahce`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bahcivan_bahce` (
  `bahcivan_id` int NOT NULL,
  `bahce_id` int NOT NULL,
  `gorev_turu` varchar(100) DEFAULT NULL,
  `baslangic_tarihi` date DEFAULT NULL,
  PRIMARY KEY (`bahcivan_id`,`bahce_id`),
  KEY `bahce_id` (`bahce_id`),
  CONSTRAINT `bahcivan_bahce_ibfk_1` FOREIGN KEY (`bahcivan_id`) REFERENCES `bahcivan` (`bahcivan_id`),
  CONSTRAINT `bahcivan_bahce_ibfk_2` FOREIGN KEY (`bahce_id`) REFERENCES `bahce` (`bahce_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bahcivan_bahce`
--

LOCK TABLES `bahcivan_bahce` WRITE;
/*!40000 ALTER TABLE `bahcivan_bahce` DISABLE KEYS */;
INSERT INTO `bahcivan_bahce` VALUES (1,1,'Bahçe Yönetimi','2020-01-01'),(1,2,'Bakım','2024-11-27'),(1,3,'Bahçe Yönetimi','2023-01-01'),(2,2,'Bitki Bakımı','2021-02-01'),(2,3,'a','2024-11-24'),(3,3,'Sera Yönetimi','2019-03-01');
/*!40000 ALTER TABLE `bahcivan_bahce` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bakim`
--

DROP TABLE IF EXISTS `bakim`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bakim` (
  `bakim_id` int NOT NULL AUTO_INCREMENT,
  `bitki_id` int DEFAULT NULL,
  `bahcivan_id` int DEFAULT NULL,
  `aciklama` text,
  `bakim_turu` varchar(100) DEFAULT NULL,
  `bakim_tarihi` date DEFAULT NULL,
  PRIMARY KEY (`bakim_id`),
  KEY `bahcivan_id` (`bahcivan_id`),
  KEY `idx_bitki_id_bakim` (`bitki_id`),
  CONSTRAINT `bakim_ibfk_1` FOREIGN KEY (`bitki_id`) REFERENCES `bitki` (`bitki_id`),
  CONSTRAINT `bakim_ibfk_2` FOREIGN KEY (`bahcivan_id`) REFERENCES `bahcivan` (`bahcivan_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bakim`
--

LOCK TABLES `bakim` WRITE;
/*!40000 ALTER TABLE `bakim` DISABLE KEYS */;
INSERT INTO `bakim` VALUES (1,1,1,'Budama yapıldı.','Budama','2023-06-15'),(2,2,2,'Toprak havalandırıldı.','Toprak Bakımı','2023-06-16'),(3,3,3,'Yaprak temizliği yapıldı.','Yaprak Bakımı','2023-06-17'),(6,1,2,'Budandı','Toprak Bakımı','2024-11-29');
/*!40000 ALTER TABLE `bakim` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bitki`
--

DROP TABLE IF EXISTS `bitki`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bitki` (
  `bitki_id` int NOT NULL AUTO_INCREMENT,
  `sulama_sikligi` varchar(255) NOT NULL,
  `ekim_tarihi` date DEFAULT NULL,
  `bitki_adi` varchar(100) DEFAULT NULL,
  `gunes_ihtiyaci` varchar(50) DEFAULT NULL,
  `tur_id` int DEFAULT NULL,
  `toprak_turu` varchar(100) DEFAULT NULL,
  `bakim_notlari` text,
  `bahce_id` int DEFAULT NULL,
  PRIMARY KEY (`bitki_id`),
  KEY `tur_id` (`tur_id`),
  KEY `idx_bahce_id_bitki` (`bahce_id`),
  CONSTRAINT `bitki_ibfk_1` FOREIGN KEY (`bahce_id`) REFERENCES `bahce` (`bahce_id`),
  CONSTRAINT `bitki_ibfk_2` FOREIGN KEY (`tur_id`) REFERENCES `tur_katalogu` (`tur_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bitki`
--

LOCK TABLES `bitki` WRITE;
/*!40000 ALTER TABLE `bitki` DISABLE KEYS */;
INSERT INTO `bitki` VALUES (1,'','2020-03-15','Kırmızı Gül','Yüksek',1,'Kumlu','Düzenli budama gerekli.',1),(2,'','2021-04-20','Sarı Lale','Orta',2,'Killi','Bol güneş almalı.',2),(3,'','2019-05-25','Beyaz Papatya','Düşük',3,'Tınlı','Toprak nemli tutulmalı.',3),(4,'Günlük','2024-11-26','Gül','Yüksek',1,'Kumlu','Düzenli budama yapınız.',1),(6,'çok','2024-11-24','1','çok',1,'çok','a',1);
/*!40000 ALTER TABLE `bitki` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gubre`
--

DROP TABLE IF EXISTS `gubre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gubre` (
  `gubre_id` int NOT NULL AUTO_INCREMENT,
  `gubre_adi` varchar(100) NOT NULL,
  `gubre_aciklamasi` text NOT NULL,
  PRIMARY KEY (`gubre_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gubre`
--

LOCK TABLES `gubre` WRITE;
/*!40000 ALTER TABLE `gubre` DISABLE KEYS */;
INSERT INTO `gubre` VALUES (1,'Azotlu Gübre','Azot içeren gübre, bitkilerin büyümesini destekler.'),(2,'Fosforlu Gübre','Fosfor içeren gübre, kök gelişimini teşvik eder.'),(3,'Potasyumlu Gübre','Potasyum içeren gübre, genel bitki sağlığını artırır.'),(4,'Yeni Organik Gübre','Daha yüksek verim sağlayan organik gübre.'),(5,'Yeni Organik Gübre','Daha yüksek verim sağlayan organik gübre.'),(6,'Yeni Organik Gübre','Daha yüksek verim sağlayan organik gübre.'),(11,'Azotlu Gübre','Azot içeren gübre, bitkilerin büyümesini destekler.'),(12,'Normal Gübre',' Azot içeren gübre, bitkilerin büyümesini destekler.'),(13,'Azotlu Gübre','Azot içeren gübre, bitkilerin büyümesini destekler.');
/*!40000 ALTER TABLE `gubre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gubreleme`
--

DROP TABLE IF EXISTS `gubreleme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gubreleme` (
  `gubreleme_id` int NOT NULL AUTO_INCREMENT,
  `gubreleme_tarihi` date DEFAULT NULL,
  `gubre_id` int DEFAULT NULL,
  `miktar` decimal(5,2) DEFAULT '0.00',
  `bitki_id` int DEFAULT NULL,
  PRIMARY KEY (`gubreleme_id`),
  KEY `gubre_id` (`gubre_id`),
  KEY `idx_bitki_id_gubreleme` (`bitki_id`),
  CONSTRAINT `gubreleme_ibfk_1` FOREIGN KEY (`gubre_id`) REFERENCES `gubre` (`gubre_id`),
  CONSTRAINT `gubreleme_ibfk_2` FOREIGN KEY (`bitki_id`) REFERENCES `bitki` (`bitki_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gubreleme`
--

LOCK TABLES `gubreleme` WRITE;
/*!40000 ALTER TABLE `gubreleme` DISABLE KEYS */;
INSERT INTO `gubreleme` VALUES (1,'2023-06-05',1,0.50,1),(2,'2023-06-06',2,0.30,2),(3,'2023-06-07',3,0.40,3);
/*!40000 ALTER TABLE `gubreleme` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hastalik_katalogu`
--

DROP TABLE IF EXISTS `hastalik_katalogu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hastalik_katalogu` (
  `hastalik_id` int NOT NULL AUTO_INCREMENT,
  `hastalik_adi` varchar(100) DEFAULT NULL,
  `tedavi_yontemi` text,
  PRIMARY KEY (`hastalik_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hastalik_katalogu`
--

LOCK TABLES `hastalik_katalogu` WRITE;
/*!40000 ALTER TABLE `hastalik_katalogu` DISABLE KEYS */;
INSERT INTO `hastalik_katalogu` VALUES (1,'Külleme','Mantar ilacı kullanımı'),(2,'Yaprak Lekesi','Etkilenen yaprakların uzaklaştırılması'),(3,'Kök Çürüklüğü','Toprak drenajının iyileştirilmesi');
/*!40000 ALTER TABLE `hastalik_katalogu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hastalik_takibi`
--

DROP TABLE IF EXISTS `hastalik_takibi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hastalik_takibi` (
  `hastalik_takibi_id` int NOT NULL AUTO_INCREMENT,
  `bitki_id` int DEFAULT NULL,
  `hastalik_id` int DEFAULT NULL,
  `hastalik_tarihi` date DEFAULT NULL,
  `tedavi_yontemi` text,
  `notlar` text,
  PRIMARY KEY (`hastalik_takibi_id`),
  KEY `hastalik_id` (`hastalik_id`),
  KEY `idx_bitki_id_hastalik_takibi` (`bitki_id`),
  CONSTRAINT `hastalik_takibi_ibfk_1` FOREIGN KEY (`bitki_id`) REFERENCES `bitki` (`bitki_id`),
  CONSTRAINT `hastalik_takibi_ibfk_2` FOREIGN KEY (`hastalik_id`) REFERENCES `hastalik_katalogu` (`hastalik_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hastalik_takibi`
--

LOCK TABLES `hastalik_takibi` WRITE;
/*!40000 ALTER TABLE `hastalik_takibi` DISABLE KEYS */;
INSERT INTO `hastalik_takibi` VALUES (1,1,1,'2023-06-10','Mantar ilacı uygulandı.','Gözlem altında tutuluyor.'),(2,2,2,'2023-06-11','Etkilenen yapraklar uzaklaştırıldı.','Tekrar kontrol edilecek.'),(3,3,3,'2023-06-12','Toprak drenajı iyileştirildi.','Nem seviyesine dikkat edilecek.'),(4,1,2,'2024-12-01',NULL,'Toprak nemli tutulmalı'),(7,1,1,'2024-11-30',NULL,'Gözlem altında tutuluyor.'),(12,1,2,'2024-11-26',NULL,'Gözlem altında tutuluyor.');
/*!40000 ALTER TABLE `hastalik_takibi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iklim_takibi`
--

DROP TABLE IF EXISTS `iklim_takibi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `iklim_takibi` (
  `iklim_id` int NOT NULL AUTO_INCREMENT,
  `bahce_id` int DEFAULT NULL,
  `kayit_tarihi` date DEFAULT NULL,
  `sicaklik` decimal(5,2) DEFAULT NULL,
  `nem` decimal(5,2) DEFAULT NULL,
  `ruzgar` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`iklim_id`),
  KEY `idx_bahce_id_iklim` (`bahce_id`),
  CONSTRAINT `iklim_takibi_ibfk_1` FOREIGN KEY (`bahce_id`) REFERENCES `bahce` (`bahce_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iklim_takibi`
--

LOCK TABLES `iklim_takibi` WRITE;
/*!40000 ALTER TABLE `iklim_takibi` DISABLE KEYS */;
INSERT INTO `iklim_takibi` VALUES (1,1,'2023-06-20',25.50,60.00,5.00),(2,2,'2023-06-21',28.00,55.00,3.50),(3,3,'2023-06-22',22.50,65.00,4.00);
/*!40000 ALTER TABLE `iklim_takibi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sulama_plani`
--

DROP TABLE IF EXISTS `sulama_plani`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sulama_plani` (
  `sulama_id` int NOT NULL AUTO_INCREMENT,
  `bitki_id` int DEFAULT NULL,
  `sulama_tarihi` date DEFAULT NULL,
  `su_miktari` decimal(5,2) DEFAULT NULL,
  `su_kalitesi` varchar(100) DEFAULT NULL,
  `notlar` text,
  PRIMARY KEY (`sulama_id`),
  KEY `idx_bitki_id` (`bitki_id`),
  CONSTRAINT `sulama_plani_ibfk_1` FOREIGN KEY (`bitki_id`) REFERENCES `bitki` (`bitki_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sulama_plani`
--

LOCK TABLES `sulama_plani` WRITE;
/*!40000 ALTER TABLE `sulama_plani` DISABLE KEYS */;
INSERT INTO `sulama_plani` VALUES (1,1,'2023-06-01',2.50,'Temiz','Sabah erken saatte sulandı.'),(2,2,'2023-06-02',1.50,'Orta','Akşam üstü sulandı.'),(3,3,'2023-06-03',3.00,'Temiz','Öğlen sulandı.'),(12,1,'2024-11-02',1.00,'temiz','Gece Sulandı');
/*!40000 ALTER TABLE `sulama_plani` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tur_katalogu`
--

DROP TABLE IF EXISTS `tur_katalogu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tur_katalogu` (
  `tur_id` int NOT NULL AUTO_INCREMENT,
  `tur_adi` varchar(100) DEFAULT NULL,
  `sulama_sikligi` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`tur_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tur_katalogu`
--

LOCK TABLES `tur_katalogu` WRITE;
/*!40000 ALTER TABLE `tur_katalogu` DISABLE KEYS */;
INSERT INTO `tur_katalogu` VALUES (1,'Gül','Haftada bir kez'),(2,'Lale','Haftada iki kez'),(3,'Papatya','Haftada dört kez'),(4,'Gül','Haftada bir kez');
/*!40000 ALTER TABLE `tur_katalogu` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-26 18:18:54
