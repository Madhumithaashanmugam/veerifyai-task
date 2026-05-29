export const formatTableDate = (value: string): string => {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  return date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
};
