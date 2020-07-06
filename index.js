const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'react-part', 'build')));

const Cloudant = require("@cloudant/cloudant");

const acc = 'dbd4794d-5232-4fad-b286-4cfdb1f472d9-bluemix';
const password = '7888907172093393010a31e7934a818525283fec3bb21b56eae5585484727c88';

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'react-part','build', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is up and listening on port: ${PORT}`)
}) 

Cloudant({ account: acc, password: password}, function(err, cloudant, pong) {;
        if (err) {
            return console.log('Failed to initialize Cloudant: ' + err.message);
            }
            console.log(pong); // {"couchdb":"Welcome","version": ...
            // Lists all the databases.
            cloudant.db.list().then((body) => {
            body.forEach((db) => {
                console.log(db);
            });
            }).catch((err) => { console.log(err); });
        });
