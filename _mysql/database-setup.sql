create schema test_database;

use test_database;

CREATE USER 'web-db-user'@'localhost' IDENTIFIED BY 'ChangeThisPass!';

GRANT ALL PRIVILEGES ON test_database.* TO 'web-db-user'@'localhost';

ALTER USER 'web-db-user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'ChangeThisPass!';

flush privileges;
