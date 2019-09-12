const clientId = localStorage.getItem('clientId');
const token = localStorage.getItem('token');

if (!token) {
  window.location.href = './signin.html';
}

const getClient = () => {
  $.Toast.showToast({
    "title": "Loading client detail...",
    "icon": "loading",
    "duration": 16000
  });

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
      const {
        firstname, lastname, email, work_address, home_address, isadmin,
        image, status
      } = data.data[0];

      $.Toast.hideToast();

      document.getElementById('firstname').value = firstname;
      document.getElementById('lastname').value = lastname;
      document.getElementById('email').value = email;
      document.getElementById('homeAddress').value = home_address;
      document.getElementById('workAddress').value = work_address;
      document.getElementById('avater').src = image;
      document.getElementById('status').innerHTML = status;
      window.localStorage.setItem('email', email);


      let role = document.getElementById('role');
      isadmin === true ? role.value = 'Admin' : role.value = 'User';
      status === 'verified'? document.getElementById('verified-btn').innerHTML = '': null;
    });
};

const markUserAsVerified = () => {
  const email = localStorage.getItem('email');

  const option = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };
  fetch(`http://localhost:3000/api/v1/users/${email}/verify`, option)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.status == 'Success') {
        $.Toast.showToast({
          "title": "User verified successfully",
          "icon": "success",
          "duration": 3000
        });
        const verifyBtn = document.getElementById('verify-btn');
        verifyBtn.innerHTML = '&#10004; verified';
        verifyBtn.style.color = 'green';
        verifyBtn.setAttribute("disable")
      }
    });
}
