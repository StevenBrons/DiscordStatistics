DROP TABLE IF EXISTS `guilds`;
CREATE TABLE `guilds` (
  `id` VARCHAR(18) NOT NULL,
  `ownerId` VARCHAR(18) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `memberCount` INT(11) NOT NULL,
  `created` DATETIME NOT NULL,
  `region` VARCHAR(45) NOT NULL,
  `splash` VARCHAR(45) DEFAULT NULL,
  `iconUrl` VARCHAR(88) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `presence`;
CREATE TABLE `presence` (
  `pk` INT(11) NOT NULL AUTO_INCREMENT,
  `userId` VARCHAR(18) NOT NULL,
  `status` VARCHAR(45) DEFAULT NULL,
  `game` VARCHAR(45) DEFAULT NULL,
  `timestamp` DATETIME NOT NULL,
  PRIMARY KEY (`pk`)
);

DROP TABLE IF EXISTS `guildmembers`;
CREATE TABLE `guildmembers` (
  `pk` INT(11) NOT NULL AUTO_INCREMENT,
  `id` VARCHAR(18) NOT NULL,
  `guildId` VARCHAR(18) NOT NULL,
  `discriminator` VARCHAR(4) NOT NULL,
  `avatar` VARCHAR(100) DEFAULT NULL,
  `displayName` VARCHAR(32) NOT NULL,
  `joinedAt` DATETIME NOT NULL,
  `color` VARCHAR(45) DEFAULT NULL,
  `bot` BIT(1) NOT NULL,
  -- In reality the pk is id + guildId, but guildId has to be null. So we will
  -- check this before insertion
  PRIMARY KEY (`pk`)
);
