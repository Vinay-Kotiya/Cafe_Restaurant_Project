import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { motion, AnimatePresence } from "framer-motion";
import "react-datepicker/dist/react-datepicker.css";
import PixelCard from "../ReactBits/PixelCard/PixelCard";

const timeSlots = [
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
];

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    date: null,
    time: "",
    guests: 1,
    name: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = "Please select a date.";
    if (!formData.time) newErrors.time = "Please choose a time slot.";
    if (formData.guests < 1) newErrors.guests = "At least 1 guest is required.";
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.phone.match(/^\d{10}$/))
      newErrors.phone = "Enter a valid 10-digit phone number.";
    if (!formData.email.match(/^\S+@\S+\.\S+$/))
      newErrors.email = "Enter a valid email address.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    localStorage.setItem("reservationData", JSON.stringify(formData));
    setShowModal(true);
    setFormData({
      date: null,
      time: "",
      guests: 1,
      name: "",
      phone: "",
      email: "",
    });
  };

  return (
    <PixelCard
      variant="blue"
      gap={3}
      speed={100}
      className="w-full h-full flex items-center z-[999] justify-center"
      // className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto p-6 sm:p-8 m-4 bg-white z-50 rounded-2xl shadow-lg"
    >
      <div className="w-full max-w-md absolute sm:max-w-lg md:max-w-xl mx-auto p-6 sm:p-8  bg-transparent z-50 rounded-2xl shadow-lg">
        {/* <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center text-gray-800 z-50">
          Reserve a Table
        </h1> */}
        {/* <p className="text-gray-500 text-center mb-4">Book your spot now!</p> */}

        <form
          onSubmit={handleSubmit}
          className="space-y-2 z-50 bg-transparent h-full"
        >
          {/* Date */}
          <div>
            <label className="block font-medium">Select Date</label>
            <DatePicker
              selected={formData.date}
              onChange={(date) => handleChange("date", date)}
              className="w-full border p-1 md:p-2 rounded mt-1 bg-white"
              minDate={new Date()}
              dateFormat="MMMM d, yyyy"
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date}</p>
            )}
          </div>

          {/* Time */}
          <div>
            <label className="block font-medium">Select Time</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className={`px-3 py-1 rounded border text-sm transition ${
                    formData.time === slot
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => handleChange("time", slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
            {errors.time && (
              <p className="text-red-500 text-sm">{errors.time}</p>
            )}
          </div>

          {/* Guests */}
          <div>
            <label className="block font-medium">Guests</label>
            <input
              type="number"
              value={formData.guests}
              onChange={(e) => handleChange("guests", parseInt(e.target.value))}
              min="1"
              className="w-full border p-1 md:p-2 rounded mt-1 bg-white"
              placeholder="Number of guests"
            />
            {errors.guests && (
              <p className="text-red-500 text-sm">{errors.guests}</p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full border p-1 md:p-2 rounded mt-1 bg-white"
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full border p-1 md:p-2 rounded mt-1 bg-white"
              placeholder="Your phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full border p-1 md:p-2rounded mt-1 bg-white"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Confirm Reservation
          </button>
        </form>

        {/* Confirmation Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center z-50 px-4"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                className="bg-white max-w-md w-full p-6 rounded-xl shadow-xl text-center"
              >
                <h3 className="text-2xl font-bold text-green-600">
                  Reservation Confirmed!
                </h3>
                <p className="mt-2 text-gray-600">
                  We look forward to serving you!
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PixelCard>
  );
}
