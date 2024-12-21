CREATE DATABASE IF NOT EXISTS wordle_db;
USE wordle_db;

CREATE TABLE IF NOT EXISTS words (
    id INT AUTO_INCREMENT PRIMARY KEY,
    word VARCHAR(5) NOT NULL UNIQUE,
    last_used DATETIME DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_last_used (last_used),
    INDEX idx_word (word)
) ENGINE=InnoDB;