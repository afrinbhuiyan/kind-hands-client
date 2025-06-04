import React from 'react';

import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { IoLogoInstagram } from "react-icons/io";
import { IoIosCall, IoMdTime } from "react-icons/io";
import { HiOutlineLocationMarker } from "react-icons/hi";

const TopNav = () => {
  return (
    <nav className="bg-[#024870] text-white text-sm py-2 px-4 border-b border-[#6bd3f3]/20">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Contact Info - Stacked on mobile, row on desktop */}
        <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-6 mb-2 md:mb-0">
          <a 
            href="tel:000123456789" 
            className="flex items-center hover:text-[#6bd3f3] transition-colors group"
            aria-label="Call us"
          >
            <IoIosCall className="mr-1.5 text-[#6bd3f3] group-hover:animate-pulse" />
            <span>000 - 123 - 456789</span>
          </a>
          
          <div className="hidden md:block h-4 w-px bg-[#6bd3f3]/30"></div>
          
          <div className="flex items-center">
            <IoMdTime className="mr-1.5 text-[#6bd3f3]" />
            <span>Mon To Sat 9:00 AM to 8:00 PM</span>
          </div>
          
          <div className="hidden md:block h-4 w-px bg-[#6bd3f3]/30"></div>
          
          <a 
            href="#location" 
            className="flex items-center hover:text-[#6bd3f3] transition-colors"
            aria-label="Our location"
          >
            <HiOutlineLocationMarker className="mr-1.5 text-[#6bd3f3]" />
            <span>Visit Us</span>
          </a>
        </div>

        {/* Social Links */}
        <div className="flex space-x-4">
          <a
            href="#facebook"
            className="p-1.5 hover:text-[#6bd3f3] hover:bg-white/10 rounded-full transition-all duration-300"
            aria-label="Facebook"
          >
            <FaFacebook className="w-4 h-4" />
          </a>
          <a
            href="#whatsapp"
            className="p-1.5 hover:text-[#6bd3f3] hover:bg-white/10 rounded-full transition-all duration-300"
            aria-label="WhatsApp"
          >
            <RiWhatsappFill className="w-4 h-4" />
          </a>
          <a
            href="#instagram"
            className="p-1.5 hover:text-[#6bd3f3] hover:bg-white/10 rounded-full transition-all duration-300"
            aria-label="Instagram"
          >
            <IoLogoInstagram className="w-4 h-4" />
          </a>
          <a
            href="#linkedin"
            className="p-1.5 hover:text-[#6bd3f3] hover:bg-white/10 rounded-full transition-all duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;