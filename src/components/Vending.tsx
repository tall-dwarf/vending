import VendingMachineContent from "./VendingContent";
import VendingMachineMenu from "./VendingMenu";
import {
  productsDefaultState,
  ProductItemType,
  machineDefaultBalance,
  userDefaultBalance,
  remainsDefaultState,
} from "../default/VendingMachine";
import useMoney, { WallentState } from "../hooks/useMoney";
import useActiveItem from "../hooks/useActiveItem";
import { useEffect, useState } from "react";
import { calculateRemains } from "../assets/money";

export type RemainsResultType = {
  balance: WallentState[];
  money: number;
  products: string[];
};

// Компонент жирный, и как его уменьшить я не знаю
export default function Vending() {
  const [products, setPropducts] = useState(productsDefaultState);
  const { activeItemId, getActiveItem, updateActiveItem } =
    useActiveItem<ProductItemType>(products);

  const userMoney = useMoney(userDefaultBalance);
  const machineMoney = useMoney(machineDefaultBalance);

  const [remainsResult, setRemainsResult] = useState(remainsDefaultState);

  // Покупка товаров
  const buyProduct = (money: WallentState[]) => {
    const activeProduct = getActiveItem();
    if (!activeProduct) return;

    userMoney.removeSeveralMoney(money);
    machineMoney.addSeveralMoney(money);

    decrementProductCount(activeProduct);

    const remainsRes = calculateRemains(
      money,
      activeProduct.price,
      machineMoney.balance
    );

    const remainsFromBuyMoreProduct = buyProductsRemainingMoney(
      remainsRes.money
    );

    const remainsProducts = [
      activeProduct.name,
      ...remainsFromBuyMoreProduct.remains,
    ];
    setRemainsResult({
      ...remainsRes,
      products: remainsProducts,
      money: remainsFromBuyMoreProduct.money,
    });

    machineMoney.removeSeveralMoney(remainsRes.balance);
    userMoney.addSeveralMoney(remainsRes.balance);
  };

  // Уменьшение к-ва товара на 1
  const decrementProductCount = (product: ProductItemType) => {
    setPropducts((prefProducts) =>
      prefProducts.map((prod) =>
        prod.id === product.id
          ? { ...prod, count: Math.max(0, prod.count - 1) }
          : prod
      )
    );
  };

  // Покупка продукции на оставшиеся мани
  const buyProductsRemainingMoney = (money: number) => {
    const remainsProducts = [];
    while (true) {
      const prod = products.find(
        (prod) => prod.price <= money && prod.count > 0
      );
      if (!prod) break;

      decrementProductCount(prod);

      money = money - prod.price;
      remainsProducts.push(prod.name);
    }
    return { remains: remainsProducts, money };
  };

  useEffect(() => {
    setRemainsResult(remainsDefaultState);
  }, [activeItemId]);

  return (
    <div className="vending-machine">
      <div className="vending-machine__inner">
        <VendingMachineContent
          updateActiveProduct={updateActiveItem}
          products={products}
        ></VendingMachineContent>
        <VendingMachineMenu
          remainsResult={remainsResult}
          buyProduct={buyProduct}
          activeProduct={getActiveItem()}
          userBalance={userMoney.balance}
        ></VendingMachineMenu>
      </div>
    </div>
  );
}
