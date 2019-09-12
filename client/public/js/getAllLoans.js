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
        $.Toast.hideToast();
        const applications = data.data;
        applications.map(application => {
          const { created_date, userid, id, status } = application;
          let amount = parseFloat(application.amount).toFixed(2);

          document.getElementById('applicationsData').innerHTML += `
          <tr onclick="getLoanId(id)" id=${id}>
          <td>${created_date}</td>
          <td>${userid}</td>
          <td>${amount}</td>
          <td>${status}</td>
          </tr>          
          `
        });
      }
    });
};

const getLoanId = (id) => {
  if (id) {
    window.localStorage.setItem('applicationId', id);
    window.location.href = './loan_application_detail.html';
  }
};