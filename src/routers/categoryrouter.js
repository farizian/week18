// untuk menghandle router table category

const express = require('express');
const categoryctrl = require('../controllers/categoryctrl');
const midAuth = require('../middleware/auth');
const authorization = require('../middleware/authorization');

const categoryrouter = express.Router();
categoryrouter
  .get('/category', midAuth, categoryctrl.getlist)
  .post('/category', midAuth, authorization.isAdmin, categoryctrl.insert)
  .delete('/category/:id', midAuth, authorization.isAdmin, categoryctrl.del)
  .put('/category/:id', midAuth, authorization.isAdmin, categoryctrl.update);

module.exports = categoryrouter;
