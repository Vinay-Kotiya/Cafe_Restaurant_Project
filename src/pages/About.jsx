import React from "react";
import { motion } from "framer-motion";
import RollingGallery from "../ReactBits/RollingGallery/RollingGallery";
import TextPressure from "../ReactBits/TextPressure/TextPressure";
import Magnet from "../ReactBits/Magnet/Magnet";
const Section = ({ title, children }) => (
  <motion.section
    className="max-w-4xl mx-auto py-12 px-6"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    <h2 className="text-3xl font-bold text-primary mb-4">{title}</h2>
    <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line">
      {children}
    </p>
  </motion.section>
);

export default function About() {
  const gallerySections = [
    {
      title: "Welcome to Annapurna",
      text: `Welcome to Annapurna – where every meal is a celebration of tradition, taste, and togetherness.\nWe serve more than just food – we serve memories crafted with love and authenticity.`,
    },
    {
      title: "Our Story",
      text: `Born from a deep love for Indian culture and cuisine, Annapurna was inspired by the goddess of nourishment herself.\nOur journey began with a simple idea: to bring wholesome, vegetarian food to your table just like it’s made at home.`,
    },
    {
      title: "The Taste of Tradition",
      text: `At Annapurna, our dishes reflect the heart of India’s rich culinary heritage.\nWe use fresh, locally sourced ingredients and traditional techniques—clay ovens, tandoors, and secret family spices.`,
    },
    {
      title: "The Annapurna Experience",
      text: `Step into a cozy, family-friendly space where tradition meets modern elegance.\nFrom our interactive menu to virtual dining tours, everything is designed to make you feel right at home.`,
    },
    {
      title: "Our Values",
      text: `We are committed to purity, hygiene, and hospitality.\nSustainability is at our core—we use biodegradable packaging and support local farmers whenever we can.`,
    },
    {
      title: "Visit Us / Join the Family",
      text: `Come taste the tradition! Reserve your table now, explore our seasonal menu, or experience a virtual tour online.\nAnnapurna isn’t just a restaurant—it’s a feeling.`,
    },
  ];

  const GalleryCard = ({ title, text }) => (
    <div className="group flex flex-col items-center justify-center text-center max-w-xs mx-auto px-4 py-6 bg-white/90 rounded-xl shadow-lg border">
      <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground whitespace-pre-line">
        {text}
      </p>
    </div>
  );

  return (
    <main id="about" className="bg-black w-full text-gray-100 min-h-screen">
      <div className="pt-12 pb-8 text-center w-full">
        <Magnet padding={100} disabled={false} magnetStrength={5}>
          <div
            // style={{ position: "relative", height: "300px" }}
            className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg"
          >
            <TextPressure
              text={"Discover Annapurna"}
              flex={false}
              alpha={false}
              stroke={true}
              width={true}
              weight={true}
              italic={true}
              textColor="#ffffff"
              strokeColor="#000"
              minFontSize={36}
            />
          </div>

          <p className="text-lg md:text-xl text-center font-light drop-shadow-lg">
            Experience the essence of authentic Indian vegetarian cuisine and
            heartfelt hospitality.
          </p>
        </Magnet>
      </div>

      {/* Rolling Gallery as Main Visual Section */}
      <RollingGallery autoplay pauseOnHover images={[]} />
    </main>
  );
}
