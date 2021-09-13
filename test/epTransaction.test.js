/* eslint-disable no-console */
/* eslint-disable no-undef */
const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const getToken = require('./helper/getToken');

describe('test endpoint transaction', async () => {
  it('test get /transaction', () => {
    getToken.user().then((token) => {
      request(app)
        .get('/transaction') // endpoint yang di test
        .set('token', token) // untuk mengirim headers
        .expect('Content-Type', /json/) // berekspektasi bahwa hasil akan bertipe json
        .expect(200) // berekspektasi bahwa respon code 200
        .then((response) => {
          expect(response.body).to.be.a('object');
          expect(response.body.field.data[0]).to.have.property('username');
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
  it('test get /transactionDetails', () => {
    getToken.admin().then((token) => {
      request(app)
        .get('/mytransaction')
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
  it('test get /detailsTransaction', () => {
    getToken.user().then((token) => {
      request(app)
        .get('/detail/23')
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
  it('test insert /transaction', () => {
    getToken.user().then((token) => {
      const body = {
        master: {
          user_id: '20',
          address: 'jalan berang',
          payment: 'bank',
          subtotal: '660002',
          tax: '60',
          shipping: '60',
          total: '600021',
        },
        details: [
          {
            product_id: '6',
            price: '6002',
            qty: '6',
          },
          {
            product_id: '6',
            price: '6',
            qty: '6',
          },
        ],
      };
      request(app)
        .post('/transaction')
        .set('token', token)
        .send(body)
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
  it('test delete /transaction', () => {
    getToken.admin().then((token) => {
      request(app)
        .delete('/transaction/50')
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
