<?php
// api/estudo_pomodoros.php
header('Content-Type: application/json');
require_once '../includes/db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case 'GET':
        $estudo_id = intval($_GET['estudo_id'] ?? 0);
        if (!$estudo_id) { http_response_code(400); echo json_encode(['erro' => 'estudo_id inválido.']); break; }
        // Retorna apenas os do dia atual
        $stmt = $pdo->prepare("SELECT * FROM estudo_pomodoros WHERE estudo_id = ? AND DATE(criado_em) = CURDATE() ORDER BY criado_em ASC");
        $stmt->execute([$estudo_id]);
        echo json_encode($stmt->fetchAll());
        break;

    case 'POST':
        $body      = json_decode(file_get_contents('php://input'), true);
        $estudo_id = intval($body['estudo_id'] ?? 0);
        $minutos   = intval($body['minutos']   ?? 25);
        if (!$estudo_id) { http_response_code(400); echo json_encode(['erro' => 'estudo_id inválido.']); break; }
        $stmt = $pdo->prepare("INSERT INTO estudo_pomodoros (estudo_id, minutos, concluido) VALUES (?,?,1)");
        $stmt->execute([$estudo_id, $minutos]);
        echo json_encode(['id' => $pdo->lastInsertId(), 'minutos' => $minutos]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['erro' => 'Método não permitido.']);
}