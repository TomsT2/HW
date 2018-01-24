-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versione server:              5.7.20-log - MySQL Community Server (GPL)
-- S.O. server:                  Win64
-- HeidiSQL Versione:            9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dump della struttura del database holidayworld
CREATE DATABASE IF NOT EXISTS `holidayworld` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `holidayworld`;

-- Dump della struttura di tabella holidayworld.django_migrations
CREATE TABLE IF NOT EXISTS `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dump dei dati della tabella holidayworld.django_migrations: ~0 rows (circa)
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;

-- Dump della struttura di tabella holidayworld.servizi_hw_kit_fatture
CREATE TABLE IF NOT EXISTS `servizi_hw_kit_fatture` (
  `ID_FATTURA` int(11) NOT NULL AUTO_INCREMENT,
  `DATA_FATTURA` date DEFAULT NULL,
  `DATA_SCADENZA` date DEFAULT NULL,
  `ID_LAVANDERIA` int(11) DEFAULT NULL COMMENT 'Lavanderia di provenienza',
  `ID_UTENTE` int(11) DEFAULT NULL,
  `VAL_IMPONIBILE` decimal(10,2) DEFAULT NULL,
  `VAL_IVA` decimal(10,2) DEFAULT NULL,
  `VAL_TOT` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`ID_FATTURA`),
  KEY `FK__hw_t_utenti` (`ID_UTENTE`),
  KEY `FK_hw_kit_fatture_hw_t_lavanderie` (`ID_LAVANDERIA`),
  CONSTRAINT `FK__hw_t_utenti` FOREIGN KEY (`ID_UTENTE`) REFERENCES `servizi_hw_t_utenti` (`ID_UTENTE`),
  CONSTRAINT `FK_hw_kit_fatture_hw_t_lavanderie` FOREIGN KEY (`ID_LAVANDERIA`) REFERENCES `servizi_hw_t_lavanderie` (`ID_LAVANDERIA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dump dei dati della tabella holidayworld.servizi_hw_kit_fatture: ~0 rows (circa)
/*!40000 ALTER TABLE `servizi_hw_kit_fatture` DISABLE KEYS */;
/*!40000 ALTER TABLE `servizi_hw_kit_fatture` ENABLE KEYS */;

-- Dump della struttura di tabella holidayworld.servizi_hw_kit_fatture_linee
CREATE TABLE IF NOT EXISTS `servizi_hw_kit_fatture_linee` (
  `ID_FATTURA_LINEA` int(11) NOT NULL AUTO_INCREMENT,
  `ID_FATTURA` int(11) DEFAULT NULL,
  `DES_LINEA` varchar(250) DEFAULT NULL,
  `VAL_QTA` decimal(10,2) DEFAULT NULL,
  `VAL_UNITARIO` decimal(10,2) DEFAULT NULL,
  `VAL_IMPO` decimal(10,2) DEFAULT NULL,
  `COD_IVA` varchar(10) DEFAULT NULL,
  `VAL_IVA` decimal(10,2) DEFAULT NULL,
  `VAL_TOT` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`ID_FATTURA_LINEA`),
  KEY `FK__hw_kit_fatture` (`ID_FATTURA`),
  KEY `FK_hw_kit_fatture_linee_hw_t_ive` (`COD_IVA`),
  CONSTRAINT `FK__hw_kit_fatture` FOREIGN KEY (`ID_FATTURA`) REFERENCES `servizi_hw_kit_fatture` (`ID_FATTURA`) ON DELETE CASCADE,
  CONSTRAINT `FK_hw_kit_fatture_linee_hw_t_ive` FOREIGN KEY (`COD_IVA`) REFERENCES `servizi_hw_t_ive` (`COD_IVA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dump dei dati della tabella holidayworld.servizi_hw_kit_fatture_linee: ~0 rows (circa)
/*!40000 ALTER TABLE `servizi_hw_kit_fatture_linee` DISABLE KEYS */;
/*!40000 ALTER TABLE `servizi_hw_kit_fatture_linee` ENABLE KEYS */;

-- Dump della struttura di tabella holidayworld.servizi_hw_kit_magazzino
CREATE TABLE IF NOT EXISTS `servizi_hw_kit_magazzino` (
  `ID_KIT_MAGAZZINO` int(11) NOT NULL AUTO_INCREMENT,
  `ID_CORNER` int(11) DEFAULT NULL,
  `COD_TIPO_KIT` varchar(10) DEFAULT NULL,
  `QTA_DISPONIBILE` int(11) DEFAULT NULL,
  `SOGLIA_MINIMA` int(11) DEFAULT NULL,
  `DATA_ULTIMO_AGG` date DEFAULT NULL,
  PRIMARY KEY (`ID_KIT_MAGAZZINO`),
  KEY `FK_hw_kit_magazzino_hw_t_corners` (`ID_CORNER`),
  KEY `FK_hw_kit_magazzino_hw_t_tipo_kit` (`COD_TIPO_KIT`),
  CONSTRAINT `FK_hw_kit_magazzino_hw_t_corners` FOREIGN KEY (`ID_CORNER`) REFERENCES `servizi_hw_t_corners` (`ID_CORNER`),
  CONSTRAINT `FK_hw_kit_magazzino_hw_t_tipo_kit` FOREIGN KEY (`COD_TIPO_KIT`) REFERENCES `servizi_hw_t_tipo_kit` (`COD_TIPO_KIT`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dump dei dati della tabella holidayworld.servizi_hw_kit_magazzino: ~0 rows (circa)
/*!40000 ALTER TABLE `servizi_hw_kit_magazzino` DISABLE KEYS */;
/*!40000 ALTER TABLE `servizi_hw_kit_magazzino` ENABLE KEYS */;

-- Dump della struttura di tabella holidayworld.servizi_hw_kit_ordini
CREATE TABLE IF NOT EXISTS `servizi_hw_kit_ordini` (
  `ID_KIT_ORDINE` int(11) NOT NULL AUTO_INCREMENT,
  `ID_CORNER` int(11) DEFAULT '0',
  `ID_LAVANDERIA` int(11) DEFAULT '0',
  `COD_TIPO_KIT` varchar(10) DEFAULT NULL,
  `QTA_KIT` int(11) DEFAULT '0',
  `DATA_ORDINE` date DEFAULT NULL,
  `QTA_CONSEGNATA` int(11) DEFAULT '0',
  `DATA_CONSEGNA` date DEFAULT NULL,
  `VAL_ORDINE` decimal(10,2) DEFAULT '0.00',
  `VAL_ORDINE_EFF` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`ID_KIT_ORDINE`),
  KEY `FK__hw_t_corners` (`ID_CORNER`),
  KEY `FK__hw_t_lavanderie` (`ID_LAVANDERIA`),
  KEY `FK__hw_t_tipo_kit` (`COD_TIPO_KIT`),
  CONSTRAINT `FK__hw_t_corners` FOREIGN KEY (`ID_CORNER`) REFERENCES `servizi_hw_t_corners` (`ID_CORNER`),
  CONSTRAINT `FK__hw_t_lavanderie` FOREIGN KEY (`ID_LAVANDERIA`) REFERENCES `servizi_hw_t_lavanderie` (`ID_LAVANDERIA`),
  CONSTRAINT `FK__hw_t_tipo_kit` FOREIGN KEY (`COD_TIPO_KIT`) REFERENCES `servizi_hw_t_tipo_kit` (`COD_TIPO_KIT`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Ordini alla lavaderia';

-- Dump dei dati della tabella holidayworld.servizi_hw_kit_ordini: ~0 rows (circa)
/*!40000 ALTER TABLE `servizi_hw_kit_ordini` DISABLE KEYS */;
/*!40000 ALTER TABLE `servizi_hw_kit_ordini` ENABLE KEYS */;

-- Dump della struttura di tabella holidayworld.servizi_hw_kit_prenotazioni
CREATE TABLE IF NOT EXISTS `servizi_hw_kit_prenotazioni` (
  `ID_KIT_PRENOTATO` int(11) NOT NULL AUTO_INCREMENT,
  `ID_UTENTE` int(11) DEFAULT NULL,
  `ID_CORNER` int(11) DEFAULT NULL,
  `DATA_PRENOTAZIONE` date DEFAULT NULL,
  `COD_TIPO_KIT` varchar(10) DEFAULT NULL,
  `QTA_KIT_RICHIESTA` int(11) DEFAULT '0',
  `QTA_KIT_CONSEGNATA` int(11) DEFAULT '0',
  `DATA_RITIRO` date DEFAULT NULL,
  `QTA_RESTITUITA` int(11) DEFAULT NULL,
  `DATA_RESTITUZIONE` date DEFAULT NULL,
  `DATA_PAGAMENTO` date DEFAULT NULL,
  PRIMARY KEY (`ID_KIT_PRENOTATO`),
  KEY `FK_hw_kit_prenotazioni_hw_t_tipo_kit` (`COD_TIPO_KIT`),
  KEY `FK_hw_kit_prenotazioni_hw_t_corners` (`ID_CORNER`),
  CONSTRAINT `FK_hw_kit_prenotazioni_hw_t_corners` FOREIGN KEY (`ID_CORNER`) REFERENCES `servizi_hw_t_corners` (`ID_CORNER`),
  CONSTRAINT `FK_hw_kit_prenotazioni_hw_t_tipo_kit` FOREIGN KEY (`COD_TIPO_KIT`) REFERENCES `servizi_hw_t_tipo_kit` (`COD_TIPO_KIT`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dump dei dati della tabella holidayworld.servizi_hw_kit_prenotazioni: ~0 rows (circa)
/*!40000 ALTER TABLE `servizi_hw_kit_prenotazioni` DISABLE KEYS */;
/*!40000 ALTER TABLE `servizi_hw_kit_prenotazioni` ENABLE KEYS */;

-- Dump della struttura di tabella holidayworld.servizi_hw_t_corners
CREATE TABLE IF NOT EXISTS `servizi_hw_t_corners` (
  `ID_CORNER` int(11) NOT NULL AUTO_INCREMENT,
  `NOME_CORNER` varchar(50) DEFAULT NULL,
  `INDIRIZZO` varchar(250) DEFAULT NULL,
  `COMUNE` varchar(250) DEFAULT NULL,
  `CAP` varchar(15) DEFAULT NULL,
  `PROVINCIA` varchar(2) DEFAULT NULL,
  `ID_UTENTE` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_CORNER`),
  KEY `FK_hw_t_corners_hw_t_utenti` (`ID_UTENTE`),
  CONSTRAINT `FK_hw_t_corners_hw_t_utenti` FOREIGN KEY (`ID_UTENTE`) REFERENCES `servizi_hw_t_utenti` (`ID_UTENTE`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Dump dei dati della tabella holidayworld.servizi_hw_t_corners: ~0 rows (circa)
/*!40000 ALTER TABLE `servizi_hw_t_corners` DISABLE KEYS */;
REPLACE INTO `servizi_hw_t_corners` (`ID_CORNER`, `NOME_CORNER`, `INDIRIZZO`, `COMUNE`, `CAP`, `PROVINCIA`, `ID_UTENTE`) VALUES
	(1, 'corner', 'via corner', 'corner', 'co rn er', 'co', NULL);
/*!40000 ALTER TABLE `servizi_hw_t_corners` ENABLE KEYS */;

-- Dump della struttura di tabella holidayworld.servizi_hw_t_ive
CREATE TABLE IF NOT EXISTS `servizi_hw_t_ive` (
  `COD_IVA` varchar(10) NOT NULL,
  `DES_IVA` varchar(50) DEFAULT NULL,
  `VAL_IVA` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`COD_IVA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dump dei dati della tabella holidayworld.servizi_hw_t_ive: ~0 rows (circa)
/*!40000 ALTER TABLE `servizi_hw_t_ive` DISABLE KEYS */;
/*!40000 ALTER TABLE `servizi_hw_t_ive` ENABLE KEYS */;

-- Dump della struttura di tabella holidayworld.servizi_hw_t_lavanderie
CREATE TABLE IF NOT EXISTS `servizi_hw_t_lavanderie` (
  `ID_LAVANDERIA` int(11) NOT NULL AUTO_INCREMENT,
  `DES_LAVANDERIA` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID_LAVANDERIA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dump dei dati della tabella holidayworld.servizi_hw_t_lavanderie: ~0 rows (circa)
/*!40000 ALTER TABLE `servizi_hw_t_lavanderie` DISABLE KEYS */;
/*!40000 ALTER TABLE `servizi_hw_t_lavanderie` ENABLE KEYS */;

-- Dump della struttura di tabella holidayworld.servizi_hw_t_tipo_kit
CREATE TABLE IF NOT EXISTS `servizi_hw_t_tipo_kit` (
  `COD_TIPO_KIT` varchar(10) NOT NULL,
  `DES_TIPO_KIT` varchar(50) DEFAULT '0',
  `VAL_KIT` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`COD_TIPO_KIT`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dump dei dati della tabella holidayworld.servizi_hw_t_tipo_kit: ~2 rows (circa)
/*!40000 ALTER TABLE `servizi_hw_t_tipo_kit` DISABLE KEYS */;
REPLACE INTO `servizi_hw_t_tipo_kit` (`COD_TIPO_KIT`, `DES_TIPO_KIT`, `VAL_KIT`) VALUES
	('BNCH', 'Biancheria', NULL),
	('PLZ', 'Pulizia persona', NULL);
/*!40000 ALTER TABLE `servizi_hw_t_tipo_kit` ENABLE KEYS */;

-- Dump della struttura di tabella holidayworld.servizi_hw_t_tipo_pagamenti
CREATE TABLE IF NOT EXISTS `servizi_hw_t_tipo_pagamenti` (
  `COD_PAGAMENTO` varchar(10) NOT NULL,
  `DES_PAGAMENTO` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`COD_PAGAMENTO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dump dei dati della tabella holidayworld.servizi_hw_t_tipo_pagamenti: ~3 rows (circa)
/*!40000 ALTER TABLE `servizi_hw_t_tipo_pagamenti` DISABLE KEYS */;
REPLACE INTO `servizi_hw_t_tipo_pagamenti` (`COD_PAGAMENTO`, `DES_PAGAMENTO`) VALUES
	('MASTERCARD', 'MASTERCARD'),
	('PAYPAL', 'PAYPAL'),
	('VISA', 'VISA');
/*!40000 ALTER TABLE `servizi_hw_t_tipo_pagamenti` ENABLE KEYS */;

-- Dump della struttura di tabella holidayworld.servizi_hw_t_utenti
CREATE TABLE IF NOT EXISTS `servizi_hw_t_utenti` (
  `ID_UTENTE` int(11) NOT NULL AUTO_INCREMENT,
  `COD_TIPO_UTENTE` varchar(5) NOT NULL DEFAULT '0',
  `DES_UTENTE` varchar(250) DEFAULT NULL,
  `PASSW_UTENTE` varchar(250) DEFAULT NULL,
  `MAIL_UTENTE` varchar(250) DEFAULT NULL,
  `FLG_ATTIVO` smallint(6) DEFAULT '1',
  `COD_PAGAMENTO` varchar(10) DEFAULT '1',
  `TELEFONO_FISSO` varchar(10) DEFAULT '1',
  `TELEFONO_CELL` varchar(10) DEFAULT '1',
  `ID_CORNER_DEFAULT` int(11) DEFAULT '1',
  PRIMARY KEY (`ID_UTENTE`),
  KEY `FK_hw_t_utenti_hw_t_tipo_pagamenti` (`COD_PAGAMENTO`),
  KEY `FK_hw_t_utenti_hw_t_utenti_tipo` (`COD_TIPO_UTENTE`),
  KEY `FK_hw_t_utenti_hw_t_corners` (`ID_CORNER_DEFAULT`),
  CONSTRAINT `FK_hw_t_utenti_hw_t_corners` FOREIGN KEY (`ID_CORNER_DEFAULT`) REFERENCES `servizi_hw_t_corners` (`ID_CORNER`),
  CONSTRAINT `FK_hw_t_utenti_hw_t_tipo_pagamenti` FOREIGN KEY (`COD_PAGAMENTO`) REFERENCES `servizi_hw_t_tipo_pagamenti` (`COD_PAGAMENTO`),
  CONSTRAINT `FK_hw_t_utenti_hw_t_utenti_tipo` FOREIGN KEY (`COD_TIPO_UTENTE`) REFERENCES `servizi_hw_t_utenti_tipo` (`COD_TIPO_UTENTE`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dump dei dati della tabella holidayworld.servizi_hw_t_utenti: ~0 rows (circa)
/*!40000 ALTER TABLE `servizi_hw_t_utenti` DISABLE KEYS */;
REPLACE INTO `servizi_hw_t_utenti` (`ID_UTENTE`, `COD_TIPO_UTENTE`, `DES_UTENTE`, `PASSW_UTENTE`, `MAIL_UTENTE`, `FLG_ATTIVO`, `COD_PAGAMENTO`, `TELEFONO_FISSO`, `TELEFONO_CELL`, `ID_CORNER_DEFAULT`) VALUES
	(4, 'CLI', 'public', 'public', NULL, 1, 'MASTERCARD', '1', '1', 1),
	(5, 'SUPER', 'admin', 'admin', NULL, 1, 'PAYPAL', '1', '1', 1);
/*!40000 ALTER TABLE `servizi_hw_t_utenti` ENABLE KEYS */;

-- Dump della struttura di tabella holidayworld.servizi_hw_t_utenti_tipo
CREATE TABLE IF NOT EXISTS `servizi_hw_t_utenti_tipo` (
  `COD_TIPO_UTENTE` varchar(10) NOT NULL,
  `DES_TIPO_UTENTE` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`COD_TIPO_UTENTE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dump dei dati della tabella holidayworld.servizi_hw_t_utenti_tipo: ~3 rows (circa)
/*!40000 ALTER TABLE `servizi_hw_t_utenti_tipo` DISABLE KEYS */;
REPLACE INTO `servizi_hw_t_utenti_tipo` (`COD_TIPO_UTENTE`, `DES_TIPO_UTENTE`) VALUES
	('CLI', 'Cliente'),
	('CRNR', 'Corner'),
	('SUPER', 'Supervisore');
/*!40000 ALTER TABLE `servizi_hw_t_utenti_tipo` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
