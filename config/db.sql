CREATE DATABASE course_finder;
DROP DATABASE course_finder;
use  course_finder;

CREATE Table users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(100),
    image VARCHAR(100),
    password VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(100),
    type VARCHAR(100),
    role VARCHAR(100),
     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

insert INTO users(fullName,image,password,email,phone,type,role)
VALUES("Job","123.npc","1234","email","phone","user","user")