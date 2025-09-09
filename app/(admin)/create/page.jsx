"use client";
import { useState } from "react";
import { GiStoneCrafting } from "react-icons/gi";

const Home = () => {
  const [formData, setFormData] = useState({
    artistName: "",
    locationInfo: "",
    numberOfTickets: 1,
    price: 100,
    image: null,
  });
  const [preview, setPreview] = useState(null); // 👈 new state for preview
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      setPreview(URL.createObjectURL(file)); // 👈 set preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = new FormData();
      data.append("artistName", formData.artistName);
      data.append("locationInfo", formData.locationInfo);
      data.append("numberOfTickets", formData.numberOfTickets);
      data.append("price", formData.price);
      if (formData.image) {
        data.append("image", formData.image);
      }

      const response = await fetch("/api/tickets", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("✅ Ticket created successfully!");
        setFormData({
          artistName: "",
          locationInfo: "",
          numberOfTickets: 1,
          price: 100,
          image: null,
        });
        setPreview(null); // 👈 clear preview
        if (document.querySelector('input[type="file"]')) {
          document.querySelector('input[type="file"]').value = "";
        }
      } else {
        setMessage(`❌ Error: ${result.message || "Unknown error"}`);
        console.error("API Error:", result);
      }
    } catch (error) {
      setMessage("❌ Error creating ticket. Please try again.");
      console.error("Network Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dash">
      <div className="dash-top">
        <span>
          <GiStoneCrafting className="text-2xl font-extrabold text-yellow-600" />
          <p>Create Ticket</p>
        </span>
      </div>
      <div className="dash-container">
        <form className="dash-content" onSubmit={handleSubmit}>
          <div className="labels">
            <div className="label">
              <h2>Artist Name:</h2>
              <input
                type="text"
                name="artistName"
                placeholder="John Doe"
                value={formData.artistName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="label">
              <h2>Location Desc and other info:</h2>
              <input
                type="text"
                name="locationInfo"
                placeholder="Monday, July 7, 2025, 9:00 PM..."
                value={formData.locationInfo}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="labels">
            <div className="label">
              <h2>Number of Tickets:</h2>
              <input
                type="number"
                name="numberOfTickets"
                placeholder="1"
                value={formData.numberOfTickets}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            <div className="label">
              <h2>Price</h2>
              <input
                type="number"
                name="price"
                placeholder="£100"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
          <div className="labels">
            <div className="label">
              <h2>Artist Image:</h2>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                required
              />
            </div>
          </div>

          {/* 👇 Image Preview */}
          {preview && (
            <div className="preview">
              <h3>Preview:</h3>
              <img
                src={preview}
                alt="Preview"
                className="w-48 h-48 object-cover rounded-lg border"
              />
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Ticket"}
          </button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>

      <style jsx>{`
        button:hover {
          background: #e6900b;
        }
        button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        .message {
          padding: 10px;
          border-radius: 6px;
          margin-top: 10px;
          font-weight: 500;
        }
        .message:not(:empty) {
          background: #d1fae5;
          color: #065f46;
          border: 1px solid #a7f3d0;
        }
        .preview {
          margin: 10px 0;
        }
      `}</style>
    </div>
  );
};

export default Home;
