const add = function (x, y) {
  return x + y;
};

const getColor1 = function () {
  let color = [-1, 0, 0];
  return color;
};

const getColor2 = function () {
  const color = [255, 0, 0];
  return color;
};

const getColor3 = function () {
  let color = [0, 256, 0];
  return color;
};

const getColor4 = function () {
  const color = [0, 0, 255];
  return color;
};

const getColorMap = {
  1: getColor1,
  2: getColor2,
  3: getColor3,
  4: getColor4,
};

const getColor = function (group) {
  if (group in getColorMap) return getColorMap[group]();
  return [255, 255, 255];
};

export { add, getColor };
