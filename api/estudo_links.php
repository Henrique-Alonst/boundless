<?php
// api/estudo_links.php
header('Content-Type: application/json');
require_once '../includes/db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case 'GET':
        $estudo_id = intval($_GET['estudo_id'] ?? 0);
        if (!$estudo_id) { http_response_code(400); echo json_encode(['erro' => 'estudo_id inválido.']); break; }
        $stmt = $pdo->prepare("SELECT * FROM estudo_links WHERE estudo_id = ? ORDER BY criado_em ASC");
        $stmt->execute([$estudo_id]);
        echo json_encode($stmt->fetchAll());
        break;

    case 'POST':
        $body      = json_decode(file_get_contents('php://input'), true);
        $estudo_id = intval($body['estudo_id'] ?? 0);
        $titulo    = trim($body['titulo'] ?? '');
        $url       = trim($body['url'] ?? '');
        if (!$estudo_id || empty($titulo) || empty($url)) { http_response_code(400); echo json_encode(['erro' => 'Dados inválidos.']); break; }
        $stmt = $pdo->prepare("INSERT INTO estudo_links (estudo_id, titulo, url) VALUES (?,?,?)");
        $stmt->execute([$estudo_id, $titulo, $url]);
        echo json_encode(['id' => $pdo->lastInsertId(), 'titulo' => $titulo, 'url' => $url]);
        break;

    case 'DELETE':
        $id = intval($_GET['id'] ?? 0);
        if (!$id) { http_response_code(400); echo json_encode(['erro' => 'ID inválido.']); break; }
        $pdo->prepare("DELETE FROM estudo_links WHERE id = ?")->execute([$id]);
        echo json_encode(['mensagem' => 'Removido.']);
        break;

    default:
        http_response_code(405);
        echo json_encode(['erro' => 'Método não permitido.']);
}