<?php
header('Content-Type: application/json');
require_once '../includes/db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case 'GET':
        $objetivo_id = intval($_GET['objetivo_id'] ?? 0);
        if (!$objetivo_id) {
            http_response_code(400);
            echo json_encode(['erro' => 'objetivo_id inválido.']);
            break;
        }
        $stmt = $pdo->prepare("SELECT * FROM objetivo_tarefas WHERE objetivo_id = ? ORDER BY criado_em ASC");
        $stmt->execute([$objetivo_id]);
        echo json_encode($stmt->fetchAll());
        break;

    case 'POST':
        $body        = json_decode(file_get_contents('php://input'), true);
        $objetivo_id = intval($body['objetivo_id'] ?? 0);
        $texto       = trim($body['texto'] ?? '');

        if (!$objetivo_id || empty($texto)) {
            http_response_code(400);
            echo json_encode(['erro' => 'Dados inválidos.']);
            break;
        }

        $stmt = $pdo->prepare("INSERT INTO objetivo_tarefas (objetivo_id, texto) VALUES (?,?)");
        $stmt->execute([$objetivo_id, $texto]);
        echo json_encode(['id' => $pdo->lastInsertId(), 'texto' => $texto, 'concluida' => 0]);
        break;

    case 'PATCH':
        $id        = intval($_GET['id'] ?? 0);
        $body      = json_decode(file_get_contents('php://input'), true);
        $concluida = intval($body['concluida'] ?? 0);

        if (!$id) {
            http_response_code(400);
            echo json_encode(['erro' => 'ID inválido.']);
            break;
        }

        $stmt = $pdo->prepare("UPDATE objetivo_tarefas SET concluida = ? WHERE id = ?");
        $stmt->execute([$concluida, $id]);
        echo json_encode(['mensagem' => 'Tarefa atualizada.']);
        break;

    case 'DELETE':
        $id = intval($_GET['id'] ?? 0);

        if (!$id) {
            http_response_code(400);
            echo json_encode(['erro' => 'ID inválido.']);
            break;
        }

        $stmt = $pdo->prepare("DELETE FROM objetivo_tarefas WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['mensagem' => 'Tarefa removida.']);
        break;

    default:
        http_response_code(405);
        echo json_encode(['erro' => 'Método não permitido.']);
}