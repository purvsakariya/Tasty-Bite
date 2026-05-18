import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store/Context'
import {API} from '../config/api.js'
import { useNavigate } from 'react-router-dom';
import Button from './Button';

function OrderHistory() {

    const navigate = useNavigate();
    const { user } = useContext(Context)

    const [orders, setOrders] = useState([])

    useEffect(() => {

        try {
            fetch(API.ORDER_HISTORY, {
                method: "POST",
                body: JSON.stringify({ email: user?.email }),
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then(res => res.json())
                .then(data => {
                    setOrders(data.orders)
                })
                .catch(err => { throw new Error(err?.message || "Failed to Fetched User Orders") })

        } catch (error) {
            throw new Error(error?.message || "Failed to Fetched User Orders");
        }

    }, [user])

    return (
        <>
            {orders?.length > 0 ? <ul className='ordersHistory'>
                {orders.map((order, index) => <ul key={order._id}>
                    <h1>Order Number: {index + 1}</h1>
                    <div className='orderHistory2'>
                        {order?.items.map(item => <li key={item._id} className="orderHistory-item">
                            <img src={item.image} alt={item.name} />
                            <div>
                                <h3>{item.name}</h3>
                                <div className='orderHistory-item-price'>
                                <p className="meal-item-price">Price: {item.price}</p>
                                {item.quantity !== 1 && <p className="meal-item-price">TotalPrice: {item.price * item.quantity}</p>}
                                </div>
                                <p className="meal-item-description">{item.description}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                        </li>)
                        }
                    </div>
                </ul>)}
            </ul>
                :
                <div className='ordersHistoryError'>
                <h2>Please Order Something...</h2>
                <Button onClick={() => navigate('/meals')}>Home</Button>
                </div>
            }
        </>
    )
}

export default OrderHistory
