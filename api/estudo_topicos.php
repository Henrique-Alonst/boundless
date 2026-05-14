<?php
// api/estudo_topicos.php
header('Content-Type: application/json');
require_once '../includes/db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case 'GET':
        $estudo_id = intval($_GET['estudo_id'] ?? 0);
        if (!$estudo_id) { http_response_code(400); echo json_encode(['erro' => 'estudo_id inválido.']); break; }
        $stmt = $pdo->prepare("SELECT * FROM estudo_topicos WHERE estudo_id = ? ORDER BY criado_em ASC");
        $stmt->execute([$estudo_id]);
        echo json_encode($stmt->fetchAll());
        break;

    case 'POST':
        $body      = json_decode(file_get_contents('php://input'), true);
        $estudo_id = intval($body['estudo_id'] ?? 0);
        $texto     = trim($body['texto'] ?? '');
        if (!$estudo_id || empty($texto)) { http_response_code(400); echo json_encode(['erro' => 'Dados inválidos.']); break; }
        $stmt = $pdo->prepare("INSERT INTO estudo_topicos (estudo_id, texto) VALUES (?,?)");
        $stmt->execute([$estudo_id, $texto]);
        echo json_encode(['id' => $pdo->lastInsertId(), 'texto' => $texto, 'concluido' => 0]);
        break;

    case 'PATCH':
        $id        = intval($_GET['id'] ?? 0);
        $body      = json_decode(file_get_contents('php://input'), true);
        $concluido = intval($body['concluido'] ?? 0);
        if (!$id) { http_response_code(400); echo json_encode(['erro' => 'ID inválido.']); break; }
        $pdo->prepare("UPDATE estudo_topicos SET concluido = ? WHERE id = ?")->execute([$concluido, $id]);
        echo json_encode(['mensagem' => 'Atualizado.']);
        break;

    case 'DELETE':
        $id = intval($_GET['id'] ?? 0);
        if (!$id) { http_response_code(400); echo json_encode(['erro' => 'ID inválido.']); break; }
        $pdo->prepare("DELETE FROM estudo_topicos WHERE id = ?")->execute([$id]);
        echo json_encode(['mensagem' => 'Removido.']);
        break;

    default:
        http_response_code(405);
        echo json_encode(['erro' => 'Método não permitido.']);
}