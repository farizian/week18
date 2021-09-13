/* eslint-disable no-console */
/* eslint-disable no-undef */
const request = require('supertest');
const { expect } = require('chai');
const fs = require('fs');
const app = require('../app');
const getToken = require('./helper/getToken');

describe('test endpoint product', async () => {
  it('test get /product', () => {
    getToken.user().then((token) => {
      request(app)
        .get('/product') // endpoint yang di test
        .set('token', token) // untuk mengirim headers
        .expect('Content-Type', /json/) // berekspektasi bahwa hasil akan bertipe json
        .expect(200) // berekspektasi bahwa respon code 200
        .then((response) => {
          expect(response.body).to.be.a('object');
          expect(response.body.field.data[0]).to.have.property('prdname');
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
  it('test get /productDetails', () => {
    getToken.user().then((token) => {
      request(app)
        .get('/product/3')
        .set('token', token)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).to.be.a('object');
          expect(response.body).to.have.property('success', true);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
  it('test insert /product', () => {
    const filePath = `${__dirname}/img/test3.png`;
    fs.exists(filePath, (exists) => {
      if (!exists) {
        console.log('file tidak ditemukan');
      } else {
        getToken.admin().then((token) => {
          request(app)
            .post('/product')
            .set('token', token)
            .field('disc', '10%')
            .field('prdname', 'kopipait')
            .field('category_id', '2')
            .field('price', '2021')
            .field('size', 'L')
            .attach('img', filePath)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
              expect(response.body).to.be.a('object');
              expect(response.body.field).to.have.property('insertId');
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    });
  });
  // update
  // success
  it('test update /product success', () => {
    const filePath = `${__dirname}/img/test4.jpg`;
    fs.exists(filePath, (exists) => {
      if (!exists) {
        console.log('file tidak ditemukan');
      } else {
        getToken.admin().then((token) => {
          request(app)
            .put('/product/57')
            .set('token', token)
            .field('disc', '11%')
            .field('prdname', 'seblak')
            .field('category_id', '1')
            .field('price', '2022')
            .field('size', 'XL')
            .attach('img', filePath)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
              expect(response.body).to.be.a('object');
              expect(response.body.field).to.have.property('info');
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    });
  });
  // failed
  it('test update /product failed', () => {
    const filePath = `${__dirname}/img/test4.jpg`;
    fs.exists(filePath, (exists) => {
      if (!exists) {
        console.log('file tidak ditemukan');
      } else {
        getToken.admin().then((token) => {
          request(app)
            .put('/product/23')
            .set('token', token)
            .attach('img', filePath)
            .expect('Content-Type', /json/)
            .expect(404)
            .then((response) => {
              expect(response.body).to.be.a('object');
              expect(response.body).to.have.property('success', false);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    });
  });
  // delete
  // success
  it('test delete /product success', () => {
    getToken.admin().then((token) => {
      request(app)
        .delete('/product/56')
        .set('token', token)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).to.be.a('object');
          expect(response.body).to.have.property('success', true);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
  // failed
  it('test delete /product failed', () => {
    getToken.admin().then((token) => {
      request(app)
        .delete('/product/21')
        .set('token', token)
        .expect('Content-Type', /json/)
        .expect(404)
        .then((response) => {
          expect(response.body).to.be.a('object');
          expect(response.body).to.have.property('success', false);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});
