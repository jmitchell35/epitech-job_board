const loginAnchor = document.getElementById('login-anchor');
const registerAnchor = document.getElementById('register-anchor');
const logoutButton = document.getElementById('logout-button');

async function isLoggedIn() {
  const profile = await youHaveTheRightToRemainSilent();

  return profile !== null;
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
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

async function toggleLoginDisplay() {
  if (await isLoggedIn()) {
    loginAnchor.style.display = 'none';
    registerAnchor.style.display = 'none';
    logoutButton.style.display = 'inline';

  } else {
    loginAnchor.style.display = 'inline';
    registerAnchor.style.display = 'inline';
    logoutButton.style.display = 'none';
  }
}

async function youHaveTheRightToRemainSilent() {
  try {
    const request = await fetch(`http://localhost:3000/api/v1/auth/readMeMyRights`, {
      credentials: 'include',
    });

    if (!request.ok) {
      return null;
    }

    const data = await request.json();

    return data.profile;
  } catch (error) {
    console.error('Auth check error: ', error);
    return null;
  }
}

async function hasRole(role) {
  const profile = await youHaveTheRightToRemainSilent();
  return profile === role;
}

document.addEventListener('DOMContentLoaded', async () => {
  await toggleLoginDisplay();
});

logoutButton.addEventListener('click', () => {
  const request = new Request(`http://localhost:3000/api/v1/auth/logout`, {
    credentials: 'include',
  });

  fetch(request)
    .then((response) => {
      console.log(response);
      return response;
    })
    .then((response) => {
      if (response.ok) {
        window.location.href = '/index.html';
      }
    })
    .catch((error) => {
      console.error('Fetch error: ', error);
    });
})