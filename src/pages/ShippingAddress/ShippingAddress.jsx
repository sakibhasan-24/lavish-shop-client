import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveDeliveryAddress } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

export default function ShippingAddress() {
  const cart = useSelector((state) => state.cart);
  //   saveDeliveryAddress
  //   console.log(shippingAddressFromRedux);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState(cart?.deliveryAddress?.address || "");
  const [city, setCity] = useState(cart?.deliveryAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    cart?.deliveryAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(cart?.deliveryAddress?.country || "");
  const handleDeliveryAddress = (e) => {
    // e.preventDefault();
    e.preventDefault();
    // console.log(address, city, postalCode, country);
    dispatch(saveDeliveryAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <div className="w-full sm:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-center font-semibold text-slate-500 my-6 text-2xl">
        Submit Address
      </h1>
      <div className="max-w-xl mx-auto p-8 bg-white rounded-md shadow-md my-6">
        <form className="flex flex-col gap-6 " onSubmit={handleDeliveryAddress}>
          <input
            onChange={(e) => setAddress(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-50"
            type="text"
            placeholder="Address"
            value={address}
          />
          <input
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-50"
            type="text"
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
          <input
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-50"
            type="text"
            placeholder="Postal code "
            onChange={(e) => setPostalCode(e.target.value)}
            value={postalCode}
          />
          <input
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-50"
            type="text"
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
            value={country}
          />
          <input
            type="submit"
            value="Submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-md cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
}
