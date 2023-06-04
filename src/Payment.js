import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BsCartCheckFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AddDataInCart, BillDate, ClearDataInCart } from './Counter/CounterSlice'

const Payment = () => {

    const dispatch = useDispatch();

    const data = useSelector(state => state.counter.data);
    const cart = useSelector(state => state.counter.cart);
    const add_to_cart = useSelector(state => state.counter.add_to_cart);
    const add_to_cart_product_amount = useSelector(state => state.counter.add_to_cart_product_amount);
    const bill_date = useSelector(state => state.counter.bill_date);

    dispatch(BillDate());

    const ClearCart = () => {
        var cart = [];
        for (let i = 0; i < data.length; i++) {
            cart.push({ id: data[i].id, quantity: 0, price: 0 });
        }
        dispatch(AddDataInCart(cart));
        dispatch(ClearDataInCart());
    }

    return (
        <>
            <div className="bg-info p-3 position-sticky top-0 start-0" style={{ zIndex: "1" }}>
                <div className="container d-flex justify-content-between">
                    <Link to={'/'}>
                        <div className="position-relative">
                            <AiFillHome className='fs-1 text-white'></AiFillHome>
                        </div>
                    </Link>
                    <Link to={'/Cart'}>
                        <div className="position-relative">
                            <BsCartCheckFill className='fs-1 text-white'></BsCartCheckFill>
                            <div className={add_to_cart <= 9 ? "px-2 bg-dark text-white rounded-circle position-absolute top-0 start-100 translate-middle" : "px-1 bg-dark text-white rounded-circle position-absolute top-0 start-100 translate-middle"}>
                                {add_to_cart}
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="bg-white">
                <div className="container py-2 mb-3">
                    <div className="row">
                        <div className="col-12">
                            <div className="table-responsive-lg">
                                <table className='col-lg-8 col-12 caption-top mx-auto text-start border border-dark border-2' cellSpacing={0}>
                                    <caption className='text-center text-uppercase'><b> Invoice </b></caption>
                                    <tbody><tr>
                                        <th className='bg-info bg-opacity-50 border border-dark border-2 px-lg-3 py-lg-2 px-2 py-1' colSpan={3}>Invoice #12345ABC</th>
                                        <th className='bg-info bg-opacity-50 border border-dark border-2 px-lg-3 py-lg-2 px-2 py-1'>{bill_date}</th>
                                    </tr>

                                        <tr>
                                            <th className='bg-info bg-opacity-50 border border-dark border-2 px-lg-3 py-lg-2 px-2 py-1'>Name/Description</th>
                                            <th className='bg-info bg-opacity-50 border border-dark border-2 px-lg-3 py-lg-2 px-2 py-1'>Qty.</th>
                                            <th className='bg-info bg-opacity-50 border border-dark border-2 px-lg-3 py-lg-2 px-2 py-1'>MRP</th>
                                            <th className='bg-info bg-opacity-50 border border-dark border-2 px-lg-3 py-lg-2 px-2 py-1'>Amount (₹)</th>
                                        </tr>
                                        {
                                            cart.map((val, i) => {
                                                if (val.quantity != 0) {
                                                    return (
                                                        <tr key={i}>
                                                            <td className={(i == 0)
                                                                ?
                                                                "border border-dark border-start-0 border-end-0 d-flex align-items-center px-lg-3 py-lg-2 px-2 py-1"
                                                                :
                                                                "border border-dark border-start-0 border-end-0 d-flex align-items-center px-lg-3 py-lg-2 px-2 py-1"
                                                            }>
                                                                <img src={data[i].thumbnail} alt="" className='rounded-circle' width="50px" height="50px" />
                                                                <div className="ps-3 overflow-hidden text-nowrap" style={{ maxWidth: "200px" }}>{data[i].title}</div>
                                                            </td>
                                                            <td className='border border-dark border-2 px-lg-3 py-lg-2 px-2 py-1'>{val.quantity}</td>
                                                            <td className='border border-dark border-2 px-lg-3 py-lg-2 px-2 py-1'>{data[i].price}</td>
                                                            <td className='border border-dark border-2 px-lg-3 py-lg-2 px-2 py-1'>{val.price}</td>
                                                        </tr>
                                                    )
                                                }
                                            })
                                        }
                                        <tr>
                                            <th className='bg-info bg-opacity-50 border border-dark border-2 px-lg-3 py-lg-2 px-2 py-1' colSpan={3}>Subtotal:</th>
                                            <td className='border border-dark border-2 px-lg-3 py-lg-2 px-2 py-1'>{add_to_cart_product_amount}</td>
                                        </tr>
                                        <tr>
                                            <th className='bg-info bg-opacity-50 border border-dark border-2 px-lg-3 py-lg-2 px-2 py-1' colSpan={2}>Tax</th>
                                            <td className='border border-dark border-2 px-lg-3 py-lg-2 px-2 py-1'>10%</td>
                                            <td className='border border-dark border-2 px-lg-3 py-lg-2 px-2 py-1'>{add_to_cart_product_amount * 10 / 100}</td>
                                        </tr>
                                        <tr>
                                            <th className='bg-info bg-opacity-50 border border-dark border-2 px-lg-3 py-lg-2 px-2 py-1' colSpan={3}>Grand Total:</th>
                                            <td className='border border-dark border-2 px-lg-3 py-lg-2 px-2 py-1'>Rs. {(add_to_cart_product_amount) - (add_to_cart_product_amount * 10 / 100)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {
                                cart.filter((val, i) => { return val.quantity == 0 }).length == data.length
                                    ?
                                    <>
                                        <div className="offset-2 col-8 py-1 mt-4 mb-3 border fs-5 text-center border-dark border-2 fw-bold rounded">
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
                                        <div className="col-12 py-3 d-flex justify-content-evenly text-uppercase">
                                            <Link to={'/'}>
                                                <div className="btn btn-info fw-bold text-white">Home</div>
                                            </Link>
                                            <Link to={'/Cart'}>
                                                <div className="btn btn-info fw-bold text-white">Cart</div>
                                            </Link>
                                            <Link to={'/Payment'}>
                                                <div className="btn btn-info fw-bold text-white" onClick={() => { ClearCart() }}>Clear</div>
                                            </Link>
                                        </div>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Payment