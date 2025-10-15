const email = document.getElementById('email');
const labelEmail = document.getElementById('labelEmail');
const msgError = document.getElementById('msgError');
const msgSuccess = document.getElementById('msgSuccess');

let validEmail = false;

email.addEventListener('keyup', () => {
  validEmail = email.value.includes('@') && email.value.includes('.');
  labelEmail.style.color = validEmail ? 'green' : 'red';
  labelEmail.innerHTML = validEmail ? 'E-mail cadastrado' : 'E-mail *Insira um e-mail válido';
  email.style.borderColor = validEmail ? 'green' : 'red';
});

function enviarEmail() {
  if (!validEmail) {
    msgError.style.display = 'block';
    msgError.innerHTML = '<strong>Digite um e-mail válido.</strong>';
    msgSuccess.style.display = 'none';
    return;
  }

  const listaUser = JSON.parse(localStorage.getItem('listaUser')) || [];
  const userValid = listaUser.find(user => user.emailCad === email.value);

  if (!userValid) {
    msgError.style.display = 'block';
    msgError.innerHTML = '<strong>E-mail não encontrado.</strong>';
    msgSuccess.style.display = 'none';
    return;
  }

  // Simula envio de e-mail
  msgSuccess.style.display = 'block';
  msgSuccess.innerHTML = '<strong>E-mail enviado! Redirecionando...</strong>';
  msgError.style.display = 'none';

  // Salva o e-mail para a página de reset
  localStorage.setItem('emailReset', email.value);

  setTimeout(() => {
    window.location.href = 'reset-password.html';
  }, 2000);
}
