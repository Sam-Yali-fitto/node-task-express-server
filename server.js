'use strict';

const express = require('express');
const bodyParser = require("body-parser");
const fs = require('fs');
const app = express();
const router = express.Router();
const port = 3000;
const path = './db.json';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

app.get('/getData', (req, res) => {

    fs.readFile(path, function (err, data) {
        if(!err){
            res.send(JSON.parse(data));
        }
        else
        {
            if (err.code === 'ENOENT') {
                res.send('No file exists');
            } else {
                console.error(err.message);
            }
        }
    });
});

app.post('/sendData', (req, res) => {

    var itemObj =
        {
            name: req.body.name,
            id: new Date().getTime(),
        }

    let jsonData = [];

    fs.readFile(path, function (err, data) {
        if(err){
            if (err.code === 'EEXIST') {
                console.error('No file exists, will create.');
            } else {
                console.error(err.message);
            }

        } else {
            jsonData = JSON.parse(data);
        }

        jsonData.push(JSON.stringify(itemObj));
        fs.writeFileSync(path, JSON.stringify(jsonData));
        res.send(jsonData);
    });
})

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
});

//["{\"name\":\"awea\",\"id\":1598783116948}","{\"name\":\"aweasaedq4\",\"id\":1598783142514}","{\"name\":\"asaes\",\"id\":1598783169564}","{\"name\":\"ase\",\"id\":1598783199167}","{\"name\":\"asea\",\"id\":1598783261379}","{\"name\":\"adase\",\"id\":1598783387076}","{\"name\":\"awese\",\"id\":1598783809967}","{\"name\":\"awe\",\"id\":1598783860839}","{\"name\":\"awedsa\",\"id\":1598783973069}","{\"name\":\"asew\",\"id\":1598784010341}","{\"name\":\"aseaw\",\"id\":1598784079065}","{\"name\":\"awes\",\"id\":1598784108776}","{\"name\":\"awesaee\",\"id\":1598784143215}","{\"name\":\"asewe\",\"id\":1598784162856}","{\"name\":\"asew\",\"id\":1598784211421}","{\"name\":\"asewae\",\"id\":1598784255005}","{\"name\":\"aweas\",\"id\":1598784297664}","{\"name\":\"awes\",\"id\":1598784438147}","{\"name\":\"awesa\",\"id\":1598784469961}","{\"name\":\"qw4e\",\"id\":1598784510650}","{\"name\":\"1234\",\"id\":1598784528808}","{\"name\":\"\",\"id\":1598784571202}","{\"name\":\"12345123\",\"id\":1598784600896}","{\"name\":\"123sdgaqsg\",\"id\":1598784838876}","{\"name\":\"123123\",\"id\":1598785056557}"]
