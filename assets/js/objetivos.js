// assets/js/objetivos.js
initAccordion('toggleObjetivos', 'formObjetivos');
const getImgObjetivo = initImageUpload('projImgObj', 'imgPreviewObj');

document.getElementById('btnAddProjectObj').addEventListener('click', () => {
  const nome   = document.getElementById('projNomeObj').value.trim();
  const desc   = document.getElementById('projDescObj').value.trim();
  const status = document.getElementById('projStatusObj').value;
  const imgSrc = getImgObjetivo();

  if (!nome) { alert('Informe pelo menos o nome do objetivo.'); return; }

  adicionarCard('projectsGridObj', nome, desc, status, '', '', imgSrc, '🎯');

  ['projNomeObj','projDescObj'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('projStatusObj').value = 'ativo';
  document.getElementById('projImgObj').value = '';
  document.getElementById('imgPreviewObj').style.display = 'none';
  document.getElementById('imgPreviewObj').src = '';
});