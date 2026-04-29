import {
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaGlobe } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-950 to-black text-gray-300 mt-auto border-t border-gray-800">

      {/* TOP SECTION */}
      <div className="px-6 md:px-20 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* LOGO + DESC */}
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight mb-3">
            <span className="text-orange-500">FOOD</span>
            <span className="text-white">IE</span>
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Fresh, hot meals delivered instantly to your doorstep.
            Experience food like never before.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <NavLink to="/" className="hover:text-orange-500 transition">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/menu" className="hover:text-orange-500 transition">
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink to="/Cartsidebar" className="hover:text-orange-500 transition">
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink to="/track" className="hover:text-orange-500 transition">
                Track Order
              </NavLink>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>Guntur, India</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-500" />
              <span>+91 9154 XXXX XX</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-orange-500" />
              <span>support@foodie.com</span>
            </div>
          </div>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>

          <div className="flex gap-4">
            {[FaGlobe, FaFacebookF, FaInstagram, FaTwitter].map((Icon, i) => (
              <div
                key={i}
                className="p-2 bg-gray-800 rounded-lg hover:bg-orange-500 transition cursor-pointer"
              >
                <Icon className="w-5 h-5" />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-800 text-center py-5 text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-orange-500 font-semibold">Foodie</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;