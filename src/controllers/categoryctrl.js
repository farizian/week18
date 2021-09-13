const models = require('../models/categorymodel');
const { success, failed } = require('../helper/response');

// table category di dalam database coffee_shop di mysql
const categoryctrl = {
// menampilkan list category
  getlist: (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? '' : query.search;
      const field = query.field === undefined ? 'id' : query.field;
      const sort = query.sort === undefined ? 'asc' : query.sort;
      const limit = query.limit === undefined ? 50 : query.limit;
      const offset = query.page === undefined || query.page === 1 ? 0 : (query.page - 1) * limit;
      models.getlist(search, field, sort, limit, offset).then(async (result) => {
        const total = await models.gettotal();
        const output = {
          data: result,
          search,
          limit,
          page: query.page,
          totalpage: Math.ceil(total / limit),
        };
        success(res, output, 'Get Category Data Success');
      })
        .catch((err) => {
          failed(res, 500, err);
        });
    } catch (err) {
      failed(res, 401, err);
    }
  },
  insert: (req, res) => {
    try {
      const { body } = req;
      const { category } = body;
      const idIns = body.id;
      models.insert(idIns, category).then((result) => {
        success(res, result, 'Input To Category Data Success');
      })
        .catch((err) => {
          failed(res, 400, err);
        });
    } catch (err) {
      failed(res, 408, err);
    }
  },
  // delete data category
  del: (req, res) => {
    try {
      const { id } = req.params;
      models.del(id).then((result) => {
        success(res, result, 'Delete Category Data Success');
      })
        .catch((err) => {
          failed(res, 404, err);
        });
    } catch (err) {
      failed(res, 408, err);
    }
  },
  update: (req, res) => {
    try {
      const { body } = req;
      const { id } = req.params;
      const { category } = body;
      models.update(id, category).then((result) => {
        success(res, result, 'Update Category Data Success');
      })
        .catch((err) => {
          failed(res, 400, err);
        });
    } catch (err) {
      failed(res, 500, err);
    }
  },
};

module.exports = categoryctrl;
