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
        password: 'password'
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
  it('should return 400 Signup: invalid first name length', done => {
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




});