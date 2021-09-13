const request = require('supertest');
const app = require('../../app');

const getToken = {
  admin: () => new Promise((resolve) => {
    request(app)
      .post('/login')
      .send({
        email: 'farizian@gmail.com',
        password: '123',
      })
      .then((response) => {
        resolve(response.body.token);
      });
  }),
  user: () => new Promise((resolve) => {
    request(app)
      .post('/login')
      .send({
        email: 'nadyta@gmail.com',
        password: '123',
      })
      .then((response) => {
        resolve(response.body.token);
      });
  }),

};

module.exports = getToken;
