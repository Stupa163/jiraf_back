-- ************************************** `Company`

CREATE TABLE `Company`
(
 `id`     int NOT NULL ,
 `name`   varchar(255) NOT NULL ,
 `siret`  bigint NOT NULL ,
 `status` enum('sas', 'sasu', 'autoentrepreneur', 'eurl', 'sarl') NOT NULL ,

PRIMARY KEY (`id`)
);

ALTER TABLE `Company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

-- ************************************** `User`

CREATE TABLE `User`
(
 `id`               int NOT NULL ,
 `firstName`        varchar(255) NOT NULL ,
 `lastName`         varchar(255) NOT NULL ,
 `password`         varchar(255) NOT NULL ,
 `mail`             varchar(255) NOT NULL ,
 `phone`            varchar(255) NOT NULL ,
 `profile`          enum('back', 'front', 'data_analyst', 'qa') NOT NULL ,
 `lastPaymentDate`  date NULL DEFAULT NULL ,
 `company`          int NOT NULL ,

PRIMARY KEY (`id`),
KEY `fkIdx_30` (`company`),
CONSTRAINT `FK_30` FOREIGN KEY `fkIdx_30` (`company`) REFERENCES `Company` (`id`)
);

ALTER TABLE `User`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

-- ************************************** `Client`

CREATE TABLE `Client`
(
 `id`               int NOT NULL ,
 `name`             varchar(255) NOT NULL ,
 `address`          varchar(400) NOT NULL ,
 `contactFirstName` varchar(255) NOT NULL ,
 `contactLastName`  varchar(255) NOT NULL ,
 `phone`            varchar(255) NOT NULL ,
 `mail`             varchar(255) NOT NULL ,

PRIMARY KEY (`id`)
);

ALTER TABLE `Client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

-- ************************************** `Project`

CREATE TABLE `Project`
(
 `id`               int NOT NULL ,
 `title`            varchar(255) NOT NULL ,
 `amount`           float NOT NULL ,
 `delay`            bigint NOT NULL ,
 `startDate`        date NOT NULL ,
 `endDate`          date NOT NULL ,
 `status`           enum('en_cours', 'realise') NOT NULL ,
 `stacks`           longtext NOT NULL ,
 `adr`              bigint NOT NULL ,
 `githubRepository` varchar(255) NULL DEFAULT NULL ,
 `client`           int NOT NULL ,
 `user`             int NOT NULL ,

PRIMARY KEY (`id`),
KEY `fkIdx_58` (`client`),
CONSTRAINT `FK_58` FOREIGN KEY `fkIdx_58` (`client`) REFERENCES `Client` (`id`),
KEY `fkIdx_61` (`user`),
CONSTRAINT `FK_61` FOREIGN KEY `fkIdx_61` (`user`) REFERENCES `User` (`id`)
);

ALTER TABLE `Project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

-- ************************************** `Sprint`

CREATE TABLE `Sprint`
(
 `id`        int NOT NULL ,
 `title`     varchar(255) NOT NULL ,
 `startDate` date NOT NULL ,
 `endDate`   date NOT NULL ,
 `status`    enum('en_cours', 'termine', 'a_faire') NOT NULL ,
 `project`   int NOT NULL ,

PRIMARY KEY (`id`),
KEY `fkIdx_71` (`project`),
CONSTRAINT `FK_71` FOREIGN KEY `fkIdx_71` (`project`) REFERENCES `Project` (`id`) ON DELETE CASCADE
);

ALTER TABLE `Sprint`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

-- ************************************** `Task`

CREATE TABLE `Task`
(
 `id`             int NOT NULL ,
 `title`          varchar(255) NOT NULL ,
 `description`    varchar(500) NOT NULL ,
 `status`         enum('en_cours', 'termine', 'a_faire') NOT NULL ,
 `completionTime` bigint NOT NULL ,
 `sprint`         int NOT NULL ,

PRIMARY KEY (`id`),
KEY `fkIdx_81` (`sprint`),
CONSTRAINT `FK_81` FOREIGN KEY `fkIdx_81` (`sprint`) REFERENCES `Sprint` (`id`) ON DELETE CASCADE
);

ALTER TABLE `Task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
