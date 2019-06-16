const express = require('express');
const bodyParser = require('body-parser');
const exhbs = require('express-handlebars');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 4040;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.engine('handlebars', exhbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(PORT, console.log(`Server stated on PORT ${PORT}`));
