const btn = document.getElementById('verSenha');
const btnConfirm = document.getElementById('verConfirmSenha');

const nome = document.getElementById('nome');
const labelNome = document.getElementById('labelNome');

const email = document.getElementById('email');
const labelEmail = document.getElementById('labelEmail');

const usuario = document.getElementById('usuario');
const labelUsuario = document.getElementById('labelUsuario');

const senha = document.getElementById('senha');
const labelSenha = document.getElementById('labelSenha');

const confirmSenha = document.getElementById('confirmSenha');
const labelConfirmSenha = document.getElementById('labelConfirmSenha');

const msgError = document.getElementById('msgError');
const msgSuccess = document.getElementById('msgSuccess');

let validNome = false;
let validEmail = false;
let validUsuario = false;
let validSenha = false;
let validConfirmSenha = false;

// Validações
nome.addEventListener('keyup', () => {
  validNome = nome.value.length > 2;
  labelNome.style.color = validNome ? 'green' : 'red';
  labelNome.innerHTML = validNome ? 'Nome' : 'Nome *Insira no mínimo 3 caracteres';
  nome.style.borderColor = validNome ? 'green' : 'red';
});

email.addEventListener('keyup', () => {
  validEmail = email.value.includes('@') && email.value.includes('.');
  labelEmail.style.color = validEmail ? 'green' : 'red';
  labelEmail.innerHTML = validEmail ? 'E-mail' : 'E-mail *Insira um e-mail válido';
  email.style.borderColor = validEmail ? 'green' : 'red';
});

usuario.addEventListener('keyup', () => {
  validUsuario = usuario.value.length > 4;
  labelUsuario.style.color = validUsuario ? 'green' : 'red';
  labelUsuario.innerHTML = validUsuario ? 'Usuário' : 'Usuário *Insira no mínimo 5 caracteres';
  usuario.style.borderColor = validUsuario ? 'green' : 'red';
});

senha.addEventListener('keyup', () => {
  validSenha = senha.value.length > 5;
  labelSenha.style.color = validSenha ? 'green' : 'red';
  labelSenha.innerHTML = validSenha ? 'Senha' : 'Senha *Insira no mínimo 6 caracteres';
  senha.style.borderColor = validSenha ? 'green' : 'red';
  if (confirmSenha.value) confirmSenha.dispatchEvent(new Event('keyup'));
});

confirmSenha.addEventListener('keyup', () => {
  validConfirmSenha = senha.value === confirmSenha.value && senha.value.length > 0;
  labelConfirmSenha.style.color = validConfirmSenha ? 'green' : 'red';
  labelConfirmSenha.innerHTML = validConfirmSenha ? 'Confirmar Senha' : 'Confirmar Senha *As senhas não conferem';
  confirmSenha.style.borderColor = validConfirmSenha ? 'green' : 'red';
});

// Função de cadastro
function cadastrar() {
  if (validNome && validEmail && validUsuario && validSenha && validConfirmSenha) {
    const listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');

    // Verifica se usuário ou e-mail já existe
    const usuarioExistente = listaUser.find(user => user.userCad === usuario.value);
    const emailExistente = listaUser.find(user => user.emailCad === email.value);

    if (usuarioExistente) {
      msgError.style.display = 'block';
      msgError.innerHTML = '<strong>Usuário já cadastrado. Escolha outro.</strong>';
      msgSuccess.style.display = 'none';
      return;
    }

    if (emailExistente) {
      msgError.style.display = 'block';
      msgError.innerHTML = '<strong>E-mail já cadastrado. Use outro e-mail.</strong>';
      msgSuccess.style.display = 'none';
      return;
    }

    listaUser.push({
      nomeCad: nome.value,
      emailCad: email.value,
      userCad: usuario.value,
      senhaCad: senha.value
    });

    localStorage.setItem('listaUser', JSON.stringify(listaUser));

    msgSuccess.style.display = 'block';
    msgSuccess.innerHTML = '<strong>Cadastro realizado com sucesso! Redirecionando...</strong>';
    msgError.style.display = 'none';

    setTimeout(() => {
      window.location.href = '../../assets/html/signin.html';
    }, 3000);
  } else {
    msgError.style.display = 'block';
    msgError.innerHTML = '<strong>Preencha todos os campos corretamente.</strong>';
    msgSuccess.style.display = 'none';
  }
}

// Mostrar/ocultar senha
btn.addEventListener('click', () => {
  senha.type = senha.type === 'password' ? 'text' : 'password';
});

btnConfirm.addEventListener('click', () => {
  confirmSenha.type = confirmSenha.type === 'password' ? 'text' : 'password';
});
