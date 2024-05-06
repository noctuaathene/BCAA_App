const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const budgetDao = require("../../dao/budget-dao.js");

const schema = {
  type: "object",
  properties: {
    date: { type: "string", format: "date-time" },
    name: { type: "string", minLength: 3 },
    desc: { type: "string" },
  },
  required: ["date", "name"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
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

    budget = budgetDao.create(budget);
    res.json(budget);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
