<?php
class Word {
    private $conn;
    private $table_name = "words";

    public $id;
    public $word;
    public $last_used;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getRandomWord() {
        // Get word that hasn't been used in the last 5 minutes
        $query = "SELECT id, word, last_used 
                 FROM " . $this->table_name . "
                 WHERE last_used IS NULL 
                 OR last_used < DATE_SUB(NOW(), INTERVAL 5 MINUTE)
                 ORDER BY RAND() 
                 LIMIT 1";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            // Update last_used timestamp
            $update_query = "UPDATE " . $this->table_name . "
                           SET last_used = NOW()
                           WHERE id = ?";
            $update_stmt = $this->conn->prepare($update_query);
            $update_stmt->execute([$row['id']]);

            return $row['word'];
        }

        return false;
    }

    public function validateWord($word) {
        $query = "SELECT COUNT(*) as count 
                 FROM " . $this->table_name . "
                 WHERE word = ?";

        $stmt = $this->conn->prepare($query);
        $stmt->execute([$word]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        return $row['count'] > 0;
    }
}