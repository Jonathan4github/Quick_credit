const signin = (event) => {
  event.preventDefault();
  const post = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  };

  $.Toast.showToast({
    "title": "Logging in ...",
    "icon": "loading",
    "duration": 16000
  });

  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  };

  fetch('http://localhost:3000/api/v1/auth/signin/', params)
    .then(res => res.json())
    .then(data => {
      const { message, status } = data;
      if (message === 'Signed in sucessfully') {
        const { isadmin, firstName } = data.data[0].user;
        const { token } = data.data[0];
        if (isadmin == true) {
          window.location.replace('./admin/dashboard.html');
          window.localStorage.setItem('token', token);
          window.localStorage.setItem('firstName', firstName);
        } else {
          window.location.replace('./dashboard.html');
        }
      } else if (status == 401 || status == 422) {
        $.Toast.hideToast();
        document.getElementById('error-info').style.display = 'block';
        document.getElementById('error-msg').innerHTML = 'Wrong credential. Try again or click Forgot password to reset it';
        document.getElementById('email').style.borderColor = 'rgb(248, 64, 64)';
        document.getElementById('password').style.borderColor = 'rgb(248, 64, 64)';
      }
    })
    .catch(error => {
      console.log(error);
    });
}

document.getElementById('signin').addEventListener('submit', signin)