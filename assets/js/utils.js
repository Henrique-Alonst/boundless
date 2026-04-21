// assets/js/utils.js

/**
 * Inicializa o upload e preview de imagem
 * @param {string} inputId  - id do input file
 * @param {string} previewId - id da tag img de preview
 * @returns {Function} getImageSrc - chama pra pegar o src atual da imagem
 */
function initImageUpload(inputId, previewId) {
  const input   = document.getElementById(inputId);
  const preview = document.getElementById(previewId);

  input.addEventListener('change', () => {
    const file = input.files[0];
    if (!file) { preview.style.display = 'none'; return; }
    const reader = new FileReader();
    reader.onload = e => {
      preview.src = e.target.result;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  });

  return () => preview.style.display !== 'none' ? preview.src : null;
}

/**
 * Accordion — clica no título pra abrir/fechar o form
 * @param {string} toggleId - id do título clicável
 * @param {string} formId   - id do form a mostrar/esconder
 */
function initAccordion(toggleId, formId) {
  const toggle = document.getElementById(toggleId);
  const form   = document.getElementById(formId);

  toggle.addEventListener('click', () => {
    form.classList.toggle('aberto');
  });
}

/**
 * Cria botões de ação (editar/apagar) padronizados
 * @param {Function} onEditar
 * @param {Function} onApagar
 */
function criarAcoes(onEditar, onApagar) {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex; gap:6px; margin-top:8px;';

  const btnEdit = document.createElement('button');
  btnEdit.textContent = '✎ Editar';
  btnEdit.style.cssText = `
    font-family:'Special Elite',monospace;
    font-size:10px; letter-spacing:1px;
    background:none; border:1px solid var(--ink-light);
    border-radius:2px; padding:3px 8px;
    cursor:pointer; color:var(--ink-faded);
    transition: all 0.15s;
  `;
  btnEdit.addEventListener('click', onEditar);

  const btnDel = document.createElement('button');
  btnDel.textContent = '✕ Apagar';
  btnDel.style.cssText = `
    font-family:'Special Elite',monospace;
    font-size:10px; letter-spacing:1px;
    background:none; border:1px solid var(--red-margin);
    border-radius:2px; padding:3px 8px;
    cursor:pointer; color:var(--red-margin);
    transition: all 0.15s;
  `;
  btnDel.addEventListener('click', onApagar);

  wrap.appendChild(btnEdit);
  wrap.appendChild(btnDel);
  return wrap;
}

/**
 * Adiciona um card de projeto/objetivo no grid
 * @param {string} gridId       - id do grid onde o card vai entrar
 * @param {string} nome         - nome do projeto/objetivo
 * @param {string} desc         - descrição
 * @param {string} status       - ativo | pausado | concluido
 * @param {string} tags         - tags separadas por vírgula
 * @param {string} link         - link externo
 * @param {string|null} imgSrc  - src da imagem ou null
 * @param {string} placeholder  - emoji placeholder quando não tem imagem
 * @param {number|null} id      - id do banco de dados (null se não tiver backend)
 * @param {string|null} endpoint - endpoint da api (ex: 'api/projetos.php')
 */
function adicionarCard(gridId, nome, desc, status, tags, link, imgSrc, placeholder, id = null, endpoint = null) {
  const statusLabel = { ativo: 'Ativo', pausado: 'Pausado', concluido: 'Concluído' }[status];

  const tagHTML = tags
    ? tags.split(',').map(t => `<span class="tag">${t.trim()}</span>`).join('')
    : '';

  const linkHTML = link
    ? `<a class="card-link" href="${link}" target="_blank">↗ VER PROJETO</a>`
    : '';

  const imgEl = imgSrc
    ? `<img class="card-img" src="${imgSrc}" alt="${nome}">`
    : `<div class="card-img-placeholder">${placeholder}</div>`;

  const card = document.createElement('div');
  card.classList.add('project-card');

  card.innerHTML = `
    ${imgEl}
    <div class="card-body">
      <div class="card-name">${nome}</div>
      <div class="card-desc">${desc || 'Sem descrição.'}</div>
      <div class="card-tags">
        <span class="tag status-${status} tag-status-editavel" style="cursor:pointer;" title="Clique para mudar status">${statusLabel}</span>
        ${tagHTML}
      </div>
      ${linkHTML}
    </div>`;

  // Ciclo de status ao clicar na tag
  const tagStatus = card.querySelector('.tag-status-editavel');
  const statusCiclo = ['ativo', 'pausado', 'concluido'];
  const labelCiclo  = ['Ativo', 'Pausado', 'Concluído'];
  let statusAtual = statusCiclo.indexOf(status);

  tagStatus.addEventListener('click', () => {
    statusAtual = (statusAtual + 1) % 3;
    tagStatus.className = `tag status-${statusCiclo[statusAtual]} tag-status-editavel`;
    tagStatus.style.cursor = 'pointer';
    tagStatus.title = 'Clique para mudar status';
    tagStatus.textContent = labelCiclo[statusAtual];
  });

  // Botões editar / apagar
  const acoes = criarAcoes(
    // Editar
    () => {
      const novoNome = prompt('Nome:', card.querySelector('.card-name').textContent);
      if (novoNome !== null && novoNome.trim()) {
        const novaDesc = prompt('Descrição:', card.querySelector('.card-desc').textContent);
        if (id && endpoint) {
          // Com backend — salva no banco
          fetch(`${endpoint}?id=${id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ nome: novoNome.trim(), desc: novaDesc?.trim() || '' })
          })
          .then(() => {
            card.querySelector('.card-name').textContent = novoNome.trim();
            card.querySelector('.card-desc').textContent = novaDesc?.trim() || 'Sem descrição.';
          });
        } else {
          // Sem backend — só atualiza na tela
          card.querySelector('.card-name').textContent = novoNome.trim();
          card.querySelector('.card-desc').textContent = novaDesc?.trim() || 'Sem descrição.';
        }
      }
    },
    // Apagar
    () => {
      if (confirm('Apagar este item?')) {
        if (id && endpoint) {
          // Com backend — remove do banco
          fetch(`${endpoint}?id=${id}`, { method: 'DELETE' })
            .then(() => card.remove());
        } else {
          // Sem backend — só remove da tela
          card.remove();
        }
      }
    }
  );

  card.querySelector('.card-body').appendChild(acoes);
  document.getElementById(gridId).prepend(card);
}