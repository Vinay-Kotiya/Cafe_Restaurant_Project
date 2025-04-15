import React, { useState, useEffect } from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CustomizeModal from "../components/CustomizeModal";
import SpotlightCard from "../ReactBits/SpotlightCard/SpotlightCard";
import menuData from "../data/menu.json";
import TextPressure from "../ReactBits/TextPressure/TextPressure";
import Qr from "../assets/QrImage.jpg";
import Magnet from "../ReactBits/Magnet/Magnet";
import Squares from "../ReactBits/Squares/Squares";
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

export default function Customize() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [category, setCategory] = useState("All");
  const [filteredMenu, setFilteredMenu] = useState([]);

  const categories = ["All", ...new Set(menuData.map((item) => item.category))];
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
  const CustomAlert = ({ message, imageSrc, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
      <div className="bg-white rounded-lg shadow-xl w-full h-full max-w-6xl p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Left: iframe */}
        <div className="w-full md:w-2/3  flex justify-center items-center ">
          <img src={imageSrc} className="md:h-[800px] h-[500px]" />
          {/* <iframe
            src="https://d1csarkz8obe9u.cloudfront.net/index.php/posterbuilder/view/ed1fbc64e26a4a3a1ef991b2a6d3a8c4/1"
            className="w-full h-auto border-none rounded-md"
            title="Payment Preview"
          ></iframe> */}
        </div>

        {/* Right: message + button */}
        <div className="w-full md:w-1/3 flex flex-col justify-between text-center md:text-left">
          <div className="mb-4 hidden md:flex">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Payment Info
            </h2>
            <p className="text-gray-600">{message}</p>
          </div>

          <button
            onClick={onClose}
            className="mt-4 md:mt-auto bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-all"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );

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
    setTimeout(() => {
      setShowQR(false);
      setCartOpen(false);
      setCartItems([]);
      setPaymentStatus("success");
      setPaymentStatus(null); // Hide message after 3 sec
    }, 4000);
  };
  const showMore = () => {
    setVisibleCount((prev) => prev + 6);
  };
  useEffect(() => {
    setFilteredMenu(
      category === "All"
        ? menuData
        : menuData.filter((item) => item.category === category)
    );
  }, [category]);

  const total = cartItems.reduce((sum, item) => sum + Number(item.price), 0);
  const discount = total > 300 ? 50 : 0;
  const finalTotal = total - discount;

  return (
    <>
      <div
        id="customize"
        className="bg-gray-100 relative py-5 min-h-screen w-full"
      >
        <Squares
          direction="down"
          speed={0.3}
          squareSize={40}
          borderColor="#888"
          hoverFillColor="#1f1f1f"
          gradient={true}
        />
        {/* Cart Icon */}
        <div className="absolute top-6 md:top-12 right-6  z-50">
          <button className="relative" onClick={() => setCartOpen(true)}>
            <ShoppingCart className="w-8 md:w-12 h-8 md:h-12 text-gray-700" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>

        {/* Toast Message */}
        {showMessage && (
          <div className="fixed top-20 right-6 bg-green-300 text-black px-4 py-2 rounded shadow-md z-40">
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
              transition={{ duration: 0.5 }}
              className="fixed top-24 right-6 bg-green-300 text-black px-4 py-2 rounded shadow-md z-40 flex items-center gap-2"
            >
              ✅ Payment Successful! Thank you for your order.
            </motion.div>
          )}
        </AnimatePresence>

        <h1 className="text-2xl h-10 z-50 md:h-auto font-bold text-black mb-6 text-center">
          <TextPressure
            text={"Customize Your Order"}
            flex={false}
            alpha={false}
            stroke={true}
            width={true}
            weight={true}
            italic={true}
            textColor="#000000"
            strokeColor="#000"
            minFontSize={30}
          />
        </h1>
        {/* Menu Grid */}
        <div className="flex justify-center   items-center flex-wrap md:flex-nowrap gap-2 md:gap-3 overflow-x-auto md:overflow-x-visible pb-2 mb-3 border-b">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`whitespace-nowrap text-xl md:text-3xl px-4 py-2 z-50 rounded-full border transition-all duration-200  ${
                category === cat
                  ? "bg-black text-white hover:bg-gray-600"
                  : "bg-gray-100 hover:bg-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 w-full bg-transparent p-4 rounded-2xl  sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* <div className="flex flex-wrap gap-6 justify-center"> */}
          {filteredMenu.slice(0, visibleCount).map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover="hover" // triggers animation on entire card hover
              className="group relative bg-white shadow-md border border-slate-700 rounded-3xl w-full  overflow-hidden"

              // className="bg-white rounded-xl shadow-md overflow-hidden relative group transition-all duration-300 hover:shadow-xl"
            >
              <SpotlightCard
                className="custom-spotlight-card"
                spotlightColor="rgba(0, 229, 255, 0.2)"
              >
                <motion.div
                  className="relative h-56 overflow-hidden"
                  whileHover={{
                    // scale: 1.1,
                    // rotate: 0.5,
                    transition: { type: "spring", stiffness: 260, damping: 20 },
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    // className="w-full h-full object-cover transition-all duration-300 group-hover:opacity-40"
                    className="w-full h-full object-cover rounded-2xl transform transition-transform duration-300 group-hover:scale-105 group-hover:rounded-3xl  group-hover:opacity-40"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-opacity-10 group-hover:bg-opacity-70 group-hover:flex hidden items-center justify-center text-center transition-all duration-300"
                  >
                    <p className="text-gray-700 m-3 text-3xl font-bold">
                      {item.description}
                    </p>
                  </motion.div>
                </motion.div>

                <div className="p-4 flex justify-between items-center">
                  <h6 className="mb-2 text-gray-700 text-2xl font-semibold group-hover:text-slate-800 transition-all duration-300">
                    {item.name}
                  </h6>
                  <p className="text-gray-700 font-medium text-2xl  group-hover:text-slate-800 transition-all duration-300">
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
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
        {visibleCount < filteredMenu.length && (
          <div className="text-center  mt-8">
            <Magnet padding={100} disabled={false} magnetStrength={5}>
              <button
                onClick={showMore}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full transition duration-300"
              >
                Show More
              </button>
            </Magnet>
          </div>
        )}

        {/* </Squares> */}

        <CustomizeModal
          isOpen={isOpen}
          item={selectedItem}
          onClose={() => setIsOpen(false)}
          onAddToCart={handleAddToCart}
        />

        {/* Cart Modal */}
        {cartOpen && (
          <div className="fixed  inset-0 bg-transparent bg-opacity-10 flex justify-center items-start p-3 z-50">
            <Squares
              direction="down"
              speed={0.3}
              squareSize={40}
              borderColor="#888"
              hoverFillColor="#1f1f1f"
              gradient={true}
            />
            {showAlert && (
              <CustomAlert
                message="Thank you for your order!
Please review your payment details in the preview window.
Once the payment is completed, click OK to continue.
If you face any issues, feel free to contact our support team."
                imageSrc={Qr}
                onClose={() => setShowAlert(false)}
              />
            )}
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto relative">
              <button
                onClick={() => setCartOpen(false)}
                className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 text-4xl font"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4">Your Cart</h2>

              {cartItems.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
              ) : (
                <div>
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
                            <p className="text-sm text-gray-500">
                              ₹{item.price.toFixed(2)}
                            </p>
                            {item.customization && (
                              <div className="text-xs text-gray-600 mt-1 space-y-1">
                                <p>
                                  <strong>Spice:</strong>{" "}
                                  {item.customization.spice}
                                </p>
                                {item.customization.toppings?.length > 0 && (
                                  <p>
                                    <strong>Toppings:</strong>{" "}
                                    {item.customization.toppings.join(", ")}
                                  </p>
                                )}
                                {item.customization.sides?.length > 0 && (
                                  <p>
                                    <strong>Sides:</strong>{" "}
                                    {item.customization.sides.join(", ")}
                                  </p>
                                )}
                                <p>
                                  <strong>Qty:</strong>{" "}
                                  {item.customization.quantity}
                                </p>
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
                        {/* <img src={Qr} alt="QR Code" className="mx-auto" /> */}
                        <p className="mt-2 text-sm text-gray-600">
                          Scan QR to Pay ₹{finalTotal.toFixed(2)}
                        </p>
                        <button
                          onClick={() => {
                            setShowAlert(true);
                          }}
                          className="m-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm"
                        >
                          Show QR Code To Pay
                        </button>
                        <button
                          onClick={handlePaymentConfirm}
                          className="m-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm"
                        >
                          I have paid
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
