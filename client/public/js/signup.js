const signup = event => {
  event.preventDefault();
  const post = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    homeAddress: document.getElementById('homeAddress').value,
    workAddress: document.getElementById('workAddress').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  };

  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  };

  fetch('http://localhost:3000/api/v1/auth/signup/', params)
    .then(res => res.json())
    .then(data => {
      if (data.message === 'Signed up sucessfully') {
        window.location.replace('./dashboard.html');
      } else if (data.error === 'The email you entered already exist') {
        document.getElementById('email').style.borderColor = 'rgb(248, 64, 64)';
        document.getElementById('error-info').style.display = 'block';
        document.getElementById('error-msg').innerHTML = 'Tha email is taken. Try another.';
      }
    })
    .catch(error => {
      return error;
    });
};

document.getElementById('signup').addEventListener('submit', signup);