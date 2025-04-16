import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr]  my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} alt="" className="w-32 mb-5" />
          <p className="w-full md:w-2/3 text-gray-600">
            Welcome to our fashion store! We offer a wide range of trendy and
            high-quality clothing for men, women, and kids. Shop with us for the
            latest styles and enjoy a seamless shopping experience.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-x1 font-medium mb-5">GET IN TOUCHH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+251701010101</li>
            <li>metasebiyawa@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024 Mete Fashion store - All right reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
