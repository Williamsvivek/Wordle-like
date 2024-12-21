<?php
use PHPUnit\Framework\TestCase;

class WordControllerTest extends TestCase {
    private $controller;

    protected function setUp(): void {
        $this->controller = new WordController();
    }

    public function testCompareWordsExactMatch() {
        $result = $this->invokeMethod($this->controller, 'compareWords', ['TESTS', 'TESTS']);
        $this->assertEquals([1, 1, 1, 1, 1], $result);
    }

    public function testCompareWordsPartialMatch() {
        $result = $this->invokeMethod($this->controller, 'compareWords', ['STEAM', 'STAMP']);
        $this->assertEquals([1, 1, 1, 3, 2], $result);
    }

    public function testCompareWordsNoMatch() {
        $result = $this->invokeMethod($this->controller, 'compareWords', ['QUICK', 'STAMP']);
        $this->assertEquals([3, 3, 3, 3, 3], $result);
    }

    private function invokeMethod($object, $methodName, array $parameters = []) {
        $reflection = new \ReflectionClass(get_class($object));
        $method = $reflection->getMethod($methodName);
        $method->setAccessible(true);
        return $method->invokeArgs($object, $parameters);
    }
}