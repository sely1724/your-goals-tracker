const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SECRET, // value is saved inside .env file
  cookie: {
    // this is how long session stays alaive this is related to loggedIn from home-routes.js
    maxAge: 60 * 60 * 1000,
    // do not return cookies exept to HTTPS, required or not
    httpOnly: true,
    // do not return cookies exept to HTTPS, required or not
    secure: false,
    // is able to deliver to other domain site
    sameSite: 'strict',
  },  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
