var should = require('should');
var assert = require("assert");
var supertest = require('supertest');
var api = supertest('http://localhost:4040');
describe('ContactApis', function(){
    describe('#getContactById', function(){
        it('Mongo ObjectId cast error', function (done) {
            api.get('/contact/12')
                .set('x-api-key', '123myapikey')
                .auth('incorrect', 'credentials')
                .end(function(err, res){
                    assert.equal(500,JSON.parse(res.res.text).status);
                    assert.equal('CastError',JSON.parse(res.res.text).error.name);
                    done();
                });
        });
        it('Mongo ObjectId is valid. But user is not found in db.', function (done) {
            api.get('/contact/555783f6b79d5edf1f6680be')
                .set('x-api-key', '123myapikey')
                .auth('incorrect', 'credentials')
                .end(function(err, res){
                    assert.equal(200,JSON.parse(res.res.text).status);
                    assert.equal(null,JSON.parse(res.res.text).data);
                    done();
                });
        });
    });
    describe('#getAllContact', function(){
        it('User Id is wrong. So Not Found any contact', function (done) {
            api.get('/contact?user_id=5560debb1aa1edf436788f21')
                .set('x-api-key', '123myapikey')
                .auth('incorrect', 'credentials')
                .end(function(err, res){
                    assert.equal(200,JSON.parse(res.res.text).status);
                    assert.equal(0,JSON.parse(res.res.text).data.length);
                    done();
                });
        });
        it('User Id is not available in request, So result will be blank', function (done) {
            api.get('/contact')
                .set('x-api-key', '123myapikey')
                .auth('incorrect', 'credentials')
                .end(function(err, res){
                    assert.equal(200,JSON.parse(res.res.text).status);
                    assert.equal(0,JSON.parse(res.res.text).data.length);
                    done();
                });
        });
    });
});

describe('UserApis', function(){
    describe('#login', function(){
        it('Try login with wrong credential', function (done) {
            var body = {
                username: 'Satyam Chaudhary',
                password: 'satyam88391'
            }
            api.post('/login')
                .send(body)
                .set('x-api-key', '123myapikey')
                .auth('incorrect', 'credentials')
                .end(function(err, res){
                    assert.equal(500,JSON.parse(res.res.text).status);
                    assert.equal('invalid credentials',JSON.parse(res.res.text).error);
                    done();
                });
        });
    });
    describe('#getUserInfo', function(){
        it('User Id is wrong. So Not Found any information of user', function (done) {
            api.get('/user/5560882661393c6a21b69825')
                .set('x-api-key', '123myapikey')
                .auth('incorrect', 'credentials')
                .expect(200)
                .end(function(err, res){
                    assert.equal(200,JSON.parse(res.res.text).status);
                    assert.equal(null,JSON.parse(res.res.text).data);
                    done();
                });
        });
    });
});


