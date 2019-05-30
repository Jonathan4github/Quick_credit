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


describe('Test case for signup', () => {
  describe(`Post on ${signupRoute}`, () => {
    it('should return 201 for valid credentials', (done) => {
      chai.request(app).post(signupRoute)
        .send({
          firstName: 'Jonathan',
          lastName: 'williams',
          email: 'jo@gmail.com',
          password: 'password',
          workAddress: 'No 12 Laogos Nigeria',
          homeAddress: 'No 12 Laogos Nigeria',

        })
        .end((err, res) => {
          done();
        });
    });
    it('should return 201 for valid credentials', (done) => {
      chai.request(app).post(signupRoute)
        .send({
          firstName: 'Philip',
          lastName: 'Thomason',
          email: 'Philip@gmail.com',
          password: 'password',
          workAddress: 'No 12 Laogos Nigeria',
          homeAddress: 'No 12 Laogos Nigeria',
        })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
    it('should return 409 user already exist', (done) => {
      chai.request(app).post(signupRoute)
        .send({
          firstName: 'Jonathan',
          lastName: 'williams',
          email: 'jo@gmail.com',
          password: 'password',
          workAddress: 'No 12 Laogos Nigeria',
          homeAddress: 'No 12 Laogos Nigeria',
        })
        .end((err, res) => {
          res.should.have.status(409);
          res.body.error.should.equal('The email you entered already exist');
          done();
        });
    });
    it('should return 422 firstName, lastName, email & password undefined', (done) => {
      chai.request(app).post(signupRoute)
        .send({})
        .end((err, res) => {
          res.should.have.status(422);
          res.body.error.should.equal('All or some of the field is/are undefined');
          done();
        });
    });
    it('should return 422 lastName, email & password undefined', (done) => {
      chai.request(app).post(signupRoute)
        .send({
          firstName: 'John',
          workAddress: 'No 12 Laogos Nigeria',
          homeAddress: 'No 12 Laogos Nigeria',
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.error.should.equal('All or some of the field is/are undefined');
          done();
        });
    });
    it('should return 422 email & password undefined', (done) => {
      chai.request(app).post(signupRoute)
        .send({
          firstName: 'John',
          lastName: 'Sam',
          workAddress: 'No 12 Laogos Nigeria',
          homeAddress: 'No 12 Laogos Nigeria',
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.error.should.equal('All or some of the field is/are undefined');
          done();
        });
    });
    it('should return 422 password undefined', (done) => {
      chai.request(app).post(signupRoute)
        .send({
          firstName: 'John',
          lastName: 'Sam',
          email: 'john@gmail.com',
          workAddress: 'No 12 Laogos Nigeria',
          homeAddress: 'No 12 Laogos Nigeria',
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.error.should.equal('All or some of the field is/are undefined');
          done();
        });
    });
    it('should return 422 invalid first name length', (done) => {
      chai.request(app).post(signupRoute)
        .send({
          firstName: 'J',
          lastName: 'Sam',
          email: 'john@gmail.com',
          password: 'password',
          workAddress: 'No 12 Laogos Nigeria',
          homeAddress: 'No 12 Laogos Nigeria',
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.firstName.should.equal('First name must not be less than 2 or above 17 characters');
          done();
        });
    });
    it('should return 422 invalid work address length', (done) => {
      chai.request(app).post(signupRoute)
        .send({
          firstName: 'Jonathan',
          lastName: 'Sam',
          email: 'john@gmail.com',
          password: 'password',
          workAddress: '',
          homeAddress: 'No 12 Laogos Nigeria',
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.workAddress.should.equal('work address must not be less than 7 or above 30 characters');
          done();
        });
    });
    it('should return 422 invalid home address length', (done) => {
      chai.request(app).post(signupRoute)
        .send({
          firstName: 'Jonathan',
          lastName: 'Sam',
          email: 'john@gmail.com',
          password: 'password',
          workAddress: 'No 12 Laogos Nigeria',
          homeAddress: '',
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.homeAddress.should.equal('home address must not be less than 7 or above 30 characters');
          done();
        });
    });
    it('should return 422 invalid last name length', (done) => {
      chai.request(app).post(signupRoute)
        .send({
          firstName: 'Jonathan',
          lastName: '',
          email: 'john@gmail.com',
          password: 'password',
          workAddress: 'No 12 Laogos Nigeria',
          homeAddress: 'No 12 Laogos Nigeria',
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.lastName.should.equal('Lastname must not be less than 2 or above 17 characters');
          done();
        });
    });
    it('should return 422 invalid email address', (done) => {
      chai.request(app).post(signupRoute)
        .send({
          firstName: 'Jonathan',
          lastName: '',
          email: '@gmail.com',
          password: 'password',
          workAddress: 'No 12 Laogos Nigeria',
          homeAddress: 'No 12 Laogos Nigeria',
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.email.should.equal('Please enter a valid email');
          done();
        });
    });
    it('should return 422 invalid password length', (done) => {
      chai.request(app).post(signupRoute)
        .send({
          firstName: 'Jonathan',
          lastName: 'Williams',
          email: 'john@gmail.com',
          password: 'pas',
          workAddress: 'No 12 Laogos Nigeria',
          homeAddress: 'No 12 Laogos Nigeria',
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.password.should.equal('password must not be less than 7 or above 10 characters');
          done();
        });
    });
    it('should return 422 empty inputs', (done) => {
      chai.request(app).post(signupRoute)
        .send({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          workAddress: 'No 12 Laogos Nigeria',
          homeAddress: 'No 12 Laogos Nigeria',
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.firstName.should.equal('First name must not be less than 2 or above 17 characters');
          res.body.lastName.should.equal('Lastname must not be less than 2 or above 17 characters');
          res.body.email.should.equal('Please enter a valid email');
          res.body.password.should.equal('password must not be less than 7 or above 10 characters');
          done();
        });
    });
    it('should return 422 invalid email address', (done) => {
      chai.request(app).post(signupRoute)
        .send({
          firstName: 'Jonathan',
          lastName: 'Williams',
          email: 'gmail.com',
          password: 'password',
          workAddress: 'No 12 Laogos Nigeria',
          homeAddress: 'No 12 Laogos Nigeria',
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.email.should.equal('Please enter a valid email');
          done();
        });
    });
    it('should return 422 invalid email address', (done) => {
      chai.request(app).post(signupRoute)
        .send({
          firstName: 'Jonathan12',
          lastName: 'Williams',
          email: 'gmail.com',
          password: 'password',
          workAddress: 'No 12 Laogos Nigeria',
          homeAddress: 'No 12 Laogos Nigeria',
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.firstName.should.equal('First name should be all alphalbet');
          done();
        });
    });
    it('should return 422 invalid email address', (done) => {
      chai.request(app).post(signupRoute)
        .send({
          firstName: 'Jonathan',
          lastName: 'Williams12',
          email: 'gmail.com',
          password: 'password',
          workAddress: 'No 12 Laogos Nigeria',
          homeAddress: 'No 12 Laogos Nigeria',
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.lastName.should.equal('Last name should be all alphalbet');
          done();
        });
    });
  });
});

describe('Test case for sigin', () => {
  it('should return 422 email and password undefined', done => {
    chai.request(app).post('/api/v1/auth/signin/')
      .send({

      })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.error.should.equal('All or some of the field is/are undefined');
        done();
      });
  });
  it('should return 422 invalid email address', done => {
    chai.request(app).post('/api/v1/auth/signin/')
      .send({
        email: 'gmail.com',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.email.should.equal('Please enter a valid email');
        done();
      });
  });
  it('should return 422 invalid password length', done => {
    chai.request(app).post('/api/v1/auth/signin/')
      .send({
        email: 'jo@gmail.com',
        password: ''
      })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.password.should.equal('Please enter a valid password');
        done();
      });
  });
  it('should return 401 invalid credential', done => {
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
  it('should return 200 valid credential', done => {
    chai.request(app).post('/api/v1/auth/signin/')
      .send({
        email: 'jo@gmail.com',
        password: 'password'
      })
      .end((err, res) => {
        token = token = res.body.data[0].token;
        res.should.have.status(200);
        done();
      });
  });
  it('should return 200 signin with token', done => {
    chai.request(app).post('/api/v1/auth/signin/')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should return 401 signin with wrong token', done => {
    chai.request(app).post('/api/v1/auth/signin/')
      .set('x-access-token', wrongToken)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});
