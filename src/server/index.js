var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const dotenv = require('dotenv');
const cors = require('cors')
const bodyParser = require("body-parser");

dotenv.config();

const app = express()

app.use(cors());

app.use(express.static('dist'))

app.use(bodyParser.json());

console.log(__dirname)

var aylien = require("aylien_textapi");

// set aylien API credentias
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

console.log(`Your API key is ${process.env.API_KEY}`);
console.log(`Your API key is ${process.env.API_ID}`);

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

let aylienResponse={};

app.get('/', function (req, res) {
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})


// Hit the external API and post data from the response
app.post('/results', function(req,res){
    textapi.sentiment({url:req.body.url,'mode':document}, (error,response)=>{
        if(error==null){
            aylienResponse={
                "polarity":response.polarity,
                "subjectivity":response.subjectivity,
                "text":response.text,
                "polarity_confidence":response.polarity_confidence,
                "subjectivity_confidence":response.subjectivity_confidence
            }
            res.send(aylienResponse);
            console.log(aylienResponse);
        }
        else{
            console.log("Error",error);
        }
    })
})