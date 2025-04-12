import React, { useState, useRef } from "react";

const ReservationForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Refs to access and clear input fields
  const dateRef = useRef();
  const timeRef = useRef();
  const guestsRef = useRef();
  const requestsRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Show success popup
    setFormSubmitted(true);

    // Clear all input values
    dateRef.current.value = "";
    timeRef.current.value = "";
    guestsRef.current.value = "";
    requestsRef.current.value = "";

    // Hide popup after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full h-full max-w-md bg-gray-200 rounded-2xl shadow-lg p-6 relative"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Book Your Table</h2>

        {/* Date */}
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 mb-1">
            Date
          </label>
          <input
            id="date"
            type="date"
            ref={dateRef}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        {/* Time */}
        <div className="mb-4">
          <label htmlFor="time" className="block text-gray-700 mb-1">
            Time
          </label>
          <input
            id="time"
            type="time"
            ref={timeRef}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        {/* Guests */}
        <div className="mb-4">
          <label htmlFor="guests" className="block text-gray-700 mb-1">
            Number of Guests
          </label>
          <input
            id="guests"
            type="number"
            min={1}
            max={20}
            placeholder="e.g., 4"
            ref={guestsRef}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        {/* Special Requests */}
        <div className="mb-6">
          <label htmlFor="requests" className="block text-gray-700 mb-1">
            Special Requests
          </label>
          <input
            id="requests"
            type="text"
            placeholder="Any special requests?"
            ref={requestsRef}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition duration-300"
        >
          Reserve Now
        </button>

        {/* Success Popup */}
        {formSubmitted && (
          <div className="absolute top-[-2.5rem] left-1/2 transform -translate-x-1/2 bg-green-300 text-white px-4 py-2 rounded-lg shadow-md">
            🎉 Reservation Submitted Successfully!
          </div>
        )}
      </form>
    </div>
  );
};

export default ReservationForm;
