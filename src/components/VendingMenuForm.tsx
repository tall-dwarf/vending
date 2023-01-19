import { useState } from "react";
import useMoney, { WallentState } from "../hooks/useMoney";
import CustomSelect, { SelectOptionsType } from "./ui/CustomSelect";

type VendingMenuFormFormProps = {
  userBalance: WallentState[];
  productPrice?: number;
  buyProduct: (money: WallentState[]) => void;
  productName: string;
};

export default function VendingMenuForm({
  userBalance,
  productPrice = 0,
  buyProduct,
  productName,
}: VendingMenuFormFormProps) {
  const formBalance = useMoney(
    userBalance.map((balItem) => ({ ...balItem, count: 0 }))
  );

  const balanceItemTooptions = (balanceItem: WallentState) => {
    const resOptions: SelectOptionsType[] = [];
    for (let index = -1; index < balanceItem.count; index++) {
      resOptions.push({ text: String(index + 1), value: String(index + 1) });
    }

    return resOptions;
  };

  const isValidMoneySpend = () =>
    formBalance.calculateBalance() >= productPrice;

  const sendMoneySpend = () => {
    if (isValidMoneySpend()) {
      buyProduct(formBalance.balance.filter((mon) => mon.count > 0));
    }
  };

  return (
    <div className="vending-machine-menu__form">
      <h4>Товар {productName}</h4>
      <h4>Стоимость товара {productPrice}</h4>
      {userBalance.map((balIem) => (
        <CustomSelect
          key={balIem.nominal}
          onSelected={(count) =>
            formBalance.addMoney(balIem.nominal, Number(count))
          }
          options={balanceItemTooptions(balIem)}
          label={`Номинал ${balIem.nominal}`}
        ></CustomSelect>
      ))}
      <button
        onClick={sendMoneySpend}
        disabled={!isValidMoneySpend()}
        className="btn btn-primary mt-2"
      >
        Приобрести
      </button>
    </div>
  );
}
