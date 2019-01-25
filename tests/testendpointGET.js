const chai = require('chai');
const expect = require('chai').expect;
chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../app.js');


//Wrong GET URL
describe('API endpoint /geturl', function() {
  // GET - List all colors
  it('should return status 404', function() {
    return chai.request(app)
      .get('/geturl')
      .then(function(res) {
        expect(res).to.have.status(404);
      });
  });
});

// //Correct GET URL
// describe('API endpoint /urlget', function() {
//   // GET - List all colors
//   it('should return status 200', function() {
//     return chai.request(app)
//       .get('/urlget')
//       .then(function(res) {
//         expect(res).to.have.status(200);
//       });
//   });
// });
