import React from "react";
import { Link, NavLink } from "react-router";
import logo from "../assets/logo.png";
import {
  FaFacebook,
  FaSquareInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa6";

function Footer() {
  return (
    <>
      <footer className="footer footer-horizontal footer-center p-10">
        <aside>
          <Link
            to="/"
            className="btn btn-ghost text-xl flex items-center justify-center"
          >
            <img className="w-9" src={logo} alt="logo" />
            <h1>Recipe Ripple</h1>
          </Link>
   
          {/* Contact Info */}
          <div className="mt-6 text-center">
            <p>
              Email:{" "}
              <a
                href="mailto:iftekhar08019@gmail.com"
                className="underline text-indigo-600"
              >
                info@reciperipple.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a href="tel:+491786 314647" className="underline text-indigo-600">
                +49 1786 314647
              </a>
            </p>
            <p>Address: 123 Recipe Lane, Flavor Town, USA</p>
          </div>
          {/* Copyright */}
          <div className="mt-4 text-sm text-gray-500">
            © {new Date().getFullYear()} Recipe Ripple. All rights reserved.
          </div>
        </aside>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a
              href="https://www.facebook.com/Iftekar.alam.joy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-blue-700" size={25} />
            </a>
            <a
              href="https://www.instagram.com/iftekhar.joy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSquareInstagram className="text-[#f13b54]" size={28} />
            </a>
            <a
              href="https://www.linkedin.com/in/mdiftekharulalam21/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-blue-700" size={28} />
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="text-[#f13b54]" size={30} />
            </a>
          </div>
        </nav>
      </footer>
    </>
  );
}

export default Footer;
