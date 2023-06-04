import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import HomePage from './HomePage';
import CartPage from './CartPage';
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { useEffect } from 'react';
import { getDataAPI } from './Counter/CounterSlice';
import { AddDataInCart } from './Counter/CounterSlice';
import Payment from './Payment';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then((res) => {
        dispatch(getDataAPI(res.data.products))
        var cart = [];
        for (let i = 0; i < res.data.products.length; i++) {
          cart.push({ id: res.data.products[i].id, quantity: 0, price: 0 });
        }
        dispatch(AddDataInCart(cart));
      })
  }, [1])

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/Cart' element={<CartPage />}></Route>
        <Route path='/Payment' element={<Payment />}></Route>
      </Routes>

    </>
  );
}

export default App;
