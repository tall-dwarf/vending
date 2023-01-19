import { ProductItemType } from "../default/VendingMachine";
type VendingItemProps = {
  product: ProductItemType;
  updateActiveProduct: (productId: number) => void;
};

export default function VendingItem({
  product,
  updateActiveProduct,
}: VendingItemProps) {
  return (
    <div
      onClick={() => (product.count > 0 ? updateActiveProduct(product.id) : "")}
      className={
        "vending-machine-item " +
        (!product.count && " vending-machine-item--dark")
      }
    >
      <img
        className="vending-machine-item__img"
        src={`./images/${product.img}`}
        alt=""
      />
      <h4 className="vending-machine-item__title">{product.name}</h4>
      <h5 className="vending-machine-item__subtitle">
        Осталось {product.count}
      </h5>
      <h5 className="vending-machine-item__subtitle">Цена {product.price}</h5>
    </div>
  );
}
