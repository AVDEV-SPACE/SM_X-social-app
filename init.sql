ALTER USER 'root'@'localhost' IDENTIFIED BY 'faithinChrist';
FLUSH PRIVILEGES;
CREATE USER 'prisma_user'@'%' IDENTIFIED BY 'prisma_password';
GRANT ALL PRIVILEGES ON mydb.* TO 'prisma_user'@'%';
FLUSH PRIVILEGES;