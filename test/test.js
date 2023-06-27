const chai = require('chai');
const should = chai.should();
const request = require('supertest');
const app = require('../index'); // Assuming your main file is named "index.js"

describe('API Tests', function() {
  it('should return status 200 and Hello from Homepage.', function(done) {
    request(app)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        res.text.should.equal('Hello from Homepage.');
        done();
      });
  });

  it('should create a new employee', function(done) {
    request(app)
      .post('/create')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        age: 25,
        exp: []
      })
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('firstName').equal('John');
        res.body.should.have.property('lastName').equal('Doe');
        res.body.should.have.property('age').equal(25);
        res.body.exp.should.be.an('array');
        done();
      });
  });
  
  it('should retrieve the list of employees', function(done) {
    request(app)
      .get('/list')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.should.be.an('array');
        done();
      });
      });

});