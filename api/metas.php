<?php
header('Content-Type: application/json');
require_once '../includes/db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case 'GET':
        
        $stmt = $pdo->query("SELECT * FROM metas ");
        echo json_encode($stmt->fetchall());
        break;

    case 'POST':
        // Cria uma nova meta
        $body  = json_decode(file_get_contents('php://input'), true);
        $texto = trim($body['texto'] ?? '');

        if (empty($texto)) {
            http_response_code(400);
            echo json_encode(['erro' => 'Texto não pode ser vazio.']);
            break;
        }
        $stmt = $pdo->prepare("INSERT INTO metas (texto) VALUES (?)");
        $stmt->execute([$texto]);
        echo json_encode(['id' => $pdo->lastInsertId(), 'texto' => $texto]);
        break;

    case 'PATCH':
        // Atualiza status de uma meta (marcar como concluída)
        $id        = intval($_GET['id'] ?? 0);
        $body      = json_decode(file_get_contents('php://input'), true);
        $concluida = (bool)($body['concluida'] ?? false);

        if (!$id) {
            http_response_code(400);
            echo json_encode(['erro' => 'ID inválido.']);
            break;
        }

        // Exemplo futuro:
        // $stmt = $pdo->prepare("UPDATE metas SET concluida = ? WHERE id = ?");
        // $stmt->execute([(int)$concluida, $id]);

        echo json_encode(['mensagem' => "Meta $id atualizada (simulado)"]);
        break;

    case 'DELETE':
        $id = intval($_GET['id'] ?? 0);

        if (!$id) {
            http_response_code(400);
            echo json_encode(['erro' => 'ID inválido.']);
            break;
        }

    

        echo json_encode(['mensagem' => "Meta $id removida (simulado)"]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['erro' => 'Método não permitido.']);
}
