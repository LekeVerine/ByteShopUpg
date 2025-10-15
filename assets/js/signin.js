// Mostra/oculta a senha ao clicar no ícone
let btn = document.querySelector('.fa-eye');
btn.addEventListener('click', () => {
  let inputSenha = document.querySelector('#senha');
  inputSenha.type = inputSenha.type === 'password' ? 'text' : 'password';
});

// Função de login
function entrar() {
  const usuario = document.getElementById('usuario');
  const userLabel = document.getElementById('userLabel');
  const senha = document.getElementById('senha');
  const senhaLabel = document.getElementById('senhaLabel');
  const msgError = document.getElementById('msgError');

  // Obtém a lista de usuários cadastrados (do localStorage)
  const listaUser = JSON.parse(localStorage.getItem('listaUser')) || [];

  // Permite login por usuário OU e-mail
  const userValid = listaUser.find(user =>
    (user.userCad === usuario.value || user.emailCad === usuario.value) &&
    user.senhaCad === senha.value
  );

  if (userValid) {
    // Gerar token fake
    const token = Math.random().toString(16).substr(2) + Math.random().toString(16).substr(2);

    // Salvar dados do usuário logado
    localStorage.setItem('token', token);
    localStorage.setItem('userLogado', JSON.stringify({
      nome: userValid.nomeCad,
      user: userValid.userCad,
      email: userValid.emailCad,
      senha: userValid.senhaCad
    }));

    // Redireciona para home
    window.location.href = '../../index.html';
  } else {
    // Caso inválido: destaca campos e mostra erro
    userLabel.style.color = 'red';
    usuario.style.borderColor = 'red';
    senhaLabel.style.color = 'red';
    senha.style.borderColor = 'red';
    msgError.style.display = 'block';
    msgError.innerHTML = 'Usuário, e-mail ou senha incorretos';
    usuario.focus();
  }
}

// Carrossel automático
const slides = document.querySelectorAll('.slide'); // seleciona os divs .slide
let current = 0;

setInterval(() => {
  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('active');
}, 3000);

