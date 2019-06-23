sudo apt-get install python-dev python3-dev
sudo apt-get install libmysqlclient-dev
pip install mysqlclient

https://stackoverflow.com/questions/39463134/how-to-store-emoji-character-in-mysql-database

ALTER DATABASE bismillah CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
ALTER TABLE lovecodebackend_tutorial CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE lovecodebackend_tutorial modify learn_md_content text charset utf8mb4;
ALTER TABLE lovecodebackend_tutorial modify repository_data text charset utf8mb4;