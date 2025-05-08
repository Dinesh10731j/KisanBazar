'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store/store';
import { addToCart } from '@/lib/store/slices/cartSlice';
import { getProductsResponse} from '@/utils/types';
export default function StoreProvider({
  items,
  children,
}: {
  items: getProductsResponse[]; 
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(undefined)
  if (!storeRef.current) {
    storeRef.current = makeStore();
    items.forEach(item => storeRef.current!.dispatch(addToCart(item)))
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}