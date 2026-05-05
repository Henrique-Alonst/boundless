<?php
header('Content-Type: application/json');
require_once '../includes/db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case 'PATCH':
        $id        = intval($_GET['id'] ?? 0);
        $body      = json_decode(file_get_contents('php://input'), true);
        $anotacoes = trim($body['anotacoes'] ?? '');

        if (!$id) {
            http_response_code(400);
            echo json_encode(['erro' => 'ID inválido.']);
            break;
        }

        $stmt = $pdo->prepare("UPDATE objetivos SET anotacoes = ? WHERE id = ?");
        $stmt->execute([$anotacoes, $id]);
        echo json_encode(['mensagem' => 'Anotações salvas.']);
        break;

    default:
        http_response_code(405);
        echo json_encode(['erro' => 'Método não permitido.']);
}