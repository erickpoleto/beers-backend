const express = require('express');
const authMiddleware = require("./middlewares/auth")

const MongoUsers = require('./controllers/UsersController');
const MongoSession = require('./controllers/SessionController');
const MongoApp = require('./controllers/AppController');
const MongoBeer = require('./controllers/BeersController')
const MongoBeerRate = require('./controllers/BeersRateController');
//normal routes
const routes = express.Router()
//routes that needs tokens

//user
routes.get('/', MongoUsers.index)
routes.post('/register', MongoUsers.create);
routes.post('/confirm', MongoUsers.checkConfirmation);
routes.delete('/delete', MongoUsers.delete);
//session
routes.post('/session/verify', MongoSession.create);
routes.post('/session/forgotPassword', MongoSession.createForgotPassword);
routes.post('/session/resetPassword', MongoSession.resetPassword);
//app
routes.get('/token/test', MongoApp.index)
//beers
routes.post('/items', MongoBeer.indexSearch);
routes.post('/about', MongoBeer.indexNameBeer);
//beerRate
routes.use(authMiddleware).post('/rate', MongoBeerRate.create)
routes.get('/rate/all', MongoBeerRate.index)
routes.delete('/delete', MongoBeerRate.delete)
routes.get('/profile', MongoBeerRate.profile);

module.exports = (routes);