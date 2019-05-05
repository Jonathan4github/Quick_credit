import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const should = chai.should();
chai.use(chaiHttp);
const signupRoute = '/api/v1/auth/signup/';
const signinRoute = '/api/v1/auth/signin/';
let token;

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
  describe('Test case for signup', () => {
    describe(`Post on ${signupRoute}`, () => {
      it('should return 201 for valid credentials', done => {
        chai.request(app).post(signupRoute)
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
      it('should return 409 user already exist', done => {
        chai.request(app).post(signupRoute)
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
      it('should return 400 firstName, lastName, email & password undefined', done => {
        chai.request(app).post(signupRoute)
          .send({})
          .end((err, res) => {
            res.should.have.status(400);
            res.body.error.should.equal('All or some of the field is/are undefined')
            done();
          });
      });
      it('should return 400 lastName, email & password undefined', done => {
        chai.request(app).post(signupRoute)
          .send({
            firstName: 'John'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.error.should.equal('All or some of the field is/are undefined')
            done();
          });
      });
      it('should return 400 email & password undefined', done => {
        chai.request(app).post(signupRoute)
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
      it('should return 400 password undefined', done => {
        chai.request(app).post(signupRoute)
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
      it('should return 400 invalid first name length', done => {
        chai.request(app).post(signupRoute)
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
      it('should return 400 invalid last name length', done => {
        chai.request(app).post(signupRoute)
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
      it('should return 400 invalid email address', done => {
        chai.request(app).post(signupRoute)
          .send({
            firstName: 'Jonathan',
            lastName: '',
            email: '@gmail.com',
            password: 'password'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.email.should.equal('Please enter a valid email')
            done();
          });
      });
      it('should return 400 invalid password length', done => {
        chai.request(app).post(signupRoute)
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
      it('should return 400 empty inputs', done => {
        chai.request(app).post(signupRoute)
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
      it('should return 400 invalid email address', done => {
        chai.request(app).post(signupRoute)
          .send({
            firstName: 'Jonathan',
            lastName: 'Williams',
            email: 'gmail.com',
            password: 'password'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.email.should.equal('Please enter a valid email');
            done();
          });
      });
    });
  });

  describe('Test case for Signin', () => {
    describe(`Post on ${signinRoute}`, () => {
      it('should return 400 invalid password length', done => {
        chai.request(app).post(signinRoute)
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
      it('should return 401 invalid credential', done => {
        chai.request(app).post(signinRoute)
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
        chai.request(app).post(signinRoute)
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
    });
    describe('Test case for User verification', () => {
      describe('PATCH on  /users/<:user-email>/verify', () => {
        it('should return 400  user home address required', done => {
          chai.request(app).patch('/api/v1/users/panel@gmail.com/verify')
            .end((err, res) => {
              res.should.have.status(400);
              res.body.address.should.equal('User home address is required');
              done();
            });
        });
        it('should return 400 user work address required', done => {
          chai.request(app).patch('/api/v1/users/alibaba@gmail.com/verify')
            .end((err, res) => {
              res.should.have.status(400);
              res.body.workAddress.should.equal('User work address is required');
              done();
            });
        });
        it('should return 400 user home & work address required', done => {
          chai.request(app).patch('/api/v1/users/alice@gmail.com/verify')
            .end((err, res) => {
              res.should.have.status(400);
              res.body.workAddress.should.equal('User work address is required');
              res.body.address.should.equal('User home address is required');
              done();
            });
        });
        it('should return 200 valid home & work address', done => {
          chai.request(app).patch('/api/v1/users/timi@gmail.com/verify')
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
        });
      });
    });
  })
  describe('Test case to Get loan', () => {
    describe('Get on /api/v1/loans/<:loan-id>', () => {
      it('should return status 200 valid loan id', done => {
        chai
          .request(app)
          .get('/api/v1/loans/1')
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
      it('should return status 404 invalid loan id', done => {
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
    });
    describe('Get on /api/v1/loans/', () => {
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
    });
    describe('Get on /api/v1/loans?status=approved&repaid=false', () => {
      it('should return 200 loans all not fully repaid', done => {
        chai
          .request(app)
          .get('/api/v1/loans?status=approved&repaid=false')
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    describe('Get on /api/v1/loans?status=approved&repaid=true', () => {
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
      it('should return 400 value is required from query params', done => {
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
    });    
  });
  describe('Test case for repayments history', () => {
    describe('Get on /loans/<:loan-id>/repayments', () => {
      it('should return 200 valid loan id', done => {
        chai
          .request(app)
          .get('/api/v1/loans/2/repayments')
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
      it(`should return 200 for empty repayment history`, done => {
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
    })
    describe('Test case for loan application', () => {
      describe('Post on /api/v1/loans/', () => {
        it(`should return 400 for invalid amount value`, done => {
          chai
            .request(app)
            .post('/api/v1/loans')
            .set('x-access-token', token)
            .send({
              amount: 'wrongInput',
              tenor: 7
            })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.amount.should.equal('amount should be number & not less than 1000 or above 10000000');
              done();
            });
        });
        describe('Post on /api/v1/loans/', () => {
          it(`should return 400 for invalid tenor value`, done => {
            chai
              .request(app)
              .post('/api/v1/loans')
              .set('x-access-token', token)
              .send({
                amount: 10000,
                tenor: 13
              })
              .end((err, res) => {
                res.should.have.status(400);
                res.body.tenor.should.equal('tenor should be number & not less than 1 or above 12');
                done();
              });
          });
        });
        describe('Post on /api/v1/loans/', () => {
          it(`should return 200 for valid inputs`, done => {
            chai
              .request(app)
              .post('/api/v1/loans')
              .set('x-access-token', token)
              .send({
                amount: 10000,
                tenor: 5
              })
              .end((err, res) => {
                res.should.have.status(200);
                done();
              });
          });
        });
      });
    });
  });
});
