const token = localStorage.getItem('token');
const firstName = localStorage.getItem('firstName');
if (!token) {
  window.location.href = '../signin.html';
}

const getAllloansApplication = () => {
  $.Toast.showToast({
    "title": "Loading clients data...",
    "icon": "loading",
    "duration": 50000
  });
  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };
  fetch('http://localhost:3000/api/v1//loans/', option)
    .then(res => res.json())
    .then((data) => {
      if (data.status == 'Success') {
        const applications = data.data;
        console.log(applications);
        applications.map(application => {
          const { created_date, id, status } = application;
          let amount = parseFloat(application.amount).toFixed(2);

          document.getElementById('applicationsData').innerHTML += `
          <tr>
          <td>${created_date}</td>
          <td>${id}</td>
          <td>${amount}</td>
          <td>${status}</td>
          </tr>          
          `
        });
      }
    });
};

const getClient = (id) => {
  if (id) {
    window.localStorage.setItem('clientId', id);
    window.location.href = './client_detail.html';
  }
};