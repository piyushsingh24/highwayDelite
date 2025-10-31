import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const checkoutData = location.state || {};
  const {
    title = "Unknown Experience",
    date = "N/A",
    time = "N/A",
    quantity = 1,
    price = 0,
    image = "https://via.placeholder.com/300x200?text=Experience",
  } = checkoutData;

  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const subtotal = price * quantity;
  const taxes = 59;
  const discountedSubtotal = subtotal - discount;
  const total = discountedSubtotal + taxes;

  // Handle Promo Validation
  const handleApplyPromo = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3000/promo/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promo }),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Invalid promo code");
        setDiscount(0);
      } else {
        setDiscount(data.discount || 0);
        setError("");
        alert(`🎉 ${data.message} Discount: ₹${data.discount}`);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPayment = () => {
    navigate("/booking-confirmation", {
      state: {
        refId: "HUF" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      },
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="flex justify-between items-center border-b border-gray-200 px-6 py-3">
        <div className="flex items-center space-x-2">
          <img
            src="https://i.ibb.co/d5s8p4k/logo.png"
            alt="Logo"
            className="h-8"
          />
          <h1 className="text-gray-700 font-semibold text-lg">
            highway delite
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search experiences"
            className="border border-gray-300 rounded-md px-4 py-1 w-72 focus:outline-none"
          />
          <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded-md font-semibold">
            Search
          </button>
        </div>
      </header>

      {/* Checkout Section */}
      <main className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left - Form */}
        <div className="lg:col-span-2 bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Checkout Details
          </h2>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm text-gray-600 block mb-1">
                Full name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-200"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Email</label>
              <input
                type="email"
                placeholder="Your email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-200"
              />
            </div>
          </div>

          {/* Promo Code */}
          <div className="flex items-center space-x-2 mb-3">
            <input
              type="text"
              placeholder="Promo code"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-200"
            />
            <button
              onClick={handleApplyPromo}
              disabled={loading}
              className={`${
                loading
                  ? "bg-gray-400"
                  : "bg-gray-800 hover:bg-gray-900"
              } text-white px-4 py-2 rounded-md`}
            >
              {loading ? "Checking..." : "Apply"}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Checkbox */}
          <div className="flex items-center space-x-2 mt-4">
            <input type="checkbox" id="agree" className="h-4 w-4" />
            <label htmlFor="agree" className="text-sm text-gray-600">
              I agree to the terms and safety policy
            </label>
          </div>
        </div>

        {/* Right - Summary */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Experience Summary
          </h3>

          <img
            src={image}
            alt={title}
            className="w-full h-40 object-cover rounded-md mb-4"
          />

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Experience</span>
              <span className="font-medium text-gray-800">{title}</span>
            </div>
            <div className="flex justify-between">
              <span>Date</span>
              <span>{date}</span>
            </div>
            <div className="flex justify-between">
              <span>Time</span>
              <span>{time}</span>
            </div>
            <div className="flex justify-between">
              <span>Qty</span>
              <span>{quantity}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>₹{taxes}</span>
            </div>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between text-lg font-semibold text-gray-800 mb-3">
            <span>Total</span>
            <span>₹{total.toFixed(0)}</span>
          </div>

          <button
            onClick={handleConfirmPayment}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded-md font-semibold text-center"
          >
            Pay and Confirm
          </button>
        </div>
      </main>
    </div>
  );
}
