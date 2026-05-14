<!-- pages/estudo_detalhe.php -->
<div class="view" id="view-estudo-detalhe">
  <button class="back-btn" id="btnVoltarEstudo">← Voltar para Estudos</button>
 
  <div id="estDetalheConteudo">
 
    <!-- ===== CABEÇALHO ===== -->
    <div style="display:flex; gap:28px; align-items:flex-start; margin-bottom:32px; flex-wrap:wrap;">
 
      <!-- Imagem -->
      <div id="estDetalheImgWrap" style="position:relative; cursor:pointer; flex-shrink:0;">
        <div id="estDetalheImg" style="
          width:200px; height:160px;
          background:var(--paper-aged);
          border:1.5px solid var(--ink-light);
          border-radius:2px;
          display:flex; align-items:center; justify-content:center;
          font-size:3rem; overflow:hidden;
        ">📚</div>
        <div id="estDetalheImgHover" style="
          position:absolute; top:0; left:0; width:100%; height:100%;
          background:rgba(0,0,0,0.3); display:flex; align-items:center;
          justify-content:center; opacity:0; transition:opacity 0.2s;
          font-size:1.5rem; border-radius:2px;
        ">📷</div>
        <input type="file" id="estDetalheImgInput" accept="image/*" style="display:none;">
      </div>
 
      <!-- Info -->
      <div style="flex:1; min-width:200px;">
        <div id="estDetalheName" contenteditable="true" style="
          font-family:'Caveat',cursive; font-size:2rem; font-weight:700;
          color:var(--ink); outline:none; cursor:text;
          border-bottom:1px dashed transparent; margin-bottom:8px;
        ">Nome do Estudo</div>
 
        <div id="estDetalheStatus" style="margin-bottom:12px;">
          <span id="estDetalheStatusTag" class="tag status-ativo tag-status-editavel"
            style="cursor:pointer;" title="Clique para mudar status">Ativo</span>
        </div>
 
        <div id="estDetalheDesc" contenteditable="true" style="
          font-family:'Lora',Georgia,serif; font-size:14px;
          color:var(--ink-faded); outline:none; cursor:text;
          line-height:1.7; min-height:40px;
          border-bottom:1px dashed transparent;
        ">Sem descrição.</div>
 
        <!-- Contador de pomodoros da sessão -->
        <div style="margin-top:12px;">
          <span id="estPomodoroCount" style="
            font-family:'Special Elite',monospace; font-size:11px;
            color:var(--ink-light); letter-spacing:1px;
          ">🍅 0 pomodoros concluídos neste estudo</span>
        </div>
      </div>
 
    </div>
 
    <!-- ===== PROGRESSO ===== -->
    <div class="section">
      <h2 class="section-title">◎ &nbsp;Progresso</h2>
      <div style="height:10px; background:var(--paper-aged); border-radius:4px; overflow:hidden; margin-bottom:6px;">
        <div id="estDetalheProgressFill" style="
          height:100%; width:0%;
          background:var(--green); border-radius:4px;
          transition:width 0.4s ease;
        "></div>
      </div>
      <span id="estDetalheProgressLabel" style="
        font-family:'Special Elite',monospace;
        font-size:11px; color:var(--ink-light); letter-spacing:1px;
      ">0% concluído</span>
    </div>
 
    <!-- ===== ROADMAP / CHECKLIST ===== -->
    <div class="section">
      <h2 class="section-title">🗺️ &nbsp;Roadmap de Tópicos</h2>
      <div id="estDetalheTopicos" style="display:flex; flex-direction:column; gap:8px; margin-bottom:16px;"></div>
 
      <div style="display:flex; gap:8px; margin-top:8px;">
        <input type="text" id="estDetalheNovoTopico" placeholder="Novo tópico do roadmap..." style="
          flex:1; font-family:'Lora',Georgia,serif; font-size:14px;
          color:var(--ink); background:transparent; border:none;
          border-bottom:1px dashed var(--ink-light); outline:none; padding:4px;
        ">
        <button id="estDetalheAddTopico" style="
          font-family:'Special Elite',monospace; font-size:16px;
          background:none; border:none; color:var(--green); cursor:pointer;
        ">＋</button>
      </div>
    </div>
 
    <!-- ===== POMODORO ===== -->
    <div class="section">
      <h2 class="section-title">🍅 &nbsp;Pomodoro</h2>
      <div style="display:flex; align-items:center; gap:24px; flex-wrap:wrap;">
 
        <!-- Timer display -->
        <div id="pomodoroDisplay" style="
          font-family:'Caveat',cursive; font-size:3.5rem; font-weight:700;
          color:var(--ink); letter-spacing:-2px; line-height:1;
          min-width:120px; text-align:center;
        ">25:00</div>
 
        <!-- Controles -->
        <div style="display:flex; flex-direction:column; gap:8px;">
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button id="btnPomodoroStart" style="
              font-family:'Special Elite',monospace; font-size:11px; letter-spacing:1px;
              background:var(--green); color:#fff; border:none; border-radius:2px;
              padding:8px 18px; cursor:pointer; box-shadow:2px 2px 0 #2d5a3a;
            ">▶ Iniciar</button>
            <button id="btnPomodoroPause" style="
              font-family:'Special Elite',monospace; font-size:11px; letter-spacing:1px;
              background:var(--accent); color:#fff; border:none; border-radius:2px;
              padding:8px 18px; cursor:pointer; box-shadow:2px 2px 0 var(--accent-dark);
              display:none;
            ">⏸ Pausar</button>
            <button id="btnPomodoroReset" style="
              font-family:'Special Elite',monospace; font-size:11px; letter-spacing:1px;
              background:none; color:var(--ink-light); border:1px solid var(--ink-light);
              border-radius:2px; padding:8px 18px; cursor:pointer;
            ">↺ Reset</button>
          </div>
 
          <!-- Seletor de duração -->
          <div style="display:flex; gap:6px; align-items:center;">
            <span style="font-family:'Special Elite',monospace; font-size:10px; letter-spacing:1px; color:var(--ink-light);">DURAÇÃO:</span>
            <button class="pomodoro-preset" data-min="25" style="
              font-family:'Special Elite',monospace; font-size:10px;
              background:var(--paper-aged); border:1px solid var(--ink-light);
              border-radius:2px; padding:3px 8px; cursor:pointer; color:var(--ink-faded);
            ">25min</button>
            <button class="pomodoro-preset" data-min="45" style="
              font-family:'Special Elite',monospace; font-size:10px;
              background:var(--paper-aged); border:1px solid var(--ink-light);
              border-radius:2px; padding:3px 8px; cursor:pointer; color:var(--ink-faded);
            ">45min</button>
            <button class="pomodoro-preset" data-min="60" style="
              font-family:'Special Elite',monospace; font-size:10px;
              background:var(--paper-aged); border:1px solid var(--ink-light);
              border-radius:2px; padding:3px 8px; cursor:pointer; color:var(--ink-faded);
            ">60min</button>
          </div>
        </div>
 
        <!-- Histórico do dia -->
        <div id="pomodoroHistorico" style="
          font-family:'Special Elite',monospace; font-size:11px;
          color:var(--ink-light); letter-spacing:1px;
          border-left:1.5px dashed var(--ink-light); padding-left:16px;
          min-width:120px;
        ">
          <div style="margin-bottom:6px; text-transform:uppercase; letter-spacing:1.5px;">Sessões hoje</div>
          <div id="pomodoroSessoes" style="display:flex; flex-wrap:wrap; gap:4px;"></div>
        </div>
 
      </div>
    </div>
 
    <!-- ===== LINKS DE REFERÊNCIA ===== -->
    <div class="section">
      <h2 class="section-title">🔗 &nbsp;Links de Referência</h2>
      <div id="estDetalheLinks" style="display:flex; flex-direction:column; gap:8px; margin-bottom:16px;"></div>
 
      <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:8px;">
        <input type="text" id="estLinkTitulo" placeholder="Título (ex: Documentação MDN)" style="
          flex:1; min-width:150px;
          font-family:'Lora',Georgia,serif; font-size:14px;
          color:var(--ink); background:transparent; border:none;
          border-bottom:1px dashed var(--ink-light); outline:none; padding:4px;
        ">
        <input type="url" id="estLinkUrl" placeholder="https://..." style="
          flex:2; min-width:200px;
          font-family:'Lora',Georgia,serif; font-size:14px;
          color:var(--ink); background:transparent; border:none;
          border-bottom:1px dashed var(--ink-light); outline:none; padding:4px;
        ">
        <button id="estDetalheAddLink" style="
          font-family:'Special Elite',monospace; font-size:16px;
          background:none; border:none; color:var(--green); cursor:pointer;
        ">＋</button>
      </div>
    </div>
 
    <!-- ===== ANOTAÇÕES LIVRES ===== -->
    <div class="section">
      <h2 class="section-title">📝 &nbsp;Anotações Livres</h2>
      <textarea id="estDetalheAnotacoes" placeholder="Conceitos importantes, dúvidas, resumos, o que quiser..." style="
        width:100%; min-height:180px;
        background:transparent; border:none;
        border-bottom:1.5px dashed var(--ink-light);
        outline:none; resize:vertical;
        font-family:'Lora',Georgia,serif;
        font-size:14px; color:var(--ink);
        line-height:1.8; padding:4px;
      "></textarea>
      <div style="margin-top:4px;">
        <span id="estAnotacoesSalvo" style="
          font-family:'Special Elite',monospace; font-size:10px;
          color:var(--green); letter-spacing:1px; opacity:0;
          transition:opacity 0.3s;
        ">✓ SALVO</span>
      </div>
    </div>
 
  </div>
</div>