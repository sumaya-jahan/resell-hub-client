import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          <div>
            <h2 className="text-2xl font-bold text-blue-400">
              ReSell Hub
            </h2>

            <p className="mt-4 text-gray-400 leading-7">
              Buy and sell quality second-hand products safely,
              easily and affordably.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/products" className="hover:text-white">
                  Products
                </Link>
              </li>

              <li>
                <Link to="/categories" className="hover:text-white">
                  Categories
                </Link>
              </li>

              <li>
                <Link to="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              Contact Info
            </h3>

            <div className="space-y-3 text-gray-400">
              <p>Email: support@resellhub.com</p>
              <p>Phone: +880 1700-000000</p>
              <p>Dhaka, Bangladesh</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              Follow Us
            </h3>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white"
              >
                Facebook
              </a>

              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white"
              >
                Instagram
              </a>

              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white"
              >
                LinkedIn
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
          © 2026 ReSell Hub. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;