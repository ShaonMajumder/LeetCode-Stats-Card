export function normalize(str) {
  return str.toLowerCase().split(/[ _]+/g).join("_");
}

export function booleanize(value) {
  if (typeof value === "boolean") return value;

  const F = [
    "false",
    "null",
    "0",
    "undefined",
    "no",
    "none",
    "off",
    "disable",
    "disabled",
    "nan",
    "",
  ];
  return !F.includes(value.toLowerCase());
}
