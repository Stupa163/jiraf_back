-- ************************************** `Company`

CREATE TABLE `Company`
(
 `id`     int NOT NULL ,
 `name`   varchar(255) NOT NULL ,
 `siret`  bigint NOT NULL ,
 `status` enum('sas', 'sasu', 'autoentrepreneur', 'eurl', 'sarl') NOT NULL ,

PRIMARY KEY (`id`)
);


-- ************************************** `User`

CREATE TABLE `User`
(
 `id`        int NOT NULL ,
 `firstName` varchar(255) NOT NULL ,
 `lastName`  varchar(255) NOT NULL ,
 `mail`      varchar(255) NOT NULL ,
 `phone`     bigint NOT NULL ,
 `profile`   enum('back', 'front', 'data_analyst', 'qa') NOT NULL ,
 `company`   int NOT NULL ,

PRIMARY KEY (`id`),
KEY `fkIdx_30` (`company`),
CONSTRAINT `FK_30` FOREIGN KEY `fkIdx_30` (`company`) REFERENCES `Company` (`id`)
);


-- ************************************** `Client`

CREATE TABLE `Client`
(
 `id`               int NOT NULL ,
 `name`             varchar(255) NOT NULL ,
 `address`          varchar(400) NOT NULL ,
 `contactFirstName` varchar(255) NOT NULL ,
 `contactLastName`  varchar(255) NOT NULL ,
 `phone`            bigint NOT NULL ,
 `mail`             varchar(255) NOT NULL ,

PRIMARY KEY (`id`)
);


-- ************************************** `Project`

CREATE TABLE `Project`
(
 `id`        int NOT NULL ,
 `title`     varchar(255) NOT NULL ,
 `amount`    float NOT NULL ,
 `delay`     bigint NOT NULL ,
 `startDate` date NOT NULL ,
 `endDate`   date NOT NULL ,
 `status`    enum('en_cours', 'realise') NOT NULL ,
 `stacks`    longtext NOT NULL ,
 `adr`       bigint NOT NULL ,
 `client`    int NOT NULL ,
 `user`      int NOT NULL ,

PRIMARY KEY (`id`),
KEY `fkIdx_58` (`client`),
CONSTRAINT `FK_58` FOREIGN KEY `fkIdx_58` (`client`) REFERENCES `Client` (`id`),
KEY `fkIdx_61` (`user`),
CONSTRAINT `FK_61` FOREIGN KEY `fkIdx_61` (`user`) REFERENCES `User` (`id`)
);


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
CONSTRAINT `FK_71` FOREIGN KEY `fkIdx_71` (`project`) REFERENCES `Project` (`id`)
);


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
CONSTRAINT `FK_81` FOREIGN KEY `fkIdx_81` (`sprint`) REFERENCES `Sprint` (`id`)
);
