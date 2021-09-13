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
const models = require('../models/transactionmodel');
const { success, failed } = require('../helper/response');

// table transaction di dalam database coffee_shop di mysql
const transactionctrl = {
// menampilkan list transaction
  getlist: (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? '' : query.search;
      const field = query.field === undefined ? 'username' : query.field;
      const sort = query.sort === undefined ? 'asc' : query.sort;
      const limit = query.limit === undefined ? 50 : parseInt(query.limit, 10);
      const page = query.page ? query.page : 1;
      const offset = page === 1 ? 0 : (page - 1) * limit;
      client.get('transaction', (errRedis, resultRedis) => {
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
            client.set('transaction', JSON.stringify(allData));
            success(res, output, 'get Transaction Data success');
          })
            .catch((err) => {
              failed(res, 500, err);
            });
        } else {
          const response = JSON.parse(resultRedis);
          const dataFilter = _.filter(response, (e) => e.username.includes(search));
          const paginated = _.slice(dataFilter, offset, offset + limit);
          const sortBy = _.sortBy(paginated, field);
          const output = {
            data: sortBy,
            search,
            field,
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
  // menampilkan detail table transaction berdasarkan id
  getdetailMaster: (req, res) => {
    try {
      const id = req.userId; // url parameter untuk mengambil id
      models.getdetailMaster(id).then((result) => {
        success(res, result, 'Get transaction Data Success');
      })
        .catch((err) => {
          failed(res, 500, err);
        });
    } catch (err) {
      failed(res, 401, err);
    }
  },
  getdetail: (req, res) => {
    try {
      const { id } = req.params; // url parameter untuk mengambil id
      models.getdetail(id).then((result) => {
        success(res, result, 'Get transaction Data Success');
      })
        .catch((err) => {
          failed(res, 500, err);
        });
    } catch (err) {
      failed(res, 401, err);
    }
  },
  // insert data transaction
  insert: (req, res) => {
    try {
      const { master, details } = req.body;
      models.insertMaster(master).then((result) => {
        client.del('transaction');
        const transactionId = result.insertId;
        // eslint-disable-next-line array-callback-return
        const dataDetails = details.map((e) => {
          models.insertDetails(transactionId, e).then((resultdetails) => resultdetails);
        });
        Promise.all(dataDetails).then(() => {
          success(res, result, 'Input To transaction Data Success');
        });
      })
        .catch((err) => {
          failed(res, 400, err);
        });
    } catch (err) {
      failed(res, 401, err);
    }
  },
  // delete data transaction
  del: (req, res) => {
    try {
      const { id } = req.params;
      models.delDetails(id).then(async (result) => {
        client.del('transaction');
        await models.delMaster(id);
        success(res, result, 'Delete transaction Data Success');
      })
        .catch((err) => {
          failed(res, 404, err);
        });
    } catch (err) {
      failed(res, 404, err);
    }
  },
};

module.exports = transactionctrl;
