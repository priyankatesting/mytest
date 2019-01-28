

const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();
const fs         = require('fs');
//const cors       = require('cors');
//app.use(cors());
//app.options('*', cors());

//For easy JSON Parsing
app.use(bodyParser.json());

//Error Handling
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: "Could not decode request: JSON parsing failed"
  })
});

// //Sample GET - Testing purpose only
// app.get('/urlget', ((req, res, next) => {
//     res.status(200).json({
//       message: 'GET Works!'
//     });
//   })
// )

//Sample POST
app.post('/urlpost', ((req, res, next) => {
  const responseArray = [];
  const reqBody       = {  payload: req.body.payload }
  const reqHeader     = {  header:  req.headers }


  //Error Handling  - for Header validity - 404 for invalid headers
  if(reqHeader.header["content-type"] !== 'application/json'){
    res.status(404).send({
      response: {
        error: "Could not decode request: JSON parsing failed"
      }
    });
    return;
  }

  //Error Handling  - for JSON validity - 500 for invalid JSON data
  if(!Array.isArray(reqBody.payload))
  {
    res.status(500).send({
      response: {
        error: "Could not decode request: JSON parsing failed"
      }
    });
    return;
  }

  //Length of the request
  const reqLength = reqBody.payload.length;
  //Error Handling  - Length of array
  if(reqLength <= 0 ){
    res.status(404).send({
        error: "Input length is zero"
    });
    return;
  } else {
    // let filteredBody = reqBody.payload.filter(
    //   reqElement => reqElement.hasOwnProperty("drm") && reqElement.hasOwnProperty("episodeCount")
    // );

    let finalArray = reqBody.payload.filter(
      (reqElement => reqElement["drm"] === true && reqElement["episodeCount"] > 0)
    );

    for(let i=0; i < finalArray.length; i++) {
      let elem = finalArray[i];
      //Only if conditions are true, push to responseArray array
          responseArray.push({
                image: elem["image"].showImage || null,
                slug:  elem["slug"] || null,
                title: elem["title"] || null
          });
    }
      //Set success status & Send the responseArray array in json format
      res.status(200).json({
        response: responseArray
      });
    }
    }));

module.exports = app;
