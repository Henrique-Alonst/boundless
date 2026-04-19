<!-- pages/financas.php -->
<div class="view" id="view-financas">
  <button class="back-btn" data-back>← Voltar</button>

  <div class="section">
    <h2 class="section-title">💰 &nbsp;Finanças</h2>

    <!-- Total geral -->
    <div id="totalGeral" style="
      font-family: 'Special Elite', monospace;
      font-size: 13px;
      letter-spacing: 1px;
      color: var(--ink-faded);
      margin-bottom: 24px;
      padding: 12px 16px;
      border: 1.5px dashed var(--ink-light);
      border-radius: 2px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    ">
      <span>TOTAL GERAL</span>
      <span id="totalGeralValor" style="font-size:16px; color: var(--ink); font-family:'Caveat',cursive; font-weight:700;">R$ 0,00</span>
    </div>

    <!-- Grade de meses -->
    <div id="mesesGrid" style="
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 20px;
      margin-bottom: 28px;
    "></div>

    <!-- Botão adicionar mês -->
    <button id="btnAddMes" style="
      font-family: 'Special Elite', monospace;
      font-size: 12px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--ink);
      background: var(--paper-aged);
      border: 1.5px dashed var(--ink-light);
      border-radius: 2px;
      padding: 10px 22px;
      cursor: pointer;
      transition: background 0.18s;
    ">+ Novo Mês</button>

  </div>

  <!-- Anotação livre -->
  <div class="section">
    <h2 class="section-title">✎ &nbsp;Observações</h2>
    <textarea id="finObservacao" placeholder="Ex: esse mês preciso gastar menos..." style="
      width: 100%;
      min-height: 80px;
      background: transparent;
      border: none;
      border-bottom: 1.5px dashed var(--ink-light);
      outline: none;
      resize: vertical;
      font-family: 'Lora', Georgia, serif;
      font-size: 14px;
      color: var(--ink);
      line-height: 1.7;
      padding: 4px;
    "></textarea>
  </div>

</div>