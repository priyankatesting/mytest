

const express = require('express');
var bodyParser = require('body-parser')

const app = express();
const router = express.Router();

app.use(bodyParser.json());

//Sample GET - Testing purpose only
app.get('/urlget', ((req, res, next) => {
    res.status(200).json({
      message: 'GET Works!'
    });
  })
)

//Error Handling
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: "Could not decode request: JSON parsing failed"
  })
});

//Sample POST
app.post('/urlpost', ((req, res, next) => {
  const responseExpected = [];
  const requestSample = {  response: req.body.payload }
  const requestHeader = {  header: req.headers }


  //Error Handling  - for Header valid
  if(requestHeader.header["content-type"] !== 'application/json'){
    res.status(404).send({
      // message: 'POST Works!',
      response: {
        error: "Could not decode request: JSON parsing failed"
      }
    });
  }
  //Length of the request
const reqLength = requestSample.response.length;
//Error Handling  - Length of array
if(reqLength < 0 ){
  res.status(404).send({
    // message: 'POST Works!',
    response: {
      error: "Could not decode request: JSON parsing failed"
    }
  });
} else {


//Loop through all objects of the request
  for(let i=0; i<reqLength; i++) {
    let reqElement = requestSample.response[i];
    //Only if conditions are true, push to responseExpected array
      if(reqElement["drm"] === true && reqElement["episodeCount"] > 0) {
        responseExpected.push({
          image: reqElement["image"].showImage,
          slug:  reqElement["slug"],
          title: reqElement["title"]
        })
      }
    }
    res.status(200).json({
      response: responseExpected
    });

  }

  })
)

module.exports = app;
