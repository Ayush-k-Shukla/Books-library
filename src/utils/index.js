export const isLastPage = (page, total, limit) => {
  return total <= page * limit;
};
