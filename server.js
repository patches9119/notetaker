const express = require('express')
const app = express()
const port = process.env.PORT || 8080
var path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const uuid = require('uuid');

app.use(bodyParser.json());




app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));

});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/notes.html'));

});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
})

app.post('/api/notes', (req, res) => {
    console.log(req.body);
    const newNote = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text
    }

    fs.readFile('db/db.json', 'utf-8', function (err, data) {
        if (err) throw err

        var arrayOfObjects = JSON.parse(data)
        arrayOfObjects.push(newNote);

        console.log(arrayOfObjects);
        arrayOfObjects = JSON.stringify(arrayOfObjects);
        fs.writeFile('db/db.json', arrayOfObjects, function (err, data) {
            if (err) throw err

            console.log("Success!");
        });
    });


    res.send(newNote);

});

app.delete('/api/notes/:id', (req, res) => {
    console.log("This would delete a note.")
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})



app.use(express.static('public'));