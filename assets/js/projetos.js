// assets/js/projetos.js
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

  adicionarCard('projectsGrid', nome, desc, status, tags, link, imgSrc, '🗂️');

  ['projNome','projDesc','projTags','projLink'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('projStatus').value = 'ativo';
  document.getElementById('projImg').value = '';
  document.getElementById('imgPreview').style.display = 'none';
  document.getElementById('imgPreview').src = '';
});