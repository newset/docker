-- create mysql user superset with password abc123
CREATE USER'superset'@'%' IDENTIFIED BY 'abc123';
GRANT ALL PRIVILEGES ON *.* TO'superset'@'%';
FLUSH PRIVILEGES;

-- list users
SELECT User, Host FROM mysql.user;

-- how to change mysql user host
UPDATE mysql.user SET Host='%' WHERE Host='localhost' AND User='superset';

