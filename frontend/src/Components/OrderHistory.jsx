import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store/Context'
import { API } from '../config/api.js'
import { useNavigate } from 'react-router-dom';
import Button from './Button';

function OrderHistory() {

    const navigate = useNavigate();
    const { user } = useContext(Context)
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([])

    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user?.email) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        fetch(API.ORDER_HISTORY, {
            method: "POST",
            body: JSON.stringify({ email: user.email }),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(err => {
                        throw new Error(err?.message || "Failed to fetch orders");
                    });
                }
                return res.json();
            })
            .then(data => {
                setOrders(data.orders || []);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message || "Failed to fetch your order history.");
                setIsLoading(false);
            });

    }, [user])

    if (isLoading) {
        return (
            <div className='ordersHistoryError'>
                <div className='loader'></div>
                <p>Loading your orders...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className='ordersHistoryError'>
                <h2>Error Loading History</h2>
                <p className="error" style={{ maxWidth: "25rem", margin: "1rem auto" }}>{error}</p>
                <Button onClick={() => navigate('/meals')}>Home</Button>
            </div>
        )
    }

    if (!orders || orders.length === 0) {
        return (
            <div className='ordersHistoryError'>
                <h2>Please Order Something...</h2>
                <Button onClick={() => navigate('/meals')}>Home</Button>
            </div>
        )
    }

    return (
        <ul className='ordersHistory'>
            {orders.map((order, index) => <ul key={order._id}>
                <div className='orderHistoryNum'>
                    <h1>Order Number: {index + 1}</h1>
                    <h1>Meals: {orders[index]?.items.length}</h1>
                </div>
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
    )
}

export default OrderHistory
