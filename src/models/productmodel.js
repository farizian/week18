// menghandle query table product
const db = require('../config/db');

const prdmodel = {
  gettotal: () => new Promise((resolve, reject) => {
    db.query('select * from product', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.length);
      }
    });
  }),
  getAll: () => new Promise((resolve, reject) => {
    db.query('select * from product', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  getlist: (search, field, sort, limit, offset) => new Promise((resolve, reject) => {
    db.query(`select p.id, p.img, p.disc, p.prdname, p.price, c.category, p.size from product p left join category c on p.category_id=c.id where prdname like '%${search}%' order by ${field} ${sort} limit ${limit} offset ${offset}`, async (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  getdetail: (id) => new Promise((resolve, reject) => {
    db.query(`select * from product where id='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  insert: (body, img) => new Promise((resolve, reject) => {
    db.query(`insert into product (img, disc, prdname, price, category_id, size) value ('${img}', '${body.disc}', '${body.prdname}', '${body.price}', '${body.category_id}', '${body.size}')`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  del: (id) => new Promise((resolve, reject) => {
    db.query(`delete from product where id='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  update: (img, body, id) => new Promise((resolve, reject) => {
    db.query(`update product set img='${img}', disc='${body.disc}', prdname='${body.prdname}', price='${body.price}', category_id='${body.category_id} size='${body.size}' where id='${id}' `, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
};

module.exports = prdmodel;
