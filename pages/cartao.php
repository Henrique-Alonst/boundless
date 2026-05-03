<!-- pages/cartao.php -->
<div class="view" id="view-cartao">
  <button class="back-btn" data-back-financas>← Voltar</button>

  <div class="section">
    <h2 class="section-title">💳 &nbsp;Cartões</h2>

    <div id="totalCartao" style="
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
      <span id="totalCartaoValor" style="font-size:16px; color: var(--ink); font-family:'Caveat',cursive; font-weight:700;">R$ 0,00</span>
    </div>

    <div id="cartaoGrid" style="
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 20px;
      margin-bottom: 28px;
    "></div>

    <button id="btnAddCartao" style="
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
    ">+ Novo Cartão</button>
  </div>

</div>
</div>