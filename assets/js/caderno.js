// ===== CADERNO =====
const notaTexto = document.getElementById('notaTexto');
const notesList = document.getElementById('notesList');

document.getElementById('btnSalvar').addEventListener('click', () => {
  const texto = notaTexto.value.trim();
  if (!texto) return;
  adicionarNota(texto);
  notaTexto.value = '';
});

function adicionarNota(texto) {
  const nota = document.createElement('div');
  nota.classList.add('note-item');

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
        conteudo.textContent = novoTexto.trim();
        meta.textContent = fmtDate(new Date()) + ' (editado)';
      }
    },
    // Apagar
    () => {
      if (confirm('Apagar esta anotação?')) nota.remove();
    }
  );

  nota.appendChild(meta);
  nota.appendChild(conteudo);
  nota.appendChild(acoes);
  notesList.prepend(nota);
}