import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const taxes = 59;

  // Fetch experience data
  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await fetch(`http://localhost:3000/experiences/${id}`);
        const data = await res.json();
        setExperience(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching experience:", err);
        setLoading(false);
      }
    };
    fetchExperience();
  }, [id]);

  //  Generate next 5 days dynamically
  const getNextFiveDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 5; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      const formattedDate = nextDay.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      });
      days.push(formattedDate);
    }
    return days;
  };

  const availableDates = getNextFiveDays();

  if (loading)
    return <div className="text-center py-20 text-gray-600">Loading...</div>;

  if (!experience)
    return (
      <div className="text-center py-20 text-red-500">Experience not found</div>
    );

  const subtotal = experience.price * quantity;
  const total = subtotal + taxes;
  const canConfirm = selectedDate && selectedTime;

  // Navigate to Checkout page with JSON
  const handleConfirm = () => {
    const checkoutData = {
      experienceId: experience._id,
      title: experience.title,
      price: experience.price,
      image: experience.image,
      date: selectedDate,
      time: selectedTime,
      quantity,
      subtotal,
      taxes,
      total,
    };
    navigate("/checkout", { state: checkoutData });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
        {/* Header with Back button */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="border border-gray-400 px-3 py-1 rounded-md text-sm hover:bg-gray-100 transition"
          >
            ← Details
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-4">
            {/* Image */}
            <img
              src={experience.image || "https://via.placeholder.com/600x400"}
              alt={experience.title}
              className="w-full h-56 sm:h-72 md:h-80 object-cover rounded-md"
            />

            {/* Info Section */}
            <div className="border border-yellow-400 p-4 sm:p-5 rounded-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {experience.title}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {experience.description}
              </p>

              {/* Choose Date */}
              <div className="mt-5">
                <h3 className="font-medium mb-2 text-gray-800">Choose Date</h3>
                <div className="flex flex-wrap gap-2">
                  {availableDates.map((date, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(date)}
                      className={`border rounded-md px-3 py-1 text-sm transition ${
                        selectedDate === date
                          ? "bg-yellow-400 text-white border-yellow-400"
                          : "hover:bg-yellow-200"
                      }`}
                    >
                      {date}
                    </button>
                  ))}
                </div>
              </div>

              {/* Choose Time */}
              <div className="mt-5">
                <h3 className="font-medium mb-2 text-gray-800">Choose Time</h3>
                <div className="flex flex-wrap gap-2">
                  {["7:00 am", "9:00 am", "11:00 am", "1:00 pm", "3:00 pm"].map(
                    (time, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedTime(time)}
                        className={`border rounded-md px-3 py-1 text-sm transition ${
                          selectedTime === time
                            ? "bg-yellow-400 text-white border-yellow-400"
                            : "hover:bg-yellow-200"
                        }`}
                      >
                        {time}
                      </button>
                    )
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  All times are IST (GMT +5:30)
                </p>
              </div>
            </div>

            {/* About Section */}
            <div className="">
              <h3 className="font-semibold text-gray-800 mb-2">About</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {experience.description}
              </p>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="border border-gray-300 rounded-md p-4 sm:p-5 bg-gray-50 shadow-sm">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Starts at</span>
              <span>₹{experience.price}</span>
            </div>

            {/* Quantity */}
            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
              <span>Quantity</span>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="border border-gray-400 px-2 py-0.5 rounded-l"
                >
                  -
                </button>
                <span className="px-3">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="border border-gray-400 px-2 py-0.5 rounded-r"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price Summary */}
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Taxes</span>
              <span>₹{taxes}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-semibold text-gray-800">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            {/* Confirm Button */}
            <button
              disabled={!canConfirm}
              onClick={handleConfirm}
              className={`w-full mt-4 py-2 rounded-md font-medium text-center transition-all ${
                canConfirm
                  ? "bg-pink-500 hover:bg-pink-600 text-white"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
