import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [search, setSearch] = useState("");
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch data from API
 useEffect(() => {
  const fetchExperiences = async () => {
    try {
      const res = await axios.get("http://localhost:3000/experiences");

      const list =
        Array.isArray(res.data) ? res.data :
        Array.isArray(res.data?.data) ? res.data.data :
        Array.isArray(res.data?.experiences) ? res.data.experiences : [];

      setExperiences(list);
    } catch (err) {
      setError("Failed to load experiences. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  fetchExperiences();
}, []);



  const filteredExperiences = experiences.filter((exp) => {
    const title = exp.title?.toLowerCase() || "";
    const location = exp.location?.toLowerCase() || "";
    const term = search.toLowerCase();

    return title.includes(term) || location.includes(term);
  });


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-medium">
        Loading experiences...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600 text-lg font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar search={search} setSearch={setSearch} />

      {/* Grid Section */}
      <main className="p-8">
        {filteredExperiences.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredExperiences.map((exp) => (
              <div
                key={exp._id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-40 object-cover"
                  onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/400x250.png?text=Image+Unavailable")
                  }
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-gray-500">{exp.location}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Curated small-group experiences. Certified guide. Safety
                    first with gear included.
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-gray-800 font-semibold">
                      From ₹{exp.price}
                    </p>
                    <Link
                      to={`/details/${exp._id}`}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-sm font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-16">
            No experiences found for “{search}”
          </p>
        )}
      </main>
    </div>
  );
}
