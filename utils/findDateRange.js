const findDateRange = (value) => {
  const endDate = new Date();
  let startDate = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate()
  );
  const v = parseInt(value);
  if (v == 0) {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    return { startDate, endDate };
  }
  if (v === 1) {
    startDate.setDate(endDate.getDate() - endDate.getDay());
  } else if (v === 2) {
    startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
  } else if (v === 3) {
    const quarterStartMonth = Math.floor(endDate.getMonth() / 3) * 3;
    startDate = new Date(endDate.getFullYear(), quarterStartMonth, 1);
  } else if (v === 4) {
    const halfYearStartMonth = endDate.getMonth() < 6 ? 0 : 6;
    startDate = new Date(endDate.getFullYear(), halfYearStartMonth, 1);
  } else if (v === 5) {
    startDate = new Date(endDate.getFullYear(), 0, 1);
  }

  return { startDate, endDate };
};

module.exports = { findDateRange };
