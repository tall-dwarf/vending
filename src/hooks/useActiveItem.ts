import { useState } from "react";

interface ActiveItemRequired {
  id: number;
}

type useActiveItemReturnType<T> = [
  getActiveItem: () => T | undefined,
  updateActiveItem: (newItemId: number) => void,
  
];

export default function useActiveItem<T extends ActiveItemRequired>(
  itemsState: T[]
): useActiveItemReturnType<T> {
  const [itemId, setItemId] = useState<number>(0);

  const updateActiveItem = (newItemId: number) => {
    setItemId(newItemId);
  };


  const getActiveItem = () => {
    return itemsState.find((item) => item.id === itemId);
  };
  return [getActiveItem, updateActiveItem];
}
