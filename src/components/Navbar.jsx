import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ search, setSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img
          src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
          alt="Logo"
          className="w-7 h-7"
        />
        <h1 className="text-xl font-bold text-gray-800 tracking-tight">
          highway <span className="text-yellow-500">delite</span>
        </h1>
      </Link>

      {/* Search bar (centered for large screens) */}
      <div className="hidden md:flex items-center w-full max-w-md mx-6 gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search experiences..."
          className="w-full border border-gray-300 px-4 py-2 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button className="bg-yellow-400 text-white font-medium px-4 py-2 rounded-md hover:bg-yellow-500 transition">
          Search
        </button>
      </div>

      {/* Menu button (for mobile) */}
      <button
        className="md:hidden p-2 border rounded-md hover:bg-gray-100 transition"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Search Drawer */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-md md:hidden">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search experiences..."
            className="w-full border border-gray-300 px-4 py-2 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button className="mt-3 w-full bg-yellow-400 text-white font-medium px-4 py-2 rounded-md hover:bg-yellow-500 transition">
            Search
          </button>
        </div>
      )}
    </nav>
  );
}
