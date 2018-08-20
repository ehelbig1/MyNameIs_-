const request = require('supertest');

describe('loading express', function(){
    var http;

    beforeEach(function(){
        http = require('../app');
    });

    afterEach(function(){
        http.close();
    });

    it('responds to /', function testHome(done){
        request(http)
            .get('/')
            .expect(200, done);
    });

    it('responds to /meettheteam', function(done){
        request(http)
            .get('/meettheteam')
            .expect(200, done);
    });

    // it('responds to /putafacetothename', function(done){
    //     setTimeout(() => {
    //         request(http)
    //             .get('/putafacetothename')
    //             .expect(200, done);
    //     }, 1000);
    // });

    // it('responds to /findmembersbyname', function(done){
    //     setTimeout(() => {
    //         request(http)
    //             .get('/findmembersbyname')
    //             .expect(200, done);
    //     }, 1000);
    // });

    it('responds to /meettheteam/:id', function(){
        setTimeout(() => {
            request(http)
                .get('./meettheteam/4NCJTL13UkK0qEIAAcg4IQ')
                .expect(200, done);
        }, 1000);
    });

    it('404 everything else', function(done){
        request(http)
            .get('/test')
            .expect(404, done);
    })
});