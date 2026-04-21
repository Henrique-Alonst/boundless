// assets/js/projetos.js

function carregarProjetos() {
  fetch('api/projetos.php')
    .then(r => r.json())
    .then(projetos => {
      const grid = document.getElementById('projectsGrid');
      grid.innerHTML = '';
      projetos.forEach(p => {
        adicionarCard(
          'projectsGrid',
          p.nome,
          p.descricao,
          p.status,
          p.tags,
          p.link,
          null,
          '🗂️',
          p.id,
          'api/projetos.php'
        );
      });
    });
}

initAccordion('toggleProjetos', 'formProjetos');
const getImgProjeto = initImageUpload('projImg', 'imgPreview');

document.getElementById('btnAddProject').addEventListener('click', () => {
  const nome   = document.getElementById('projNome').value.trim();
  const desc   = document.getElementById('projDesc').value.trim();
  const tags   = document.getElementById('projTags').value.trim();
  const link   = document.getElementById('projLink').value.trim();
  const status = document.getElementById('projStatus').value;
  const imgSrc = getImgProjeto();

  if (!nome) { alert('Informe pelo menos o nome do projeto.'); return; }

  fetch('api/projetos.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ nome, desc, status, tags, link, img: imgSrc })
  })
  .then(r => r.json())
  .then(() => {
    carregarProjetos(); // recarrega tudo do banco, não precisa chamar adicionarCard aqui

    ['projNome','projDesc','projTags','projLink'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('projStatus').value = 'ativo';
    document.getElementById('projImg').value = '';
    document.getElementById('imgPreview').style.display = 'none';
    document.getElementById('imgPreview').src = '';
  });
});

document.getElementById('btnProjetos').addEventListener('click', () => {
  showView('projetos');
  carregarProjetos();
});

if (localStorage.getItem('viewAtual') === 'projetos') {
  carregarProjetos();
}