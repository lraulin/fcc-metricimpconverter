const getNum = (input) => {
  const re = /([0-9./]*)[A-Za-z]/;
  const captureGroup = input.match(re)[1];

  if (!captureGroup) return 1;

  if (captureGroup.includes("/")) {
    // number is a fraction
    const fraction = captureGroup.split("/");
    if (fraction.length > 2) return null;
    const [numerator, denominator] = fraction;
    const number =
      Number.parseFloat(numerator) / Number.parseFloat(denominator);
    return !isNaN(number) ? number : null;
  }

  // number is a decimal or int
  const number = Number.parseFloat(captureGroup);
  return !isNaN(number) ? number : null;
};

const getUnit = (input) => {
  const validUnits = [
    "gal",
    "GAL",
    "kg",
    "KG",
    "km",
    "KM",
    "l",
    "L",
    "lbs",
    "LBS",
    "mi",
    "MI",
  ];
  const re = /[0-9./]*([A-Za-z]+)/;
  const unit = input.match(re)[1];
  if (!validUnits.includes(unit)) return null;
  // standardize case
  return unit.toLowerCase();
};

const conversions = {
  gal: "l",
  l: "gal",
  lbs: "kg",
  kg: "lbs",
  mi: "km",
  km: "mi",
};

const getReturnUnit = (initialUnit) => conversions[initialUnit];

const abbreviations = {
  gal: "gallons",
  l: "liters",
  lbs: "pounds",
  kg: "kilograms",
  mi: "miles",
  km: "kilometers",
};

const spellOutUnit = (unit) => abbreviations[unit];

const convert = (initNum, initUnit) => {
  const GAL_TO_L = 3.78541;
  const LBS_TO_KG = 0.453592;
  const MI_TO_KM = 1.60934;

  const conversionFn = {
    gal: (gal) => gal * GAL_TO_L,
    l: (l) => l / GAL_TO_L,
    lbs: (lbs) => lbs * LBS_TO_KG,
    kg: (kg) => kg / LBS_TO_KG,
    mi: (mi) => mi * MI_TO_KM,
    km: (km) => km / MI_TO_KM,
  };

  return conversionFn[initUnit](initNum);
};

const getString = (initNum, initUnit, returnNum, returnUnit) =>
  `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;

module.exports = {
  getNum,
  getUnit,
  getReturnUnit,
  spellOutUnit,
  convert,
  getString,
};
