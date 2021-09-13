/* eslint-disable no-console */
/* eslint-disable no-undef */
const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const getToken = require('./helper/getToken');

describe('test endpoint category', async () => {
  it('test get /category', () => {
    getToken.user().then((token) => {
      request(app)
        .get('/category') // endpoint yang di test
        .set('token', token) // untuk mengirim headers
        .expect('Content-Type', /json/) // berekspektasi bahwa hasil akan bertipe json
        .expect(200) // berekspektasi bahwa respon code 200
        .then((response) => {
          expect(response.body).to.be.a('object');
          expect(response.body.field.data[0]).to.have.property('category');
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
  it('test insert /category', () => {
    getToken.admin().then((token) => {
      request(app)
        .post('/category')
        .set('token', token)
        .send({
          // eslint-disable-next-line quote-props
          'category': 'makanan ringan',
        })
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
  });
  it('test update /category', () => {
    getToken.admin().then((token) => {
      request(app)
        .put('/category/28')
        .set('token', token)
        .send({
          // eslint-disable-next-line quote-props
          'category': 'makanan jahat',
        })
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
  });
  it('test delete /category', () => {
    getToken.admin().then((token) => {
      request(app)
        .delete('/category/27')
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
});
