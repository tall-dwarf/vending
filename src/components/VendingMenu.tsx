import { WallentState } from "../hooks/useMoney";
import VendingMachineMenuInfo from "./VendingMenuInfo";
import { ProductItemType } from "../default/VendingMachine";
import VendingMachineMenuForm from "./VendingMenuForm";
import { useState } from "react";
import { RemainsResultType } from "./Vending";
import VendingMachineMenuResult from "./VendingMenuResult";

type VendingMenuProps = {
  userBalance: WallentState[];
  activeProduct: ProductItemType | undefined;
  buyProduct: (money: WallentState[]) => void;
  remainsResult: RemainsResultType;
};

export default function VendingMenu({
  userBalance,
  activeProduct,
  buyProduct,
  remainsResult,
}: VendingMenuProps) {
  const [resIsopen, setResIsOpen] = useState(false);

  return (
    <div className="vending-machine-menu">
      <VendingMachineMenuInfo
        userBalance={userBalance}
      ></VendingMachineMenuInfo>
      {activeProduct ? (
        <VendingMachineMenuForm
          productName={activeProduct.name}
          buyProduct={buyProduct}
          productPrice={activeProduct.price}
          userBalance={userBalance}
        />
      ) : (
        "Выберите товар для покупки"
      )}
      {Boolean(remainsResult.products.length) && (
        <button
          onClick={() => setResIsOpen(true)}
          className="btn btn-success mt-2"
        >
          Показать сдачу
        </button>
      )}
      {resIsopen && (
        <VendingMachineMenuResult
          remainsResult={remainsResult}
        ></VendingMachineMenuResult>
      )}
    </div>
  );
}
