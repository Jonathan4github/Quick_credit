import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import db from '../models/migration';

const should = chai.should();
chai.use(chaiHttp);

let token;
let wrongToken = 'absjesjsksksk';


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
  it('Should return 401 wrong token ', done => {
    chai.request(app).patch('/api/v1/users/Philip@gmail.com/verify')
      .set('x-access-token', wrongToken)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.error.should.equal('Invalid user');
        done();
      });
  });
});
describe('Test case for loan application', () => {
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

  it('Oustanding user signed in', done => {
    chai.request(app).post('/api/v1/auth/signin/')
      .send({
        email: 'Philip@gmail.com',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(200);
        token = res.body.data[0].token;
        done();
      });
  });

  it('Unverified user signed in', done => {
    chai.request(app).post('/api/v1/auth/signin/')
      .send({
        email: 'jo@gmail.com',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(200);
        token = res.body.data[0].token;
        done();
      });
  });
  it(`Shoud return 400 unverified user`, done => {
    chai
      .request(app)
      .post('/api/v1/loans')
      .set('x-access-token', token)
      .send({
        amount: 10000,
        tenor: 5
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.error.should.equal('You are not yet verified');
        done();
      });
  });
});

describe('Test case for Get a specific loan application', () => {
  it('Admin signed in', done => {
    chai.request(app).post('/api/v1/auth/signin/')
      .send({
        email: 'jo@gmail.com',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(200);
        token = res.body.data[0].token;
        done();
      });
  });
  it('should return status 422 invalid loan id', done => {
    chai
      .request(app)
      .get('/api/v1/loans/1.5')
      .set('Content-Type', 'application/json')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.error.should.equal('Invalid id');
        token = token;
        done();
      });
  });
  it('should return 404 loan id not found', done => {
    chai
      .request(app)
      .get('/api/v1/loans/13')
      .set('Content-Type', 'application/json')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it('should return 200 valid loan id', done => {
    chai
      .request(app)
      .get('/api/v1/loans/1')
      .set('Content-Type', 'application/json')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should return 200 valid loan id', done => {
    chai
      .request(app)
      .get('/api/v1/loans/')
      .set('Content-Type', 'application/json')
      .set('x-access-token', token)
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
      .set('x-access-token', token)
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
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should return 400 repaid value is required from query params', done => {
    chai
      .request(app)
      .get('/api/v1/loans?status=approved&repaid=tre')
      .set('Content-Type', 'application/json')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.repaid.should.equal('repaid value is required & should be true or false');
        done();
      });
  });
  it(`should return 422 invalid status value`, done => {
    chai
      .request(app)
      .patch('/api/v1/loans/1')
      .set('x-access-token', token)
      .send({
        status: 'appr'
      })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.error.should.equal('status required & should be approve or reject');
        done();
      });
  });
  it(`should return 200 valid status value`, done => {
    chai
      .request(app)
      .patch('/api/v1/loans/1')
      .set('x-access-token', token)
      .send({
        status: 'approve'
      })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
