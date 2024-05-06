const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const budgetDao = require("../../dao/budget-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
    date: { type: "string", format: "date-time" },
    name: { type: "string", minLength: 3 },
    desc: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let budget = req.body;

    // validate input
    const valid = ajv.validate(schema, budget);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const updatedBudget = budgetDao.update(budget);
    if (!updatedBudget) {
      res.status(404).json({
        code: "budgetNotFound",
        message: `Budget ${budget.id} not found`,
      });
      return;
    }

    res.json(updatedBudget);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
