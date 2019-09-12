const token = localStorage.getItem('token');
const firstName = localStorage.getItem('firstName');
if (!token) {
  window.location.href = '../signin.html';
}

const getAllClients = () => {
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
  fetch('http://localhost:3000/api/v1/users/', option)
    .then(res => res.json())
    .then((data) => {
      const clients = data.data;
      $.Toast.hideToast();
      clients.map((client) => {
        document.getElementById('clientsData').innerHTML += `
        <tr onclick="getClient(id)" id=${client.id}>
        <td>${client.created_date}</td>
        <td>${client.id}</td>
        <td>${client.firstname} ${client.lastname}</td>
        <td>${client.email}</td>
        <td>${client.status}</td>
        </tr>        
        `
      });
    });
};

const getClient = (id) => {
  if (id) {
    window.localStorage.setItem('clientId', id);
    window.location.href = './client_detail.html';
  }
};