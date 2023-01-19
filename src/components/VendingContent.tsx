import { ProductItemType } from "../default/VendingMachine";
import VendingMachineItem from "./VendingItem";

type VendingContentProps = {
  products: ProductItemType[];
  updateActiveProduct: (productId: number) => void
};

export default function VendingContent({
  products,
  updateActiveProduct
}: VendingContentProps) {
  return (
    <div className="vending-machine-content">
      {products.map((productItem) => (
        <VendingMachineItem
        key={productItem.id}
        updateActiveProduct={updateActiveProduct}
          product={productItem}
        ></VendingMachineItem>
      ))}
    </div>
  );
}
