const { Model, Op, Sequelize } = require("sequelize");

const getPaginatedData = async (
  pageSize = 100,
  page = 1,
  model,
  where = {},
  searchKey = null,
  includeModels = [],
  attributes = [],
  addSorting = true,
  sortKey = "createdAt",
  sortOrder = "DESC",
  operators = {},
  subqueries = [] // new parameter for subqueries
) => {
  try {
    const offset = (page - 1) * pageSize;

    const columns = Object.keys(model.rawAttributes);

    const searchConditions = searchKey
      ? {
          [Op.or]: columns.map((column) => ({
            [column]: { [Op.like]: `%${searchKey}%` },
          })),
        }
      : {};

    const operation = {
      between: Op.between,
      contains: Op.contains,
    };

    const conditions = operators ?? {};

    for (let i = 0; i < Object.keys(operators ?? {}).length; i++) {
      const field = Object.keys(operators)[i];
      const condition = operators[field];
      const operatorLiteral = condition["operator"];
      const operatorValues = condition["values"];
      const operationSymbol = operation[operatorLiteral];
      conditions[field] = {
        [operationSymbol]: operatorValues,
      };
    }
    const whereCond = { ...where, ...conditions };

    // Integrate subqueries into attributes
    const allAttributes = [
      ...attributes,
      ...subqueries.map((subquery) => [
        Sequelize.literal(subquery.query),
        subquery.alias,
      ]),
    ];

    const result = await model.findAndCountAll({
      where: searchKey ? { ...whereCond, ...searchConditions } : whereCond,
      limit: pageSize,
      offset,
      distinct: true,
      include: includeModels,
      attributes: allAttributes,
      order: addSorting ? [[sortKey, sortOrder]] : [],
    });
    const totalPages = Math.ceil(result.count / pageSize);

    return {
      data: result.rows,
      totalPages,
      currentPage: page,
      nextPage: page >= totalPages ? null : page + 1,
      previousPage: totalPages > 0 && page >= 2 ? page - 1 : null,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { getPaginatedData };
