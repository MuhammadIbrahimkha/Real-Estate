const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20 pt-12 pb-8">
      <div className="container mx-auto px-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-xl font-bold text-blue-400">Real Estate Portal</h3>
          <p className="text-gray-400 mt-4 text-sm leading-relaxed">
            Finding your perfect home in Islamabad has never been easier. Search, filter, and connect with sellers in one place.
          </p>
        </div>

        {/* Popular Islamabad Sectors */}
        <div>
          <h4 className="font-bold mb-4 text-gray-200">Islamabad Sectors</h4>
          <ul className="text-gray-400 text-sm space-y-2">
            <li className="hover:text-blue-400 cursor-pointer">DHA & Bahria Town</li>
            <li className="hover:text-blue-400 cursor-pointer">F-6, F-7, & F-10</li>
            <li className="hover:text-blue-400 cursor-pointer">E-11 & G-11</li>
            <li className="hover:text-blue-400 cursor-pointer">Gulberg & Naval Anchorage</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold mb-4 text-gray-200">Manage</h4>
          <ul className="text-gray-400 text-sm space-y-2">
            <li className="hover:text-blue-400 cursor-pointer">Browse Properties</li>
            <li className="hover:text-blue-400 cursor-pointer">Post a Listing</li>
            <li className="hover:text-blue-400 cursor-pointer">Terms of Service</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-bold mb-4 text-gray-200">Contact</h4>
          <p className="text-gray-400 text-sm">📍 Islamabad, Pakistan</p>
          <p className="text-gray-400 text-sm mt-2">📧 info@realestateportal.com</p>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} Real Estate Portal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;