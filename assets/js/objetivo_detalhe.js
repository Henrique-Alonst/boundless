// assets/js/objetivo_detalhe.js

let objAtualId = null;

// ===== ABRIR DETALHE =====
function abrirObjetivoDetalhe(id, nome, desc, status, imgSrc) {
  objAtualId = id;
  localStorage.setItem('objDetalheId', id);

  // Preenche cabeçalho
  document.getElementById('objDetalheName').textContent = nome;
  document.getElementById('objDetalheDesc').textContent = desc || 'Sem descrição.';

  // Status
  const tagStatus   = document.getElementById('objDetalheStatusTag');
  const statusCiclo = ['ativo', 'pausado', 'concluido'];
  const labelCiclo  = ['Ativo', 'Pausado', 'Concluído'];
  let statusAtual   = statusCiclo.indexOf(status) !== -1 ? statusCiclo.indexOf(status) : 0;

  tagStatus.textContent = labelCiclo[statusAtual];
  tagStatus.className   = `tag status-${statusCiclo[statusAtual]} tag-status-editavel`;

  // Imagem
  const imgWrap = document.getElementById('objDetalheImg');
  if (imgSrc) {
    imgWrap.innerHTML = `<img src="${imgSrc}" style="width:100%;height:100%;object-fit:cover;">`;
  } else {
    imgWrap.innerHTML = '🎯';
  }

  // Carrega tarefas e anotações do banco
  carregarTarefas(id);
  carregarAnotacoes(id);

  showView('objetivo-detalhe');
}

// ===== CARREGAR TAREFAS =====
function carregarTarefas(objetivoId) {
  fetch(`api/objetivo_tarefas.php?objetivo_id=${objetivoId}`)
    .then(r => r.json())
    .then(tarefas => {
      const lista = document.getElementById('objDetalheTarefas');
      lista.innerHTML = '';
      tarefas.forEach(t => adicionarTarefa(t.id, t.texto, t.concluida));
      atualizarProgresso();
    });
}

// ===== CARREGAR ANOTAÇÕES =====
function carregarAnotacoes(objetivoId) {
  fetch(`api/objetivos.php`)
    .then(r => r.json())
    .then(objetivos => {
      const obj = objetivos.find(o => o.id == objetivoId);
      if (obj) document.getElementById('objDetalheAnotacoes').value = obj.anotacoes || '';
    });
}

// ===== ADICIONAR TAREFA =====
function adicionarTarefa(id, texto, concluida) {
  const lista = document.getElementById('objDetalheTarefas');
  const item  = document.createElement('div');
  item.style.cssText = 'display:flex; align-items:center; gap:10px;';

  item.innerHTML = `
    <input type="checkbox" class="tarefa-check" ${concluida ? 'checked' : ''} style="
      appearance:none; -webkit-appearance:none;
      width:16px; height:16px;
      border:1.5px solid var(--ink-light);
      border-radius:1px; flex-shrink:0; cursor:pointer;
      position:relative; background:${concluida ? 'var(--green)' : 'transparent'};
      border-color:${concluida ? 'var(--green)' : 'var(--ink-light)'};
      transition:all 0.15s;
    ">
    <span class="tarefa-texto" style="
      flex:1; font-family:'Lora',Georgia,serif;
      font-size:14px; color:var(--ink-faded);
      ${concluida ? 'text-decoration:line-through; opacity:0.5;' : ''}
    ">${texto}</span>
    <button class="btn-rem-tarefa" style="
      background:none; border:none; cursor:pointer;
      color:var(--ink-light); font-size:12px; opacity:0.5;
    ">✕</button>
  `;

  const check   = item.querySelector('.tarefa-check');
  const textoEl = item.querySelector('.tarefa-texto');

  check.addEventListener('change', () => {
    textoEl.style.textDecoration = check.checked ? 'line-through' : 'none';
    textoEl.style.opacity        = check.checked ? '0.5' : '1';
    check.style.background       = check.checked ? 'var(--green)' : 'transparent';
    check.style.borderColor      = check.checked ? 'var(--green)' : 'var(--ink-light)';

    fetch(`api/objetivo_tarefas.php?id=${id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ concluida: check.checked ? 1 : 0 })
    });

    atualizarProgresso();
  });

  item.querySelector('.btn-rem-tarefa').addEventListener('click', () => {
    fetch(`api/objetivo_tarefas.php?id=${id}`, { method: 'DELETE' })
      .then(() => { item.remove(); atualizarProgresso(); });
  });

  lista.appendChild(item);
}

// ===== ATUALIZAR BARRA DE PROGRESSO =====
function atualizarProgresso() {
  const checks = document.querySelectorAll('#objDetalheTarefas .tarefa-check');
  const total   = checks.length;
  const feitos  = [...checks].filter(c => c.checked).length;
  const pct     = total > 0 ? Math.round((feitos / total) * 100) : 0;

  document.getElementById('objDetalheProgressFill').style.width = pct + '%';
  document.getElementById('objDetalheProgressLabel').textContent = `${pct}% concluído (${feitos}/${total})`;
}

// ===== ADICIONAR TAREFA — BOTÃO =====
document.getElementById('objDetalheAddTarefa').addEventListener('click', () => {
  const texto = document.getElementById('objDetalheNovaTarefa').value.trim();
  if (!texto || !objAtualId) return;

  fetch('api/objetivo_tarefas.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ objetivo_id: objAtualId, texto })
  })
  .then(r => r.json())
  .then(data => {
    adicionarTarefa(data.id, data.texto, 0);
    atualizarProgresso();
    document.getElementById('objDetalheNovaTarefa').value = '';
  });
});

document.getElementById('objDetalheNovaTarefa').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('objDetalheAddTarefa').click();
});

// ===== SALVAR ANOTAÇÕES =====
let anotacoesTimeout = null;
document.getElementById('objDetalheAnotacoes').addEventListener('input', () => {
  clearTimeout(anotacoesTimeout);
  anotacoesTimeout = setTimeout(() => {
    const anotacoes = document.getElementById('objDetalheAnotacoes').value;
    fetch(`api/objetivo_anotacoes.php?id=${objAtualId}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ anotacoes })
    });
  }, 800); // salva 800ms depois de parar de digitar
});

// ===== SALVAR NOME =====
document.getElementById('objDetalheName').addEventListener('blur', () => {
  const nome = document.getElementById('objDetalheName').textContent.trim();
  if (!nome || !objAtualId) return;

  const formData = new FormData();
  formData.append('_method', 'PATCH');
  formData.append('nome', nome);
  formData.append('desc', document.getElementById('objDetalheDesc').textContent.trim());
  fetch(`api/objetivos.php?id=${objAtualId}`, { method: 'POST', body: formData });
});

// ===== SALVAR DESC =====
document.getElementById('objDetalheDesc').addEventListener('blur', () => {
  const desc = document.getElementById('objDetalheDesc').textContent.trim();
  if (!objAtualId) return;

  const formData = new FormData();
  formData.append('_method', 'PATCH');
  formData.append('nome', document.getElementById('objDetalheName').textContent.trim());
  formData.append('desc', desc);
  fetch(`api/objetivos.php?id=${objAtualId}`, { method: 'POST', body: formData });
});

// ===== TROCAR IMAGEM =====
const objDetalheImgWrap  = document.getElementById('objDetalheImgWrap');
const objDetalheImgHover = document.getElementById('objDetalheImgHover');
const objDetalheImgInput = document.getElementById('objDetalheImgInput');

objDetalheImgWrap.addEventListener('mouseenter', () => objDetalheImgHover.style.opacity = '1');
objDetalheImgWrap.addEventListener('mouseleave', () => objDetalheImgHover.style.opacity = '0');
objDetalheImgWrap.addEventListener('click', () => objDetalheImgInput.click());

objDetalheImgInput.addEventListener('change', () => {
  const arquivo = objDetalheImgInput.files[0];
  if (!arquivo || !objAtualId) return;

  const formData = new FormData();
  formData.append('_method', 'PATCH');
  formData.append('nome', document.getElementById('objDetalheName').textContent.trim());
  formData.append('desc', document.getElementById('objDetalheDesc').textContent.trim());
  formData.append('imagem_arquivo', arquivo);

  fetch(`api/objetivos.php?id=${objAtualId}`, { method: 'POST', body: formData })
    .then(() => {
      const reader = new FileReader();
      reader.onload = e => {
        document.getElementById('objDetalheImg').innerHTML =
          `<img src="${e.target.result}" style="width:100%;height:100%;object-fit:cover;">`;
      };
      reader.readAsDataURL(arquivo);
    });
});

// ===== VOLTAR =====
document.getElementById('btnVoltarObjetivo').addEventListener('click', () => {
  showView('objetivos');
  carregarobjetivos();
});

if (localStorage.getItem('viewAtual') === 'objetivo-detalhe') {
  // Precisa do id salvo também
  const idSalvo = localStorage.getItem('objDetalheId');
  if (idSalvo) {
    // Busca o objetivo do banco e abre
    fetch('api/objetivos.php')
      .then(r => r.json())
      .then(objetivos => {
        const obj = objetivos.find(o => o.id == idSalvo);
        if (obj) {
          abrirObjetivoDetalhe(
            obj.id,
            obj.nome,
            obj.descricao,
            obj.status,
            obj.imagem ? `uploads/${obj.imagem}` : null
          );
        }
      });
  }
}