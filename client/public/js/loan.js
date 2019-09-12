const applicationId = localStorage.getItem('applicationId');
const token = localStorage.getItem('token');

if (!token) {
  window.location.href = './signin.html';
}

const getApplication = () => {
  $.Toast.showToast({
    "title": "Loading application detail...",
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
  fetch(`http://localhost:3000/api/v1/loans/${applicationId}`, option)
    .then(res => res.json())
    .then(data => {
        if(data.status == 'Success'){
            $.Toast.hideToast();
            const {
                userid, tenor, status, repaid
            } = data.data[0];

            let { created_date, amount, total_due, paymentinstallment, paid_amount, balance } = data.data[0];
            
            amount = parseFloat(amount).toFixed(2);
            total_due = parseFloat(total_due).toFixed(2);
            paymentinstallment = parseFloat(paymentinstallment).toFixed(2);
            paid_amount = parseFloat(paid_amount).toFixed(2);
            balance = parseFloat(balance).toFixed(2);
            

            document.getElementById('date').innerHTML = created_date.slice(0, 10);
            document.getElementById('clientId').innerHTML = userid;
            document.getElementById('amount').innerHTML = amount;
            document.getElementById('tenor').innerHTML = tenor;
            document.getElementById('installment').innerHTML = paymentinstallment;
            document.getElementById('amountPaid').innerHTML = paid_amount;
            document.getElementById('balance').innerHTML = balance;
            document.getElementById('totalDue').innerHTML = total_due;
            
        }
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
