import { RemainsResultType } from "./Vending";

type VendingMenuResultProps = {
  remainsResult: RemainsResultType;
};

export default function VendingMenuResult({
  remainsResult,
}: VendingMenuResultProps) {
  return (
    <div className="vending-machine-menu__result mt-4">
      <h6>Ваша сдача</h6>
      <ul>
        {remainsResult.balance.map((balItem) => (
          <li>
            Номинал: <span className="text-primary">{balItem.nominal}</span>,
            колличество: <span className="text-primary">{balItem.count}</span>
          </li>
        ))}
      </ul>
      <h6>
        Общая сумма сдачи{" "}
        {remainsResult.balance.reduce(
          (acc, item) => acc + item.count * item.nominal,
          0
        )}
      </h6>
      <h6>Осталось в банкомате {remainsResult.money}</h6>
      <h6>Полученные товары</h6>
      <ul>
        {remainsResult.products.map((balItem) => (
          <li>{balItem}</li>
        ))}
      </ul>
    </div>
  );
}
