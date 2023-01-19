import { WallentState } from "../hooks/useMoney";
type VendingMenuInfoProps = {
  userBalance: WallentState[];
};

export default function VendingMenuInfo({
  userBalance,
}: VendingMenuInfoProps) {
  return (
    <div className="vending-machine-menu__info">
      <h3 className="vending-machine-menu__balance">
        Ваш баланс{" "}
        {userBalance.reduce((acc, itm) => acc + itm.count * itm.nominal, 0)}
      </h3>
      <ul className="vending-machine-menu__list">
        {userBalance.map((balItem) => (
          <li key={balItem.nominal} className="vending-machine-menu__item">
            Номинал: {balItem.nominal} Колличество: {balItem.count}
          </li>
        ))}
      </ul>
    </div>
  );
}
