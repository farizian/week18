// untuk menghandle router table product

const express = require('express');
const prdctrl = require('../controllers/productctrl');
const midAuth = require('../middleware/auth');
const authorization = require('../middleware/authorization');
const upload = require('../middleware/upload');

const prdrouter = express.Router();
prdrouter
  .get('/product', midAuth, prdctrl.getlist)
  .get('/product/:id', midAuth, prdctrl.getdetail)
  .post('/product', midAuth, authorization.isAdmin, upload, prdctrl.insert)
  .delete('/product/:id', midAuth, authorization.isAdmin, prdctrl.del)
  .put('/product/:id', midAuth, authorization.isAdmin, upload, prdctrl.update);

module.exports = prdrouter;
