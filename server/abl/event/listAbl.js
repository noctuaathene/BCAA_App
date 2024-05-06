const budgetDao = require("../../dao/budget-dao.js");
const attendanceDao = require("../../dao/attendance-dao.js");

async function ListAbl(req, res) {
  try {
    const budgetList = budgetDao.list();

    const attendanceMap = attendanceDao.budgetMap();

    budgetList.forEach((budget) => {
      budget.userMap = attendanceMap[budget.id] || {};
    });

    res.json(budgetList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
