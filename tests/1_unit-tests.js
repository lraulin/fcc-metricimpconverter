const chai = require("chai");
const assert = chai.assert;
const convertHandler = require("../controllers/convertHandler.js");

suite("Unit Tests", function () {
  suite("Function convertHandler.getNum(input)", function () {
    test("Whole number input", function (done) {
      const input = "32L";
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test("Decimal Input", function (done) {
      const input = "3.20L";
      assert.equal(convertHandler.getNum(input), 3.2);
      done();
    });

    test("Fractional Input", function (done) {
      const input = "1/2mi";
      assert.equal(convertHandler.getNum(input), 0.5);
      done();
    });

    test("Fractional Input w/ Decimal", function (done) {
      const input = "1.5/3mi";
      assert.equal(convertHandler.getNum(input), 0.5);
      done();
    });

    test("Invalid Input (double fraction)", function (done) {
      const input = "1.5/3mi";
      assert.equal(convertHandler.getNum(input), 0.5);
      done();
    });

    test("No Numerical Input", function (done) {
      const input = "gal";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });

  suite("Function convertHandler.getUnit(input)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      const units = ["gal", "l", "mi", "km", "lbs", "kg"];
      const input = [
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "L",
        "MI",
        "KM",
        "LBS",
        "KG",
      ];
      input.forEach(function (ele) {
        const input = ".5/2" + ele;
        const output = convertHandler.getUnit(input);
        const expect = units.includes(output);
        assert.isTrue(expect);
      });
      done();
    });

    test("Unknown Unit Input", function (done) {
      const input = "54wham";
      const output = convertHandler.getUnit(input);
      assert.isNull(output);
      done();
    });
  });

  suite("Function convertHandler.getReturnUnit(initUnit)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      const input = ["gal", "l", "mi", "km", "lbs", "kg"];
      const expect = ["l", "gal", "km", "mi", "kg", "lbs"];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.spellOutUnit(unit)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      const input = ["gal", "l", "mi", "km", "lbs", "kg"];
      const expect = [
        "gallons",
        "liters",
        "miles",
        "kilometers",
        "pounds",
        "kilograms",
      ];
      input.forEach(function (ele, i) {
        const actual = convertHandler.spellOutUnit(ele);
        const expected = expect[i];
        assert.equal(actual, expected);
      });
      done();
    });
  });

  suite("Function convertHandler.convert(num, unit)", function () {
    test("Gal to L", function (done) {
      var input = [5, "gal"];
      var expected = 18.9271;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("L to Gal", function (done) {
      var input = [5, "l"];
      var expected = 1.32086;
      const actual = convertHandler.convert(input[0], input[1]);
      assert.approximately(actual, expected, 0.1); //0.1 tolerance
      done();
    });

    test("Mi to Km", function (done) {
      var input = [5, "mi"];
      var expected = 8.04672;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("Km to Mi", function (done) {
      var input = [5, "km"];
      var expected = 3.10686;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("Lbs to Kg", function (done) {
      var input = [5, "lbs"];
      var expected = 2.26796;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("Kg to Lbs", function (done) {
      var input = [5, "kg"];
      var expected = 11.0231;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });
  });
});
