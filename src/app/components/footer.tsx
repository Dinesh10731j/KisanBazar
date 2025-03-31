import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#FB8C00] text-white py-6 mt-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl font-semibold">KisanBazaar</h1>
            <p className="text-sm">Connecting farmers and buyers directly</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center">
            <ul className="flex flex-col sm:flex-row space-y-2 sm:space-x-6 sm:space-y-0">
              <li>
                <a href="#about" className="hover:text-[#E65100]">About Us</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#E65100]">Services</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#E65100]">Contact</a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-[#E65100]">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-6 text-sm">
          <p>&copy; 2025 KisanBazaar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
