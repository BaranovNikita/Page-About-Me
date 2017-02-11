const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const bunyan = require('bunyan');
const User = require('./models/User');
const config = require('./config');

const app = express();
const ENV = process.env.NODE_ENV || 'default';

app.use(require('express-bunyan-logger')());

const log = bunyan.createLogger({
	name: 'page-about-me',
	stream: process.stdout,
	level: 'info'
});

if (ENV !== 'production') {
	if (config.get(`${ENV}:NEED_HOT`)) {
		const webpack = require('webpack');
		const webpackMiddleware = require('webpack-dev-middleware');
		const webpackHotMiddleware = require('webpack-hot-middleware');
		const webpackConfig = require('../../webpack.config');
		const compiler = webpack(webpackConfig);

		app.use(webpackMiddleware(compiler, {
			hot: true,
			publicPath: webpackConfig.output.publicPath,
			noInfo: true
		}));
		app.use(webpackHotMiddleware(compiler));
	} else {
		app.use(express.static('dist'));
	}
}

mongoose.connect(config.get(`${ENV}:MONGO_URI`) || 'mongodb://localhost/page-about-me');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret: config.get(`${ENV}:SESSION_SECRET`),
	store: new MongoStore({ mongooseConnection: mongoose.connection }),
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy(User.authenticate()));
module.exports = {
	getLogger: () => log
};
app.use('/api/users/', require('./routes/users'));
app.use('/api/auth/', require('./routes/auth'));

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

app.listen(process.env.PORT || 3000, () => {
	log.info('Server started');
});
