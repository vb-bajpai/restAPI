let mongoose = require("mongoose");
const chai = require('chai');
const should = chai.should();
const request = require('supertest');
const app = require('../index'); 
const Employee = require('../Employe'); 
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('API Tests', function() {
    it('test string',function(){
        var foo = "bar";
        foo.should.be.a('string');
    })
});
describe('Api TESts', () => {
    beforeEach((done) => {
        Employee.remove({}, (err) => { 
           done();           
        });        
    });
});
describe('/GET Employees', () => {
  it('should return status 200 and Hello from Homepage.', function(done) {
    request(app)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        res.text.should.equal('Hello from Homepage.');
        done();
      });
  })
});
describe('/Post Employee',()=>{
  it('should create a new employee', function(done) {
    request(app)
      .post('/create')
      .send({
        firstName: 'vanshika',
        lastName: 'vanshika',
        age: 25,
        exp: []
      })
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.employeedata.should.have.property('firstName').that.is.a('string');
        res.body.employeedata.should.have.property('lastName').that.is.a('string');
        res.body.employeedata.should.have.property('age').that.is.a('number');
        res.body.employeedata.exp.should.be.an('array');
        done();
      });
  });
});
describe('/GET list',()=>{
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
describe('/PUT employee update',()=>{
      it('it should UPDATE a employee given the id', (done) => {
        let data = new Employee({firstName: "Parv", lastname: "verma", age:30})
        app.save((err, book) => {
              chai.request(server)
              .put('/update/:id')
              .send({firstName: "Parv", lastname: "verma", age:30 })
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.employeedata.should.have.property('message').eql('Book updated!');
                    res.body.employeedata.should.have.property('firstName').that.is.a('string');
                    res.body.employeedata.should.have.property('lastName').that.is.a('string');
                    res.body.employeedata.should.have.property('age').that.is.a('number');
                done();
              });
            });
        });
    });
    describe('/DELETE/:id Employee', () => {
        it('it should DELETE a book given the id', (done) => {
            let emp = new Employee({firstName: "Parv", lastname: "verma", age:30})
            const employeeId = "6494db4db899cf6d248ba090";
            request(app)
              .delete(`/delete/${employeeId}`)
              .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Book successfully deleted!');
                res.body.result.should.have.property('ok').eql(1);
                res.body.result.should.have.property('n').eql(1);
                done();
              });
          });
        
    });