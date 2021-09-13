// untuk menghandle router table transaction

const express = require('express');
const transctrl = require('../controllers/transactionctrl');
const midAuth = require('../middleware/auth');

const transrouter = express.Router();
transrouter
  .get('/transaction', midAuth, transctrl.getlist)
  .get('/mytransaction', midAuth, transctrl.getdetailMaster)
  .get('/detail/:id', midAuth, transctrl.getdetail)
  .post('/transaction', midAuth, transctrl.insert)
  .delete('/transaction/:id', midAuth, transctrl.del);

module.exports = transrouter;
