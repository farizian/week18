// untuk menghandle router table category

const express = require('express');
const categoryctrl = require('../controllers/categoryctrl');
const midAuth = require('../middleware/auth');

const categoryrouter = express.Router();
categoryrouter
  .get('/category', midAuth, categoryctrl.getlist)
  .get('/category/:id', midAuth, categoryctrl.getdetail)
  .post('/category', midAuth, categoryctrl.insert)
  .delete('/category/:id', midAuth, categoryctrl.del)
  .put('/category/:id', midAuth, categoryctrl.update);

module.exports = categoryrouter;
