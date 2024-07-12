import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Payments() {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItem } = useSelector((state) => state.cart);
  const { deliveryAddress } = useSelector((state) => state.cart);

  // console.log(cartItem);
  // const { deliveryAddress } = cartItem;
  // console.log(deliveryAddress);
  console.log(cartItem);
  useEffect(() => {
    if (!deliveryAddress) {
      navigate("/shipping");
    }
  }, [deliveryAddress, navigate]);
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
    // dispatch(savePaymentMethod(e.target.value));
    // savePaymentMethod
  };
  const handlePaymentMethodSave = async (e) => {
    // e.preventDefault();
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="w-full p-6 sm:max-w-md sm:p-4 mx-auto">
      <h1 className="text-xl font-bold text-center text-slate-600 mb-6">
        Payment Method
      </h1>
      <form
        className="flex flex-col gap-4 text-md font-bold text-slate-400"
        onSubmit={handlePaymentMethodSave}
      >
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="payment"
            value="Stripe"
            checked={paymentMethod === "Stripe"}
            onChange={handlePaymentChange}
            className="radio radio-primary"
          />
          <span className="label-text">Stripe</span>
        </label>
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="payment"
            value="PayPal"
            checked={paymentMethod === "PayPal"}
            onChange={handlePaymentChange}
            className="radio radio-primary"
          />
          <span className="label-text">PayPal (Not)</span>
        </label>
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="payment"
            value="CreditCard"
            checked={paymentMethod === "CreditCard"}
            onChange={handlePaymentChange}
            className="radio radio-primary"
          />
          <span className="label-text">Credit Card (Not)</span>
        </label>
        <button
          type="submit"
          className="btn btn-primary font-bold rounded-lg mt-6 w-full"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
