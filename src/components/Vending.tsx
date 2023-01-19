import VendingMachineContent from "./VendingContent";
import VendingMachineMenu from "./VendingMenu";
import {
  productsDefaultState,
  ProductItemType,
  machineDefaultBalance,
  userDefaultBalance,
} from "../default/VendingMachine";
import useMoney, { WallentState } from "../hooks/useMoney";
import useActiveItem from "../hooks/useActiveItem";
import { useState } from "react";
import { calculateRemains } from "../assets/money";

export type RemainsResultType = {
  balance: WallentState[];
  money: number;
  products: string[];
};

export default function Vending() {
  const [products, setPropducts] = useState(productsDefaultState);
  const [getActiveProduct, updateActiveProduct] = useActiveItem<ProductItemType>(products);

  const userMoney = useMoney(userDefaultBalance);
  const machineMoney = useMoney(machineDefaultBalance);

  const [remainsResult, setRemainsResult] = useState<RemainsResultType>({
    balance: [],
    money: 0,
    products: [],
  });

  const buyProduct = (money: WallentState[]) => {
    const activeProduct = getActiveProduct();
    if (!activeProduct) return;

    userMoney.removeSeveralMoney(money)
    machineMoney.addSeveralMoney(money)

    decrementProductCount(activeProduct)

    const remainsRes = calculateRemains(money, activeProduct.price, machineMoney.balance);
    const remainsFromBuyMoreProduct = buyProductsRemainingMoney(remainsRes.money)

    const remainsProducts = [activeProduct.name,  ...remainsFromBuyMoreProduct.remains]
    setRemainsResult({ ...remainsRes, products: remainsProducts, money: remainsFromBuyMoreProduct.money });

    machineMoney.removeSeveralMoney(remainsRes.balance)
    userMoney.addSeveralMoney(remainsRes.balance)
  };
  
  const decrementProductCount = (product: ProductItemType) => {
    setPropducts(products.map((prod) =>prod.id === product.id ? { ...prod, count: Math.max(0, prod.count - 1) }: prod));
  }

  const buyProductsRemainingMoney = (money: number) => {
    const remainsProducts = []
    while (true) {
      const prod = products.find((prod) => prod.price <= money && prod.count > 0);
      
      if (!prod) break;
      money = money - prod.price;
      remainsProducts.push(prod.name);
    }
    return {remains: remainsProducts, money}
  }

  return (
    <div className="vending-machine">
      <div className="vending-machine__inner">
        <VendingMachineContent
          updateActiveProduct={updateActiveProduct}
          products={products}
        ></VendingMachineContent>
        <VendingMachineMenu
          remainsResult={remainsResult}
          buyProduct={buyProduct}
          activeProduct={getActiveProduct()}
          userBalance={userMoney.balance}
        ></VendingMachineMenu>
      </div>
    </div>
  );
}
