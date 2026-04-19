// assets/js/financas.js

const mesesNomes = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

function formatBRL(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// ===== TOTAL GERAL (só contas não pagas) =====
function calcularTotal() {
  let total = 0;
  document.querySelectorAll('.mes-card').forEach(card => {
    card.querySelectorAll('.conta-item').forEach(item => {
      const check = item.querySelector('.conta-check');
      if (!check.checked) {
        total += parseFloat(item.querySelector('.conta-valor').value.replace(',', '.')) || 0;
      }
    });
  });
  document.getElementById('totalGeralValor').textContent = formatBRL(total);
}

// ===== ATUALIZA TOTAIS E STATUS DO CARD =====
function atualizarMes(card) {
  const itens     = card.querySelectorAll('.conta-item');
  const orcamento = parseFloat(card.querySelector('.mes-orcamento').value.replace(',', '.')) || 0;

  let totalGasto  = 0;
  let totalPago   = 0;
  let countPago   = 0;

  itens.forEach(item => {
    const valor = parseFloat(item.querySelector('.conta-valor').value.replace(',', '.')) || 0;
    totalGasto += valor;
    if (item.querySelector('.conta-check').checked) {
      totalPago += valor;
      countPago++;
    }
  });

  const totalFalta = totalGasto - totalPago;

  // Total do mês (falta pagar)
  card.querySelector('.mes-total').textContent = `falta: ${formatBRL(totalFalta)}`;

  // Barra de progresso
  const pct = totalGasto > 0 ? Math.round((totalPago / totalGasto) * 100) : 0;
  card.querySelector('.progress-fill').style.width = pct + '%';
  card.querySelector('.progress-label').textContent = `${pct}% pago`;

  // Orçamento — alerta se passou
  const orcLabel = card.querySelector('.orcamento-status');
  if (orcamento > 0) {
    const diff = orcamento - totalGasto;
    if (diff < 0) {
      orcLabel.textContent  = `⚠ passou ${formatBRL(Math.abs(diff))} do orçamento`;
      orcLabel.style.color  = 'var(--red-margin)';
    } else {
      orcLabel.textContent  = `✓ sobram ${formatBRL(diff)}`;
      orcLabel.style.color  = 'var(--green)';
    }
  } else {
    orcLabel.textContent = '';
  }

  // Borda verde se tudo pago
  const tudoPago = itens.length > 0 && countPago === itens.length;
  card.style.borderColor = tudoPago ? 'var(--green)' : 'var(--ink-light)';
  card.style.boxShadow   = tudoPago ? '3px 3px 0 var(--green)' : '3px 3px 0 var(--ink-light)';

  calcularTotal();
}

// ===== CRIAR MÊS =====
function criarMes(nomeMes) {
  const card = document.createElement('div');
  card.classList.add('mes-card');
  card.style.cssText = `
    background: var(--paper-dark);
    border: 1.5px solid var(--ink-light);
    border-radius: 2px;
    box-shadow: 3px 3px 0 var(--ink-light);
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: border-color 0.3s, box-shadow 0.3s;
  `;

  card.innerHTML = `
    <!-- Cabeçalho -->
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <div contenteditable="true" class="mes-titulo" style="
        font-family: 'Caveat', cursive;
        font-size: 1.3rem;
        font-weight: 700;
        color: var(--ink);
        outline: none;
        cursor: text;
        min-width: 60px;
      ">${nomeMes}</div>
      <div style="display:flex; gap:8px; align-items:center;">
        <span class="mes-total" style="
          font-family: 'Special Elite', monospace;
          font-size: 11px;
          color: var(--ink-light);
          letter-spacing: 1px;
        ">falta: R$ 0,00</span>
        <button class="btn-rem-mes" style="
          background:none; border:none; cursor:pointer;
          color:var(--ink-light); font-size:14px; opacity:0.6;
        " title="Remover mês">✕</button>
      </div>
    </div>

    <!-- Orçamento -->
    <div style="display:flex; align-items:center; gap:8px;">
      <span style="font-family:'Special Elite',monospace; font-size:10px; letter-spacing:1px; color:var(--ink-light); text-transform:uppercase;">Orçamento</span>
      <input type="number" class="mes-orcamento" placeholder="R$ 0,00" step="0.01" min="0" style="
        width:90px;
        font-family:'Lora',Georgia,serif;
        font-size:13px;
        color:var(--ink);
        background:transparent;
        border:none;
        border-bottom:1px dashed var(--ink-light);
        outline:none;
        padding:2px 4px;
      ">
      <span class="orcamento-status" style="font-family:'Special Elite',monospace; font-size:10px; letter-spacing:0.5px;"></span>
    </div>

    <!-- Barra de progresso -->
    <div>
      <div style="
        height: 6px;
        background: var(--paper-aged);
        border-radius: 3px;
        overflow: hidden;
        margin-bottom: 3px;
      ">
        <div class="progress-fill" style="
          height: 100%;
          width: 0%;
          background: var(--green);
          border-radius: 3px;
          transition: width 0.3s ease;
        "></div>
      </div>
      <span class="progress-label" style="
        font-family:'Special Elite',monospace;
        font-size:10px;
        color:var(--ink-light);
        letter-spacing:1px;
      ">0% pago</span>
    </div>

    <!-- Lista de contas -->
    <div class="contas-lista" style="display:flex; flex-direction:column; gap:6px;"></div>

    <!-- Adicionar conta -->
    <div style="display:flex; gap:6px; margin-top:4px;">
      <input type="text" placeholder="Nome da conta" class="nova-conta-nome" style="
        flex:1;
        font-family:'Lora',Georgia,serif;
        font-size:13px;
        color:var(--ink);
        background:transparent;
        border:none;
        border-bottom:1px dashed var(--ink-light);
        outline:none;
        padding:2px 4px;
      ">
      <input type="number" placeholder="R$" class="nova-conta-valor" step="0.01" min="0" style="
        width:80px;
        font-family:'Lora',Georgia,serif;
        font-size:13px;
        color:var(--ink);
        background:transparent;
        border:none;
        border-bottom:1px dashed var(--ink-light);
        outline:none;
        padding:2px 4px;
      ">
      <button class="btn-add-conta" style="
        font-family:'Special Elite',monospace;
        font-size:16px;
        background:none;
        border:none;
        color:var(--green);
        cursor:pointer;
      " title="Adicionar conta">＋</button>
    </div>
  `;

  // Remover mês
  card.querySelector('.btn-rem-mes').addEventListener('click', () => {
    card.remove();
    calcularTotal();
  });

  // Orçamento — atualiza ao editar
  card.querySelector('.mes-orcamento').addEventListener('input', () => atualizarMes(card));

  // Adicionar conta
  card.querySelector('.btn-add-conta').addEventListener('click', () => {
    const nome  = card.querySelector('.nova-conta-nome').value.trim();
    const valor = parseFloat(card.querySelector('.nova-conta-valor').value.replace(',', '.')) || 0;
    if (!nome) return;
    adicionarConta(card, nome, valor);
    card.querySelector('.nova-conta-nome').value  = '';
    card.querySelector('.nova-conta-valor').value = '';
  });

  // Enter adiciona conta
  card.querySelector('.nova-conta-nome').addEventListener('keydown', e => {
    if (e.key === 'Enter') card.querySelector('.btn-add-conta').click();
  });

  document.getElementById('mesesGrid').appendChild(card);
  atualizarMes(card);
  return card;
}

// ===== ADICIONAR CONTA =====
function adicionarConta(card, nome, valor) {
  const lista = card.querySelector('.contas-lista');

  const item = document.createElement('div');
  item.classList.add('conta-item');
  item.style.cssText = 'display:flex; align-items:center; gap:8px;';

  item.innerHTML = `
    <input type="checkbox" class="conta-check" style="
      appearance:none; -webkit-appearance:none;
      width:14px; height:14px;
      border:1.5px solid var(--ink-light);
      border-radius:1px;
      flex-shrink:0;
      cursor:pointer;
      position:relative;
      background:transparent;
      transition:all 0.15s;
    ">
    <span class="conta-nome" style="
      flex:1;
      font-family:'Lora',Georgia,serif;
      font-size:13px;
      color:var(--ink-faded);
    ">${nome}</span>
    <input type="number" class="conta-valor" value="${valor.toFixed(2)}" step="0.01" min="0" style="
      width:72px;
      font-family:'Special Elite',monospace;
      font-size:11px;
      color:var(--ink-faded);
      background:transparent;
      border:none;
      border-bottom:1px dashed transparent;
      outline:none;
      text-align:right;
      padding:1px 2px;
    ">
    <button class="btn-rem-conta" style="
      background:none; border:none; cursor:pointer;
      color:var(--ink-light); font-size:12px; opacity:0.5;
    " title="Remover">✕</button>
  `;

  const check  = item.querySelector('.conta-check');
  const nomeEl = item.querySelector('.conta-nome');

  // Checkbox — risca e desconta do total
  check.addEventListener('change', () => {
    nomeEl.style.textDecoration = check.checked ? 'line-through' : 'none';
    nomeEl.style.opacity        = check.checked ? '0.45' : '1';
    check.style.background      = check.checked ? 'var(--green)' : 'transparent';
    check.style.borderColor     = check.checked ? 'var(--green)' : 'var(--ink-light)';
    atualizarMes(card);
  });

  // Editar valor
  item.querySelector('.conta-valor').addEventListener('input', () => atualizarMes(card));

  // Remover
  item.querySelector('.btn-rem-conta').addEventListener('click', () => {
    item.remove();
    atualizarMes(card);
  });

  lista.appendChild(item);
  atualizarMes(card);
}

// ===== BOTÃO NOVO MÊS =====
document.getElementById('btnAddMes').addEventListener('click', () => {
  const mes = mesesNomes[document.querySelectorAll('.mes-card').length % 12];
  criarMes(mes);
});

// Cria o mês atual ao carregar
criarMes(mesesNomes[new Date().getMonth()]);