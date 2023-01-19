import { useState } from "react";

export type WallentState = {
  nominal: number;
  count: number;
};

type UseWallentReturn = {
  balance: WallentState[],
  calculateBalance: () => number,
  addMoney: (nominal: number, count: number) => void,
  removeMoney: (nominal: number, count: number) => boolean
  addSeveralMoney: (money: WallentState[]) => void,
  removeSeveralMoney: (money: WallentState[]) => void
};

export default function useMoney(defaultBalance: WallentState[] = []): UseWallentReturn {
  const [balance, setBalance] = useState<WallentState[]>(defaultBalance);

  const addMoney = (nominal: number, count: number) => {
    setBalance(balance.map(bal => bal.nominal === nominal ? {...bal, count: bal.count + count} : bal))
  }

  const removeMoney = (nominal: number, count: number) => {
    const nominalItem = balance.find(bal => bal.nominal === nominal)
    if(nominalItem && nominalItem.count >= count){
      setBalance(balance.map(balItm => balItm.nominal === nominal ? {...balItm, count: balItm.count - count} : balItm))
      return true
    }
    return false
  }

  const removeSeveralMoney = (money: WallentState[]) => {

    for (let index = 0; index < money.length; index++) {
      removeMoney(money[index].nominal, money[index].count);
    }
  }

  const addSeveralMoney = (money: WallentState[]) => {
    
    for (let index = 0; index < money.length; index++) {
      addMoney(money[index].nominal, money[index].count);
    }
  }

  const calculateBalance = () => {
    return balance.reduce((acc, balItem) => acc + (balItem.count * balItem.nominal) ,0)
  }

  return {balance, calculateBalance, addMoney, removeMoney, addSeveralMoney, removeSeveralMoney};
}
