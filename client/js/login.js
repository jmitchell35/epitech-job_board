const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const requestHeaders = new Headers();
  requestHeaders.append("Content-Type", "application/json");

  const request = new Request(`http://localhost:3000/api/v1/auth/login`, {
    method: 'POST',
    headers: requestHeaders,
    credentials: 'include',
    body: JSON.stringify({
      email: loginForm.email.value,      // ✅ Get the actual value
      password: loginForm.password.value
    })
  });

  fetch(request)
    .then((response) => {
      return response;
    })
    .then((response) => {
      if (response.ok) {
        console.log('Response ok');
        window.location.href = './index.html';
      }
    })
    .catch(console.error);
})