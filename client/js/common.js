const loginAnchor = document.getElementById('login-anchor');
const registerAnchor = document.getElementById('register-anchor');
const logoutButton = document.getElementById('logout-button');

function isLoggedIn() {
  const cookie = getCookie('isLoggedIn');
  console.log(cookie);
  if (cookie === 'true') {
    return true;
  } else {
    return false;
  }
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function toggleLoginDisplay() {
  if (isLoggedIn()) {
    loginAnchor.style.display = 'none';
    registerAnchor.style.display = 'none';
    logoutButton.style.display = 'inline';

  } else {
    loginAnchor.style.display = 'inline';
    registerAnchor.style.display = 'inline';
    logoutButton.style.display = 'none';
  }
}

toggleLoginDisplay();

logoutButton.addEventListener('click', () => {

  console.log('logging out');
  const request = new Request(`http://localhost:3000/api/v1/auth/logout`, {
    credentials: 'include',
  });

  console.log('fetching');
  fetch(request)
    .then((response) => {
      console.log('got response');
      console.log(response);
      return response;
    })
    .then((response) => {
      if (response.ok) {
        console.log('Logged out');
        toggleLoginDisplay();
      }
    })
    .catch((error) => {
      console.error('Fetch error: ', error);
    });
})