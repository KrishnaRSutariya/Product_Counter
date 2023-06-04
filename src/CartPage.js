import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { UpdateDataInCart } from './Counter/CounterSlice';

const CartPage = () => {

  const dispatch = useDispatch();

  const data = useSelector(state => state.counter.data);
  const cart = useSelector(state => state.counter.cart);

  const UpdateItem = (id, opration) => {
    if (opration == "DELETE") {
      if (window.confirm('Are You Sure..?\nYou Can Delete This Product..!')) {
        dispatch(UpdateDataInCart({ id: id, opration: opration }));
      }
    }
    else {
      dispatch(UpdateDataInCart({ id: id, opration: opration }));
    }
  }

  return (
    <>

      <div className="bg-info p-3 position-sticky top-0 start-0" style={{ zIndex: "1" }}>
        <div className="container d-flex justify-content-start">
          <Link to={'/'}>
            <div className="position-relative">
              <AiFillHome className='fs-1 text-white'></AiFillHome>
            </div>
          </Link>
        </div>
      </div>

      <div className="bg-white py-4">
        <div className="container py-2">
          <div className="row">
            <div className="col-12 py-2 fw-bold text-center fs-5 bg-white position-sticky" style={{ top: "65px" }}>
              <div className="row border border-3 border-dark">
                <div className="col-lg-2 col-6 d-flex align-items-center justify-content-center">Image</div>
                <div className="col-lg-2 col-4 d-flex align-items-center justify-content-center">Title</div>
                <div className="col-lg-1 col-2 d-flex align-items-center justify-content-center">Brand</div>
                <div className="col-lg-2 col-3 d-flex align-items-center justify-content-center">Description</div>
                <div className="col-lg-1 col-2 d-flex align-items-center justify-content-center">Price</div>
                <div className="col-lg-1 col-2 d-flex align-items-center justify-content-center">Delete</div>
                <div className="col-lg-2 col-3 d-flex align-items-center justify-content-center">No. Of Product</div>
                <div className="col-lg-1 col-2 d-flex align-items-center justify-content-center">Total (₹)</div>
              </div>
            </div>
            {
              cart.map((val, i) => {
                if (val.quantity > 0) {
                  return (
                    <div className="col-12 py-2" key={i}>
                      <div className="row py-2 border border-2 border-dark">
                        <div className="col-lg-2 col-6 d-flex align-items-center">
                          <img src={data[val.id - 1].thumbnail} alt="" className='w-100 rounded' style={{ objectFit: "cover" }} />
                        </div>
                        <div className="col-lg-2 col-3 d-flex align-items-center">
                          {data[val.id - 1].title}
                        </div>
                        <div className="col-lg-1 col-2 d-flex align-items-center">
                          {data[val.id - 1].brand}
                        </div>
                        <div className="col-lg-2 col-3 d-flex align-items-center">
                          {data[val.id - 1].description}
                        </div>
                        <div className="col-lg-1 col-2 d-flex align-items-center fw-bold fs-5">
                          ₹ {data[val.id - 1].price}
                        </div>
                        <div className="col-lg-1 col-2 d-flex align-items-center fw-bold fs-5">
                          <div className="btn btn-danger" onClick={() => { UpdateItem(val.id, "DELETE") }}>Delete</div>
                        </div>
                        <div className="col-lg-2 col-3 d-flex align-items-center justify-content-center">
                          <div className="col-12 d-flex justify-content-evenly align-items-center fs-4 fw-bold py-1">
                            <div className="bg-warning px-2 rounded-circle text-white" style={{ cursor: "pointer" }} onClick={() => { UpdateItem(val.id, "REMOVE") }}>−</div>
                            <input type="text" readOnly
                              className='w-25 py-0 text-center border-0' value={cart[i].quantity} />
                            <div className="bg-warning px-2 rounded-circle text-white" style={{ cursor: "pointer" }} onClick={() => { UpdateItem(val.id, "ADD") }}>+</div>
                          </div>
                        </div>
                        <div className="col-lg-1 col-2 d-flex align-items-center fw-bold fs-5">
                          ₹ {cart[i].price}
                        </div>
                      </div>
                    </div>
                  )
                }
              })
            }
            {
              cart.filter((val, i) => { return val.quantity == 0 }).length == data.length
                ?
                <>
                  <div className="col-12 py-2 border fs-5 text-center border-dark border-2 fw-bold rounded">
                    Product Are Not Available ..!
                  </div>
                  <div className="col-12 py-2 text-center">
                    <Link to={'/'}>
                      <div className="btn btn-info fw-bold text-white">Shop Now</div>
                    </Link>
                  </div>
                </>
                :
                <>
                  <div className="col-12 py-2 text-end">
                    <Link to={'/Payment'}>
                      <div className="btn btn-info fw-bold text-white">Payment Now</div>
                    </Link>
                  </div>
                </>
            }
          </div>
        </div>
      </div>

    </>
  )
}

export default CartPage