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

  // Retorna função pra pegar o src quando precisar
  return () => preview.style.display !== 'none' ? preview.src : null;
}

//Botão de esconder/mostrar model de criar objetivos & projetos
/**
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

// Cria botões de ação (editar/apagar) padronizados
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

function adicionarCard(gridId, nome, desc, status, tags, link, imgSrc, placeholder) {
  const statusLabel = { ativo: 'Ativo', pausado: 'Pausado', concluido: 'Concluído' }[status];

  const tagHTML = tags
    ? tags.split(',').map(t => `<span class="tag">${t.trim()}</span>`).join('')
    : '';

  const linkHTML = link
    ? `<a class="card-link" href="${link}" target="_blank">↗ VER PROJETO</a>`
    : '';

  const card = document.createElement('div');
  card.classList.add('project-card');

  const imgEl = imgSrc
    ? `<img class="card-img" src="${imgSrc}" alt="${nome}">`
    : `<div class="card-img-placeholder">${placeholder}</div>`;

  const statusTag = document.createElement('span');
  statusTag.className = `tag status-${status}`;
  statusTag.textContent = statusLabel;

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

  // Editar status clicando na tag
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
    // Editar nome e descrição
    () => {
      const novoNome = prompt('Nome:', card.querySelector('.card-name').textContent);
      if (novoNome !== null && novoNome.trim()) {
        card.querySelector('.card-name').textContent = novoNome.trim();
      }
      const novaDesc = prompt('Descrição:', card.querySelector('.card-desc').textContent);
      if (novaDesc !== null) {
        card.querySelector('.card-desc').textContent = novaDesc.trim() || 'Sem descrição.';
      }
    },
    // Apagar card
    () => {
      if (confirm('Apagar este item?')) card.remove();
    }
  );

  card.querySelector('.card-body').appendChild(acoes);
  document.getElementById(gridId).prepend(card);
}


