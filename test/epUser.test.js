/* eslint-disable no-console */
/* eslint-disable no-undef */
const request = require('supertest');
const { expect } = require('chai');
const fs = require('fs');
const app = require('../app');
const getToken = require('./helper/getToken');

describe('test endpoint user', async () => {
  it('test get /user', () => {
    request(app)
      .get('/user')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('test get /userDetails', () => {
    getToken.user().then((token) => {
      request(app)
        .get('/userdetails')
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
  it('test post /login', () => {
    const body = {
      email: 'farizian@gmail.com',
      password: '123',
    };
    request(app)
      .post('/login')
      .send(body)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('token');
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('test post /register', () => {
    const body = {
      email: 'nadyta<3@gmail.com',
      password: '123',
      phone_number: '08123',
    };
    request(app)
      .post('/register')
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
  it('test post /user', () => {
    const filePath = `${__dirname}/img/test.jpg`;
    fs.exists(filePath, (exists) => {
      if (!exists) {
        console.log('file tidak ditemukan');
      } else {
        request(app)
          .post('/user')
          .field('first_name', 'Nobara')
          .field('last_name', 'Kugisaki')
          .field('birth_date', '1997-08-07')
          .field('gender', 'female')
          .field('username', 'nobara')
          .field('email', 'nobara@gmail.com')
          .field('password', '123')
          .field('address', 'jl.mulu capek')
          .field('phone_number', '123')
          .field('status', '1')
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
      }
    });
  });
  it('test put /user', () => {
    const filePath = `${__dirname}/img/test2.jpg`;
    fs.exists(filePath, (exists) => {
      if (!exists) {
        console.log('file tidak ditemukan');
      } else {
        getToken.user().then((token) => {
          request(app)
            .put('/user/130')
            .set('token', token)
            .field('first_name', 'Nobara')
            .field('last_name', 'Rifai')
            .field('birth_date', '1997-08-07')
            .field('gender', 'female')
            .field('username', 'nobara')
            .field('email', 'nobara@gmail.com')
            .field('password', '123')
            .field('address', 'jl.jl')
            .field('phone_number', '123')
            .field('status', '0')
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
  it('test delete /user', () => {
    getToken.user().then((token) => {
      request(app)
        .delete('/user/131')
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
