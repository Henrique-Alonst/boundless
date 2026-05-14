<?php
// api/estudos.php
header('Content-Type: application/json');
require_once '../includes/db.php';
 
// Detecta método (suporta PATCH simulado via POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['_method'])) {
    $method = strtoupper($_POST['_method']);
} else {
    $method = $_SERVER['REQUEST_METHOD'];
}
 
$input = json_decode(file_get_contents('php://input'), true);
 
// --- DRAG & DROP: atualizar ordem ---
if (isset($input['action']) && $input['action'] === 'update_order') {
    $ids = $input['ids'];
    $pdo->beginTransaction();
    try {
        foreach ($ids as $index => $id) {
            $stmt = $pdo->prepare("UPDATE estudos SET ordem = ? WHERE id = ?");
            $stmt->execute([$index, $id]);
        }
        $pdo->commit();
        echo json_encode(['status' => 'sucesso']);
    } catch (Exception $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(['erro' => $e->getMessage()]);
    }
    exit;
}
 
switch ($method) {
 
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM estudos ORDER BY ordem ASC");
        echo json_encode($stmt->fetchAll());
        break;
 
    case 'POST':
        $nome   = trim($_POST['nome']   ?? '');
        $desc   = trim($_POST['desc']   ?? '');
        $status = trim($_POST['status'] ?? 'ativo');
 
        $nome_imagem = null;
        if (isset($_FILES['imagem_arquivo']) && $_FILES['imagem_arquivo']['error'] === 0) {
            $ext       = strtolower(pathinfo($_FILES['imagem_arquivo']['name'], PATHINFO_EXTENSION));
            $novo_nome = uniqid() . '.' . $ext;
            $dir       = '../uploads/';
            if (!is_dir($dir)) mkdir($dir, 0777, true);
            if (move_uploaded_file($_FILES['imagem_arquivo']['tmp_name'], $dir . $novo_nome)) {
                $nome_imagem = $novo_nome;
            }
        }
 
        if (empty($nome)) {
            http_response_code(400);
            echo json_encode(['erro' => 'Nome obrigatório.']);
            break;
        }
 
        $stmt = $pdo->prepare("INSERT INTO estudos (nome, descricao, status, imagem, ordem) VALUES (?,?,?,?,0)");
        $stmt->execute([$nome, $desc, $status, $nome_imagem]);
        echo json_encode(['id' => $pdo->lastInsertId(), 'nome' => $nome]);
        break;
 
    case 'PATCH':
        $id   = intval($_GET['id'] ?? 0);
        $nome = trim($_POST['nome'] ?? '');
        $desc = trim($_POST['desc'] ?? '');
 
        if (!$id || empty($nome)) {
            http_response_code(400);
            echo json_encode(['erro' => 'Dados inválidos.']);
            break;
        }
 
        $nome_imagem = null;
        if (isset($_FILES['imagem_arquivo']) && $_FILES['imagem_arquivo']['error'] === 0) {
            $ext       = strtolower(pathinfo($_FILES['imagem_arquivo']['name'], PATHINFO_EXTENSION));
            $novo_nome = uniqid() . '.' . $ext;
            $dir       = '../uploads/';
            if (move_uploaded_file($_FILES['imagem_arquivo']['tmp_name'], $dir . $novo_nome)) {
                $nome_imagem = $novo_nome;
                // apaga imagem antiga
                $s = $pdo->prepare("SELECT imagem FROM estudos WHERE id = ?");
                $s->execute([$id]);
                $row = $s->fetch();
                if ($row && $row['imagem']) @unlink('../uploads/' . $row['imagem']);
            }
        }
 
        if ($nome_imagem) {
            $stmt = $pdo->prepare("UPDATE estudos SET nome=?, descricao=?, imagem=? WHERE id=?");
            $stmt->execute([$nome, $desc, $nome_imagem, $id]);
        } else {
            $stmt = $pdo->prepare("UPDATE estudos SET nome=?, descricao=? WHERE id=?");
            $stmt->execute([$nome, $desc, $id]);
        }
 
        echo json_encode(['mensagem' => 'Atualizado.']);
        break;
 
    case 'DELETE':
        $id = intval($_GET['id'] ?? 0);
        if (!$id) { http_response_code(400); echo json_encode(['erro' => 'ID inválido.']); break; }
 
        $s = $pdo->prepare("SELECT imagem FROM estudos WHERE id = ?");
        $s->execute([$id]);
        $row = $s->fetch();
        if ($row && $row['imagem']) @unlink('../uploads/' . $row['imagem']);
 
        $pdo->prepare("DELETE FROM estudos WHERE id = ?")->execute([$id]);
        echo json_encode(['mensagem' => 'Removido.']);
        break;
 
    default:
        http_response_code(405);
        echo json_encode(['erro' => 'Método não permitido.']);
}