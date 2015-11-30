var expect = require('chai').expect;
var app = require('../app');
var request = require('supertest');

var agent = request.agent(app);

describe('GET /posts', function(){
  it('should respond with 200 in case of valid request', function(done){
    agent.get('/posts')
    .send()
    .end(function(err, res){
      if(err){ return done(err); }
      var fetchedData = JSON.parse(res.text);
      expect(fetchedData).to.be.an('array');
      expect(fetchedData).to.not.empty;
      var post = fetchedData[0];

      if(post){
        console.log('this is a post in user_test.js :' , post);
        expect(post).to.have.all.keys('__v','_id','link', 'title','comments','upvotes');
        expect(post.comments).to.be.an('array');
        expect(post.upvotes).to.be.a('number');
        done();
      }
    });
  });
});
