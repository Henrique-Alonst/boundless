<?php
header('Content-Type: application/json');
require_once '../includes/db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case 'GET':
        $fatura_id = intval($_GET['fatura_id'] ?? 0);

        if (!$fatura_id) {
            http_response_code(400);
            echo json_encode(['erro' => 'fatura_id inválido.']);
            break;
        }

        $stmt = $pdo->prepare("SELECT * FROM gastos WHERE fatura_id = ? ORDER BY criado_em ASC");
        $stmt->execute([$fatura_id]);
        echo json_encode($stmt->fetchAll());
        break;

    case 'POST':
        $body      = json_decode(file_get_contents('php://input'), true);
        $fatura_id = intval($body['fatura_id'] ?? 0);
        $pessoa    = trim($body['pessoa'] ?? '');
        $valor     = floatval($body['valor'] ?? 0);

        if (!$fatura_id || empty($pessoa)) {
            http_response_code(400);
            echo json_encode(['erro' => 'Dados inválidos.']);
            break;
        }

        $stmt = $pdo->prepare("INSERT INTO gastos (fatura_id, pessoa, valor) VALUES (?,?,?)");
        $stmt->execute([$fatura_id, $pessoa, $valor]);
        echo json_encode(['id' => $pdo->lastInsertId(), 'pessoa' => $pessoa, 'valor' => $valor]);
        break;

    case 'PATCH':
        $id   = intval($_GET['id'] ?? 0);
        $body = json_decode(file_get_contents('php://input'), true);

        if (!$id) {
            http_response_code(400);
            echo json_encode(['erro' => 'ID inválido.']);
            break;
        }

        if (isset($body['pago'])) {
            $stmt = $pdo->prepare("UPDATE gastos SET pago = ? WHERE id = ?");
            $stmt->execute([intval($body['pago']), $id]);
        } elseif (isset($body['valor'])) {
            $stmt = $pdo->prepare("UPDATE gastos SET valor = ? WHERE id = ?");
            $stmt->execute([floatval($body['valor']), $id]);
        }

        echo json_encode(['mensagem' => 'Gasto atualizado.']);
        break;

    case 'DELETE':
        $id = intval($_GET['id'] ?? 0);

        if (!$id) {
            http_response_code(400);
            echo json_encode(['erro' => 'ID inválido.']);
            break;
        }

        $stmt = $pdo->prepare("DELETE FROM gastos WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['mensagem' => 'Gasto removido.']);
        break;

    default:
        http_response_code(405);
        echo json_encode(['erro' => 'Método não permitido.']);
}