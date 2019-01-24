const express = require('express');
var bodyParser = require('body-parser')

const app = express();
const router = express.Router();

app.use(bodyParser.json());

//Sample GET
app.get('/urlget', ((req, res, next) => {
    res.status(200).json({
      message: 'GET Works!'
    });
  })
)

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: "Could not decode request: JSON parsing failed"
  })
});

//Sample POST
app.post('/urlpost', ((req, res, next) => {
  const responseExpected = [];
  const responseSample = {  response: req.body.payload }
  const responseHeader = {  header: req.headers }


  //Header valid
  if(responseHeader.header["content-type"] !== 'application/json'){
    res.status(404).send({
      // message: 'POST Works!',
      response: {
        error: "Could not decode request: JSON parsing failed"
      }
    });
  }

if(responseSample){

}
else {
  res.status(404).send({
    // message: 'POST Works!',
    response: {
      error: "Could not decode request: JSON parsing failed"
    }
  });
}

//Length of array
if(reqLength < 0 ){
  res.status(404).send({
    // message: 'POST Works!',
    response: {
      error: "Could not decode request: JSON parsing failed"
    }
  });
} else {
const reqLength = responseSample.response.length;

  for(let i=0; i<reqLength; i++){
    let respElem = responseSample.response[i];
      if(respElem["drm"] === true && respElem["episodeCount"] > 0) {
        responseExpected.push({
          image: respElem["image"].showImage,
          slug:  respElem["slug"],
          title: respElem["title"]
        })
      }
    }
    res.status(200).json({
       length: reqLength,
      response: responseExpected
    });

}

  })
)

module.exports = app;
