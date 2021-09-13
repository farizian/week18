const fs = require('fs');
const _ = require('lodash');
const redis = require('redis');

const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379,
});
client.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.log(err);
});
const models = require('../models/productmodel');
const { success, failed } = require('../helper/response');

// table product di dalam database coffee_shop di mysql
const productctrl = {
// menampilkan list product
  getlist: (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? '' : query.search;
      const field = query.field === undefined ? 'prdname' : query.field;
      const sort = query.sort === undefined ? 'asc' : query.sort;
      const limit = query.limit === undefined ? 50 : parseInt(query.limit, 10);
      const page = query.page ? query.page : 1;
      const offset = page === 1 ? 0 : (page - 1) * limit;
      client.get('product', (errRedis, resultRedis) => {
        if (errRedis) {
          failed(res, 401, errRedis);
        } else if (!resultRedis) {
          models.getlist(search, field, sort, limit, offset).then(async (result) => {
            const total = await models.gettotal();
            const allData = await models.getAll();
            const output = {
              data: result,
              search,
              limit,
              page: query.page,
              totalpage: Math.ceil(total / limit),
            };
            client.set('product', JSON.stringify(allData));
            success(res, output, 'get Product Data success');
          })
            .catch((err) => {
              failed(res, 500, err);
            });
        } else {
          const response = JSON.parse(resultRedis);
          const dataFilter = _.filter(response, (e) => e.prdname.includes(search));
          const paginated = _.slice(dataFilter, offset, offset + limit);
          const sortBy = _.sortBy(paginated, field);
          const output = {
            data: sortBy,
            search,
            page,
            totalPage: Math.ceil(response.length / limit),
          };
          success(res, output, 'success');
        }
      });
    } catch (err) {
      failed(res, 401, err);
    }
  },
  // menampilkan detail table product berdasarkan id
  getdetail: (req, res) => {
    try {
      const { id } = req.params; // url parameter untuk mengambil id
      models.getdetail(id).then((result) => {
        success(res, result, 'Get Product Data Success');
      })
        .catch((err) => {
          failed(res, 500, err);
        });
    } catch (err) {
      failed(res, 401, err);
    }
  },
  // insert data product
  insert: (req, res) => {
    try {
      const { body } = req;
      const img = req.file.filename;
      models.insert(body, img).then((result) => {
        client.del('product');
        success(res, result, 'Input To Product Data Success');
      })
        .catch((err) => {
          failed(res, 400, err);
        });
    } catch (err) {
      failed(res, 500, err);
    }
  },
  // delete data Product
  del: async (req, res) => {
    try {
      const { id } = req.params;
      const imgName = await models.getimg(id);
      const imgPath = `./src/img/${imgName[0].img}`;
      fs.unlink(imgPath, ((errImg) => {
        if (errImg) {
          models.del(id).then((result) => {
            success(res, result, 'Delete Product Success');
          })
            .catch((err) => {
              failed(res, 404, err);
            });
        } else {
          models.del(id).then((result) => {
            success(res, result, 'Delete Product With Img Success');
          })
            .catch((err) => {
              failed(res, 404, err);
            });
        }
      }));
    } catch (err) {
      failed(res, 404, err);
    }
  },
  // update data produk
  update: async (req, res) => {
    try {
      const { body } = req;
      const { id } = req.params;
      const img = req.file.filename;
      const imgName = await models.getimg(id);
      const imgPath = `./src/img/${imgName[0].img}`;
      fs.unlink(imgPath, ((errImg) => {
        if (errImg) {
          models.update(img, body, id).then((result) => {
            client.del('product');
            success(res, result, 'Update Product Data Success');
          })
            .catch((err) => {
              failed(res, 404, err);
            });
        } else {
          models.update(img, body, id).then((result) => {
            client.del('product');
            success(res, result, 'Update Product Data Success');
          })
            .catch((err) => {
              failed(res, 404, err);
            });
        }
      }));
    } catch (err) {
      failed(res, 500, err);
    }
  },
};

module.exports = productctrl;
