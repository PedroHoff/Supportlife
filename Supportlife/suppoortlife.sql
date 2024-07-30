CREATE DATABASE db_supportlife;
USE db_supportlife;


CREATE TABLE publicacoes(
	id INT auto_increment primary key,
    causa varchar(255) not null,
    imagem varchar(255) not null,
    necessidade varchar(255) not null
);

select * from publicacoes;