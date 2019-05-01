import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const should = chai.should();
chai.use(chaiHttp);

describe('All test case for QuickCredit', () => {
  it('should return 200 application home page', done => {
    chai
      .request(app)
      .get('/')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.equal('Welcome to Quick Credit Web App.');
        done();
      });
  });
  it('should return 404 for invalid route on / GET', done => {
    chai.request(app).get('/hello')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.error.should.equal('Page not found');
        done();
      });
  });
  it('should return 201 for Signup: valid credentials signup user', done => {
    chai.request(app).post('/api/v1/auth/signup/')
      .send({
        firstName: 'Jonathan',
        lastName: 'williams',
        email: 'jo@gmail.com',
        password: 'password',
        address: '',
        wordAddress: ''
      })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it('should return 409 Signup: user already exist', done => {
    chai.request(app).post('/api/v1/auth/signup/')
      .send({
        firstName: 'Jonathan',
        lastName: 'williams',
        email: 'jo@gmail.com',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(409);
        res.body.error.should.equal('The email you entered already exist')
        done();
      });
  });
  it('should return 400 Signup: firstName, lastName, email & password undefined', done => {
    chai.request(app).post('/api/v1/auth/signup/')
      .send({})
      .end((err, res) => {
        res.should.have.status(400);
        res.body.error.should.equal('All or some of the field is/are undefined')
        done();
      });
  });
  it('should return 400 Signup: lastName, email & password undefined', done => {
    chai.request(app).post('/api/v1/auth/signup/')
      .send({
        firstName: 'John'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.error.should.equal('All or some of the field is/are undefined')
        done();
      });
  });
  it('should return 400 Signup: email & password undefined', done => {
    chai.request(app).post('/api/v1/auth/signup/')
      .send({
        firstName: 'John',
        lastName: 'Sam'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.error.should.equal('All or some of the field is/are undefined')
        done();
      });
  });
  it('should return 400 Signup: password undefined', done => {
    chai.request(app).post('/api/v1/auth/signup/')
      .send({
        firstName: 'John',
        lastName: 'Sam',
        email: 'john@gmail.com'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.error.should.equal('All or some of the field is/are undefined')
        done();
      });
  });
  it('should return 400 Signup: invalid first name length', done => {
    chai.request(app).post('/api/v1/auth/signup/')
      .send({
        firstName: 'J',
        lastName: 'Sam',
        email: 'john@gmail.com',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.firstName.should.equal('First name must not be less than 2 or above 17 characters')
        done();
      });
  });
  it('should return 400 Signup: invalid last name length', done => {
    chai.request(app).post('/api/v1/auth/signup/')
      .send({
        firstName: 'Jonathan',
        lastName: '',
        email: 'john@gmail.com',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.lastName.should.equal('Lastname must not be less than 2 or above 17 characters')
        done();
      });
  });
  it('should return 400 Signup: invalid email address', done => {
    chai.request(app).post('/api/v1/auth/signup/')
      .send({
        firstName: 'Jonathan',
        lastName: 'Williams',
        email: 'john.com',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.email.should.equal('Please enter a valid email')
        done();
      });
  });
  it('should return 400 Signup: invalid password length', done => {
    chai.request(app).post('/api/v1/auth/signup/')
      .send({
        firstName: 'Jonathan',
        lastName: 'Williams',
        email: 'john@gmail.com',
        password: 'pas'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.password.should.equal('password must not be less than 7 or above 10 characters');
        done();
      });
  });
  it('should return 400 Signup: empty inputs', done => {
    chai.request(app).post('/api/v1/auth/signup/')
      .send({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.firstName.should.equal('First name must not be less than 2 or above 17 characters');
        res.body.lastName.should.equal('Lastname must not be less than 2 or above 17 characters');
        res.body.email.should.equal('Please enter a valid email');
        res.body.password.should.equal('password must not be less than 7 or above 10 characters');
        done();
      });
  });
  it('should return 400 Signin: invalid email address', done => {
    chai.request(app).post('/api/v1/auth/signin/')
      .send({
        email: 'gmail.com',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.email.should.equal('Please enter a valid email');
        done();
      });
  });
  it('should return 400 Signin: invalid password length', done => {
    chai.request(app).post('/api/v1/auth/signin/')
      .send({
        email: 'jo@gmail.com',
        password: ''
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.password.should.equal('Please enter a valid password');
        done();
      });
  });
  it('should return 401 Signin: invalid credential', done => {
    chai.request(app).post('/api/v1/auth/signin/')
      .send({
        email: 'jo@gmail.com',
        password: '91passord'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.error.should.equal('The credentials you provided is incorrect');
        done();
      });
  });
  it('should return 200 Signin: valid credential', done => {
    chai.request(app).post('/api/v1/auth/signin/')
      .send({
        email: 'jo@gmail.com',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should return 400 mark user as verified: invalid email', done => {
    chai.request(app).patch('/api/v1/users/panlaz@gmail.com/verify')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.error.should.equal('User with the given email panlaz@gmail.com does not exist');
        done();
      });
  });
  it('should return 400 mark user as verified: user home address required', done => {
    chai.request(app).patch('/api/v1/users/panel@gmail.com/verify')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.address.should.equal('User home address is required');
        done();
      });
  });
  it('should return 400 mark user as verified: user work address required', done => {
    chai.request(app).patch('/api/v1/users/alibaba@gmail.com/verify')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.workAddress.should.equal('User work address is required');
        done();
      });
  });
  it('should return 400 mark user as verified: home & user work address required', done => {
    chai.request(app).patch('/api/v1/users/alice@gmail.com/verify')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.workAddress.should.equal('User work address is required');
        res.body.address.should.equal('User home address is required');
        done();
      });
  });
  it('should return status 200 and loan data: valid loan id', done => {
    chai
      .request(app)
      .get('/api/v1/loans/1')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should return status 404 and loan data: invalid loan id', done => {
    chai
      .request(app)
      .get('/api/v1/loans/12')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.error.should.equal('Loan with given id was not found');
        done();
      });
  });
  it('should return all loans', done => {
    chai
      .request(app)
      .get('/api/v1/loans')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should return all current loans that are not fully repaid', done => {
    chai
      .request(app)
      .get('/api/v1/loans?status=approved&repaid=false')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should return all repaid loan', done => {
    chai
      .request(app)
      .get('/api/v1/loans?status=approved&repaid=true')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should return 400 status value is required from query params', done => {
    chai
      .request(app)
      .get('/api/v1/loans?stats=approved&repaid=true')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.status.should.equal('status value is required & should be pending, approved, rejected');
        done();
      });
  });
  it('should return 400 repaid value is required from query params', done => {
    chai
      .request(app)
      .get('/api/v1/loans?status=approved&repaid=tre')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.repaid.should.equal('repaid value is required & should be true or false');
        done();
      });
  });
  it('should return repayments history with valid loan id', done => {
    chai
      .request(app)
      .get('/api/v1/loans/2/repayments')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it(`should return 'Loan with the given id has no repayments history' for empty repayments`, done => {
    chai
      .request(app)
      .get('/api/v1/loans/2/repayments')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.equal('Loan with the given id has no repayments history');
        done();
      });
  });
  it(`should return 400 for 'Invalid loan id'`, done => {
    chai
      .request(app)
      .get('/api/v1/loans/21/repayments')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.error.should.equal('Invalid loan id');
        done();
      });
  });





});
