export type MoneyType = {
  nominal: number;
  count: number;
};

export const calculateRemains = (
  money: MoneyType[],
  productPrice: number,
  balance: MoneyType[]
) => {
  let issueAmount =
    money.reduce((acc, mon) => acc + mon.count * mon.nominal, 0) - productPrice;

  const resultBalance = [];
  balance.sort((bal1, bal2) => bal2.nominal - bal1.nominal);

  for (let index = 0; index < balance.length; index++) {
    const nominal_count = Math.min(
      Math.floor(issueAmount / balance[index].nominal),
      balance[index].count
    );
    issueAmount -= balance[index].nominal * nominal_count;
    resultBalance.push({
      nominal: balance[index].nominal,
      count: nominal_count,
    });
  }
  return {
    balance: resultBalance.filter((bal) => bal.count > 0),
    money: issueAmount,
  };
};
