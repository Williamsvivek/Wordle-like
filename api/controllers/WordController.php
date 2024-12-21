<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/Database.php';
include_once '../models/Word.php';

class WordController {
    private $word;

    public function __construct() {
        $database = new Database();
        $db = $database->getConnection();
        $this->word = new Word($db);
    }

    public function getWord() {
        $result = $this->word->getRandomWord();

        if ($result) {
            http_response_code(200);
            echo json_encode(["word" => $result]);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "No words available."]);
        }
    }

    public function validateGuess() {
        $data = json_decode(file_get_contents("php://input"));

        if (!isset($data->guess) || !isset($data->solution)) {
            http_response_code(400);
            echo json_encode(["message" => "Missing required parameters."]);
            return;
        }

        $guess = strtoupper($data->guess);
        $solution = strtoupper($data->solution);

        if (!$this->word->validateWord($guess)) {
            http_response_code(400);
            echo json_encode(["message" => "Invalid word."]);
            return;
        }

        $result = $this->compareWords($guess, $solution);
        http_response_code(200);
        echo json_encode(["result" => $result]);
    }

    private function compareWords($guess, $solution) {
        $result = array_fill(0, 5, 3); // Initialize with "incorrect" (3)
        $solutionChars = str_split($solution);
        $guessChars = str_split($guess);
        
        // First pass: mark correct letters (1)
        for ($i = 0; $i < 5; $i++) {
            if ($guessChars[$i] === $solutionChars[$i]) {
                $result[$i] = 1;
                $solutionChars[$i] = '#';
            }
        }
        
        // Second pass: mark present letters (2)
        for ($i = 0; $i < 5; $i++) {
            if ($result[$i] !== 1) {
                $pos = array_search($guessChars[$i], $solutionChars);
                if ($pos !== false) {
                    $result[$i] = 2;
                    $solutionChars[$pos] = '#';
                }
            }
        }
        
        return $result;
    }
}