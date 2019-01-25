

const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();

//For easy JSON Parsing
app.use(bodyParser.json());

//Error Handling
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: "Could not decode request: JSON parsing failed"
  })
});

//Sample GET - Testing purpose only
app.get('/urlget', ((req, res, next) => {
    res.status(200).json({
      message: 'GET Works!'
    });
  })
)
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
    return;
  }

  //Length of the request
const reqLength = requestSample.response.length;
//Error Handling  - Length of array
if(reqLength <= 0 ){
  res.status(404).send({
      error: "Input length is zero"
  });
} else {

  for(let i=0; i < reqLength; i++) {
    let reqElement = requestSample.response[i];
    let drmExists  = reqElement.hasOwnProperty("drm");
    let episodeCountExists = reqElement.hasOwnProperty("episodeCount");
    //Only if conditions are true, push to responseExpected array
    if(drmExists && episodeCountExists) {
      if(reqElement["drm"] === true && reqElement["episodeCount"] > 0) {
        responseExpected.push({
              image: reqElement["image"].showImage,
              slug:  reqElement["slug"],
              title: reqElement["title"]
        });
      } else {
        //do nothing
      }
    } else {
      //do nothing
    }
  }
  //Set success status & Send the responseExpected array in json format
  res.status(200).json({
    response: responseExpected
  });
}
}));

module.exports = app;
