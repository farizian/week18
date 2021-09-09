// menghandle query table category
const db = require('../config/db');

const categorymodel = {
  gettotal: () => new Promise((resolve, reject) => {
    db.query('select * from category', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.length);
      }
    });
  }),
  getlist: (search, field, sort, limit, offset) => new Promise((resolve, reject) => {
    db.query(`select * from category where category like "%${search}%" order by ${field} ${sort} limit ${limit} offset ${offset}`, async (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  getdetail: (id) => new Promise((resolve, reject) => {
    db.query(`select * from category where id='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  insert: (idIns, category) => new Promise((resolve, reject) => {
    db.query(`insert into category (id, category) value ('${idIns}','${category}')`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  del: (id) => new Promise((resolve, reject) => {
    db.query(`delete from category where id='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  update: (id, idUpd, category) => new Promise((resolve, reject) => {
    db.query(`update category set id='${idUpd}', category='${category}' where id="${id}"`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
};

module.exports = categorymodel;
