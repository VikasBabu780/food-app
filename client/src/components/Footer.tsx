import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 dark:bg-gray-900 dark:text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-14 grid gap-10 md:grid-cols-4">
        {/* Branding */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white dark:text-gray-100">
            Food<span className="text-orange-500">Swift</span>
          </h2>
          <p className="text-gray-400 dark:text-gray-400 text-sm leading-relaxed">
            Delivering fresh and delicious food to your doorstep. Fast,
            reliable, and always on time.
          </p>

          <div className="flex gap-4">
            <a className="hover:text-orange-500 transition">
              <Facebook size={20} />
            </a>
            <a className="hover:text-orange-500 transition">
              <Instagram size={20} />
            </a>
            <a className="hover:text-orange-500 transition">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white dark:text-gray-100 font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-orange-500 dark:hover:text-orange-500 cursor-pointer">Home</li>
            <li className="hover:text-orange-500 dark:hover:text-orange-500 cursor-pointer">Restaurants</li>
            <li className="hover:text-orange-500 dark:hover:text-orange-500 cursor-pointer">Offers</li>
            <li className="hover:text-orange-500 dark:hover:text-orange-500 cursor-pointer">Track Order</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white dark:text-gray-100 font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-orange-500 dark:hover:text-orange-500 cursor-pointer">Help Center</li>
            <li className="hover:text-orange-500 dark:hover:text-orange-500 cursor-pointer">Refunds</li>
            <li className="hover:text-orange-500 dark:hover:text-orange-500 cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-orange-500 dark:hover:text-orange-500 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white dark:text-gray-100 font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm text-gray-400 dark:text-gray-400">
            <li className="flex items-center gap-2">
              <MapPin size={16} /> New Delhi, India
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +91 82996 53269
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@foodswift.com
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 dark:border-gray-700 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} FoodSwift All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
