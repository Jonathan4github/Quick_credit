const signin = (event) => {
  event.preventDefault();
  let email = document.getElementById('email').value;

  if (email == 'admin@gmail.com') {
    window.location.replace('../client/admin/dashboard.html');
  } else {
    window.location.replace('../client/dashboard.html');
  }

}

document.getElementById('signin').addEventListener('submit', signin)