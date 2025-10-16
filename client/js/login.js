const loginForm = document.getElementById('login-form');

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

loginForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const requestHeaders = new Headers();
  requestHeaders.append("Content-Type", "application/json");

  const request = new Request(`http://localhost:3000/api/v1/auth/login`, {
    method: 'POST',
    headers: requestHeaders,
    credentials: 'include',
    body: JSON.stringify({
      email: loginForm.email.value,
      password: loginForm.password.value
    })
  });

  fetch(request)
    .then((response) => {
      if (response.ok) {
        console.log(response);
        return response.json();
      }
      throw new Error('Login failed');
    })
    .then((data) => {
      const { profile } = data;
      if (profile === 'ADMIN') {
        console.log('admin');
        window.location.href = './admin_dashboard.html';
      } else if (profile === 'RECRUITER') {
        console.log('recruiter');
        window.location.href = './recruiter_dashboard.html';
      } else {
        console.log('user');
        window.location.href = './index.html';
      }
    })
    .catch(console.error);

  toggleLoginDisplay();
})