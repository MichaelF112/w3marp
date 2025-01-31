import { Route, Routes } from 'react-router-dom';
import { ItemDetailPage } from '@/pages/ItemDetails';
import { BuyerPage } from '@/pages/BuyerPage';
import { ListedItemsPage } from '@/pages/ListedItems';
import { TransactionsPage } from '@/pages/Transactions';


const Routers = () => { 
  return (
    <Routes>
      <Route path="/item/:itemId" element={<ItemDetailPage />} />
      <Route path="/" element={<BuyerPage />} />
      <Route path="/listings" element={<ListedItemsPage />} />
      <Route path="/transactions" element={<TransactionsPage />} />
    </Routes>
  )
}

export default Routers;