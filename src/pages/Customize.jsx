import React, { useState } from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// import CustomizeModal from "../Componets/CustomizeModal";
import CustomizeModal from "../components/CustomizeModal";
// import menu from "../Data/Menu1";
import menu2 from "../data/menu.json"
import Qr from "/QRCODE.jpg";

export default function Customize() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [showQR, setShowQR] = useState(false);

  const handleAddToCart = (data) => {
    setCartItems((prev) => [...prev, data]);
    setIsOpen(false);
    showToast("Item added to cart from Customize");
  };

  const handleOrderNow = (item) => {
    setCartItems((prev) => [...prev, item]);
    setCartOpen(true);
    showToast("Item added to cart from Order Now");
  };

  const handleRemoveFromCart = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
  };

  const showToast = (msg = "Item has been selected") => {
    setShowMessage(msg);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const handlePaymentConfirm = () => {
    setPaymentStatus("success");
    setTimeout(() => {
      setShowQR(false);
      setCartOpen(false);
      setCartItems([]);
      setPaymentStatus(null); // Hide message after 3 sec
    }, 3000);
  };

  const total = cartItems.reduce((sum, item) => sum + Number(item.price), 0);
  const discount = total > 300 ? 50 : 0;
  const finalTotal = total - discount;

  return (
    <div  id="customize"className="bg-gray-100 p-6 relative min-h-screen">
      {/* Cart Icon */}
      <div className="absolute top-6 right-6 z-50">
        <button className="relative" onClick={() => setCartOpen(true)}>
          <ShoppingCart className="w-8 h-8 text-gray-700" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>

      {/* Toast Message */}
      {showMessage && (
        <div className="fixed top-20 right-6 bg-green-500 text-white px-4 py-2 rounded shadow-md z-40">
          {showMessage}
        </div>
      )}

      {/* Payment Success Message */}
      <AnimatePresence>
        {paymentStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .5 }}
            className="fixed top-24 right-6 bg-green-500 text-white px-4 py-2 rounded shadow-md z-40 flex items-center gap-2"
          >
            ✅ Payment Successful! Thank you for your order.
          </motion.div>
        )}
      </AnimatePresence>

      <h1 className="text-4xl font-bold mb-6 text-center">Menu Items</h1>

      {/* Menu Grid */}
      <div className="flex flex-wrap gap-6 justify-center">
        {menu2.map((item, index) => (
          <motion.div
            key={index}
            className="group relative bg-white shadow-md border border-slate-200 rounded-lg w-full sm:w-[calc(50%-1.5rem)] md:w-[calc(33.333%-1.5rem)] lg:w-[calc(25%-1.5rem)] overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.2 + 1 }}
          >
            <motion.div
              className="relative h-56 overflow-hidden"
              whileHover={{
                scale: 1.1,
                rotate: 0.5,
                transition: { type: "spring", stiffness: 260, damping: 20 },
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-all duration-300 group-hover:opacity-40"
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-opacity-10 group-hover:bg-opacity-70 group-hover:flex hidden items-center justify-center text-center transition-all duration-300"
              >
                <p className="text-slate-900 text-3xl font-bold">
                  {item.description}
                </p>
              </motion.div>
            </motion.div>

            <div className="p-4">
              <h6 className="mb-2 text-slate-800 text-xl font-semibold group-hover:text-2xl transition-all duration-300">
                {item.name}
              </h6>
              <p className="text-slate-600 font-medium mt-2 group-hover:text-lg transition-all duration-300">
                ₹{item.price}
              </p>
            </div>

            <div className="px-4 pb-4 pt-0 mt-2 flex justify-between">
              <button
                className="rounded-md bg-slate-800 py-2 px-4 text-sm text-white transition hover:bg-slate-700"
                onClick={() => handleOrderNow(item)}
              >
                Order Now
              </button>
              <button
                onClick={() => {
                  setSelectedItem(item);
                  setIsOpen(true);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
              >
                Customize
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <CustomizeModal
        isOpen={isOpen}
        item={selectedItem}
        onClose={() => setIsOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Modal */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-start pt-20 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto relative">
            <button
              onClick={() => setCartOpen(false)}
              className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>

            {cartItems.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              <>
              <ul className="space-y-4 max-h-64 overflow-y-auto pr-2">
  {cartItems.map((item, index) => (
    <li
      key={index}
      className="flex items-start justify-between border-b pb-3 gap-4"
    >
      <div className="flex gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-md"
        />
        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-sm text-gray-500">₹{item.price.toFixed(2)}</p>
          {item.customization && (
            <div className="text-xs text-gray-600 mt-1 space-y-1">
              <p><strong>Spice:</strong> {item.customization.spice}</p>
              {item.customization.toppings?.length > 0 && (
                <p><strong>Toppings:</strong> {item.customization.toppings.join(", ")}</p>
              )}
              {item.customization.sides?.length > 0 && (
                <p><strong>Sides:</strong> {item.customization.sides.join(", ")}</p>
              )}
              <p><strong>Qty:</strong> {item.customization.quantity}</p>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => handleRemoveFromCart(index)}
        className="text-red-500 hover:text-red-700 mt-2"
        title="Remove"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </li>
  ))}
</ul>


                <div className="mt-6 border-t pt-4">
                  <p className="text-right text-lg font-bold text-slate-700">
                    Total: ₹{total.toFixed(2)}
                  </p>
                  {discount > 0 && (
                    <p className="text-right text-sm text-green-600">
                      Discount Applied: ₹{discount}
                    </p>
                  )}
                  <p className="text-right text-lg font-bold text-slate-900">
                    Payable: ₹{finalTotal.toFixed(2)}
                  </p>

                  {!showQR ? (
                    <button
                      onClick={() => setShowQR(true)}
                      className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm"
                    >
                      Proceed to Payment
                    </button>
                  ) : (
                    <div className="mt-4 text-center">
                      <img src={Qr} alt="QR Code" className="mx-auto" />
                      <p className="mt-2 text-sm text-gray-600">
                        Scan QR to Pay ₹{finalTotal.toFixed(2)}
                      </p>
                      <button
                        onClick={handlePaymentConfirm}
                        className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm"
                      >
                        I have paid
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
