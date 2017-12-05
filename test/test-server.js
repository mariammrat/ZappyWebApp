var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('Tweets', function() {
  it('should list ALL tweets on /tweetsSet GET', function(done) {
	this.timeout(10000);
	chai.request(server)
		.get('/api/tweetsSet')
		.end(function(err, res){
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('array');
			done();
		});
	});
  it('should add ALL tweets on /tweetsSet POST', function(done) {
	chai.request(server)
		.post('/api/tweetsSet')
		.end(function(err, res){
			res.should.have.status(200);
			res.body.should.be.a('string');
			done();
		});
	});
});
