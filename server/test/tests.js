import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import db from '../models/dbTest';

db.createTables();

const should = chai.should();
chai.use(chaiHttp);
const signupRoute = '/api/v1/auth/signup/';
const signinRoute = '/api/v1/auth/signin/';
let token;
let wrongToken = 'absjesjsksksk';

describe('All test case for QuickCredit', () => {
  it('should return 200 application home page', (done) => {
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
  it('should return 404 for invalid route on / GET', (done) => {
    chai.request(app).get('/hello')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.error.should.equal('Page not found');
        done();
      });
  });
  describe('Test case for signup', () => {
    describe(`Post on ${signupRoute}`, () => {
      it('should return 201 for valid credentials', (done) => {
        chai.request(app).post(signupRoute)
          .send({
            firstName: 'Jonathan',
            lastName: 'williams',
            email: 'jo@gmail.com',
            password: 'password'
          })
          .end((err, res) => {

            done();
          });
      });
      it('should return 409 user already exist', (done) => {
        chai.request(app).post(signupRoute)
          .send({
            firstName: 'Jonathan',
            lastName: 'williams',
            email: 'jo@gmail.com',
            password: 'password'
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
            firstName: 'John'
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
            lastName: 'Sam'
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
            email: 'john@gmail.com'
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
            password: 'password'
          })
          .end((err, res) => {
            res.should.have.status(422);
            res.body.firstName.should.equal('First name must not be less than 2 or above 17 characters');
            done();
          });
      });
      it('should return 422 invalid last name length', (done) => {
        chai.request(app).post(signupRoute)
          .send({
            firstName: 'Jonathan',
            lastName: '',
            email: 'john@gmail.com',
            password: 'password'
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
            password: 'password'
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
            password: 'pas'
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
            password: ''
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
            password: 'password'
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
            password: 'password'
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
            password: 'password'
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
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('Test case for setting up user role', () => {
    it('should return 422 for undefined email and isAdmin', done => {
      chai.request(app).post('/api/v1/users/role')
        .send({
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.error.should.equal('All or some of the field is/are undefined');
          done();
        });
    });
    it('should return 422 for invalid email', done => {
      chai.request(app).post('/api/v1/users/role')
        .send({
          email: 'joh',
          isAdmin: 'true'
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.email.should.equal('Please enter a valid email');
          done();
        });
    });
    it('should return 422 for invalid email', done => {
      chai.request(app).post('/api/v1/users/role')
        .send({
          email: 'joh',
          isAdmin: 'true'
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.email.should.equal('Please enter a valid email');
          done();
        });
    });
    it('should return 422 for invalid isAdmin', done => {
      chai.request(app).post('/api/v1/users/role')
        .send({
          email: 'john@gmail.com',
          isAdmin: 'trueeee'
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.isAdmin.should.equal('isAdmin should be true or false');
          done();
        });
    });
    it('should return 200 for valid inputs', done => {
      chai.request(app).post('/api/v1/users/role')
        .send({
          email: 'jo@gmail.com',
          isAdmin: 'true'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.equal('User updated successfully');
          done();
        });
    });
    it('should return 404 for user not found', done => {
      chai.request(app).post('/api/v1/users/role')
        .send({
          email: 'john@gmail.com',
          isAdmin: 'true'
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should.equal('User with the given email not found');
          done();
        });
    });
  })
  describe('Test case for mark user as verified', () => {
    it('Admin signin', done => {
      chai.request(app).post('/api/v1/auth/signin')
        .send({
          email: 'jo@gmail.com',
          password: 'password'
        })
        .end((err, res) => {
          token = res.body.data[0].token;
          res.should.have.status(200);
          done();
        });
    });
    it('Should return 200 valid email and role Admin', done => {
      chai.request(app).patch('/api/v1/users/Philip@gmail.com/verify')
      .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('Should return 422 invalid email', done => {
      chai.request(app).patch('/api/v1/users/@.com/verify')
      .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.error.should.equal('Please enter a valid email');
          done();
        });
    });
    it('Should return 404 email not found', done => {
      chai.request(app).patch('/api/v1/users/daniel@gmail.com/verify')
      .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should.equal('User with the given email not found');
          done();
        });
    });
    it('Should return 200 User with the given email has already been verified', done => {
      chai.request(app).patch('/api/v1/users/Philip@gmail.com/verify')
      .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('User with the given email has already been verified');
          done();
        });
    });
    it('Client signin', done => {
      chai.request(app).post('/api/v1/auth/signin')
        .send({
          email: 'Philip@gmail.com',
          password: 'password'
        })
        .end((err, res) => {
          token = res.body.data[0].token;
          res.should.have.status(200);
          done();
        });
    });
    it('Should return 403 not Admin', done => {
      chai.request(app).patch('/api/v1/users/Philip@gmail.com/verify')
      .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
    it('Should return 401 wrong token', done => {
      chai.request(app).patch('/api/v1/users/Philip@gmail.com/verify')
      .set('x-access-token', wrongToken)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.equal('Invalid user');
          done();
        });
    });    
  });
});
