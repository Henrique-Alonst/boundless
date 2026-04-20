// ===== CADERNO =====
const notaTexto = document.getElementById('notaTexto');
const notesList = document.getElementById('notesList');

function carregarNotas(){
  fetch('api/notas.php')
  .then(r => r.json())
  .then(notas =>{
    notesList.innerHTML = ''; //limpa antes de carregar
    notas.forEach(n => adicionarNota(n.texto, n.id));
  });
}
//salvar nota
document.getElementById('btnSalvar').addEventListener('click', () => {
  const texto = notaTexto.value.trim();
  if (!texto) return;
  
  fetch('api/notas.php', {
    method: 'POST',
    headers: { 'content-type': 'application/json'},
    body: JSON.stringify({ texto })
  })
  .then(r => r.json())
  .then(data =>{
    adicionarNota(data.texto, data.id);
    notaTexto.value = '';
  });
});

function adicionarNota(texto, id) {
  const nota = document.createElement('div');
  nota.classList.add('note-item');
  nota.dataset.id = id;

  const meta = document.createElement('p');
  meta.classList.add('note-meta');
  meta.textContent = fmtDate(new Date());

  const conteudo = document.createElement('p');
  conteudo.classList.add('note-text');
  conteudo.textContent = texto;

  const acoes = criarAcoes(
    // Editar
    () => {
      const novoTexto = prompt('Editar anotação:', conteudo.textContent);
      if (novoTexto !== null && novoTexto.trim()) {
        fetch(`api/notas.php?id=${id}`, {
          method: 'PATCH',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ texto: novoTexto.trim() })
        })                    // ← fecha o fetch aqui
        .then(() => {
          conteudo.textContent = novoTexto.trim();
          meta.textContent = fmtDate(new Date()) + ' (editado)';
        });
      }
    },
    // Apagar
    () => {
      if (confirm('Apagar esta anotação?')) {
        fetch(`api/notas.php?id=${id}`, { method: 'DELETE' })
        .then(() => nota.remove());
      }
    }
  );

  nota.appendChild(meta);
  nota.appendChild(conteudo);
  nota.appendChild(acoes);
  notesList.prepend(nota);
}

document.getElementById('btnCaderno').addEventListener('click', () => {
  showView('caderno');
  carregarNotas();
});