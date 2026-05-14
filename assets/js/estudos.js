// assets/js/estudos.js

function carregarEstudos() {
  fetch('api/estudos.php')
    .then(r => r.json())
    .then(estudos => {
      const grid = document.getElementById('projectsGridEst');
      grid.innerHTML = '';
      estudos.forEach(e => {
        adicionarCard(
          'projectsGridEst',
          e.nome,
          e.descricao,
          e.status,
          null,
          null,
          e.imagem ? `uploads/${e.imagem}` : null,
          '📚',
          e.id,
          'api/estudos.php'
        );
      });
    });
}

initAccordion('toggleEstudos', 'formEstudos');
initImageUpload('estImg', 'imgPreviewEst');

document.getElementById('btnAddEstudo').addEventListener('click', () => {
  const nome   = document.getElementById('estNome').value.trim();
  const desc   = document.getElementById('estDesc').value.trim();
  const status = document.getElementById('estStatus').value;
  const arquivo = document.getElementById('estImg').files[0];

  if (!nome) { alert('Informe o nome do estudo.'); return; }

  const formData = new FormData();
  formData.append('nome', nome);
  formData.append('desc', desc);
  formData.append('status', status);
  if (arquivo) formData.append('imagem_arquivo', arquivo);

  fetch('api/estudos.php', { method: 'POST', body: formData })
    .then(r => r.json())
    .then(() => {
      carregarEstudos();
      ['estNome', 'estDesc'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('estStatus').value = 'ativo';
      document.getElementById('estImg').value = '';
      document.getElementById('imgPreviewEst').style.display = 'none';
      document.getElementById('imgPreviewEst').src = '';
    });
});

document.getElementById('btnEstudos').addEventListener('click', () => {
  showView('estudos');
  carregarEstudos();
});

if (localStorage.getItem('viewAtual') === 'estudos') {
  carregarEstudos();
}

initDragDrop('projectsGridEst', 'api/estudos.php');