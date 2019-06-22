const token = localStorage.getItem('token');
const firstName = localStorage.getItem('firstName');
if (!token) {
  window.location.href = '../signin.html';
}

const getAllClients = () => {
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
      clients.map((client) => {
        document.getElementById('clientsData').innerHTML += `
        <tr>
        <td>${client.created_date}</td>
        <td>${client.firstname} ${client.lastname}</td>
        <td>${client.email}</td>
        <td>${client.status}</td>
        </tr>        
        `
      });
    });
};

const getClient = (id) => {

};