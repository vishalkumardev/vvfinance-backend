const { Op } = require("sequelize");
const { findDateRange } = require("./findDateRange");

const getCount = async (model, time, key, user) => {
  const date = findDateRange(time);
  const count = await model.sum(`${key}`, {
    where: {
      createdAt: {
        [Op.between]: [date.startDate, date.endDate],
      },
      sellerId: user?.userId,
    },
  });

  return count == null ? 0 : count;
};
module.exports = { getCount };
