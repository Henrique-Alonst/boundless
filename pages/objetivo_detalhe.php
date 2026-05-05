<!-- pages/objetivo_detalhe.php -->
<div class="view" id="view-objetivo-detalhe">
  <button class="back-btn" id="btnVoltarObjetivo">← Voltar para Objetivos</button>

  <div id="objDetalheConteudo">

    <!-- Cabeçalho com imagem e info -->
    <div style="display:flex; gap:28px; align-items:flex-start; margin-bottom:32px; flex-wrap:wrap;">

      <!-- Imagem -->
      <div id="objDetalheImgWrap" style="position:relative; cursor:pointer; flex-shrink:0;">
        <div id="objDetalheImg" style="
          width:200px; height:160px;
          background:var(--paper-aged);
          border:1.5px solid var(--ink-light);
          border-radius:2px;
          display:flex; align-items:center; justify-content:center;
          font-size:3rem;
          overflow:hidden;
        ">🎯</div>
        <div style="
          position:absolute; top:0; left:0; width:100%; height:100%;
          background:rgba(0,0,0,0.3); display:flex; align-items:center;
          justify-content:center; opacity:0; transition:opacity 0.2s;
          font-size:1.5rem;
        " id="objDetalheImgHover">📷</div>
        <input type="file" id="objDetalheImgInput" accept="image/*" style="display:none;">
      </div>

      <!-- Info -->
      <div style="flex:1; min-width:200px;">
        <div id="objDetalheName" contenteditable="true" style="
          font-family:'Caveat',cursive; font-size:2rem; font-weight:700;
          color:var(--ink); outline:none; cursor:text;
          border-bottom:1px dashed transparent;
          margin-bottom:8px;
        ">Nome do Objetivo</div>

        <div id="objDetalheStatus" style="margin-bottom:12px;">
          <span id="objDetalheStatusTag" class="tag status-ativo tag-status-editavel"
            style="cursor:pointer;" title="Clique para mudar status">Ativo</span>
        </div>

        <div id="objDetalheDesc" contenteditable="true" style="
          font-family:'Lora',Georgia,serif; font-size:14px;
          color:var(--ink-faded); outline:none; cursor:text;
          line-height:1.7; min-height:40px;
          border-bottom:1px dashed transparent;
        ">Sem descrição.</div>
      </div>

    </div>

    <!-- Barra de progresso -->
    <div class="section">
      <h2 class="section-title">◎ &nbsp;Progresso</h2>
      <div style="height:10px; background:var(--paper-aged); border-radius:4px; overflow:hidden; margin-bottom:6px;">
        <div id="objDetalheProgressFill" style="
          height:100%; width:0%;
          background:var(--green);
          border-radius:4px;
          transition:width 0.4s ease;
        "></div>
      </div>
      <span id="objDetalheProgressLabel" style="
        font-family:'Special Elite',monospace;
        font-size:11px; color:var(--ink-light); letter-spacing:1px;
      ">0% concluído</span>
    </div>

    <!-- Tarefas -->
    <div class="section">
      <h2 class="section-title">✎ &nbsp;Tarefas</h2>
      <div id="objDetalheTarefas" style="display:flex; flex-direction:column; gap:8px; margin-bottom:16px;"></div>

      <div style="display:flex; gap:8px; margin-top:8px;">
        <input type="text" id="objDetalheNovaTarefa" placeholder="Nova tarefa..." style="
          flex:1; font-family:'Lora',Georgia,serif; font-size:14px;
          color:var(--ink); background:transparent; border:none;
          border-bottom:1px dashed var(--ink-light); outline:none; padding:4px;
        ">
        <button id="objDetalheAddTarefa" style="
          font-family:'Special Elite',monospace; font-size:16px;
          background:none; border:none; color:var(--green); cursor:pointer;
        ">＋</button>
      </div>
    </div>

    <!-- Anotações livres -->
    <div class="section">
      <h2 class="section-title">📝 &nbsp;Anotações Livres</h2>
      <textarea id="objDetalheAnotacoes" placeholder="O que você precisa pra atingir esse objetivo? Demanda tempo? Dinheiro? O que já está fazendo?..." style="
        width:100%; min-height:160px;
        background:transparent; border:none;
        border-bottom:1.5px dashed var(--ink-light);
        outline:none; resize:vertical;
        font-family:'Lora',Georgia,serif;
        font-size:14px; color:var(--ink);
        line-height:1.8; padding:4px;
      "></textarea>
    </div>

  </div>
</div>