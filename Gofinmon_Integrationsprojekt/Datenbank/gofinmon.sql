-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 16. Jul 2019 um 09:38
-- Server-Version: 10.3.16-MariaDB
-- PHP-Version: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `gofinmon`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `benutzer`
--

CREATE TABLE `benutzer` (
  `pk_benutzer_id` int(100) NOT NULL,
  `fk_benutzergruppen_id` int(100) NOT NULL,
  `passwort` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `nachname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `vorname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `hausnr` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `plz` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `strasse` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ort` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `telefonnummer` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `geburtstagtag` int(10) NOT NULL,
  `geburtsmonat` int(11) NOT NULL,
  `geburtsjahr` int(100) NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `bic` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `iban` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `benutzer`
--

INSERT INTO `benutzer` (`pk_benutzer_id`, `fk_benutzergruppen_id`, `passwort`, `nachname`, `vorname`, `hausnr`, `plz`, `strasse`, `ort`, `telefonnummer`, `geburtstagtag`, `geburtsmonat`, `geburtsjahr`, `email`, `bic`, `iban`) VALUES
(1, 1, 'jahgdbgd', 'Dauberg', 'Janick', '6a', '536536', 'Mohlenweg', 'Köln', '0938373636', 12, 12, 1973, 'petermöller@gmx.de', 'SJHGFGH', 'DE49008 005 008 0876'),
(2, 2, 'garten123', 'Lauer', 'Tim', '5a', '23456', 'Mühlenweg', 'Köln', '062547724565', 14, 11, 1980, 'timlauerbusiness@gmx.de', 'SFGNFG6HGNN', 'DE49414400890006547646'),
(4, 4, 'jawollo223', 'Schmidt', 'Vanesssa', '2e', '76566', 'Kuhweselstrasse', 'Köln', '098765567', 12, 7, 1989, 'vanessaschmidtbusiness@web.de', 'SFGH)JHGFTZ', 'DE49658900340005876566'),
(5, 4, 'tinameineliebe', 'Kostial', 'Gabriel', '7g', '6575', 'Zielenweg ', 'Gießen', '0988776555', 4, 4, 1994, 'gabrielkos@gmx.de', 'SJKIG&GHNNN', 'DE49769800340006768899'),
(100, 4, 'Blume123', 'Schmitt', 'Sebastian', 'kk', 'D-35440', 'Schillerstr', 'Linden', '0157-6588542', 23, 0, 1992, 'sebastian.schmitt@gmail.comm', 'VBMHDE5F', 'DE42500105175953946933');

--
-- Trigger `benutzer`
--
DELIMITER $$
CREATE TRIGGER `delete benutzergruppenzuweisung` BEFORE DELETE ON `benutzer` FOR EACH ROW DELETE FROM benutzergruppenzuweisung WHERE benutzergruppenzuweisung.fk_benutzer_id = OLD.pk_benutzer_id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `delete buchung` BEFORE DELETE ON `benutzer` FOR EACH ROW DELETE FROM buchung WHERE buchung.fk_benutzer_id = OLD.pk_benutzer_id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `delete kurs` BEFORE DELETE ON `benutzer` FOR EACH ROW DELETE FROM kurs WHERE kurs.fk_benutzer_id = OLD.pk_benutzer_id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `delete provision` BEFORE DELETE ON `benutzer` FOR EACH ROW DELETE FROM provision WHERE provision.fk_benutzer_id = OLD.pk_benutzer_id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `delete zufriedenheitsgrad` BEFORE DELETE ON `benutzer` FOR EACH ROW DELETE FROM zufriedenheitsgrad WHERE zufriedenheitsgrad.fk_benutzer_id = OLD.pk_benutzer_id
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `benutzergruppen`
--

CREATE TABLE `benutzergruppen` (
  `pk_benutzergruppen_id` int(10) NOT NULL,
  `benutzergruppenname` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `benutzergruppen`
--

INSERT INTO `benutzergruppen` (`pk_benutzergruppen_id`, `benutzergruppenname`) VALUES
(1, 'Plattformbetreiber'),
(2, 'Admin'),
(3, 'Content Provider'),
(4, 'Content User'),
(5, 'Datenschutzbeauftragter');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `benutzergruppenzuweisung`
--

CREATE TABLE `benutzergruppenzuweisung` (
  `pk_benutzergruppenzuweisung_id` int(10) NOT NULL,
  `fk_benutzergruppen_id` int(10) NOT NULL,
  `fk_benutzer_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `benutzerrechte`
--

CREATE TABLE `benutzerrechte` (
  `pk_benutzerrechte_id` int(10) NOT NULL,
  `benutzerrechtebeschreibung` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `benutzerrechte`
--

INSERT INTO `benutzerrechte` (`pk_benutzerrechte_id`, `benutzerrechtebeschreibung`) VALUES
(1, 'Kurs hinzufügen\r\n'),
(2, 'Kurse buchen\r\n'),
(3, 'Skrip hinzufügen'),
(4, 'Skript löschen'),
(5, 'Erstellen eines Profils'),
(6, 'Löschen eines Profils'),
(7, 'Bearbeiten eines Profils');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `benutzerrechtezuweisung`
--

CREATE TABLE `benutzerrechtezuweisung` (
  `pk_benutzerrechtezuweisung_id` int(10) NOT NULL,
  `fk_benutzerrechte_id` int(10) NOT NULL,
  `fk_benutzergruppen_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `benutzerrechtezuweisung`
--

INSERT INTO `benutzerrechtezuweisung` (`pk_benutzerrechtezuweisung_id`, `fk_benutzerrechte_id`, `fk_benutzergruppen_id`) VALUES
(1, 7, 2),
(2, 7, 4),
(3, 1, 3),
(4, 6, 4),
(5, 1, 2),
(6, 4, 2);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `buchung`
--

CREATE TABLE `buchung` (
  `pk_buchung_id` int(11) NOT NULL,
  `fk_benutzer_id` int(11) NOT NULL,
  `fk_kurs_id` int(11) NOT NULL,
  `buchungsdatum` date NOT NULL,
  `fk_zufriedenheitsgrad_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `kurs`
--

CREATE TABLE `kurs` (
  `pk_kurs_id` int(11) NOT NULL,
  `fk_benutzer_id` int(11) NOT NULL,
  `reflink_videoname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `preis` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `reflink_skript` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `kursname` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `kurs`
--

INSERT INTO `kurs` (`pk_kurs_id`, `fk_benutzer_id`, `reflink_videoname`, `preis`, `reflink_skript`, `kursname`) VALUES
(1, 2, '', '75€', '', 'Die Rolle der Börse'),
(2, 2, '', '119€', '', 'Spielend leichter Vermögensaufbau'),
(3, 2, '', '99€', '', 'Schritt für schritt zum Traumhaus'),
(26, 2, '', 'llmmmm', '', 'neuuunnnnööööömmmmm'),
(27, 2, '', 'llmm', '', 'neuuunnnnööööömmm'),
(28, 2, '', 'llmm', '', 'jjlll'),
(29, 2, '', 'lllll', '', 'llsal');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `provision`
--

CREATE TABLE `provision` (
  `pk_provision_id` int(11) NOT NULL,
  `fk_benutzer_id` int(11) NOT NULL,
  `fk_kurs_id` int(11) NOT NULL,
  `wert in euro` varchar(255) NOT NULL,
  `ueberweisung_date` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `zufriedenheitsgrad`
--

CREATE TABLE `zufriedenheitsgrad` (
  `pk_zufriedenheitsgrad_id` int(10) NOT NULL,
  `fk_benutzer_id` int(10) NOT NULL,
  `bewertung` int(11) NOT NULL,
  `bewertung_beschreibung` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `fk_kurs_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `benutzer`
--
ALTER TABLE `benutzer`
  ADD PRIMARY KEY (`pk_benutzer_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_benutzergruppen_id` (`fk_benutzergruppen_id`);

--
-- Indizes für die Tabelle `benutzergruppen`
--
ALTER TABLE `benutzergruppen`
  ADD PRIMARY KEY (`pk_benutzergruppen_id`);

--
-- Indizes für die Tabelle `benutzergruppenzuweisung`
--
ALTER TABLE `benutzergruppenzuweisung`
  ADD PRIMARY KEY (`pk_benutzergruppenzuweisung_id`),
  ADD KEY `fk_benutzergruppen_id` (`fk_benutzergruppen_id`),
  ADD KEY `fk_benutzer_id` (`fk_benutzer_id`);

--
-- Indizes für die Tabelle `benutzerrechte`
--
ALTER TABLE `benutzerrechte`
  ADD PRIMARY KEY (`pk_benutzerrechte_id`);

--
-- Indizes für die Tabelle `benutzerrechtezuweisung`
--
ALTER TABLE `benutzerrechtezuweisung`
  ADD PRIMARY KEY (`pk_benutzerrechtezuweisung_id`),
  ADD KEY `fk_benutzerrechte_id` (`fk_benutzerrechte_id`),
  ADD KEY `fk_benutzergruppen_id` (`fk_benutzergruppen_id`);

--
-- Indizes für die Tabelle `buchung`
--
ALTER TABLE `buchung`
  ADD PRIMARY KEY (`pk_buchung_id`),
  ADD KEY `fk_benutzer_id` (`fk_benutzer_id`),
  ADD KEY `fk_kurs_id` (`fk_kurs_id`),
  ADD KEY `fk_zufriedenheitsgrad_id` (`fk_zufriedenheitsgrad_id`);

--
-- Indizes für die Tabelle `kurs`
--
ALTER TABLE `kurs`
  ADD PRIMARY KEY (`pk_kurs_id`),
  ADD KEY `fk_benutzer_id` (`fk_benutzer_id`);

--
-- Indizes für die Tabelle `provision`
--
ALTER TABLE `provision`
  ADD PRIMARY KEY (`pk_provision_id`),
  ADD KEY `fk_benutzer_id` (`fk_benutzer_id`),
  ADD KEY `fk_kurs_id` (`fk_kurs_id`);

--
-- Indizes für die Tabelle `zufriedenheitsgrad`
--
ALTER TABLE `zufriedenheitsgrad`
  ADD PRIMARY KEY (`pk_zufriedenheitsgrad_id`),
  ADD KEY `fk_benutzergruppenid` (`fk_benutzer_id`),
  ADD KEY `fk_kurs_id` (`fk_kurs_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `benutzer`
--
ALTER TABLE `benutzer`
  MODIFY `pk_benutzer_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT für Tabelle `benutzergruppen`
--
ALTER TABLE `benutzergruppen`
  MODIFY `pk_benutzergruppen_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT für Tabelle `benutzergruppenzuweisung`
--
ALTER TABLE `benutzergruppenzuweisung`
  MODIFY `pk_benutzergruppenzuweisung_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT für Tabelle `benutzerrechte`
--
ALTER TABLE `benutzerrechte`
  MODIFY `pk_benutzerrechte_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT für Tabelle `benutzerrechtezuweisung`
--
ALTER TABLE `benutzerrechtezuweisung`
  MODIFY `pk_benutzerrechtezuweisung_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT für Tabelle `buchung`
--
ALTER TABLE `buchung`
  MODIFY `pk_buchung_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `kurs`
--
ALTER TABLE `kurs`
  MODIFY `pk_kurs_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT für Tabelle `provision`
--
ALTER TABLE `provision`
  MODIFY `pk_provision_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `zufriedenheitsgrad`
--
ALTER TABLE `zufriedenheitsgrad`
  MODIFY `pk_zufriedenheitsgrad_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `benutzergruppenzuweisung`
--
ALTER TABLE `benutzergruppenzuweisung`
  ADD CONSTRAINT `benutzergruppenzuweisung_ibfk_1` FOREIGN KEY (`fk_benutzer_id`) REFERENCES `benutzer` (`pk_benutzer_id`),
  ADD CONSTRAINT `benutzergruppenzuweisung_ibfk_2` FOREIGN KEY (`fk_benutzergruppen_id`) REFERENCES `benutzergruppen` (`pk_benutzergruppen_id`);

--
-- Constraints der Tabelle `benutzerrechtezuweisung`
--
ALTER TABLE `benutzerrechtezuweisung`
  ADD CONSTRAINT `benutzerrechtezuweisung_ibfk_1` FOREIGN KEY (`fk_benutzergruppen_id`) REFERENCES `benutzergruppen` (`pk_benutzergruppen_id`),
  ADD CONSTRAINT `benutzerrechtezuweisung_ibfk_2` FOREIGN KEY (`fk_benutzerrechte_id`) REFERENCES `benutzerrechte` (`pk_benutzerrechte_id`);

--
-- Constraints der Tabelle `buchung`
--
ALTER TABLE `buchung`
  ADD CONSTRAINT `buchung_ibfk_1` FOREIGN KEY (`fk_benutzer_id`) REFERENCES `benutzer` (`pk_benutzer_id`),
  ADD CONSTRAINT `buchung_ibfk_2` FOREIGN KEY (`fk_kurs_id`) REFERENCES `kurs` (`pk_kurs_id`);

--
-- Constraints der Tabelle `provision`
--
ALTER TABLE `provision`
  ADD CONSTRAINT `provision_ibfk_1` FOREIGN KEY (`fk_benutzer_id`) REFERENCES `benutzer` (`pk_benutzer_id`),
  ADD CONSTRAINT `provision_ibfk_2` FOREIGN KEY (`fk_kurs_id`) REFERENCES `kurs` (`pk_kurs_id`);

--
-- Constraints der Tabelle `zufriedenheitsgrad`
--
ALTER TABLE `zufriedenheitsgrad`
  ADD CONSTRAINT `zufriedenheitsgrad_ibfk_1` FOREIGN KEY (`fk_benutzer_id`) REFERENCES `benutzer` (`pk_benutzer_id`),
  ADD CONSTRAINT `zufriedenheitsgrad_ibfk_2` FOREIGN KEY (`fk_kurs_id`) REFERENCES `kurs` (`pk_kurs_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
