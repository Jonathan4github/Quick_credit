const clientId = localStorage.getItem('clientId');
const token = localStorage.getItem('token');

if (!token) {
  window.location.href = './signin.html';
}

const getClient = () => {
  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };
  fetch(`http://localhost:3000/api/v1/users/${clientId}`, option)
    .then(res => res.json())
    .then(data => {
      console.log(data.data[0])
      const {
        firstname, lastname, email, work_address, home_address, isadmin
      } = data.data[0];

      document.getElementById('firstname').value = firstname;
      document.getElementById('lastname').value = lastname;
      document.getElementById('email').value = email;
      document.getElementById('homeAddress').value = home_address;
      document.getElementById('workAddress').value = work_address;
      
      let role = document.getElementById('role');

      console.log(isadmin)
      
      isadmin === true? role.value = 'Admin' : role.value = 'User';

    });
};