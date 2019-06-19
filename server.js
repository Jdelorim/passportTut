const express = require('express');

const exhbs = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const app = express();
const PORT = process.env.PORT || 4040;
require('./config/passport')(passport);
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.engine('handlebars', exhbs({ defaultLayout: 'main'}));
app.set("partials",path.join(__dirname,"views/partials"));
app.set('view engine', 'handlebars');

app.use(session({
    secret: 'hello',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/passport-tut', {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection esstablished successfully");
})

app.use(express.static('public'));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(PORT, console.log(`Server stated on PORT ${PORT}`));
