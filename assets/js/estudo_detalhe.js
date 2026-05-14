// assets/js/estudo_detalhe.js

let estAtualId = null;

// =============================================
// ABRIR DETALHE
// =============================================
function abrirEstudoDetalhe(id, nome, desc, status, imgSrc) {
  estAtualId = id;
  localStorage.setItem('estDetalheId', id);

  // Cabeçalho
  document.getElementById('estDetalheName').textContent = nome;
  document.getElementById('estDetalheDesc').textContent = desc || 'Sem descrição.';

  // Status
  const tagStatus   = document.getElementById('estDetalheStatusTag');
  const statusCiclo = ['ativo', 'pausado', 'concluido'];
  const labelCiclo  = ['Ativo', 'Pausado', 'Concluído'];
  let statusAtual   = statusCiclo.indexOf(status) !== -1 ? statusCiclo.indexOf(status) : 0;
  tagStatus.textContent = labelCiclo[statusAtual];
  tagStatus.className   = `tag status-${statusCiclo[statusAtual]} tag-status-editavel`;

  tagStatus.onclick = () => {
    statusAtual = (statusAtual + 1) % 3;
    tagStatus.textContent = labelCiclo[statusAtual];
    tagStatus.className   = `tag status-${statusCiclo[statusAtual]} tag-status-editavel`;
    const fd = new FormData();
    fd.append('_method', 'PATCH');
    fd.append('nome', document.getElementById('estDetalheName').textContent.trim());
    fd.append('desc', document.getElementById('estDetalheDesc').textContent.trim());
    fd.append('status', statusCiclo[statusAtual]);
    fetch(`api/estudos.php?id=${estAtualId}`, { method: 'POST', body: fd });
  };

  // Imagem
  const imgWrap = document.getElementById('estDetalheImg');
  imgWrap.innerHTML = imgSrc
    ? `<img src="${imgSrc}" style="width:100%;height:100%;object-fit:cover;">`
    : '📚';

  // Pomodoro: reset visual
  pomodoroReset();
  carregarPomodoros(id);

  // Carrega dados do banco
  carregarTopicos(id);
  carregarLinks(id);
  carregarEstudoAnotacoes(id);

  showView('estudo-detalhe');
}

// =============================================
// TÓPICOS (Roadmap)
// =============================================
function carregarTopicos(estudoId) {
  fetch(`api/estudo_topicos.php?estudo_id=${estudoId}`)
    .then(r => r.json())
    .then(topicos => {
      document.getElementById('estDetalheTopicos').innerHTML = '';
      topicos.forEach(t => adicionarTopico(t.id, t.texto, t.concluido));
      atualizarProgressoEstudo();
    });
}

function adicionarTopico(id, texto, concluido) {
  const lista = document.getElementById('estDetalheTopicos');
  const item  = document.createElement('div');
  item.style.cssText = 'display:flex; align-items:center; gap:10px;';

  const isConcluido = parseInt(concluido) === 1;
  item.innerHTML = `
    <input type="checkbox" class="topico-check" ${isConcluido ? 'checked' : ''} style="
      appearance:none; -webkit-appearance:none;
      width:16px; height:16px;
      border:1.5px solid var(--ink-light);
      border-radius:1px; flex-shrink:0; cursor:pointer;
      position:relative;
      background:${isConcluido ? 'var(--green)' : 'transparent'};
      border-color:${isConcluido ? 'var(--green)' : 'var(--ink-light)'};
      transition:all 0.15s;
    ">
    <span class="topico-texto" style="
      flex:1; font-family:'Lora',Georgia,serif;
      font-size:14px; color:var(--ink-faded);
      ${isConcluido ? 'text-decoration:line-through; opacity:0.5;' : ''}
    ">${texto}</span>
    <button class="btn-rem-topico" style="
      background:none; border:none; cursor:pointer;
      color:var(--ink-light); font-size:12px; opacity:0.5;
    ">✕</button>
  `;

  const check   = item.querySelector('.topico-check');
  const textoEl = item.querySelector('.topico-texto');

  check.addEventListener('change', () => {
    textoEl.style.textDecoration = check.checked ? 'line-through' : 'none';
    textoEl.style.opacity        = check.checked ? '0.5' : '1';
    check.style.background       = check.checked ? 'var(--green)' : 'transparent';
    check.style.borderColor      = check.checked ? 'var(--green)' : 'var(--ink-light)';
    fetch(`api/estudo_topicos.php?id=${id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ concluido: check.checked ? 1 : 0 })
    });
    atualizarProgressoEstudo();
  });

  item.querySelector('.btn-rem-topico').addEventListener('click', () => {
    fetch(`api/estudo_topicos.php?id=${id}`, { method: 'DELETE' })
      .then(() => { item.remove(); atualizarProgressoEstudo(); });
  });

  lista.appendChild(item);
}

function atualizarProgressoEstudo() {
  const checks = document.querySelectorAll('#estDetalheTopicos .topico-check');
  const total  = checks.length;
  const feitos = [...checks].filter(c => c.checked).length;
  const pct    = total > 0 ? Math.round((feitos / total) * 100) : 0;
  document.getElementById('estDetalheProgressFill').style.width = pct + '%';
  document.getElementById('estDetalheProgressLabel').textContent = `${pct}% concluído (${feitos}/${total})`;
}

document.getElementById('estDetalheAddTopico').addEventListener('click', () => {
  const texto = document.getElementById('estDetalheNovoTopico').value.trim();
  if (!texto || !estAtualId) return;
  fetch('api/estudo_topicos.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ estudo_id: estAtualId, texto })
  })
  .then(r => r.json())
  .then(data => {
    adicionarTopico(data.id, data.texto, 0);
    atualizarProgressoEstudo();
    document.getElementById('estDetalheNovoTopico').value = '';
  });
});

document.getElementById('estDetalheNovoTopico').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('estDetalheAddTopico').click();
});

// =============================================
// LINKS
// =============================================
function carregarLinks(estudoId) {
  fetch(`api/estudo_links.php?estudo_id=${estudoId}`)
    .then(r => r.json())
    .then(links => {
      document.getElementById('estDetalheLinks').innerHTML = '';
      links.forEach(l => adicionarLinkNaTela(l.id, l.titulo, l.url));
    });
}

function adicionarLinkNaTela(id, titulo, url) {
  const lista = document.getElementById('estDetalheLinks');
  const item  = document.createElement('div');
  item.style.cssText = 'display:flex; align-items:center; gap:10px; padding:6px 0; border-bottom:1px dashed var(--paper-aged);';

  item.innerHTML = `
    <span style="font-size:14px;">🔗</span>
    <a href="${url}" target="_blank" rel="noopener" style="
      flex:1; font-family:'Lora',Georgia,serif; font-size:14px;
      color:var(--green); text-decoration:none;
    " title="${url}">${titulo}</a>
    <button class="btn-rem-link" style="
      background:none; border:none; cursor:pointer;
      color:var(--ink-light); font-size:12px; opacity:0.5;
    ">✕</button>
  `;

  item.querySelector('.btn-rem-link').addEventListener('click', () => {
    fetch(`api/estudo_links.php?id=${id}`, { method: 'DELETE' })
      .then(() => item.remove());
  });

  lista.appendChild(item);
}

document.getElementById('estDetalheAddLink').addEventListener('click', () => {
  const titulo = document.getElementById('estLinkTitulo').value.trim();
  const url    = document.getElementById('estLinkUrl').value.trim();
  if (!titulo || !url || !estAtualId) return;

  fetch('api/estudo_links.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ estudo_id: estAtualId, titulo, url })
  })
  .then(r => r.json())
  .then(data => {
    adicionarLinkNaTela(data.id, data.titulo, data.url);
    document.getElementById('estLinkTitulo').value = '';
    document.getElementById('estLinkUrl').value    = '';
  });
});

document.getElementById('estLinkUrl').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('estDetalheAddLink').click();
});

// =============================================
// ANOTAÇÕES
// =============================================
function carregarEstudoAnotacoes(estudoId) {
  fetch('api/estudos.php')
    .then(r => r.json())
    .then(estudos => {
      const est = estudos.find(e => e.id == estudoId);
      if (est) document.getElementById('estDetalheAnotacoes').value = est.anotacoes || '';
    });
}

let anotacoesEstTimeout = null;
document.getElementById('estDetalheAnotacoes').addEventListener('input', () => {
  clearTimeout(anotacoesEstTimeout);
  anotacoesEstTimeout = setTimeout(() => {
    const anotacoes = document.getElementById('estDetalheAnotacoes').value;
    fetch(`api/estudo_anotacoes.php?id=${estAtualId}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ anotacoes })
    }).then(() => {
      const salvoEl = document.getElementById('estAnotacoesSalvo');
      salvoEl.style.opacity = '1';
      setTimeout(() => salvoEl.style.opacity = '0', 1500);
    });
  }, 800);
});

// =============================================
// SALVAR NOME / DESC
// =============================================
function salvarCabecalhoEstudo() {
  if (!estAtualId) return;
  const fd = new FormData();
  fd.append('_method', 'PATCH');
  fd.append('nome', document.getElementById('estDetalheName').textContent.trim());
  fd.append('desc', document.getElementById('estDetalheDesc').textContent.trim());
  fetch(`api/estudos.php?id=${estAtualId}`, { method: 'POST', body: fd });
}

document.getElementById('estDetalheName').addEventListener('blur', salvarCabecalhoEstudo);
document.getElementById('estDetalheDesc').addEventListener('blur', salvarCabecalhoEstudo);

// =============================================
// IMAGEM (troca no detalhe)
// =============================================
const estDetalheImgWrap  = document.getElementById('estDetalheImgWrap');
const estDetalheImgHover = document.getElementById('estDetalheImgHover');
const estDetalheImgInput = document.getElementById('estDetalheImgInput');

estDetalheImgWrap.addEventListener('mouseenter', () => estDetalheImgHover.style.opacity = '1');
estDetalheImgWrap.addEventListener('mouseleave', () => estDetalheImgHover.style.opacity = '0');
estDetalheImgWrap.addEventListener('click', () => estDetalheImgInput.click());

estDetalheImgInput.addEventListener('change', () => {
  const arquivo = estDetalheImgInput.files[0];
  if (!arquivo || !estAtualId) return;
  const fd = new FormData();
  fd.append('_method', 'PATCH');
  fd.append('nome', document.getElementById('estDetalheName').textContent.trim());
  fd.append('desc', document.getElementById('estDetalheDesc').textContent.trim());
  fd.append('imagem_arquivo', arquivo);
  fetch(`api/estudos.php?id=${estAtualId}`, { method: 'POST', body: fd })
    .then(() => {
      const reader = new FileReader();
      reader.onload = e => {
        document.getElementById('estDetalheImg').innerHTML =
          `<img src="${e.target.result}" style="width:100%;height:100%;object-fit:cover;">`;
      };
      reader.readAsDataURL(arquivo);
    });
});

// =============================================
// POMODORO
// =============================================
let pomodoroInterval = null;
let pomodoroSegundos = 25 * 60;
let pomodoroMinutosSelecionados = 25;
let pomodoroRodando = false;

function formatarTempo(seg) {
  const m = Math.floor(seg / 60);
  const s = seg % 60;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function pomodoroAtualizar() {
  document.getElementById('pomodoroDisplay').textContent = formatarTempo(pomodoroSegundos);
}

function pomodoroReset() {
  clearInterval(pomodoroInterval);
  pomodoroRodando  = false;
  pomodoroSegundos = pomodoroMinutosSelecionados * 60;
  pomodoroAtualizar();
  document.getElementById('btnPomodoroStart').style.display = '';
  document.getElementById('btnPomodoroPause').style.display = 'none';
}

function pomodoroConcluido() {
  clearInterval(pomodoroInterval);
  pomodoroRodando = false;
  document.getElementById('btnPomodoroStart').style.display = '';
  document.getElementById('btnPomodoroPause').style.display = 'none';
  document.getElementById('pomodoroDisplay').textContent = '✓ Concluído!';

  // Salva no banco
  if (estAtualId) {
    fetch('api/estudo_pomodoros.php', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ estudo_id: estAtualId, minutos: pomodoroMinutosSelecionados })
    }).then(() => carregarPomodoros(estAtualId));
  }

  // Notificação do navegador
  if (Notification.permission === 'granted') {
    new Notification('🍅 Pomodoro concluído!', { body: 'Hora de uma pausa.' });
  }
}

document.getElementById('btnPomodoroStart').addEventListener('click', () => {
  if (pomodoroRodando) return;
  if (Notification.permission === 'default') Notification.requestPermission();

  pomodoroRodando = true;
  document.getElementById('btnPomodoroStart').style.display = 'none';
  document.getElementById('btnPomodoroPause').style.display = '';

  pomodoroInterval = setInterval(() => {
    pomodoroSegundos--;
    pomodoroAtualizar();
    if (pomodoroSegundos <= 0) pomodoroConcluido();
  }, 1000);
});

document.getElementById('btnPomodoroPause').addEventListener('click', () => {
  clearInterval(pomodoroInterval);
  pomodoroRodando = false;
  document.getElementById('btnPomodoroStart').style.display = '';
  document.getElementById('btnPomodoroPause').style.display = 'none';
});

document.getElementById('btnPomodoroReset').addEventListener('click', pomodoroReset);

document.querySelectorAll('.pomodoro-preset').forEach(btn => {
  btn.addEventListener('click', () => {
    pomodoroMinutosSelecionados = parseInt(btn.dataset.min);
    // Destaca o botão selecionado
    document.querySelectorAll('.pomodoro-preset').forEach(b => {
      b.style.background   = 'var(--paper-aged)';
      b.style.borderColor  = 'var(--ink-light)';
      b.style.color        = 'var(--ink-faded)';
    });
    btn.style.background  = 'var(--accent)';
    btn.style.borderColor = 'var(--accent-dark)';
    btn.style.color       = '#fff';
    pomodoroReset();
  });
});

function carregarPomodoros(estudoId) {
  fetch(`api/estudo_pomodoros.php?estudo_id=${estudoId}`)
    .then(r => r.json())
    .then(sessoes => {
      const wrap = document.getElementById('pomodoroSessoes');
      wrap.innerHTML = '';
      sessoes.forEach(s => {
        const el = document.createElement('span');
        el.textContent = '🍅';
        el.title = `${s.minutos}min`;
        el.style.cssText = 'font-size:18px; cursor:default;';
        wrap.appendChild(el);
      });

      // Atualiza contador no cabeçalho
      const total = sessoes.reduce((acc, s) => acc + parseInt(s.minutos), 0);
      document.getElementById('estPomodoroCount').textContent =
        `🍅 ${sessoes.length} pomodoro${sessoes.length !== 1 ? 's' : ''} hoje · ${total} min focados`;
    });
}

// =============================================
// VOLTAR
// =============================================
document.getElementById('btnVoltarEstudo').addEventListener('click', () => {
  pomodoroReset(); // garante que o timer para ao sair
  showView('estudos');
  carregarEstudos();
});

// Restaura view ao recarregar
if (localStorage.getItem('viewAtual') === 'estudo-detalhe') {
  const idSalvo = localStorage.getItem('estDetalheId');
  if (idSalvo) {
    fetch('api/estudos.php')
      .then(r => r.json())
      .then(estudos => {
        const est = estudos.find(e => e.id == idSalvo);
        if (est) {
          abrirEstudoDetalhe(
            est.id, est.nome, est.descricao, est.status,
            est.imagem ? `uploads/${est.imagem}` : null
          );
        }
      });
  }
}