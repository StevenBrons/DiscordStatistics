CREATE TABLE `guilds` (
  `id` varchar(18) NOT NULL,
  `ownerId` varchar(18) NOT NULL,
  `name` varchar(45) NOT NULL,
  `memberCount` int(11) NOT NULL,
  `created` timestamp NOT NULL,
  `region` varchar(45) NOT NULL,
  `splash` varchar(45) DEFAULT NULL,
  `iconUrl` varchar(88) DEFAULT NULL,
  `timestamp` timestamp NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `presence` (
  `pk` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(18) NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  `game` varchar(45) DEFAULT NULL,
  `timestamp` timestamp NOT NULL,
  PRIMARY KEY (`pk`)
);

CREATE TABLE `users` (
  `id` varchar(18) NOT NULL,
  `guildId` varchar(18) DEFAULT NULL,
  `username` varchar(32) NOT NULL,
  `discriminator` smallint(4) NOT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `displayname` varchar(32) DEFAULT NULL,
  `joined` varchar(45) DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  `bot` bit(1) DEFAULT NULL,
  `timestamp` timestamp NOT NULL,
  PRIMARY KEY (`id`),
);
