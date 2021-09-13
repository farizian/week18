/* eslint-disable max-len */
// menghandle query table user
const db = require('../config/db');

const usermodel = {
  gettotal: () => new Promise((resolve, reject) => {
    db.query('select * from user', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.length);
      }
    });
  }),
  getlist: (search, field, sort, limit, offset) => new Promise((resolve, reject) => {
    db.query(`select * from user where username like '%${search}%' order by ${field} ${sort} limit ${limit} offset ${offset}`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  checkregister: (body) => new Promise((resolve, reject) => {
    db.query(`select * from user where email='${body.email}' && username='${body.username}' `, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  login: (body) => new Promise((resolve, reject) => {
    db.query(`select * from user where email="${body.email}"`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  register: (body, pass) => new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO user (email, password, phone_number, status)
        VALUE (
          '${body.email}','${pass}','${body.phone_number}','1'
        )`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  getdetail: (id) => new Promise((resolve, reject) => {
    db.query(`select * from user where id='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  getimg: (id) => new Promise((resolve, reject) => {
    db.query(`select img from user where id='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  insert: (img, first, last, birth, gender, username, email, password, address, phone, status) => new Promise((resolve, reject) => {
    db.query(`insert into user (img, first_name, last_name, birth_date, gender, username, email, password, address, phone_number, status) value ('${img}','${first}', '${last}', '${birth}', '${gender}', '${username}', '${email}', '${password}', '${address}', '${phone}', '${status}')`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  del: (id) => new Promise((resolve, reject) => {
    db.query(`delete from user where id='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  update: (id, img, first, last, birth, gender, username, email, password, address, phone, status) => new Promise((resolve, reject) => {
    db.query(`update user set img="${img}", first_name="${first}", last_name="${last}", birth_date="${birth}", gender="${gender}", username="${username}", email="${email}", password="${password}", address="${address}", phone_number="${phone}", status="${status}" where id="${id}"`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
};

module.exports = usermodel;
