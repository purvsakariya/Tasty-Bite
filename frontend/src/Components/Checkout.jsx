import React, { useContext, useState } from "react";
import Input from "./Input";
import {API} from '../config/api.js'
import Button from "./Button";
import { Context } from "../store/Context";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  let { items, user , clearCart } = useContext(Context);
  
  const cartTotalPrice = items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0,
  );

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null);
    setIsSubmitting(true);

    const fd = new FormData(e.target)
    const formData = Object.fromEntries(fd.entries());

    const order = {
      fullName: formData.fullName,
      email: user?.email,
      address: formData.address,
      city: formData.city,
      pinCode: formData.pinCode,
      items
    }

    try {
      const res = await fetch(API.PLACE_ORDER, {
        method: "POST",
        body: JSON.stringify({ order }),
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.message || 'Failed To Create Order')
      }

      clearCart();
      navigate('/placeOrder')

    } catch (err) {
      setError(err.message || 'Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="cart">
      <div className="modal">
        <h2>Checkout</h2>
        <p>Total Amount: ${Math.round(cartTotalPrice).toFixed(2)}</p>
        <form className="control" onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            id="name"
            name="fullName"
            type="text"
            placeholder="Full Name"
            required
          />
          <Input
            label="E-Mail Address"
            id="email"
            type="email"
            name="email"
            placeholder="E-Mail Address"
            value={user?.email}
            disabled
          />
          <Input label="Address" name="address" id="street" type="text" placeholder="Address" required />
          <div className="control-row">
            <div>
              <Input
                label="Pin Code"
                id="postal-code"
                type="number"
                placeholder="Pin Code"
                name="pinCode"
                min={6}
                required
              />
            </div>
            <div>
              <Input label="City" id="city" name="city" type="text" placeholder="City" required />
            </div>
          </div>
          {error && <p className="error" style={{ marginTop: "1rem" }}>{error}</p>}
          <p className="modal-actions">
            <button type="button" className="text-button" onClick={() => navigate("/meals")} disabled={isSubmitting}>
              Close
            </button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Order"}
            </Button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
