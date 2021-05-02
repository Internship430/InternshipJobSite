DROP DATABASE IF EXISTS internship;
CREATE DATABASE  internship;
\c internship;

DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
  Type int NOT NULL default 1,
  Uname text NOT NULL UNIQUE,
  Email text NOT NULL UNIQUE,
  Fname text  NOT NULL default '',
  Lname text NOT NULL default '',
  Password text NOT NULL default '',
  Company text, 
  GradTerm text, 
  PRIMARY KEY  (Uname)
);

INSERT INTO Users(Type, Uname, Email, Fname, Lname, Password) VALUES (0,'admin','JenniferPolack@gmail.com','admin','admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918');

DROP TABLE IF EXISTS postings;
CREATE TABLE postings (
  ID serial NOT NULL,
  Company text  NOT NULL default '',
  PosTitle text NOT NULL default '',
  Description text NOT NULL default '',
  Location text NOT NULL,
  Cemail text NOT NULL,
  Cname text NOT NULL, 
  Remote bit NOT NULL default '0',
  PType int NOT NULL default '2',
  PRIMARY KEY  (ID)
);

DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews (
  ID serial PRIMARY KEY,
  Name text NOT NULL default '',
  Company text  NOT NULL default '',
  Position text NOT NULL default '',
  PositionDate text NOT NULL default '',
  Stars int  NOT NULL,
  Review text NOT NULL default '',
  Rdate date NOT NULL 
);
