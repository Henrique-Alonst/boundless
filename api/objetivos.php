<?php

header('Content-Type: application/json');
require_once '../includes/db.php'; 

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case 'GET':
        $stmt = $pdo->query("SELECT * FROM objetivos ORDER BY criado_em DESC");
        echo json_encode($stmt->fetchAll());
        break;

    case 'POST':
        // Salva um novo projeto
        $body   = json_decode(file_get_contents('php://input'), true);
        $nome   = trim($body['nome']   ?? '');
        $desc   = trim($body['desc']   ?? '');
        $status = trim($body['status'] ?? 'ativo');

        if (empty($nome)) {
            http_response_code(400);
            echo json_encode(['erro' => 'Nome não pode ser vazio.']);
            break;
        }

        
        $stmt = $pdo->prepare("INSERT INTO objetivos (nome, descricao, status) VALUES (?,?,?)");
        $stmt->execute([$nome, $desc, $status,]);
        echo json_encode(['id' => $pdo->lastInsertId(), 'nome' => $nome]);
        break;

    case 'DELETE':
        $id = intval($_GET['id'] ?? 0);

        if (!$id) {
            http_response_code(400);
            echo json_encode(['erro' => 'ID inválido.']);
            break;
        }

        $stmt = $pdo->prepare("DELETE FROM objetivos WHERE id = ?");
        $stmt->execute([$id]);

        echo json_encode(['mensagem' => "Projeto $id removido"]);
        break;
    
    case 'PATCH':
        $id = intval($_GET['id'] ?? 0);
        $body = json_decode(file_get_contents('php://input'), true);
        $nome = trim($body['nome'] ?? '');
        $desc = trim($body['desc'] ?? '');

        if(!$id || empty($nome)){
            http_response_code(400);
            echo json_encode(['erro' => 'Dados inválidos.']);
            break;
        }

        $stmt = $pdo->prepare("UPDATE objetivos SET nome = ?, descricao = ? WHERE id = ? ");
        $stmt->execute([$nome, $desc, $id]);
        echo json_encode(['mensagem' => 'Objetivo atualizado.']);
        break;

    default:
        http_response_code(405);
        echo json_encode(['erro' => 'Método não permitido.']);
}



