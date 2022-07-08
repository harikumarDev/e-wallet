const getAmount = (amount) => +Math.abs(parseFloat(amount).toFixed(4));

module.exports = {
  getAmount,
};
