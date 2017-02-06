const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const app = express();

if (process.env.NODE_ENV !== 'production') {
	app.use(express.static('dist'));
}

mongoose.connect('mongodb://localhost/page-about-me');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret: 'page-about-me',
	store: new MongoStore({ mongooseConnection: mongoose.connection }),
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/User');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/api/users/', require('./routes/user'));

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

app.listen(process.env.PORT || 3000, () => {
	console.log('Server started');
});
