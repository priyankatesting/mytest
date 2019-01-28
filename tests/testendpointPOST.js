const chai = require('chai');
const expect = require('chai').expect;
chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../app.js');
const fs = require('fs')



//Test for right header type
//----------------------------------------------------
describe('API endpoint /urlpost', function() {
  // GET - List all colors
  it('should return status 200 & length 0 for correct header type', function() {
    return chai.request(app)
      .post('/urlpost')
      .set('content-type','application/json')
      .send({
        "payload": [{}]
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        let resultArray = res.body["response"];
        expect(resultArray).to.have.length(0);
      });
  });
});

//Test for wrong header type
//----------------------------------------------------
describe('API endpoint /urlpost', function() {
  // GET - List all colors
  it('should return status 404 for incorrect header type', function() {
    return chai.request(app)
      .post('/urlpost')
      .set('content-type','application/x-www-form-urlencoded')
      .send({
        "payload": [{}]
      })
      .then(function(res) {
        expect(res).to.have.status(404);
      });
  });
});


//Test for correct json format, irrespective of the value inside
//----------------------------------------------------
describe('API endpoint /urlpost', function() {
  // GET - List all colors
  it('should return status 200 for the correct json format , length 0', function() {
    return chai.request(app)
      .post('/urlpost')
      .set('content-type','application/json')
      .send({
        "payload": [{
          "country": "UK"
        }]
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        let resultArray = res.body["response"];
        expect(resultArray).to.have.length(0);
      });
  });
});

//Test for INCORRECT json format
//----------------------------------------------------
describe('API endpoint /urlpost', function() {
  it('should return status 500 for incorrect JSON format', function() {
    return chai.request(app)
      .post('/urlpost')
      .type('application/json')
      .send({
          "country": "UK"
        })
      .then(function(res) {
        expect(res).to.have.status(500);
      });
  });
});

//Test for given input zero length array and expected output 404
//----------------------------------------------------
describe('API endpoint /urlpost', function() {
  var requestObject = {"payload": []};

  it('should return status 404 for empty array', function() {
    return chai.request(app)
      .post('/urlpost')
      .set('content-type','application/json')
      .send(requestObject)
      .then(function(res) {
        expect(res).to.have.status(404);
      });
  });
});


//Test for given input which has single array and expected output 200 & length 1
//----------------------------------------------------
describe('API endpoint /urlpost', function() {
  var requestObject ;

  it('should return status 200 for valid array(single array)', function() {
    var fs = require('fs');
    requestObject = (fs.readFileSync('./tests/singlearray', 'utf8'));
    //debugger;
    return chai
      .request(app)
      .post('/urlpost')
      .set('content-type','application/json')
      .send(requestObject)
      .then(function(res) {
        expect(res).to.have.status(200);
        let resultArray = res.body["response"];
        expect(resultArray).to.have.length(1);
      });
  });
});


//Test for given sample input and expected output 200 & length 7
//----------------------------------------------------
describe('API endpoint /urlpost', function() {
  var requestObject ;

  it('should return status 200 for valid array(actual request array)', function() {
    var fs = require('fs');
    requestObject = (fs.readFileSync('./tests/actualrequestdata', 'utf8'));
    debugger;
    return chai
      .request(app)
      .post('/urlpost')
      .set('content-type','application/json')
      .send(requestObject)
      .then(function(res) {
        expect(res).to.have.status(200);
        let resultArray = res.body["response"];
        expect(resultArray).to.have.length(7);

      });
  });
});


//Test for given sample input and expected output 200 & length 6
// drm would be missing (but episodeCount present) for one of the valid data
//----------------------------------------------------
describe('API endpoint /urlpost', function() {
  var requestObject ;

  it('should return status 200 for valid array(drm missing in one data)', function() {
    var fs = require('fs');
    requestObject = (fs.readFileSync('./tests/datawith_missing_drm', 'utf8'));
    debugger;
    return chai
      .request(app)
      .post('/urlpost')
      .set('content-type','application/json')
      .send(requestObject)
      .then(function(res) {
        expect(res).to.have.status(200);
        let resultArray = res.body["response"];
        expect(resultArray).to.have.length(6);

      });
  });
});


//Test for given sample input and expected output 200 & length 6
// episodeCount would be missing (but drm is present) for one of the valid data
//----------------------------------------------------
describe('API endpoint /urlpost', function() {
  var requestObject ;

  it('should return status 200 for valid array(episodeCount missing in one data)', function() {
    var fs = require('fs');
    requestObject = (fs.readFileSync('./tests/datawith_missing_episodeCount', 'utf8'));
    debugger;
    return chai
      .request(app)
      .post('/urlpost')
      .set('content-type','application/json')
      .send(requestObject)
      .then(function(res) {
        expect(res).to.have.status(200);
        let resultArray = res.body["response"];
        expect(resultArray).to.have.length(6);

      });
  });
});


//Test for given sample input and expected output 200 & length 6
// episodeCount & drm is missing for one of the valid data
//----------------------------------------------------
describe('API endpoint /urlpost', function() {
  var requestObject ;

  it('should return status 200 for valid array(episodeCount & drm missing in one data)', function() {
    var fs = require('fs');
    requestObject = (fs.readFileSync('./tests/datawith_missing_drm_and_episodeCount', 'utf8'));
    debugger;
    return chai
      .request(app)
      .post('/urlpost')
      .set('content-type','application/json')
      .send(requestObject)
      .then(function(res) {
        expect(res).to.have.status(200);
        let resultArray = res.body["response"];
        expect(resultArray).to.have.length(6);

      });
  });
});
