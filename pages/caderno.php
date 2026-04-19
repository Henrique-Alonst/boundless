<!-- pages/caderno.php -->
<div class="view" id="view-caderno">
  <button class="back-btn" data-back>← Voltar</button>

  <div class="section">
    <h2 class="section-title">✎ &nbsp;Nova Anotação</h2>
    <div class="notes-form">
      <label for="notaTexto">O que você quer registrar?</label>
      <textarea id="notaTexto" rows="4" placeholder="Escreva aqui sua anotação..."></textarea>
      <button class="save-btn" id="btnSalvar">Salvar nota</button>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">📌 &nbsp;Anotações</h2>
    <div class="notes-list" id="notesList">
      <!-- Futuramente: notas virão do banco via api/notas.php -->
    </div>
  </div>
</div>
