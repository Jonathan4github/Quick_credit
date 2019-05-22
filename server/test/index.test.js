import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import db from '../models/migration';

const should = chai.should();
chai.use(chaiHttp);

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
});