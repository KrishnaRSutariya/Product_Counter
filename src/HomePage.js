import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsCartCheckFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { UpdateDataInCart } from './Counter/CounterSlice';

const HomePage = () => {

    const dispatch = useDispatch();

    const data = useSelector(state => state.counter.data);
    const cart = useSelector(state => state.counter.cart);
    const add_to_cart = useSelector(state => state.counter.add_to_cart);

    const UpdateItem = (id, opration) => {
        dispatch(UpdateDataInCart({ id: id, opration: opration }));
    }

    return (
        <>

            <div className="bg-info p-3 position-sticky top-0 start-0" style={{ zIndex: "1" }}>
                <div className="container d-flex justify-content-end">
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
                <div className="container my-4 py-2">
                    <div className="row">
                        {
                            data.map((val, i) => {
                                return (
                                    <div className="col-lg-4 col-md-6 col-12 p-3 text-capitalize" key={i}>
                                        <div className="card h-100 pb-1 overflow-hidden">
                                            <div className="row h-100">
                                                <div className="col-12">
                                                    <img src={val.thumbnail} alt="" className='w-100' style={{
                                                        height: "300px",
                                                        objectFit: "cover"
                                                    }} />
                                                </div>
                                                <div className="col-12 d-flex flex-column justify-content-between">
                                                    <div className="col-12">
                                                        <div className="text-primary col-12 fs-6 fw-bold text-center overflow-hidden" style={{ maxHeight: "25px" }}>
                                                            {val.title}
                                                        </div>
                                                        <div className="col-12 fs-6 text-center overflow-hidden">
                                                            ( {val.brand} ) [ {val.rating} ]
                                                        </div>
                                                        <div className="col-12 mx-2 overflow-hidden" style={{ maxHeight: "70px", fontWeight: "500" }}>
                                                            {val.description}
                                                        </div>
                                                    </div>
                                                    <div className="col-12 mt-2 px-3">
                                                        <div className="row py-0">
                                                            <div className="col-6 d-flex align-items-center fw-bold fs-4">
                                                                ₹ {val.price}
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="row">
                                                                    {
                                                                        cart[i].quantity == 0
                                                                            ?
                                                                            console.log()
                                                                            :
                                                                            < div className="col-12 d-flex justify-content-evenly align-items-center fs-4 fw-bold py-1">
                                                                                <div className="bg-danger px-2 rounded-circle text-white" style={{ cursor: "pointer" }} onClick={() => { UpdateItem(val.id, "REMOVE") }}>−</div>
                                                                                <input type="text" id={val.id} readOnly
                                                                                    className='w-25 py-0 text-center border-0' value={cart[i].quantity} />
                                                                                <div className="bg-success px-2 rounded-circle text-white" style={{ cursor: "pointer" }} onClick={() => { UpdateItem(val.id, "ADD") }}>+</div>
                                                                            </div>
                                                                    }
                                                                    <div className="col-12 py-1">
                                                                        <div className="btn btn-info fw-bold w-100 text-white" onClick={() => { UpdateItem(val.id, "ADD") }}>Add To Cart</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div >

        </>
    )
}

export default HomePage