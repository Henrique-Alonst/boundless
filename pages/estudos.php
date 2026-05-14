<!-- pages/estudos.php -->
<div class="view" id="view-estudos">
  <button class="back-btn" data-back>← Voltar</button>
 
  <div class="section">
    <h2 class="section-title" id="toggleEstudos" style="cursor:pointer">📚 &nbsp;Novo Estudo</h2>
    <div class="project-form" id="formEstudos">
      <p class="project-form-title">Preencha as informações da matéria ou curso</p>
 
      <div class="form-row">
        <div class="field-group">
          <label>Nome do Estudo</label>
          <input type="text" id="estNome" placeholder="Ex: Algoritmos e Estrutura de Dados">
        </div>
        <div class="field-group">
          <label>Status</label>
          <select id="estStatus">
            <option value="ativo">🟢 Ativo</option>
            <option value="pausado">🟡 Pausado</option>
            <option value="concluido">🔴 Concluído</option>
          </select>
        </div>
      </div>
 
      <div class="field-group">
        <label>Descrição</label>
        <textarea id="estDesc" placeholder="Do que se trata esse estudo? Qual o objetivo?"></textarea>
      </div>
 
      <div class="field-group">
        <label>Imagem / Capa</label>
        <input type="file" id="estImg" accept="image/*">
        <img id="imgPreviewEst" src="" alt="Preview" style="display:none;">
      </div>
 
      <button class="add-project-btn" id="btnAddEstudo">+ Adicionar Estudo</button>
    </div>
  </div>
 
  <div class="section">
    <h2 class="section-title">🎓 &nbsp;Meus Estudos</h2>
    <div class="projects-grid" id="projectsGridEst">
      <!-- cards gerados por JS -->
    </div>
  </div>
</div>