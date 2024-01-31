async function paginateData(model) {
  return async (req, res, next) => {
    try {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const results = {};

      if (endIndex < model.length) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }

      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit,
        };
      }

      results.results = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedData = results;
      next();
    } catch (error) {
      return res.status(500).json("INTERNAL SERVER ERROR");
    }
  };
}

module.exports = {paginateData};
