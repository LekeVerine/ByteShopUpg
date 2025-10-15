const novaSenha = document.getElementById('novaSenha');
const labelNovaSenha = document.getElementById('labelNovaSenha');
const confNovaSenha = document.getElementById('confNovaSenha');
const labelConfNovaSenha = document.getElementById('labelConfNovaSenha');
const btnNovaSenha = document.getElementById('verNovaSenha');
const btnConfNovaSenha = document.getElementById('verConfNovaSenha');
const msgError = document.getElementById('msgError');
const msgSuccess = document.getElementById('msgSuccess');

let validNovaSenha = false;
let validConfNovaSenha = false;

// Validações
novaSenha.addEventListener('keyup', () => {
  validNovaSenha = novaSenha.value.length > 5;
  labelNovaSenha.style.color = validNovaSenha ? 'green' : 'red';
  labelNovaSenha.innerHTML = validNovaSenha ? 'Nova Senha' : 'Nova Senha *No mínimo 6 caracteres';
  novaSenha.style.borderColor = validNovaSenha ? 'green' : 'red';
  if (confNovaSenha.value) confNovaSenha.dispatchEvent(new Event('keyup'));
});

confNovaSenha.addEventListener('keyup', () => {
  validConfNovaSenha = novaSenha.value === confNovaSenha.value && novaSenha.value.length > 0;
  labelConfNovaSenha.style.color = validConfNovaSenha ? 'green' : 'red';
  labelConfNovaSenha.innerHTML = validConfNovaSenha ? 'Confirmar Senha' : 'Confirmar Senha *Senhas não conferem';
  confNovaSenha.style.borderColor = validConfNovaSenha ? 'green' : 'red';
});

// Mostrar/ocultar senha
btnNovaSenha.addEventListener('click', () => {
  novaSenha.type = novaSenha.type === 'password' ? 'text' : 'password';
});

btnConfNovaSenha.addEventListener('click', () => {
  confNovaSenha.type = confNovaSenha.type === 'password' ? 'text' : 'password';
});

// Atualiza a senha
function atualizarSenha() {
  const email = localStorage.getItem('emailReset');
  if (!email) {
    msgError.style.display = 'block';
    msgError.innerHTML = '<strong>Nenhum e-mail encontrado para redefinição.</strong>';
    msgSuccess.style.display = 'none';
    return;
  }

  if (!validNovaSenha || !validConfNovaSenha) {
    msgError.style.display = 'block';
    msgError.innerHTML = '<strong>Preencha corretamente todos os campos.</strong>';
    msgSuccess.style.display = 'none';
    return;
  }

  const listaUser = JSON.parse(localStorage.getItem('listaUser')) || [];
  const indexUser = listaUser.findIndex(user => user.emailCad === email);

  if (indexUser === -1) {
    msgError.style.display = 'block';
    msgError.innerHTML = '<strong>E-mail não cadastrado.</strong>';
    msgSuccess.style.display = 'none';
    return;
  }

  listaUser[indexUser].senhaCad = novaSenha.value;
  localStorage.setItem('listaUser', JSON.stringify(listaUser));

  msgSuccess.style.display = 'block';
  msgSuccess.innerHTML = '<strong>Senha redefinida com sucesso! Redirecionando...</strong>';
  msgError.style.display = 'none';

  setTimeout(() => {
    localStorage.removeItem('emailReset');
    window.location.href = 'signin.html';
  }, 3000);
}
