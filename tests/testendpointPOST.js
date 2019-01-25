const chai = require('chai');
const expect = require('chai').expect;
chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../app.js');


//Test for right header type
describe('API endpoint /urlpost', function() {
  // GET - List all colors
  it('should return status 200', function() {
    return chai.request(app)
      .post('/urlpost')
      .type('application/json')
      .send({
        "payload": [{}]
      })
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });
});

//Test for wrong header type
describe('API endpoint /urlpost', function() {
  // GET - List all colors
  it('should return status 404', function() {
    return chai.request(app)
      .post('/urlpost')
      .type('application/x-www-form-urlencoded')
      .send({
        "payload": [{}]
      })
      .then(function(res) {
        expect(res).to.have.status(404);
      });
  });
});


//Test for correct json value
describe('API endpoint /urlpost', function() {
  // GET - List all colors
  it('should return status 200', function() {
    return chai.request(app)
      .post('/urlpost')
      .type('application/json')
      .send({
        "payload": [{
          "country": "UK"
        }]
      })
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });
});

//
// //Test for wrong json value
// describe('API endpoint /urlpost', function() {
//   // GET - List all colors
//   it('should return status 404', function() {
//     return chai.request(app)
//       .post('/urlpost')
//       .type('application/json')
//       .send({
//           "country": "UK"
//         })
//       .then(function(res) {
//         expect(res).to.have.status(404);
//       });
//   });
// });
