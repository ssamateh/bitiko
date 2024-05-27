type StringProcessor = (value: string) => string;

const _capitalize: StringProcessor = (value: string) =>
  [value[0].toUpperCase(), value.slice(1).toLowerCase()].join("");

export const capitalize: StringProcessor = (value) => {
  const parts = value.split(" ");
  return parts.map(_capitalize).join(" ");
};
