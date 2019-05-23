import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import db from '../models/migration';

const should = chai.should();
chai.use(chaiHttp);

const signupRoute = '/api/v1/auth/signup/';
const signinRoute = '/api/v1/auth/signin/';
let token;
let wrongToken = 'absjesjsksksk';
const loanData = {
  amount: 100000,
  tenor: 4
}

describe('Test case for loan repayments', () => {
  it('should return 201 for valid credentials', (done) => {
    chai.request(app).post(signupRoute)
      .send({
        firstName: 'Alice',
        lastName: 'Williams',
        email: 'Alice@gmail.com',
        password: 'password',
        work_address: 'No 12 Laogos Nigeria',
        home_address: 'No 12 Laogos Nigeria',
      })
      .end((err, res) => {
        token = res.body.data[0].token;
        res.should.have.status(201);
        done();
      });
  });
  it(`should return 400 for user not verified`, done => {
    chai
      .request(app)
      .post('/api/v1/loans')
      .set('x-access-token', token)
      .send(loanData)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.error.should.equal("You are not yet verified");
        done();
      });
  });
  it('should return 200 for valid inputs user role', done => {
    chai.request(app).post('/api/v1/users/role')
      .send({
        email: 'Alice@gmail.com',
        isAdmin: 'true'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.equal('User role updated successfully');
        done();
      });
  });
  it('Should return 200 valid email and role Admin', done => {
    chai.request(app).patch('/api/v1/users/Alice@gmail.com/verify')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it(`should return 200 for valid inputs`, done => {
    chai
      .request(app)
      .post('/api/v1/loans')
      .set('x-access-token', token)
      .send(loanData)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it(`should return 400 for loan not yet approved`, done => {
    chai
      .request(app)
      .post('/api/v1/loans')
      .set('x-access-token', token)
      .send(loanData)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.error.should.equal("Your applied loan status is pending");
        done();
      });
  });
  it(`should return 422 for repayments of loan not approved`, done => {
    chai
      .request(app)
      .post('/api/v1/loans/2/repayments')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.error.should.equal('Loan with the provided id is still under pending');

        done();
      });
  });
  it(`should return 200 approve loan`, done => {
    chai
      .request(app)
      .patch('/api/v1/loans/2')
      .set('x-access-token', token)
      .send({
        status: 'approve'
      })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it(`should return 200 for repayments`, done => {
    chai
      .request(app)
      .post('/api/v1/loans/2/repayments')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.status.should.equal('Success');
        res.body.message.should.equal('Repayment transaction was successfull');
        done();
      });
  });
  it(`should return 400 for applying why there is outstanding loan`, done => {
    chai
      .request(app)
      .post('/api/v1/loans')
      .set('x-access-token', token)
      .send(loanData)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.error.should.equal("You cannot apply. You still have outstanding");
        done();
      });
  });
  it(`should return 200 for repayments`, done => {
    chai
      .request(app)
      .post('/api/v1/loans/2/repayments')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.status.should.equal('Success');
        res.body.message.should.equal('Repayment transaction was successfull');
        done();
      });
  });
  it(`should return 200 for repayments`, done => {
    chai
      .request(app)
      .post('/api/v1/loans/2/repayments')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.status.should.equal('Success');
        res.body.message.should.equal('Repayment transaction was successfull');
        done();
      });
  });
  it(`should return 200 for repayments`, done => {
    chai
      .request(app)
      .post('/api/v1/loans/2/repayments')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.status.should.equal('Success');
        res.body.message.should.equal('Repayment transaction was successfull');
        done();
      });
  });
  it(`should return 400 for repayments`, done => {
    chai
      .request(app)
      .post('/api/v1/loans/2/repayments')
      .set('x-access-token', token)
      .end((err, res) => {
        res.body.status.should.equal(400);
        res.body.error.should.equal('Loan with the provided id has been fully paid');
        done();
      });
  });
  it(`should return 200 for repayments`, done => {
    chai
      .request(app)
      .get('/api/v1/loans/2/repayments')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.status.should.equal('Success');
        res.body.message.should.equal('Repayments retrieve successfully');
        done();
      });
  });
})
