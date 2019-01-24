const express = require('express');
var bodyParser = require('body-parser')

const app = express();
const router = express.Router();
app.use(bodyParser.json());

//Sample GET
app.get('/testget', ((req, res, next) => {
    res.status(200).json({
      message: 'GET Works!'
    });
  })
)

//Sample POST
app.post('/testpost', ((req, res, next) => {
  const responseSample = {
    response: req.body.payload
  }
  const responseExpected = [];
  for(let i=0; i<responseSample.response.length; i++){
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
      message: 'POST Works!',
      response: responseExpected
    });
  })
)

module.exports = app;
