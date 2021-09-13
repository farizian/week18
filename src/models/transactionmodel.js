// menghandle query table transaction
const db = require('../config/db');

const prdmodel = {
  gettotal: () => new Promise((resolve, reject) => {
    db.query('select * from transaction', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.length);
      }
    });
  }),
  getAll: () => new Promise((resolve, reject) => {
    db.query('select t.id, u.username, t.address, t.payment, t.subtotal, t.tax, t.shipping, t.total from transaction t left join user u on t.user_id=u.id', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  getlist: (search, field, sort, limit, offset) => new Promise((resolve, reject) => {
    db.query(`select t.id, u.username, t.address, t.payment, t.subtotal, t.tax, t.shipping, t.total from transaction t left join user u on t.user_id=u.id where u.username like "%${search}%" order by ${field} ${sort} limit ${limit} offset ${offset}`, async (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  getdetailMaster: (id) => new Promise((resolve, reject) => {
    db.query(`select t.id, u.username, t.address, t.payment, t.subtotal, t.tax, t.shipping, t.total from transaction t left join user u on t.user_id=u.id where user_id='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  getidMaster: (id) => new Promise((resolve, reject) => {
    db.query(`select id from transaction where user_id='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  getdetail: (id) => new Promise((resolve, reject) => {
    db.query(`select t.id, t.transaction_id, p.prdname, t.price, t.qty from transaction_details t left join product p on t.product_id=p.id where transaction_id='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  insertMaster: (master) => new Promise((resolve, reject) => {
    db.query(`insert into transaction (user_id, address, payment, subtotal, tax, shipping, total) value ('${master.user_id}', '${master.address}', '${master.payment}', '${master.subtotal}', '${master.tax}', '${master.shipping}', '${master.total}')`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  insertDetails: (id, details) => new Promise((resolve, reject) => {
    db.query(`insert into transaction_details (transaction_id, product_id, price, qty) value ('${id}', '${details.product_id}', '${details.price}', '${details.qty}')`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  delMaster: (id) => new Promise((resolve, reject) => {
    db.query(`delete from transaction where id='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  delDetails: (id) => new Promise((resolve, reject) => {
    db.query(`delete from transaction_details where transaction_id='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),

};

module.exports = prdmodel;
