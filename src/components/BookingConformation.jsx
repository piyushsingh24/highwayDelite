import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const refId = location.state?.refId || "UNKNOWN";

  return (
    <div className="max-h-screen flex flex-col items-center mt-10 bg-white">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Yes_Check_Circle.svg/1024px-Yes_Check_Circle.svg.png"
        alt="Success"
        className="w-16 h-16 mb-4"
      />
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Booking Confirmed
      </h2>
      <p className="text-gray-600 mb-6">Ref ID: {refId}</p>
      <button
        onClick={() => navigate("/")}
        className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded-md"
      >
        Back to Home
      </button>
    </div>
  );
}
