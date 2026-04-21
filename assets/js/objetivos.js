// assets/js/objetivos.js

function carregarobjetivos() {
  fetch('api/objetivos.php')
    .then(r => r.json())
    .then(objetivos => {
      const grid = document.getElementById('projectsGridObj');
      grid.innerHTML = '';
      objetivos.forEach(p => {
        adicionarCard(
          'projectsGridObj',
          p.nome,
          p.descricao,
          p.status,
          null,
          null,
          null,
          '🗂️',
          p.id,
          'api/objetivos.php'
        );
      });
    });
}

initAccordion('toggleObjetivos', 'formObjetivos');
const getImgObjetivo = initImageUpload('projImg', 'imgPreview');

document.getElementById('btnAddObjetivo').addEventListener('click', () => {
  const nome   = document.getElementById('projNomeObj').value.trim();
  const desc   = document.getElementById('projDesc').value.trim();
  const status = document.getElementById('projStatus').value;
  const imgSrc = getImgObjetivo();

  if (!nome) { alert('Informe pelo menos o nome do projeto.'); return; }

  fetch('api/objetivos.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ nome, desc, status, img: imgSrc })
  })
  .then(r => r.json())
  .then(() => {
    carregarobjetivos(); // recarrega tudo do banco, não precisa chamar adicionarCard aqui

    ['projNomeObj','projDesc',].forEach(id => document.getElementById(id).value = '');
    document.getElementById('projStatus').value = 'ativo';
    document.getElementById('projImg').value = '';
    document.getElementById('imgPreview').style.display = 'none';
    document.getElementById('imgPreview').src = '';
  });
});

document.getElementById('btnObjetivos').addEventListener('click', () => {
  showView('objetivos');
  carregarobjetivos();
});

if (localStorage.getItem('viewAtual') === 'objetivos') {
  carregarobjetivos();
}