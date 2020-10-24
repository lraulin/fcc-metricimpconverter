"use strict";

const expect = require("chai").expect;
const convertHandler = require("../controllers/convertHandler.js");

const BAD_REQUEST = 400;

module.exports = (app) => {
  app.route("/api/convert").get((req, res) => {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (!initNum && !initUnit)
      return res.status(BAD_REQUEST).json({ error: "invalid number and unit" });
    if (!initUnit)
      return res.status(BAD_REQUEST).json({ error: "invalid unit" });
    if (!initNum)
      return res.status(BAD_REQUEST).json({ error: "invalid number" });

    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );

    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string,
    });
  });
};
