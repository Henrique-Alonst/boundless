<?php
header('Content-Type: application/json');
require_once '../includes/db.php';

$method = $_SERVER['REQUEST_METHOD'];


switch ($method) {

    case 'GET':
        
        $stmt = $pdo->query("SELECT * FROM notas ORDER BY criado_em DESC");
        echo json_encode($stmt->fetchall());
        break;

    case 'POST':
        // Salva uma nova nota
        $body  = json_decode(file_get_contents('php://input'), true);
        $texto = trim($body['texto'] ?? '');

        if (empty($texto)) {
            http_response_code(400);
            echo json_encode(['erro' => 'Texto não pode ser vazio.']);
            break;
        }
        $stmt = $pdo->prepare("INSERT INTO notas (texto) VALUES (?)");
        $stmt->execute([$texto]);
        echo json_encode(['id' => $pdo->lastInsertId(), 'texto' => $texto]);
        break;


    case 'DELETE':
        $id = intval($_GET['id'] ?? 0);
        $smt = $pdo->prepare("DELETE FROM notas WHERE id = ?");
        $smt->execute([$id]);
        echo json_encode(['mensagem' => 'Nota removida.']);
        break;

    case 'PATCH':
    $id = intval($_GET['id'] ?? 0);
    $body = json_decode(file_get_contents('php://input'), true); 
    $texto = trim($body['texto'] ?? '');
    
    if (!$id || empty($texto)) {
        http_response_code(400);
        echo json_encode(['erro' => 'Dados inválidos.']);
        break;
    }

    $stmt = $pdo->prepare("UPDATE notas SET texto = ? WHERE id = ?");
    $stmt->execute([$texto, $id]);
    echo json_encode(['mensagem' => 'Nota atualizada.']);
    break;

    default:
    http_response_code(405);
    echo json_encode(['erro' => 'Método não permitido.']);

        

}
