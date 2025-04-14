import { motion } from "framer-motion";
import { FaInstagram, FaGithub, FaEnvelope } from "react-icons/fa";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#121212] text-white py-12 px-6 md:px-24 ">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-10"
      >
        {/* Logo & Description */}
        <div>
          <h2 className="text-3xl font-extrabold text-orange-400 tracking-wide mb-3">
            Annapurna
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            A pure vegetarian Indian restaurant serving authentic flavors with a
            modern twist. From traditional thalis to vibrant street chaats –
            indulge in the true taste of India.
          </p>
        </div>

        {/* Developer Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-orange-300">
            Developed By
          </h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>
              <span className="text-white">Vinay Kotiya</span> – Frontend
              Developer & UI Designer
              <br />
              <span className="text-gray-400 text-sm">
                (ReactJS, Tailwind CSS, GSAP , ReactBits, Framer Motion)
              </span>
            </li>

            <li>Tushal Hanshola – Frontend Dev (ReactJs,Tailwind CSS )</li>
            <li>Ronit Morabiya – Frontend Dev(ReactJs,Tailwind CSS )</li>
            <li className="text-orange-400 font-medium">
              Team Tween Titans | skillsvarz 0.1 Hackathon 2025
            </li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-orange-300">
            Connect With Us
          </h3>
          <ul className="text-sm text-gray-300 space-y-3">
            <li className="flex items-center gap-2 hover:text-orange-400 ">
              <FaEnvelope className="" />
              <a
                href="mailto:vinaykotiya77@gmail.com?subject=Hello%20Vinay&body=I%20just%20visited%20your%20awesome%20website!"
                className="hover:underline"
              >
                vinaykotiya77@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2 hover:text-orange-400 transition-all">
              <FaInstagram className="text-lg" /> @vinay_kotiya7714_
            </li>
            <li className="flex items-center gap-2 hover:text-orange-400 transition-all">
              <FaGithub className="text-lg" />
              <a href="https://github.com/Vinay-Kotiya/Cafe_Restaurant_Project">
                Github.com/Vinay-Kotiya/Cafe_Restaurant_Project
              </a>
            </li>
          </ul>
        </div>
      </motion.div>

      {/* <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-12 border-t border-gray-700 pt-4 text-center text-xs text-gray-500"
      >
        © 2025 <span className="text-orange-400">Annapurna Restaurant</span>.
        All rights reserved.
      </motion.div> */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-12 border-t border-gray-700 pt-4 text-center text-xs text-gray-500"
      >
        © 2025 <span className="text-orange-400">Annapurna Restaurant</span>.
        All rights reserved.
        <div className="mt-2 text-sm text-gray-500">
          Made with ❤️ by
          <span className="text-orange-400 font-medium"> Tween Titans</span>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
