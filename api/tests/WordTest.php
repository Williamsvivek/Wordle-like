<?php
use PHPUnit\Framework\TestCase;

class WordTest extends TestCase {
    private $db;
    private $word;

    protected function setUp(): void {
        $this->db = $this->createMock(PDO::class);
        $this->word = new Word($this->db);
    }

    public function testGetRandomWord() {
        $stmt = $this->createMock(PDOStatement::class);
        $stmt->method('fetch')
            ->willReturn(['id' => 1, 'word' => 'TESTS']);

        $this->db->method('prepare')
            ->willReturn($stmt);

        $result = $this->word->getRandomWord();
        $this->assertEquals('TESTS', $result);
    }

    public function testValidateWord() {
        $stmt = $this->createMock(PDOStatement::class);
        $stmt->method('fetch')
            ->willReturn(['count' => 1]);

        $this->db->method('prepare')
            ->willReturn($stmt);

        $result = $this->word->validateWord('VALID');
        $this->assertTrue($result);
    }
}