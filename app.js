const express = require('express');
const app = express();
var cors = require('cors');

const port = process.env.PORT || 3000;

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res, next) {
    res.json({ responseText: 'Hello World' });
});

app.get('/user', function (req, res, next) {
    res.json({ responseText: 'William Franco' });
});

app.listen(port, function () {
    console.log('Server listening on port %s', port);
});
